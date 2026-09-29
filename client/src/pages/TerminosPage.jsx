import { FileText } from 'lucide-react';

export default function TerminosPage() {
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
            <FileText size={32} color="#fff" />
          </div>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 500 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '10px 0 14px' }}>
            Términos y <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>Condiciones</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 300 }}>
            Reglas y lineamientos de uso de nuestra plataforma
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem 0' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(2rem,4vw,4rem)', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)', lineHeight: 1.8, color: '#4b5563', fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}><strong>Última actualización:</strong> {new Date().toLocaleDateString('es-MX')}</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>1. Aceptación de los Términos</h2>
          <p style={{ marginBottom: '1.5rem' }}>Al acceder y utilizar el sitio web y los servicios de Nutrióloga Cherety, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los términos, no debe utilizar nuestros servicios.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>2. Exención de Responsabilidad Médica</h2>
          <p style={{ marginBottom: '1.5rem' }}>La información, cursos, consejos y contenidos proporcionados en este sitio web tienen fines estrictamente educativos e informativos. <strong>No sustituyen el diagnóstico, tratamiento o consejo médico profesional.</strong> Consulte siempre a su médico u otro profesional de la salud calificado antes de comenzar cualquier dieta o programa de ejercicios. Nutrióloga Cherety no se hace responsable de las consecuencias directas o indirectas resultantes de la aplicación de la información proporcionada en la plataforma.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>3. Uso de la Plataforma y Cuenta</h2>
          <p style={{ marginBottom: '1.5rem' }}>Para acceder a ciertos cursos, es necesario crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. El acceso a los cursos adquiridos es personal e intransferible. Cualquier uso no autorizado, como compartir credenciales o distribuir el material sin autorización, resultará en la suspensión inmediata de la cuenta sin derecho a reembolso.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>4. Propiedad Intelectual</h2>
          <p style={{ marginBottom: '1.5rem' }}>Todo el contenido incluido en este sitio, como textos, gráficos, logotipos, imágenes, videos y cursos, es propiedad exclusiva de Nutrióloga Cherety y está protegido por las leyes de propiedad intelectual. Queda estrictamente prohibida la reproducción, distribución, transmisión o modificación del contenido sin el consentimiento previo por escrito.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>5. Pagos y Transacciones</h2>
          <p style={{ marginBottom: '1.5rem' }}>Los pagos se procesan a través de pasarelas de pago seguras (ej. Stripe). Al proporcionar una tarjeta de crédito u otro método de pago, usted declara y garantiza que está autorizado a utilizarlo y nos autoriza a cobrar el monto total de la compra. Nutrióloga Cherety no almacena los datos sensibles de su tarjeta.</p>

          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>6. Limitación de Responsabilidad</h2>
          <p style={{ marginBottom: '1.5rem' }}>En la máxima medida permitida por la ley aplicable, Nutrióloga Cherety no será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, ni de ninguna pérdida de beneficios o ingresos, incurrida directa o indirectamente, ni de ninguna pérdida de datos, uso, fondo de comercio u otras pérdidas intangibles, que resulten de su acceso, uso o incapacidad de acceso o uso de los servicios.</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>7. Modificaciones a los Términos</h2>
          <p style={{ marginBottom: '1.5rem' }}>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Es su responsabilidad revisar estos términos periódicamente.</p>
          
          <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginTop: '2rem', marginBottom: '1rem' }}>8. Ley Aplicable</h2>
          <p style={{ marginBottom: '1.5rem' }}>Estos términos se regirán e interpretarán de acuerdo con las leyes de México, y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales competentes en Nuevo León, México.</p>
          
          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #f3f4f6', fontSize: '0.85rem', color: '#9ca3af' }}>
            Para preguntas sobre estos términos, por favor contacte a brendacheretynutricion@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
