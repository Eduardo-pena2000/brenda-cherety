import { Router } from 'express';
import { createCheckout, webhook, myPurchases, createConsultationCheckout } from '../controllers/payments.controller.js';
import db from '../db/database.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/debug', (req, res) => {
  res.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasClientUrl: !!process.env.CLIENT_URL,
    hasS3: !!process.env.S3_BUCKET_NAME,
    clientUrlVal: process.env.CLIENT_URL || null
  });
});

router.get('/clear', (req, res) => {
  const email = req.query.email;
  if (!email) return res.json({ error: 'Falta email' });
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (!user) return res.json({ error: 'Usuario no encontrado' });
  
  db.prepare('DELETE FROM purchases WHERE user_id = ?').run(user.id);
  res.json({ success: true, message: `Compras borradas para ${email}` });
});

router.post('/create-checkout', authenticate, createCheckout);
router.post('/create-consultation-checkout', authenticate, createConsultationCheckout);
router.post('/webhook', webhook); // Sin JWT - usa firma de Stripe
router.get('/my-purchases', authenticate, myPurchases);

export default router;
