import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.join(__dirname, '..', 'uploads');

// Admin: listar lecciones de un curso
export function listByCourse(req, res) {
  const lessons = db.prepare(
    'SELECT * FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(req.params.courseId);
  res.json({ lessons });
}

// Admin: crear leccion con archivos
export function create(req, res) {
  const { course_id, title, description, sort_order } = req.body;

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
    videoPath = 'videos/' + req.files.video[0].filename;
  }
  if (req.files?.material?.[0]) {
    filePath = 'files/' + req.files.material[0].filename;
  }

  const result = db.prepare(
    'INSERT INTO lessons (course_id, title, description, video_path, file_path, sort_order) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    Number(course_id),
    title,
    description || '',
    videoPath,
    filePath,
    Number(sort_order) || 0
  );

  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ lesson });
}

// Admin: actualizar leccion
export function update(req, res) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Leccion no encontrada' });
  }

  const { title, description, sort_order } = req.body;

  db.prepare(
    'UPDATE lessons SET title = ?, description = ?, sort_order = ? WHERE id = ?'
  ).run(
    title ?? lesson.title,
    description ?? lesson.description,
    sort_order !== undefined ? Number(sort_order) : lesson.sort_order,
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

  if (lesson.video_path) {
    const fp = path.join(uploadsBase, lesson.video_path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }
  if (lesson.file_path) {
    const fp = path.join(uploadsBase, lesson.file_path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }

  db.prepare('DELETE FROM lessons WHERE id = ?').run(lesson.id);
  res.json({ message: 'Leccion eliminada' });
}

// Admin: subir/reemplazar video
export function uploadVideo(req, res) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Leccion no encontrada' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No se envio video' });
  }

  if (lesson.video_path) {
    const old = path.join(uploadsBase, lesson.video_path);
    if (fs.existsSync(old)) fs.unlinkSync(old);
  }

  const relativePath = 'videos/' + req.file.filename;
  db.prepare('UPDATE lessons SET video_path = ? WHERE id = ?').run(relativePath, lesson.id);

  res.json({ video_path: relativePath });
}

// Admin: subir/reemplazar archivo
export function uploadFile(req, res) {
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) {
    return res.status(404).json({ error: 'Leccion no encontrada' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No se envio archivo' });
  }

  if (lesson.file_path) {
    const old = path.join(uploadsBase, lesson.file_path);
    if (fs.existsSync(old)) fs.unlinkSync(old);
  }

  const relativePath = 'files/' + req.file.filename;
  db.prepare('UPDATE lessons SET file_path = ? WHERE id = ?').run(relativePath, lesson.id);

  res.json({ file_path: relativePath });
}
