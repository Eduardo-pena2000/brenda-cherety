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
      let clientUrl = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';
      if (!clientUrl.startsWith('http')) clientUrl = 'https://' + clientUrl;
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
              description: (course.description || '').substring(0, 500) || 'Curso en linea',
            },
            unit_amount: course.price_cents,
          },
          quantity: 1,
        }],
        success_url: `${clientUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${clientUrl}/checkout/cancelado`,
      });

      // Crear registro de compra pendiente
      db.prepare(`
        INSERT INTO purchases (user_id, course_id, stripe_session_id, amount_cents, status) 
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(user_id, course_id) DO UPDATE SET 
          stripe_session_id = excluded.stripe_session_id,
          amount_cents = excluded.amount_cents,
          status = 'pending'
      `).run(userId, course.id, session.id, course.price_cents, 'pending');

      res.json({ url: session.url });
    } catch (err) {
      console.error('Error creando checkout:', err);
      res.status(500).json({ error: err.message || 'Error al crear sesion de pago' });
    }
  })();
}

// Crear sesion de Stripe Checkout para Consultas
export function createConsultationCheckout(req, res) {
  const userId = req.user.id;
  const { type } = req.body;

  const amount_cents = type === 'online' ? 70000 : 80000;
  const title = type === 'online' ? 'Consulta Online' : 'Consulta Presencial';

  (async () => {
    try {
      let clientUrl = process.env.CLIENT_URL || req.headers.origin || 'http://localhost:5173';
      if (!clientUrl.startsWith('http')) clientUrl = 'https://' + clientUrl;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: req.user.email,
        metadata: {
          user_id: String(userId),
          type: type,
          is_consultation: 'true'
        },
        line_items: [{
          price_data: {
            currency: 'mxn',
            product_data: {
              name: title,
              description: 'Sesión de consulta nutricional con Brenda Cherety',
            },
            unit_amount: amount_cents,
          },
          quantity: 1,
        }],
        success_url: `${clientUrl}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${clientUrl}/pago-cancelado`,
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error('Error creando checkout de consulta:', err);
      res.status(500).json({ error: err.message || 'Error al crear sesión de pago' });
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
