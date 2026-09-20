import nodemailer from 'nodemailer';

// Configuración del transporter de Nodemailer
// Usamos SMTP genérico (normalmente Gmail en este caso)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // Ej: brenda.cheretynutricion@gmail.com
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
      to: 'brenda.cheretynutricion@gmail.com', // Correo destino (hardcoded por si el SMTP_USER es distinto)
      subject,
      html,
    });
    console.log('Notificación enviada al admin');
  } catch (error) {
    console.error('Error enviando notificación al admin:', error);
  }
}
