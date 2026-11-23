import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function RestablecerContrasenaPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [tokenError, setTokenError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setValidating(false);
      setTokenValid(false);
      setTokenError('No se proporcionó ningún token de recuperación.');
      return;
    }

    apiFetch(`/auth/validate-reset-token?token=${encodeURIComponent(token)}`)
      .then(res => {
        if (res.valid) {
          setTokenValid(true);
          setUserEmail(res.email || '');
        } else {
          setTokenValid(false);
          setTokenError(res.error || 'El enlace no es válido o ha expirado.');
        }
      })
      .catch(err => {
        setTokenValid(false);
        setTokenError(err.message || 'El enlace ha expirado o es inválido.');
      })
      .finally(() => {
        setValidating(false);
      });
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword })
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.user && updateUser) {
        updateUser(data.user);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3500);
    } catch (err) {
      setError(err.message || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffffff 50%, #fdf2f8 100%)',
      padding: '24px 16px',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: 'clamp(28px, 5vw, 40px)',
        boxShadow: '0 20px 45px -10px rgba(244, 114, 182, 0.18), 0 8px 20px -6px rgba(0,0,0,0.06)',
        border: '1px solid #fce7f3'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 20px -6px rgba(236,72,153,0.25)'
          }}>
            <ShieldCheck size={28} color="#be185d" />
          </div>

          <h1 style={{
            fontSize: '1.6rem',
            fontWeight: 400,
            color: '#1f2937',
            marginBottom: '6px'
          }}>
            Restablecer Contraseña
          </h1>
          <p style={{
            fontSize: '0.9rem',
            color: '#6b7280',
            fontWeight: 300,
            lineHeight: 1.5
          }}>
            Crea una nueva contraseña segura para tu cuenta en <strong style={{ color: '#be185d', fontWeight: 500 }}>Nutrióloga Cherety</strong>
          </p>
        </div>

        {validating ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: '36px',
              height: '36px',
              border: '3px solid #fbcfe8',
              borderTopColor: '#be185d',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 16px'
            }} />
            <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 300 }}>Verificando enlace de seguridad...</p>
          </div>
        ) : !tokenValid ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fef2f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <AlertCircle size={28} color="#dc2626" />
            </div>

            <h2 style={{ fontSize: '1.2rem', color: '#1f2937', fontWeight: 500, marginBottom: '8px' }}>
              Enlace no válido o expirado
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.5, marginBottom: '24px', fontWeight: 300 }}>
              {tokenError || 'Por motivos de seguridad, los enlaces para cambiar contraseña expiran después de 1 hora.'}
            </p>

            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 500,
                boxShadow: '0 4px 15px rgba(236,72,153,0.35)'
              }}
            >
              <span>Volver a Iniciar Sesión</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : success ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle size={36} color="#059669" />
            </div>

            <h2 style={{ fontSize: '1.3rem', color: '#1f2937', fontWeight: 500, marginBottom: '8px' }}>
              ¡Contraseña Actualizada!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '24px', fontWeight: 300 }}>
              Tu contraseña ha sido actualizada con éxito. Serás redirigida al inicio de sesión en unos segundos...
            </p>

            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px 20px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 500,
                boxShadow: '0 4px 15px rgba(5,150,105,0.35)'
              }}
            >
              <span>Ir a Iniciar Sesión</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div>
            {userEmail && (
              <div style={{
                background: '#fdf2f8',
                borderRadius: '12px',
                padding: '10px 14px',
                marginBottom: '20px',
                fontSize: '0.85rem',
                color: '#831843',
                textAlign: 'center',
                border: '1px solid #fbcfe8'
              }}>
                Cuenta: <strong>{userEmail}</strong>
              </div>
            )}

            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 14px',
                background: '#fef2f2',
                borderRadius: '12px',
                border: '1px solid #fecaca',
                color: '#dc2626',
                fontSize: '0.85rem',
                marginBottom: '18px'
              }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Nueva Contraseña */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Nueva contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <Lock size={17} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    style={{
                      width: '100%',
                      padding: '13px 42px 13px 44px',
                      background: '#f9fafb',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '14px',
                      fontSize: '0.92rem',
                      color: '#1f2937',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#db2777'; e.currentTarget.style.background = '#fff'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#9ca3af',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                  Confirmar nueva contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                    <Lock size={17} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repite tu contraseña"
                    style={{
                      width: '100%',
                      padding: '13px 42px 13px 44px',
                      background: '#f9fafb',
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '14px',
                      fontSize: '0.92rem',
                      color: '#1f2937',
                      outline: 'none',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
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
                  width: '100%',
                  padding: '15px 24px',
                  borderRadius: '16px',
                  border: 'none',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #ec4899, #be185d)',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px -4px rgba(236,72,153,0.4)',
                  transition: 'all 0.3s'
                }}
              >
                {loading ? 'Guardando nueva contraseña...' : (
                  <>
                    <span>Guardar y Actualizar</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
