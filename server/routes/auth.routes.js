import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { 
  register, 
  login, 
  me, 
  changePassword, 
  updateProfile, 
  forgotPassword, 
  validateResetToken, 
  resetPassword,
  listUsers,
  adminResetPassword
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminOnly.js';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Por favor espera 15 minutos antes de volver a intentar.' }
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', authenticate, me);

// Cambio de contraseña y perfil (usuario logueado)
router.put('/change-password', authenticate, changePassword);
router.put('/update-profile', authenticate, updateProfile);

// Recuperación de contraseña (olvido de contraseña)
router.post('/forgot-password', authLimiter, forgotPassword);
router.get('/validate-reset-token', validateResetToken);
router.post('/reset-password', authLimiter, resetPassword);

// Administración
router.get('/admin/users', authenticate, adminOnly, listUsers);
router.put('/admin/reset-password', authenticate, adminOnly, adminResetPassword);

export default router;
