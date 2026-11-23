import { Router } from 'express';
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

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, me);

// Cambio de contraseña y perfil (usuario logueado)
router.put('/change-password', authenticate, changePassword);
router.put('/update-profile', authenticate, updateProfile);

// Recuperación de contraseña (olvido de contraseña)
router.post('/forgot-password', forgotPassword);
router.get('/validate-reset-token', validateResetToken);
router.post('/reset-password', resetPassword);

// Administración
router.get('/admin/users', authenticate, adminOnly, listUsers);
router.put('/admin/reset-password', authenticate, adminOnly, adminResetPassword);

export default router;
