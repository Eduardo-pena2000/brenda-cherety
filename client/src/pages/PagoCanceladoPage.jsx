import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, MessageCircle, RefreshCw } from 'lucide-react';

export default function PagoCanceladoPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#fdf2f8,#ffffff,#faf5ff)',
      padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(254,202,202,0.3)', filter: 'blur(50px)' }} />

      <div style={{ maxWidth: 500, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, animation: 'fadeInUp 0.5s ease-out' }}>
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'linear-gradient(135deg,#fee2e2,#fecaca)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', boxShadow: '0 12px 35px -8px rgba(239,68,68,0.25)'
        }}>
          <XCircle size={46} color="#dc2626" strokeWidth={1.5} />
        </div>

        <span style={{
          display: 'inline-block', fontSize: '0.8rem', letterSpacing: '0.15em',
          color: '#dc2626', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12,
          background: '#fee2e2', padding: '5px 14px', borderRadius: 9999
        }}>
          Pago cancelado
        </span>

        <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 300, color: '#1f2937', margin: '14px 0 16px', lineHeight: 1.3 }}>
          Tu pago no fue procesado
        </h1>

        <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>
          No te preocupes, no se realizó ningún cargo. El proceso de pago fue cancelado. Puedes intentarlo de nuevo cuando quieras.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <Link to="/cursos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 32px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
            color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
            textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)',
            transition: 'all 0.3s', width: '100%', maxWidth: 320, justifyContent: 'center'
          }}>
            <RefreshCw size={17} /> Intentar de Nuevo
          </Link>

          <Link to="/contacto" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 32px', background: '#fff',
            color: '#6b7280', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
            textDecoration: 'none', border: '1px solid #e5e7eb',
            transition: 'all 0.3s', width: '100%', maxWidth: 320, justifyContent: 'center'
          }}>
            <MessageCircle size={17} /> Contactar Soporte
          </Link>

          <Link to="/" style={{ color: '#9ca3af', fontSize: '0.88rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: 5, marginTop: 4, textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(25px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
