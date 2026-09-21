import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const sessionId = searchParams.get('session_id') || 'N/A';

  if (type === 'consultation') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary-50), #ffffff, var(--accent-50))',
        padding: '2rem'
      }}>
        <div style={{
          background: '#fff', borderRadius: 24, padding: 'clamp(2rem, 5vw, 3rem)',
          maxWidth: 500, width: '100%', textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)'
        }}>
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 24px' }} />
          <h1 style={{ fontSize: '2rem', fontWeight: 300, color: '#1f2937', marginBottom: 8 }}>
            Pago Exitoso
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.05rem', marginBottom: 24, lineHeight: 1.6 }}>
            ¡Gracias por agendar tu consulta con Brenda Cherety!
          </p>
          
          <div style={{
            background: '#f9fafb', borderRadius: 12, padding: 20, marginBottom: 32,
            border: '1px solid #e5e7eb', textAlign: 'left'
          }}>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
              Recibo de Pago
            </p>
            <p style={{ fontSize: '0.9rem', color: '#1f2937', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              Ref: {sessionId}
            </p>
            <hr style={{ border: 'none', borderTop: '1px dashed #d1d5db', margin: '16px 0' }} />
            <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.5 }}>
              📸 <strong>Toma una captura de pantalla</strong> de este recibo y envíaselo a la nutrióloga para coordinar la fecha y hora de tu cita.
            </p>
          </div>

          <Link to="/" style={{
            display: 'inline-flex', padding: '14px 32px',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: '#fff', borderRadius: 9999, fontSize: '1rem', fontWeight: 500,
            textDecoration: 'none', boxShadow: '0 10px 25px -5px rgba(236,72,153,0.4)',
            transition: 'transform 0.3s'
          }}>
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-result">
      <div className="checkout-card success">
        <h1>Pago Exitoso!</h1>
        <p>Tu compra se ha completado correctamente. Ya puedes acceder al contenido del curso.</p>
        <Link to="/mis-cursos" className="btn btn-primary btn-lg">Ir a Mis Cursos</Link>
      </div>
    </div>
  );
}
