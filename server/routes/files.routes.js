import { Router } from 'express';
import { streamVideo, downloadFile, serveThumbnail } from '../controllers/files.controller.js';
import { authenticateMedia } from '../middleware/auth.js';

const router = Router();

router.get('/video/:lessonId', authenticateMedia, streamVideo);
router.get('/download/:lessonId', authenticateMedia, downloadFile);
router.get('/thumbnail/:filename', serveThumbnail); // Publico

export default router;
