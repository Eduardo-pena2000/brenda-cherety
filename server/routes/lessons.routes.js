import { Router } from 'express';
import { listByCourse, create, update, remove, uploadVideo, uploadFile, markComplete, getProgress } from '../controllers/lessons.controller.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/course/:courseId', authenticate, adminOnly, listByCourse);

router.post('/',
  authenticate,
  adminOnly,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'material', maxCount: 1 }
  ]),
  create
);

router.put('/:id', authenticate, adminOnly, update);
router.delete('/:id', authenticate, adminOnly, remove);
router.post('/:id/video', authenticate, adminOnly, upload.single('video'), uploadVideo);
router.post('/:id/file', authenticate, adminOnly, upload.single('material'), uploadFile);

// Estudiantes
router.post('/:id/complete', authenticate, markComplete);
router.get('/course/:courseId/progress', authenticate, getProgress);

// Debug: ver lecciones con sus rutas de video
import db from '../db/database.js';
import { uploadToS3, isS3Configured } from '../lib/s3.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.join(__dirname, '..', 'uploads');

router.get('/debug/all', (req, res) => {
  const lessons = db.prepare('SELECT id, title, video_path, file_path FROM lessons ORDER BY id').all();
  res.json({ lessons, s3Configured: isS3Configured() });
});

// Migrar videos locales a R2
router.get('/migrate-to-r2', async (req, res) => {
  if (!isS3Configured()) {
    return res.json({ error: 'S3/R2 no está configurado' });
  }

  const lessons = db.prepare('SELECT id, title, video_path FROM lessons WHERE video_path IS NOT NULL').all();
  const results = [];

  for (const lesson of lessons) {
    const localPath = path.join(uploadsBase, lesson.video_path);
    
    if (fs.existsSync(localPath)) {
      try {
        const ext = path.extname(lesson.video_path);
        const s3Key = `videos/${Date.now()}_lesson_${lesson.id}${ext}`;
        await uploadToS3(localPath, s3Key, 'video/mp4');
        db.prepare('UPDATE lessons SET video_path = ? WHERE id = ?').run(s3Key, lesson.id);
        results.push({ id: lesson.id, title: lesson.title, status: 'migrado', newPath: s3Key });
      } catch (err) {
        results.push({ id: lesson.id, title: lesson.title, status: 'error', error: err.message });
      }
    } else {
      results.push({ id: lesson.id, title: lesson.title, status: 'archivo_local_no_existe', path: lesson.video_path });
    }
  }

  res.json({ results });
});

export default router;
