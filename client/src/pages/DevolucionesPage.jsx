import { RefreshCcw } from 'lucide-react';

export default function DevolucionesPage() {
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
            <RefreshCcw size={32} color="#fff" />
          </div>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 500 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '10px 0 14px' }}>
            Política de <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>Devoluciones</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 300 }}>
            Términos de cancelaciones y reembolsos
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(2rem,4vw,4rem)', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)', lineHeight: 1.8, color: '#4b5563', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX')}</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>1. Productos Digitales (Cursos)</h2>
          <p style={{ marginBottom: '1.5rem' }}>Debido a la naturaleza de los productos digitales que ofrecemos (cursos en video, recetarios, material descargable), aplicamos una política de devoluciones limitada para prevenir abusos, garantizando al mismo tiempo la satisfacción del usuario.</p>
          
          <p style={{ marginBottom: '1.5rem' }}><strong>Garantía de 7 días:</strong> Ofrecemos una garantía de satisfacción de 7 días naturales a partir de la fecha de compra para todos nuestros cursos. Si consideras que el curso no es lo que esperabas, puedes solicitar un reembolso completo.</p>
          
          <p style={{ marginBottom: '1.5rem' }}><strong>Excepciones a la Garantía:</strong> Nos reservamos el derecho de denegar reembolsos a los usuarios que hayan abusado de esta política, por ejemplo, descargando la totalidad de los materiales adjuntos o completando más del 50% del curso antes de solicitar el reembolso.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>2. Consultas y Sesiones Personalizadas</h2>
          <p style={{ marginBottom: '1.5rem' }}><strong>Cancelaciones:</strong> Para cancelar o reprogramar una consulta, se requiere un aviso con al menos 24 horas de anticipación. Las cancelaciones con menos de 24 horas de aviso o las inasistencias no serán elegibles para reembolso.</p>
          <p style={{ marginBottom: '1.5rem' }}><strong>Reprogramación:</strong> Puedes reprogramar tu cita sin costo adicional siempre y cuando lo notifiques con más de 24 horas de antelación.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>3. Proceso para Solicitar un Reembolso</h2>
          <p style={{ marginBottom: '0.5rem' }}>Para solicitar un reembolso dentro del periodo aplicable, debes:</p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li>Enviar un correo a <strong>brendacheretynutricion@gmail.com</strong>.</li>
            <li>Incluir en el asunto "Solicitud de Reembolso - [Tu Nombre]".</li>
            <li>Proporcionar el recibo de compra o el correo electrónico utilizado para la compra.</li>
            <li>Incluir una breve descripción del motivo de tu insatisfacción (esto nos ayuda a mejorar, pero no condiciona la devolución válida).</li>
          </ol>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>4. Tiempo de Procesamiento</h2>
          <p style={{ marginBottom: '1.5rem' }}>Una vez aprobada tu solicitud, el reembolso se procesará inmediatamente de nuestro lado. Sin embargo, puede tardar de 5 a 10 días hábiles en verse reflejado en tu estado de cuenta, dependiendo de las políticas de tu banco emisor o método de pago utilizado.</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>5. Disputas de Cargos (Chargebacks)</h2>
          <p style={{ marginBottom: '1.5rem' }}>Si presentas una disputa de cargo con tu banco o proveedor de tarjeta de crédito (chargeback) sin antes contactarnos para solicitar un reembolso según esta política, tu cuenta en la plataforma será suspendida de manera permanente y podrías perder acceso a todas las compras anteriores.</p>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6', fontSize: '0.85rem', color: '#9ca3af' }}>
            Para preguntas sobre reembolsos, por favor contacte a brendacheretynutricion@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
