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
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, unique + ext);
  }
});

const ALLOWED_EXTENSIONS = {
  'video/mp4': ['.mp4'],
  'video/webm': ['.webm'],
  'video/quicktime': ['.mov', '.qt'],
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

function createFileFilter(allowedMimes) {
  return (req, file, cb) => {
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(null, false);
    }
    const ext = path.extname(file.originalname).toLowerCase();
    const validExts = ALLOWED_EXTENSIONS[file.mimetype] || [];
    cb(null, validExts.includes(ext));
  };
}

export const upload = multer({
  storage,
  fileFilter: createFileFilter(Object.keys(ALLOWED_EXTENSIONS)),
  limits: { fileSize: 2000 * 1024 * 1024 } // 2GB limit para videos
});

export const uploadImage = multer({
  storage,
  fileFilter: createFileFilter(['image/jpeg', 'image/png', 'image/webp']),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit para thumbnails
});

export const uploadMaterial = multer({
  storage,
  fileFilter: createFileFilter(['application/pdf']),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit para PDFs
});
