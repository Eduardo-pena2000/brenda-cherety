import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSignedS3Url, getS3ObjectStream, isS3Configured } from '../lib/s3.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.resolve(path.join(__dirname, '..', 'uploads'));
const thumbnailsDir = path.resolve(path.join(uploadsBase, 'thumbnails'));
const SAFE_FILENAME_RE = /^[a-zA-Z0-9._-]+$/;

function resolveSafeUploadPath(relPath) {
  if (!relPath) return null;
  const resolved = path.resolve(uploadsBase, relPath);
  if (!resolved.startsWith(uploadsBase + path.sep)) return null;
  return resolved;
}

function verifyPurchase(userId, lessonId) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId);
  if (!lesson) return { error: 'Leccion no encontrada', status: 404 };

  const purchase = db.prepare(
    "SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = 'completed'"
  ).get(userId, lesson.course_id);

  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(userId);
  if (!purchase && user?.role !== 'admin') {
    return { error: 'No tienes acceso a este contenido', status: 403 };
  }

  // Verificacion de progreso lineal (solo estudiantes)
  if (user?.role !== 'admin') {
    const prevLesson = db.prepare(`
      SELECT id FROM lessons 
      WHERE course_id = ? AND sort_order < ? 
      ORDER BY sort_order DESC LIMIT 1
    `).get(lesson.course_id, lesson.sort_order);

    if (prevLesson) {
      const isCompleted = db.prepare(
        'SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ?'
      ).get(userId, prevLesson.id);

      if (!isCompleted) {
        return { error: 'Debes completar la leccion anterior para acceder a esta', status: 403 };
      }
    }
  }

  return { lesson };
}

// Streaming de video con soporte de range
export async function streamVideo(req, res) {
  const result = verifyPurchase(req.user.id, req.params.lessonId);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const { lesson } = result;
  if (!lesson.video_path) {
    return res.status(404).json({ error: 'Esta leccion no tiene video' });
  }

  if (lesson.video_path.startsWith('cf_stream:')) {
    const parts = lesson.video_path.split(':');
    const uid = (parts[1] || '').split('?')[0].trim();
    const customerCode = (parts[2] || '').split('?')[0].trim();
    const streamUrl = customerCode
      ? `https://customer-${customerCode}.cloudflarestream.com/${uid}/iframe`
      : `https://iframe.videodelivery.net/${uid}`;
    return res.redirect(302, streamUrl);
  }

  if (isS3Configured() && lesson.video_path.includes('/')) {
    const url = await getSignedS3Url(lesson.video_path, 3600 * 4);
    if (!url) return res.status(500).json({ error: 'Error generando URL de video' });
    return res.redirect(302, url);
  }

  // Fallback a archivos locales
  const videoPath = resolveSafeUploadPath(lesson.video_path);
  if (!videoPath || !fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Archivo de video no encontrado' });
  }

  const stat = fs.statSync(videoPath);
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start < 0 || end < start || end >= stat.size) {
      res.setHeader('Content-Range', `bytes */${stat.size}`);
      return res.status(416).end();
    }

    const chunkSize = end - start + 1;
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': 'video/mp4',
    });
    fs.createReadStream(videoPath).pipe(res);
  }
}

// Descargar archivo
export async function downloadFile(req, res) {
  const result = verifyPurchase(req.user.id, req.params.lessonId);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const { lesson } = result;
  if (!lesson.file_path) {
    return res.status(404).json({ error: 'Esta leccion no tiene archivo descargable' });
  }

  if (isS3Configured() && lesson.file_path.includes('/')) {
    const url = await getSignedS3Url(lesson.file_path, 3600);
    if (!url) return res.status(500).json({ error: 'Error generando URL de descarga' });
    return res.redirect(302, url);
  }

  const filePath = resolveSafeUploadPath(lesson.file_path);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  res.download(filePath);
}

// Servir thumbnails (publico)
export async function serveThumbnail(req, res) {
  const filename = req.params.filename || '';

  if (
    !filename ||
    filename.includes('..') ||
    filename.includes('/') ||
    filename.includes('\\') ||
    filename.includes('\0') ||
    path.basename(filename) !== filename ||
    !SAFE_FILENAME_RE.test(filename)
  ) {
    return res.status(400).json({ error: 'Nombre de archivo inválido' });
  }

  const s3Key = `thumbnails/${filename}`;

  // 1. Intentar servir desde R2/S3 directamente mediante stream
  if (isS3Configured()) {
    try {
      const obj = await getS3ObjectStream(s3Key);
      if (obj && obj.stream) {
        res.setHeader('Content-Type', obj.contentType || 'image/jpeg');
        if (obj.contentLength) res.setHeader('Content-Length', obj.contentLength);
        if (obj.etag) res.setHeader('ETag', obj.etag);
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=43200');
        return obj.stream.pipe(res);
      }
    } catch (error) {
      console.error('Error sirviendo thumbnail desde S3 stream:', error);
    }
  }

  // 2. Fallback local si existe (con validación estricta de ruta)
  const filePath = path.resolve(thumbnailsDir, filename);
  if (!filePath.startsWith(thumbnailsDir + path.sep)) {
    return res.status(400).json({ error: 'Nombre de archivo inválido' });
  }

  if (fs.existsSync(filePath)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.sendFile(filePath);
  }

  res.status(404).json({ error: 'Imagen no encontrada' });
}
