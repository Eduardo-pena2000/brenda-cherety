import { useState } from 'react';
import { Mail, ArrowRight, X, CheckCircle, AlertCircle } from 'lucide-react';
import { apiFetch } from '../lib/api';

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      setSent(true);
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setEmail('');
    setSent(false);
    setError('');
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px', background: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(6px)'
    }}>
      <div style={{
        position: 'relative', width: '100%', maxWidth: '440px',
        background: '#ffffff', borderRadius: '24px', padding: '32px 28px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Outfit', sans-serif",
        animation: 'fadeInUp 0.3s ease-out'
      }}>
        {/* Botón cerrar */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: '#f3f4f6', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#6b7280', transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#e5e7eb'; e.currentTarget.style.color = '#111827'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#6b7280'; }}
        >
          <X size={16} />
        </button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: '#fdf2f8', color: '#db2777', margin: '0 auto 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CheckCircle size={32} color="#db2777" />
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#1f2937', marginBottom: '8px' }}>
              ¡Correo enviado!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px', fontWeight: 300 }}>
              Si <strong>{email}</strong> está registrado, recibirás un enlace seguro para crear tu nueva contraseña. Revisa también tu carpeta de spam.
            </p>

            <button
              type="button"
              onClick={handleClose}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: '14px', border: 'none',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                color: '#fff', fontSize: '0.92rem', fontWeight: 500, cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.35)', transition: 'all 0.3s'
              }}
            >
              Entendido
            </button>
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '16px',
                background: '#fdf2f8', color: '#db2777', margin: '0 auto 14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Mail size={24} color="#db2777" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1f2937', marginBottom: '6px' }}>
                ¿Olvidaste tu contraseña?
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#6b7280', fontWeight: 300, lineHeight: 1.4 }}>
                Ingresa tu correo y te enviaremos las instrucciones para restablecerla.
              </p>
            </div>

            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 14px', background: '#fef2f2', borderRadius: '12px',
                border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.85rem',
                marginBottom: '18px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 500, color: '#4b5563', marginBottom: '6px' }}>
                  Correo electrónico
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    style={{
                      width: '100%', padding: '13px 14px 13px 42px',
                      background: '#f9fafb', border: '1.5px solid #e5e7eb',
                      borderRadius: '14px', fontSize: '0.9rem', color: '#1f2937',
                      outline: 'none', transition: 'all 0.2s', boxSizing: 'border-box'
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#db2777'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '14px 20px', borderRadius: '14px', border: 'none',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #ec4899, #be185d)',
                  color: '#fff', fontSize: '0.92rem', fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 15px rgba(236, 72, 153, 0.35)', transition: 'all 0.3s'
                }}
              >
                {loading ? 'Enviando enlace...' : (
                  <>
                    <span>Enviar enlace de recuperación</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
