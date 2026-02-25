import { Router } from 'express';
import { listPublic, getBySlug, getPublicById, listAll, getById, create, update, remove, uploadThumbnail } from '../controllers/courses.controller.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Rutas publicas
router.get('/', listPublic);
router.get('/slug/:slug', getBySlug);
router.get('/public/:id', getPublicById);

// Rutas admin
router.get('/admin/all', authenticate, adminOnly, listAll);
router.get('/admin/:id', authenticate, adminOnly, getById);
router.post('/', authenticate, adminOnly, create);
router.put('/:id', authenticate, adminOnly, update);
router.delete('/:id', authenticate, adminOnly, remove);
router.post('/:id/thumbnail', authenticate, adminOnly, upload.single('thumbnail'), uploadThumbnail);

export default router;
