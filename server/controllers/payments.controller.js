import Stripe from 'stripe';
import db from '../db/database.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Crear sesion de Stripe Checkout
export function createCheckout(req, res) {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ error: 'courseId es requerido' });
  }

  const course = db.prepare('SELECT * FROM courses WHERE id = ? AND is_published = 1').get(courseId);
  if (!course) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Verificar si ya compro
  const existing = db.prepare(
    'SELECT id FROM purchases WHERE user_id = ? AND course_id = ? AND status = ?'
  ).get(userId, courseId, 'completed');

  if (existing) {
    return res.status(400).json({ error: 'Ya compraste este curso' });
  }

  (async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: req.user.email,
        metadata: {
          user_id: String(userId),
          course_id: String(course.id),
        },
        line_items: [{
          price_data: {
            currency: course.currency,
            product_data: {
              name: course.title,
              description: course.description.substring(0, 500) || 'Curso en linea',
            },
            unit_amount: course.price_cents,
          },
          quantity: 1,
        }],
        success_url: `${process.env.CLIENT_URL}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout/cancelado`,
      });

      // Crear registro de compra pendiente
      db.prepare(
        'INSERT OR IGNORE INTO purchases (user_id, course_id, stripe_session_id, amount_cents, status) VALUES (?, ?, ?, ?, ?)'
      ).run(userId, course.id, session.id, course.price_cents, 'pending');

      res.json({ url: session.url });
    } catch (err) {
      console.error('Error creando checkout:', err);
      res.status(500).json({ error: 'Error al crear sesion de pago' });
    }
  })();
}

// Webhook de Stripe
export function webhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Error verificando webhook:', err.message);
    return res.status(400).json({ error: 'Firma invalida' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { user_id, course_id } = session.metadata;

    db.prepare(`
      UPDATE purchases SET status = 'completed', stripe_payment_intent = ?
      WHERE stripe_session_id = ?
    `).run(session.payment_intent, session.id);

    console.log(`Compra completada: usuario ${user_id}, curso ${course_id}`);
  }

  res.json({ received: true });
}

// Mis compras
export function myPurchases(req, res) {
  const purchases = db.prepare(`
    SELECT p.id, p.status, p.created_at, p.amount_cents,
           c.id as course_id, c.title, c.slug, c.thumbnail, c.description
    FROM purchases p
    JOIN courses c ON c.id = p.course_id
    WHERE p.user_id = ? AND p.status = 'completed'
    ORDER BY p.created_at DESC
  `).all(req.user.id);

  res.json({ purchases });
}
