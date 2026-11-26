import { Router } from 'express';
import {
  listPublic,
  getBySlug,
  getPublicById,
  getEnrolledCourse,
  listAll,
  getById,
  create,
  update,
  remove,
  uploadThumbnail
} from '../controllers/courses.controller.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { uploadImage } from '../middleware/upload.js';

const router = Router();

// Rutas publicas (sin rutas privadas de videos ni materiales)
router.get('/', listPublic);
router.get('/slug/:slug', getBySlug);
router.get('/public/:id', getPublicById);

// Ruta autenticada para estudiantes inscritos o admin
router.get('/:id/learn', authenticate, getEnrolledCourse);

// Rutas admin
router.get('/admin/all', authenticate, adminOnly, listAll);
router.get('/admin/:id', authenticate, adminOnly, getById);
router.post('/', authenticate, adminOnly, create);
router.put('/:id', authenticate, adminOnly, update);
router.delete('/:id', authenticate, adminOnly, remove);
router.post('/:id/thumbnail', authenticate, adminOnly, uploadImage.single('thumbnail'), uploadThumbnail);

export default router;
