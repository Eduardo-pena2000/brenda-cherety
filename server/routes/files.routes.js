import { Router } from 'express';
import { streamVideo, downloadFile, serveThumbnail } from '../controllers/files.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/video/:lessonId', authenticate, streamVideo);
router.get('/download/:lessonId', authenticate, downloadFile);
router.get('/thumbnail/:filename', serveThumbnail); // Publico

export default router;
