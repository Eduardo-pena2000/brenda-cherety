import { Router } from 'express';
import { createCheckout, webhook, myPurchases, createConsultationCheckout } from '../controllers/payments.controller.js';
import db from '../db/database.js';
import { getSignedS3Url } from '../lib/s3.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/debug', (req, res) => {
  res.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasClientUrl: !!process.env.CLIENT_URL,
    hasS3Bucket: !!process.env.S3_BUCKET_NAME,
    hasAwsKey: !!process.env.AWS_ACCESS_KEY_ID,
    hasAwsSecret: !!process.env.AWS_SECRET_ACCESS_KEY,
    hasS3Endpoint: !!process.env.S3_ENDPOINT_URL,
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

router.get('/test-s3', async (req, res) => {
  try {
    const url = await getSignedS3Url('test.jpg', 3600);
    res.json({ url });
  } catch (error) {
    res.json({ error: error.message, stack: error.stack });
  }
});

router.post('/create-checkout', authenticate, createCheckout);
router.post('/create-consultation-checkout', authenticate, createConsultationCheckout);
router.post('/webhook', webhook); // Sin JWT - usa firma de Stripe
router.get('/my-purchases', authenticate, myPurchases);

export default router;
