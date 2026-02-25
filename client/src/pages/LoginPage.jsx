import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, X, Heart, Sparkles, Leaf } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: "'Outfit', system-ui, sans-serif",
      overflow: 'hidden',
      position: 'relative'
    }}>

      {/* ====== LEFT PANEL — Decorative (desktop only) ====== */}
      <div style={{
        width: '50%',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f9a8d4 50%, #f472b6 75%, #ec4899 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="hidden lg:flex">

        {/* Animated blobs */}
        <div className="animate-blob" style={{
          position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,252,0.5), transparent)',
          filter: 'blur(60px)', top: '10%', left: '10%'
        }} />
        <div className="animate-blob" style={{
          position: 'absolute', width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
          filter: 'blur(60px)', bottom: '10%', right: '5%', animationDelay: '3s'
        }} />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div key={i} className="animate-float-particle" style={{
            position: 'absolute',
            left: `${10 + (i * 6.5) % 90}%`,
            top: `${5 + (i * 7.3) % 85}%`,
            width: `${3 + (i % 4)}px`,
            height: `${3 + (i % 4)}px`,
            borderRadius: '50%',
            background: `rgba(255,255,255,${0.3 + (i % 3) * 0.15})`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${12 + (i % 5) * 2}s`
          }} />
        ))}

        {/* SVG decorative lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.2 }}>
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,150 Q200,80 400,200 T800,150" fill="none" stroke="url(#lg1)" strokeWidth="1.5" className="animate-draw-line" />
          <path d="M0,350 Q300,250 500,400 T1000,300" fill="none" stroke="url(#lg1)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: '0.8s' }} />
          <path d="M0,550 Q150,480 350,580 T700,500" fill="none" stroke="url(#lg1)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: '1.5s' }} />
        </svg>

        {/* Center content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 48px', maxWidth: '460px' }}>
          <div style={{ marginBottom: '32px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.7)', fontWeight: 300, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Nutrióloga
            </span>
            <h1 style={{ fontSize: '56px', fontWeight: 400, color: '#fff', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', margin: 0, lineHeight: 1.1 }}>
              Cherety
            </h1>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ height: '1px', width: '64px', background: 'rgba(255,255,255,0.3)' }} />
            <Leaf size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <div style={{ height: '1px', width: '64px', background: 'rgba(255,255,255,0.3)' }} />
          </div>

          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 300, lineHeight: 1.6, marginBottom: '16px' }}>
            Tu bienestar comienza con una decisión.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 300, lineHeight: 1.7 }}>
            Accede a cursos exclusivos de nutrición diseñados para transformar tu relación con la alimentación.
          </p>

          {/* Floating feature cards */}
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[
              { icon: <Heart size={22} />, label: 'Salud', delay: '0s' },
              { icon: <Sparkles size={22} />, label: 'Bienestar', delay: '1s' },
              { icon: <Leaf size={22} />, label: 'Nutrición', delay: '2s' }
            ].map((item, i) => (
              <div key={i} className="animate-float" style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.2)',
                animationDelay: item.delay,
                textAlign: 'center'
              }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 300, margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ====== RIGHT PANEL — Login Form ====== */}
      <div style={{
        width: '100%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(180deg, #ffffff 0%, #fdf2f8 100%)',
        position: 'relative'
      }}>

        {/* Background decorations */}
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,212,0.15), transparent)', filter: 'blur(40px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '-50px', width: '250px', height: '250px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.1), transparent)', filter: 'blur(40px)'
        }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px' }}>

          {/* Close button */}
          <Link to="/" style={{
            position: 'absolute', top: '-8px', right: '0', padding: '8px', borderRadius: '50%',
            color: '#9ca3af', display: 'flex', textDecoration: 'none',
            transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = '#f3f4f6'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
          >
            <X size={20} />
          </Link>

          {/* Mobile brand */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#9ca3af', fontWeight: 300, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Nutrióloga
            </span>
            <p style={{ fontSize: '32px', color: '#1f2937', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', margin: 0 }}>
              Cherety
            </p>
          </div>

          {/* Welcome text */}
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 300, color: '#1f2937', margin: '0 0 8px 0', lineHeight: 1.2 }}>
              Bienvenida de vuelta
            </h2>
            <p style={{ color: '#9ca3af', fontWeight: 300, fontSize: '15px', margin: 0 }}>
              Inicia sesión para continuar tu camino hacia el bienestar
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: '24px', padding: '14px 18px', borderRadius: '14px',
              border: '1px solid #fecaca', background: 'linear-gradient(135deg, #fef2f2, #fff1f2)',
              color: '#ef4444', fontSize: '14px', fontWeight: 300,
              display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', background: '#fee2e2',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <X size={14} style={{ color: '#ef4444' }} />
              </div>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '11px', fontWeight: 500, color: '#6b7280',
                marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '14px', top: '50%',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: focusedField === 'email' ? '#fce7f3' : '#fdf2f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  transform: focusedField === 'email' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%)'
                }}>
                  <Mail size={16} style={{ color: focusedField === 'email' ? '#ec4899' : '#f9a8d4', transition: 'color 0.3s' }} />
                </div>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    paddingLeft: '62px', paddingRight: '16px', paddingTop: '16px', paddingBottom: '16px',
                    background: focusedField === 'email' ? '#ffffff' : '#f9fafb',
                    border: focusedField === 'email' ? '2px solid #f9a8d4' : '2px solid #f3f4f6',
                    borderRadius: '16px', fontSize: '15px', color: '#374151',
                    outline: 'none', transition: 'all 0.3s',
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(249,168,212,0.1)' : 'none'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '11px', fontWeight: 500, color: '#6b7280',
                marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase'
              }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '14px', top: '50%',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: focusedField === 'password' ? '#fce7f3' : '#fdf2f8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  transform: focusedField === 'password' ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%)'
                }}>
                  <Lock size={16} style={{ color: focusedField === 'password' ? '#ec4899' : '#f9a8d4', transition: 'color 0.3s' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    paddingLeft: '62px', paddingRight: '52px', paddingTop: '16px', paddingBottom: '16px',
                    background: focusedField === 'password' ? '#ffffff' : '#f9fafb',
                    border: focusedField === 'password' ? '2px solid #f9a8d4' : '2px solid #f3f4f6',
                    borderRadius: '16px', fontSize: '15px', color: '#374151',
                    outline: 'none', transition: 'all 0.3s',
                    boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(249,168,212,0.1)' : 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    background: 'transparent', cursor: 'pointer', color: '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#f3f4f6'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>
              <button type="button" style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13px', color: '#f472b6', fontWeight: 300, fontFamily: 'inherit',
                transition: 'color 0.3s', padding: 0
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#ec4899'}
                onMouseLeave={e => e.currentTarget.style.color = '#f472b6'}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '17px 24px', borderRadius: '16px', border: 'none',
                background: 'linear-gradient(135deg, #f9a8d4, #f472b6, #ec4899)',
                color: '#fff', fontSize: '15px', fontWeight: 500, fontFamily: 'inherit',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.65 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.4s', position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 20px -4px rgba(244,114,182,0.4)'
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 40px -8px rgba(244,114,182,0.5)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(244,114,182,0.4)'; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)' }} />
            <span style={{ fontSize: '12px', color: '#d1d5db', fontWeight: 300 }}>o</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)' }} />
          </div>

          {/* Register link */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', fontWeight: 300, margin: 0 }}>
            ¿Primera vez aquí?{' '}
            <Link to="/registro" style={{
              color: '#f472b6', fontWeight: 500, textDecoration: 'none',
              borderBottom: '1px solid transparent', transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ec4899'; e.currentTarget.style.borderBottomColor = '#ec4899'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#f472b6'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              Crea tu cuenta
            </Link>
          </p>

          {/* Footer note */}
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#d1d5db', marginTop: '32px', fontWeight: 300 }}>
            Al iniciar sesión aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>

      {/* Spin keyframe for loading */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
