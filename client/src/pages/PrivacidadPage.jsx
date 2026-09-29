import { Shield } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,var(--primary-50),#ffffff,var(--accent-50))', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,var(--primary-deep),var(--primary-deep),var(--accent))',
        padding: 'clamp(3rem,6vw,5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Shield size={32} color="#fff" />
          </div>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 500 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '10px 0 14px' }}>
            Aviso de <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>Privacidad</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 300 }}>
            Cómo protegemos y utilizamos tu información
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(2rem,4vw,4rem)', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)', lineHeight: 1.8, color: '#4b5563', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX')}</p>
          
          <p style={{ marginBottom: '1.5rem' }}>Nutrióloga Cherety, con domicilio en Clínica San Andrés, Cadereyta Jiménez, N. L. Col. Centro, es responsable del tratamiento y protección de sus datos personales, en estricto apego a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la "Ley").</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>1. Datos Personales Recabados</h2>
          <p style={{ marginBottom: '1.5rem' }}>Para las finalidades señaladas en el presente Aviso de Privacidad, podemos recabar sus datos personales de las siguientes formas: cuando usted nos los proporciona directamente al crear una cuenta, al adquirir un curso, al agendar una consulta o al suscribirse a nuestro boletín. Los datos que recabamos pueden incluir:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Información de contacto y teléfono (para consultas)</li>
            <li>Datos de facturación e información fiscal (si es requerido)</li>
            <li>Datos e historial médico/nutricional (exclusivamente para consultas personalizadas)</li>
          </ul>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>2. Finalidad del Tratamiento de Datos</h2>
          <p style={{ marginBottom: '0.5rem' }}>Sus datos personales serán utilizados para las siguientes finalidades necesarias para el servicio que solicita:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Creación y gestión de su cuenta de usuario en la plataforma.</li>
            <li>Procesamiento de pagos y entrega de los cursos digitales.</li>
            <li>Brindar atención médica nutricional personalizada (solo en caso de consultas).</li>
            <li>Envío de notificaciones relacionadas con sus compras o servicios.</li>
            <li>Finalidades secundarias: Envío de promociones, boletines informativos y material publicitario (usted puede oponerse en cualquier momento).</li>
          </ul>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>3. Transferencia de Datos</h2>
          <p style={{ marginBottom: '1.5rem' }}>Le informamos que sus datos personales no son vendidos ni compartidos con terceros, con excepción de los proveedores de servicios necesarios para la operación de la plataforma, como procesadores de pago (ej. Stripe) y servicios de alojamiento, los cuales están obligados a mantener la confidencialidad de los datos.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>4. Medidas de Seguridad</h2>
          <p style={{ marginBottom: '1.5rem' }}>Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado. Las transacciones de pago están encriptadas bajo protocolos de seguridad estándar.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>5. Derechos ARCO</h2>
          <p style={{ marginBottom: '1.5rem' }}>Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del correo electrónico: brendacheretynutricion@gmail.com.</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>6. Uso de Cookies</h2>
          <p style={{ marginBottom: '1.5rem' }}>Nuestro sitio web utiliza cookies, web beacons y otras tecnologías a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia de usuario al navegar en nuestra página. Usted puede deshabilitar estas tecnologías en la configuración de su navegador.</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>7. Cambios al Aviso de Privacidad</h2>
          <p style={{ marginBottom: '1.5rem' }}>Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para la atención de novedades legislativas, políticas internas o nuevos requerimientos para la prestación u ofrecimiento de nuestros servicios o productos. Estas modificaciones estarán disponibles al público a través de nuestro sitio web.</p>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6', fontSize: '0.85rem', color: '#9ca3af' }}>
            Para preguntas sobre nuestra política de privacidad, por favor contacte a brendacheretynutricion@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
