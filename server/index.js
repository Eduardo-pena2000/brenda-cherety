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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Trust proxy para que rateLimit funcione correctamente si hay un balanceador de carga o proxy inverso
app.set('trust proxy', 1);

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:", "*.r2.cloudflarestorage.com"],
      mediaSrc: ["'self'", "blob:", "https:", "*.r2.cloudflarestorage.com", "*.videodelivery.net", "*.cloudflarestream.com"],
      connectSrc: ["'self'", "https:", "*.r2.cloudflarestorage.com", "*.cloudflarestream.com", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com", "https://iframe.videodelivery.net"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  }
}));

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.'
});
app.use('/api', limiter);

// Stripe webhooks necesitan body raw - ANTES de express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
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
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
