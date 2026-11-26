import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { uploadToS3, isS3Configured } from '../lib/s3.js';
import { uploadToCloudflareStream, isCloudflareStreamConfigured } from '../lib/cloudflareStream.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.resolve(path.join(__dirname, '..', 'uploads'));

function safeUnlinkLocal(relPath) {
  if (!relPath || relPath.startsWith('cf_stream:')) return;
  const resolved = path.resolve(uploadsBase, relPath);
  if (resolved.startsWith(uploadsBase + path.sep) && fs.existsSync(resolved)) {
    fs.unlinkSync(resolved);
  }
}

// Admin: listar lecciones de un curso
export function listByCourse(req, res) {
  const lessons = db.prepare(
    'SELECT * FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(req.params.courseId);
  res.json({ lessons });
}

// Admin: crear leccion con archivos
export async function create(req, res) {
  try {
    const { course_id, title, description, sort_order, duration } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({ error: 'course_id y title son requeridos' });
    }

    const course = db.prepare('SELECT id FROM courses WHERE id = ?').get(course_id);
    if (!course) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    let videoPath = null;
    let filePath = null;

    if (req.files?.video?.[0]) {
      const vf = req.files.video[0];
      if (isCloudflareStreamConfigured()) {
        const uidInfo = await uploadToCloudflareStream(vf.path);
        videoPath = 'cf_stream:' + uidInfo;
        if (fs.existsSync(vf.path)) fs.unlinkSync(vf.path);
      } else if (isS3Configured()) {
        const ext = path.extname(vf.originalname).toLowerCase() || '.mp4';
        const s3Key = `videos/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
        await uploadToS3(vf.path, s3Key, vf.mimetype || 'video/mp4');
        videoPath = s3Key;
        if (fs.existsSync(vf.path)) fs.unlinkSync(vf.path);
      } else {
        videoPath = 'videos/' + vf.filename;
      }
    }
    if (req.files?.material?.[0]) {
      const mf = req.files.material[0];
      if (isS3Configured()) {
        const ext = path.extname(mf.originalname).toLowerCase() || '.pdf';
        const s3Key = `files/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
        await uploadToS3(mf.path, s3Key, mf.mimetype);
        filePath = s3Key;
        if (fs.existsSync(mf.path)) fs.unlinkSync(mf.path);
      } else {
        filePath = 'files/' + mf.filename;
      }
    }

    const result = db.prepare(
      'INSERT INTO lessons (course_id, title, description, video_path, file_path, sort_order, duration) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).run(
      Number(course_id),
      title,
      description || '',
      videoPath,
      filePath,
      Number(sort_order) || 0,
      duration ? Number(duration) : null
    );

    const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ lesson });
  } catch (error) {
    if (req.files?.video?.[0] && fs.existsSync(req.files.video[0].path)) fs.unlinkSync(req.files.video[0].path);
    if (req.files?.material?.[0] && fs.existsSync(req.files.material[0].path)) fs.unlinkSync(req.files.material[0].path);
    console.error('Error creando leccion:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}

// Admin: actualizar leccion
export function update(req, res) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Leccion no encontrada' });
  }

  const { title, description, sort_order, duration } = req.body;

  db.prepare(
    'UPDATE lessons SET title = ?, description = ?, sort_order = ?, duration = ? WHERE id = ?'
  ).run(
    title ?? lesson.title,
    description ?? lesson.description,
    sort_order !== undefined ? Number(sort_order) : lesson.sort_order,
    duration !== undefined ? Number(duration) : lesson.duration,
    lesson.id
  );

  const updated = db.prepare('SELECT * FROM lessons WHERE id = ?').get(lesson.id);
  res.json({ lesson: updated });
}

// Admin: eliminar leccion
export function remove(req, res) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Leccion no encontrada' });
  }

  safeUnlinkLocal(lesson.video_path);
  safeUnlinkLocal(lesson.file_path);

  db.prepare('DELETE FROM lessons WHERE id = ?').run(lesson.id);
  res.json({ message: 'Leccion eliminada' });
}

