import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import authRoutes from './routes/auth.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import lessonsRoutes from './routes/lessons.routes.js';
import paymentsRoutes from './routes/payments.routes.js';
import filesRoutes from './routes/files.routes.js';
import db from './db/database.js';
import { runStreamMigration } from './db/migrateStream.js';
import { getAllowedOrigins } from './lib/urls.js';

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET no está configurado en las variables de entorno.');
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Trust proxy para que rateLimit funcione correctamente si hay un balanceador de carga o proxy inverso
app.set('trust proxy', 1);

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:", "*.r2.cloudflarestorage.com", "*.cloudflarestream.com", "*.videodelivery.net"],
      mediaSrc: ["'self'", "blob:", "https:", "*.r2.cloudflarestorage.com", "*.videodelivery.net", "*.cloudflarestream.com"],
      connectSrc: ["'self'", "https:", "*.r2.cloudflarestorage.com", "*.cloudflarestream.com", "*.videodelivery.net", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com", "https://iframe.videodelivery.net", "https://*.cloudflarestream.com", "https://*.videodelivery.net", "*.cloudflarestream.com", "*.videodelivery.net"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  }
}));

// Rate limiting (evitar limitar streaming de video o webhooks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300,
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.'
});

app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/files/video') || req.path.startsWith('/payments/webhook')) {
    return next();
  }
  return limiter(req, res, next);
});

// Stripe webhooks necesitan body raw - ANTES de express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

const allowedOrigins = getAllowedOrigins();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json({ limit: '10mb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/files', filesRoutes);

// En produccion, servir el build de React
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
  app.get('*', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    db.prepare(
      "UPDATE courses SET price_cents = 28000, currency = 'mxn', updated_at = datetime('now') WHERE id = 1 AND price_cents = 1000"
    ).run();
    runStreamMigration();
  });
}
