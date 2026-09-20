import { Router } from 'express';
import { createCheckout, webhook, myPurchases, createConsultationCheckout } from '../controllers/payments.controller.js';
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

router.post('/create-checkout', authenticate, createCheckout);
router.post('/create-consultation-checkout', authenticate, createConsultationCheckout);
router.post('/webhook', webhook); // Sin JWT - usa firma de Stripe
router.get('/my-purchases', authenticate, myPurchases);

export default router;
