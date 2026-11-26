import db from '../db/database.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { uploadToS3, isS3Configured } from '../lib/s3.js';
import { signMediaToken } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.resolve(path.join(__dirname, '..', 'uploads'));

function safeUnlinkLocal(relPath) {
  if (!relPath || relPath.startsWith('cf_stream:')) return;
  const resolved = path.resolve(uploadsBase, relPath);
  if (resolved.startsWith(uploadsBase + path.sep) && fs.existsSync(resolved)) {
    fs.unlinkSync(resolved);
  }
}

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

// Publico: obtener curso por id (NO expone video_path ni file_path)
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

// Publico: obtener curso por slug (NO expone video_path ni file_path)
export function getBySlug(req, res) {
  const course = db.prepare(
    'SELECT id, title, slug, description, price_cents, currency, thumbnail, is_published, created_at FROM courses WHERE slug = ? AND is_published = 1'
  ).get(req.params.slug);

  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  const lessons = db.prepare(
    'SELECT id, title, description, sort_order, duration FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(course.id);

  res.json({ course, lessons });
}

// Autenticado: obtener curso completo para reproducción (requiere compra o rol admin)
export function getEnrolledCourse(req, res) {
  const courseId = req.params.id;
  const userId = req.user.id;
  const isAdmin = req.user.role === 'admin';

  const course = isAdmin
    ? db.prepare('SELECT id, title, slug, description, price_cents, currency, thumbnail, is_published, created_at FROM courses WHERE id = ?').get(courseId)
    : db.prepare('SELECT id, title, slug, description, price_cents, currency, thumbnail, is_published, created_at FROM courses WHERE id = ? AND is_published = 1').get(courseId);

  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  if (!isAdmin) {
    const purchase = db.prepare(
      "SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = 'completed'"
    ).get(userId, course.id);

    if (!purchase) {
      return res.status(403).json({ error: 'No tienes acceso a este curso' });
    }
  }

  const lessons = db.prepare(
    'SELECT id, title, description, sort_order, duration, video_path, file_path FROM lessons WHERE course_id = ? ORDER BY sort_order'
  ).all(course.id);

  const progressRows = db.prepare(`
    SELECT lp.lesson_id
    FROM lesson_progress lp
    JOIN lessons l ON l.id = lp.lesson_id
    WHERE lp.user_id = ? AND l.course_id = ?
  `).all(userId, course.id);
  const completedLessons = progressRows.map(r => r.lesson_id);

  const safeLessons = lessons.map((lesson, idx) => {
    const unlocked = isAdmin || idx === 0 || completedLessons.includes(lessons[idx - 1].id);
    if (!unlocked) {
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        sort_order: lesson.sort_order,
        duration: lesson.duration,
        video_path: null,
        file_path: null,
        locked: true,
      };
    }
    return {
      ...lesson,
      locked: false,
    };
  });

  res.json({
    course,
    lessons: safeLessons,
    completedLessons,
    mediaToken: signMediaToken(req.user),
  });
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
  ).run(title, slug, description || '', Number(price_cents), currency || 'mxn');

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
    safeUnlinkLocal(lesson.video_path);
    safeUnlinkLocal(lesson.file_path);
  }

  // Eliminar thumbnail
  safeUnlinkLocal(course.thumbnail);

  db.prepare('DELETE FROM courses WHERE id = ?').run(course.id);
  res.json({ message: 'Curso eliminado' });
}

// Admin: subir thumbnail
export async function uploadThumbnail(req, res) {
  try {
    const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
    if (!course) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se envio imagen valida' });
    }

    let finalPath = '';
    if (isS3Configured()) {
      const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
      const s3Key = `thumbnails/${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
      await uploadToS3(req.file.path, s3Key, req.file.mimetype);
      finalPath = s3Key;
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    } else {
      finalPath = 'thumbnails/' + req.file.filename;
    }

    // Eliminar thumbnail anterior si era local
    if (course.thumbnail && !isS3Configured()) {
      safeUnlinkLocal(course.thumbnail);
    }

    db.prepare('UPDATE courses SET thumbnail = ? WHERE id = ?').run(finalPath, course.id);
    res.json({ thumbnail: finalPath });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error('Error subiendo thumbnail:', error);
    res.status(500).json({ error: 'Error subiendo imagen' });
  }
}
