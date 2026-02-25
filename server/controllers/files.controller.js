import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.join(__dirname, '..', 'uploads');

function verifyPurchase(userId, lessonId) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lessonId);
  if (!lesson) return { error: 'Leccion no encontrada', status: 404 };

  const purchase = db.prepare(
    "SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = 'completed'"
  ).get(userId, lesson.course_id);

  // Tambien permitir acceso si es admin
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(userId);
  if (!purchase && user?.role !== 'admin') {
    return { error: 'No tienes acceso a este contenido', status: 403 };
  }

  return { lesson };
}

// Streaming de video con soporte de range
export function streamVideo(req, res) {
  const result = verifyPurchase(req.user.id, req.params.lessonId);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const { lesson } = result;
  if (!lesson.video_path) {
    return res.status(404).json({ error: 'Esta leccion no tiene video' });
  }

  const videoPath = path.join(uploadsBase, lesson.video_path);
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Archivo de video no encontrado' });
  }

  const stat = fs.statSync(videoPath);
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
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
export function downloadFile(req, res) {
  const result = verifyPurchase(req.user.id, req.params.lessonId);
  if (result.error) {
    return res.status(result.status).json({ error: result.error });
  }

  const { lesson } = result;
  if (!lesson.file_path) {
    return res.status(404).json({ error: 'Esta leccion no tiene archivo descargable' });
  }

  const filePath = path.join(uploadsBase, lesson.file_path);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  res.download(filePath);
}

// Servir thumbnails (publico)
export function serveThumbnail(req, res) {
  const filePath = path.join(uploadsBase, 'thumbnails', req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Imagen no encontrada' });
  }
  res.sendFile(filePath);
}