// Admin: subir/reemplazar video
export async function uploadVideo(req, res) {
  try {
    const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
    if (!lesson) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Leccion no encontrada' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se envio video' });
    }

    let finalPath = '';
    if (isCloudflareStreamConfigured()) {
      const uidInfo = await uploadToCloudflareStream(req.file.path);
      finalPath = 'cf_stream:' + uidInfo;
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } else if (isS3Configured()) {
      const ext = path.extname(req.file.originalname).toLowerCase() || '.mp4';
      const s3Key = `videos/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
      await uploadToS3(req.file.path, s3Key, req.file.mimetype || 'video/mp4');
      finalPath = s3Key;
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } else {
      finalPath = 'videos/' + req.file.filename;
    }

    if (!isCloudflareStreamConfigured() && !isS3Configured()) {
      safeUnlinkLocal(lesson.video_path);
    }

    db.prepare('UPDATE lessons SET video_path = ? WHERE id = ?').run(finalPath, lesson.id);
    res.json({ video_path: finalPath });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error('Error subiendo video:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}

// Admin: subir/reemplazar archivo
export async function uploadFile(req, res) {
  try {
    const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
    if (!lesson) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Leccion no encontrada' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se envio archivo valido' });
    }

    let finalPath = '';
    if (isS3Configured()) {
      const ext = path.extname(req.file.originalname).toLowerCase() || '.pdf';
      const s3Key = `files/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
      await uploadToS3(req.file.path, s3Key, req.file.mimetype);
      finalPath = s3Key;
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } else {
      finalPath = 'files/' + req.file.filename;
    }

    if (!isS3Configured()) {
      safeUnlinkLocal(lesson.file_path);
    }

    db.prepare('UPDATE lessons SET file_path = ? WHERE id = ?').run(finalPath, lesson.id);
    res.json({ file_path: finalPath });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error('Error subiendo archivo:', error);
    res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}

// Estudiante: Marcar leccion como completada (requiere compra o admin + orden lineal)
export function markComplete(req, res) {
  const lessonId = req.params.id;
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';

  const lesson = db.prepare('SELECT id, course_id, sort_order FROM lessons WHERE id = ?').get(lessonId);
  if (!lesson) return res.status(404).json({ error: 'Leccion no encontrada' });

  if (!isAdmin) {
    const purchase = db.prepare(
      "SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = 'completed'"
    ).get(userId, lesson.course_id);
    if (!purchase) {
      return res.status(403).json({ error: 'No tienes acceso a este curso' });
    }

    const prevLesson = db.prepare(`
      SELECT id FROM lessons
      WHERE course_id = ? AND sort_order < ?
      ORDER BY sort_order DESC LIMIT 1
    `).get(lesson.course_id, lesson.sort_order);

    if (prevLesson) {
      const prevCompleted = db.prepare(
        'SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ?'
      ).get(userId, prevLesson.id);
      if (!prevCompleted) {
        return res.status(403).json({ error: 'Debes completar la leccion anterior primero' });
      }
    }
  }

  db.prepare(
    'INSERT OR IGNORE INTO lesson_progress (user_id, lesson_id) VALUES (?, ?)'
  ).run(userId, lesson.id);

  res.json({ success: true });
}

// Estudiante: Obtener progreso del curso (requiere compra o admin)
export function getProgress(req, res) {
  const courseId = req.params.courseId;
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';

  if (!isAdmin) {
    const purchase = db.prepare(
      "SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = 'completed'"
    ).get(userId, courseId);
    if (!purchase) {
      return res.status(403).json({ error: 'No tienes acceso a este curso' });
    }
  }

  const rows = db.prepare(`
    SELECT lp.lesson_id 
    FROM lesson_progress lp
    JOIN lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = ? AND l.course_id = ?
  `).all(userId, courseId);

  const completedLessons = rows.map(r => r.lesson_id);
  res.json({ completedLessons });
}
