import { Router } from 'express';
import { listByCourse, create, update, remove, uploadVideo, uploadFile } from '../controllers/lessons.controller.js';
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

export default router;
