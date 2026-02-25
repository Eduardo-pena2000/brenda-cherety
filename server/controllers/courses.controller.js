import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.join(__dirname, '..', 'uploads');

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Publico: listar cursos publicados
export function listPublic(req, res) {
  const courses = db.prepare(
    'SELECT id, title, slug, description, price_cents, currency, thumbnail, created_at FROM courses WHERE is_published = 1 ORDER BY created_at DESC'
  ).all();
  res.json({ courses });
}

// Publico: obtener curso por id
export function getPublicById(req, res) {
  const course = db.prepare(
    'SELECT id, title, slug, description, price_cents, currency, thumbnail, is_published, created_at FROM courses WHERE id = ? AND is_published = 1'
  ).get(req.params.id);

  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const lessons = db.prepare(
    'SELECT id, title, description, sort_order, duration FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(course.id);

  res.json({ course, lessons });
}

// Publico: obtener curso por slug
export function getBySlug(req, res) {
  const course = db.prepare(
    'SELECT id, title, slug, description, price_cents, currency, thumbnail, is_published, created_at FROM courses WHERE slug = ?'
  ).get(req.params.slug);

  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const lessons = db.prepare(
    'SELECT id, title, description, sort_order, duration FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(course.id);

  res.json({ course, lessons });
}

// Admin: listar todos los cursos
export function listAll(req, res) {
  const courses = db.prepare('SELECT * FROM courses ORDER BY created_at DESC').all();
  res.json({ courses });
}

// Admin: obtener curso por id
export function getById(req, res) {
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }
  res.json({ course });
}

// Admin: crear curso
export function create(req, res) {
  const { title, description, price_cents, currency } = req.body;

  if (!title || price_cents === undefined) {
    return res.status(400).json({ error: 'Titulo y precio son requeridos' });
  }

  let slug = slugify(title);
  const existing = db.prepare('SELECT id FROM courses WHERE slug = ?').get(slug);
  if (existing) {
    slug = slug + '-' + Date.now();
  }

  const result = db.prepare(
    'INSERT INTO courses (title, slug, description, price_cents, currency) VALUES (?, ?, ?, ?, ?)'
  ).run(title, slug, description || '', Number(price_cents), currency || 'usd');

  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json({ course });
}

// Admin: actualizar curso
export function update(req, res) {
  const { title, description, price_cents, currency, is_published } = req.body;
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);

  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const newTitle = title ?? course.title;
  let newSlug = course.slug;
  if (title && title !== course.title) {
    newSlug = slugify(title);
    const existing = db.prepare('SELECT id FROM courses WHERE slug = ? AND id != ?').get(newSlug, course.id);
    if (existing) newSlug = newSlug + '-' + Date.now();
  }

  db.prepare(`
    UPDATE courses SET title = ?, slug = ?, description = ?, price_cents = ?, currency = ?, is_published = ?, updated_at = datetime('now')
    WHERE id = ?
  `).run(
    newTitle,
    newSlug,
    description ?? course.description,
    price_cents !== undefined ? Number(price_cents) : course.price_cents,
    currency ?? course.currency,
    is_published !== undefined ? Number(is_published) : course.is_published,
    course.id
  );

  const updated = db.prepare('SELECT * FROM courses WHERE id = ?').get(course.id);
  res.json({ course: updated });
}

// Admin: eliminar curso
export function remove(req, res) {
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Eliminar archivos de lecciones
  const lessons = db.prepare('SELECT video_path, file_path FROM lessons WHERE course_id = ?').all(course.id);
  for (const lesson of lessons) {
    if (lesson.video_path) {
      const fp = path.join(uploadsBase, lesson.video_path);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    if (lesson.file_path) {
      const fp = path.join(uploadsBase, lesson.file_path);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
  }

  // Eliminar thumbnail
  if (course.thumbnail) {
    const fp = path.join(uploadsBase, course.thumbnail);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }

  db.prepare('DELETE FROM courses WHERE id = ?').run(course.id);
  res.json({ message: 'Curso eliminado' });
}

// Admin: subir thumbnail
export function uploadThumbnail(req, res) {
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No se envio imagen' });
  }

  // Eliminar thumbnail anterior
  if (course.thumbnail) {
    const old = path.join(uploadsBase, course.thumbnail);
    if (fs.existsSync(old)) fs.unlinkSync(old);
  }

  const relativePath = 'thumbnails/' + req.file.filename;
  db.prepare('UPDATE courses SET thumbnail = ? WHERE id = ?').run(relativePath, course.id);

  res.json({ thumbnail: relativePath });
}
