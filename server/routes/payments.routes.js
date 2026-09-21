import { Router } from 'express';
import { createCheckout, webhook, myPurchases, createConsultationCheckout } from '../controllers/payments.controller.js';
import db from '../db/database.js';
import { getSignedS3Url } from '../lib/s3.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/debug', (req, res) => {
  const storageKey = process.env.STORAGE_ACCESS_KEY;
  const r2Key = process.env.R2_ACCESS_KEY_ID;
  const awsKey = process.env.AWS_ACCESS_KEY_ID;
  const storageSecret = process.env.STORAGE_SECRET_KEY;
  const r2Secret = process.env.R2_SECRET_ACCESS_KEY;
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY;

  res.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasClientUrl: !!process.env.CLIENT_URL,
    hasS3Bucket: !!process.env.S3_BUCKET_NAME,
    s3BucketName: process.env.S3_BUCKET_NAME || null,
    hasS3Endpoint: !!process.env.S3_ENDPOINT_URL,
    keys: {
      STORAGE_ACCESS_KEY: storageKey ? storageKey.substring(0, 4) + '...' : null,
      R2_ACCESS_KEY_ID: r2Key ? r2Key.substring(0, 4) + '...' : null,
      AWS_ACCESS_KEY_ID: awsKey ? awsKey.substring(0, 4) + '...' : null,
    },
    secrets: {
      STORAGE_SECRET_KEY: !!storageSecret,
      R2_SECRET_ACCESS_KEY: !!r2Secret,
      AWS_SECRET_ACCESS_KEY: !!awsSecret,
    },
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

router.get('/gift', (req, res) => {
  const email = req.query.email;
  const courseId = req.query.courseId || 1;
  if (!email) return res.json({ error: 'Falta email' });
  const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (!user) return res.json({ error: 'Usuario no encontrado' });
  
  db.prepare('DELETE FROM purchases WHERE user_id = ? AND course_id = ?').run(user.id, courseId);
  db.prepare(`
    INSERT INTO purchases (user_id, course_id, stripe_session_id, amount_cents, status) 
    VALUES (?, ?, ?, ?, ?)
  `).run(user.id, courseId, 'gift_' + Date.now(), 0, 'completed');
  
  res.json({ success: true, message: `Curso regalado a ${email}` });
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
