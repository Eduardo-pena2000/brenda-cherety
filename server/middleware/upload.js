import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsBase = path.join(__dirname, '..', 'uploads');

['videos', 'files', 'thumbnails'].forEach(dir => {
  const fullPath = path.join(uploadsBase, dir);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let subdir = 'files';
    if (file.mimetype.startsWith('video/')) subdir = 'videos';
    if (file.fieldname === 'thumbnail') subdir = 'thumbnails';
    cb(null, path.join(uploadsBase, subdir));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf',
    'image/jpeg', 'image/png', 'image/webp'
  ];
  cb(null, allowed.includes(file.mimetype));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }
});
