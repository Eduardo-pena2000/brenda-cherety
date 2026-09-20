import { Router } from 'express';
import { createCheckout, webhook, myPurchases, createConsultationCheckout } from '../controllers/payments.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/create-checkout', authenticate, createCheckout);
router.post('/create-consultation-checkout', authenticate, createConsultationCheckout);
router.post('/webhook', webhook); // Sin JWT - usa firma de Stripe
router.get('/my-purchases', authenticate, myPurchases);

export default router;
