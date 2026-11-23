import nodemailer from 'nodemailer';

// Configuración del transporter de Nodemailer
// Usamos SMTP genérico (normalmente Gmail en este caso)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // Ej: Brendacheretynutricion@gmail.com
    pass: process.env.SMTP_PASS, // Contraseña de Aplicación de Gmail
  },
});

/**
 * Verifica si el servicio de correo está configurado.
 */
export function isMailConfigured() {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Envia el recibo de compra al cliente
 */
export async function sendCustomerReceipt(email, userName, itemName, amountCents, isConsultation = false) {
  if (!isMailConfigured()) {
    console.warn('Mail no configurado. Saltando envío de recibo a cliente.');
    return;
  }

  const amountFormatted = `$${(amountCents / 100).toFixed(2)} MXN`;
  const subject = isConsultation 
    ? 'Confirmación de tu Consulta - Nutrióloga Cherety'
    : '¡Bienvenida a tu nuevo curso! - Nutrióloga Cherety';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #db2777;">¡Hola ${userName || 'hermosa'}!</h2>
      <p>Tu pago por <strong>${amountFormatted}</strong> ha sido procesado con éxito.</p>
      
      <div style="background-color: #fdf2f8; border-left: 4px solid #db2777; padding: 15px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Detalles de tu compra:</strong></p>
        <p style="margin: 5px 0 0 0;">${itemName}</p>
      </div>

      ${isConsultation 
        ? '<p>Me pondré en contacto contigo muy pronto para afinar los detalles de nuestra sesión. ¡Qué emoción trabajar juntas!</p>' 
        : '<p>Ya puedes acceder a todas las lecciones desde tu cuenta en la sección "Mis Cursos". ¡Espero que lo disfrutes muchísimo!</p>'}
      
      <br/>
      <p>Con cariño,</p>
      <p><strong>Brenda Cherety</strong></p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Nutrióloga Cherety" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
    });
    console.log(`Recibo enviado a ${email}`);
  } catch (error) {
    console.error('Error enviando recibo al cliente:', error);
  }
}

/**
 * Envia una notificación a Brenda de que hubo una nueva venta
 */
export async function sendAdminNotification(customerEmail, customerName, itemName, amountCents, isConsultation = false) {
  if (!isMailConfigured()) {
    console.warn('Mail no configurado. Saltando envío de notificación a admin.');
    return;
  }

  const amountFormatted = `$${(amountCents / 100).toFixed(2)} MXN`;
  const subject = `💰 ¡Nueva venta: ${itemName}!`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #059669;">¡Felicidades Brenda! Tienes una nueva venta 🎉</h2>
      
      <div style="background-color: #ecfdf5; border-left: 4px solid #059669; padding: 15px; margin: 20px 0;">
        <p><strong>Artículo:</strong> ${itemName}</p>
        <p><strong>Monto:</strong> ${amountFormatted}</p>
        <p><strong>Cliente:</strong> ${customerName || 'No especificado'}</p>
        <p><strong>Correo del cliente:</strong> ${customerEmail}</p>
        <p><strong>Tipo:</strong> ${isConsultation ? 'Consulta' : 'Curso'}</p>
      </div>

      ${isConsultation 
        ? '<p><em>Nota: Recuerda contactar al paciente para agendar la sesión.</em></p>'
        : ''}
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Sistema Cherety" <${process.env.SMTP_USER}>`,
      to: 'Brendacheretynutricion@gmail.com', // Correo destino (hardcoded por si el SMTP_USER es distinto)
      subject,
      html,
    });
    console.log('Notificación enviada al admin');
  } catch (error) {
    console.error('Error enviando notificación al admin:', error);
  }
}

/**
 * Envia el enlace para restablecer contraseña
 */
export async function sendPasswordResetEmail(email, userName, resetUrl) {
  if (!isMailConfigured()) {
    console.warn('[Mail] SMTP no configurado. Enlace de recuperación para', email, ':', resetUrl);
    return;
  }

  const subject = 'Restablecer tu contraseña - Nutrióloga Cherety';
  const html = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 20px; color: #2d3748; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h1 style="color: #be185d; font-size: 24px; font-weight: 300; margin: 0;">Nutrióloga Cherety</h1>
        <p style="color: #718096; font-size: 14px; margin-top: 6px;">Recuperación de cuenta</p>
      </div>

      <div style="background: #fdf2f8; border-radius: 16px; padding: 24px; margin-bottom: 24px; border: 1px solid #fbcfe8;">
        <h2 style="color: #831843; font-size: 18px; margin-top: 0;">¡Hola ${userName || 'hermosa'}!</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #4a5568; margin-bottom: 20px;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si realizaste esta solicitud, puedes crear una nueva contraseña haciendo clic en el siguiente botón:
        </p>
        
        <div style="text-align: center; margin: 28px 0;">
          <a href="${resetUrl}" style="background: linear-gradient(135deg, #ec4899, #be185d); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 12px; font-size: 15px; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(236, 72, 153, 0.35);">
            Restablecer Contraseña
          </a>
        </div>

        <p style="font-size: 13px; color: #718096; line-height: 1.5; margin-top: 24px;">
          Por seguridad, este enlace expirará en <strong>1 hora</strong>. Si el botón no funciona, copia y pega este enlace en tu navegador:
        </p>
        <p style="font-size: 12px; word-break: break-all; color: #be185d;">
          <a href="${resetUrl}" style="color: #be185d;">${resetUrl}</a>
        </p>
      </div>

      <p style="font-size: 13px; color: #a0aec0; text-align: center; margin-top: 24px;">
        Si no solicitaste este cambio, puedes ignorar este correo; tu cuenta permanece protegida.
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Nutrióloga Cherety" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html,
    });
    console.log(`[Mail] Correo de recuperación enviado a ${email}`);
  } catch (error) {
    console.error('[Mail] Error enviando correo de recuperación:', error);
  }
}

