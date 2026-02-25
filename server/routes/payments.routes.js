import { Router } from 'express';
import { createCheckout, webhook, myPurchases } from '../controllers/payments.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/create-checkout', authenticate, createCheckout);
router.post('/webhook', webhook); // Sin JWT - usa firma de Stripe
router.get('/my-purchases', authenticate, myPurchases);

export default router;
