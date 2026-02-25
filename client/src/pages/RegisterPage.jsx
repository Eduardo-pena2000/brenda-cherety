import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, X, Sparkles, Heart, Apple } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    paddingLeft: '62px', paddingRight: field === 'password' ? '52px' : '16px',
    paddingTop: '16px', paddingBottom: '16px',
    background: focusedField === field ? '#ffffff' : '#f9fafb',
    border: focusedField === field ? '2px solid #c084fc' : '2px solid #f3f4f6',
    borderRadius: '16px', fontSize: '15px', color: '#374151',
    outline: 'none', transition: 'all 0.3s', fontFamily: 'inherit',
    boxShadow: focusedField === field ? '0 0 0 4px rgba(192,132,252,0.1)' : 'none'
  });

  const iconWrapStyle = (field) => ({
    position: 'absolute', left: '14px', top: '50%',
    width: '36px', height: '36px', borderRadius: '50%',
    background: focusedField === field ? '#f3e8ff' : '#faf5ff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.3s',
    transform: focusedField === field ? 'translateY(-50%) scale(1.1)' : 'translateY(-50%)'
  });

  const iconColor = (field) => ({
    color: focusedField === field ? '#a855f7' : '#c084fc',
    transition: 'color 0.3s'
  });

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 500, color: '#6b7280',
    marginBottom: '10px', letterSpacing: '0.08em', textTransform: 'uppercase'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Outfit', system-ui, sans-serif",
      overflow: 'hidden', position: 'relative'
    }}>

      {/* ====== LEFT PANEL — Form ====== */}
      <div style={{
        width: '100%', flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)',
        position: 'relative'
      }}>

        {/* Decorations */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,252,0.12), transparent)', filter: 'blur(50px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', right: '-40px', width: '250px', height: '250px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,212,0.1), transparent)', filter: 'blur(40px)'
        }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px' }}>

          {/* Close */}
          <Link to="/" style={{
            position: 'absolute', top: '-8px', right: '0', padding: '8px', borderRadius: '50%',
            color: '#9ca3af', display: 'flex', textDecoration: 'none', transition: 'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = '#f3f4f6'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
          >
            <X size={20} />
          </Link>

          {/* Mobile brand */}
          <div className="lg:hidden" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.35em', color: '#9ca3af', fontWeight: 300, textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
              Nutrióloga
            </span>
            <p style={{ fontSize: '32px', color: '#1f2937', fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', margin: 0 }}>
              Cherety
            </p>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 300, color: '#1f2937', margin: '0 0 8px 0', lineHeight: 1.2 }}>
              Comienza tu transformación
            </h2>
            <p style={{ color: '#9ca3af', fontWeight: 300, fontSize: '15px', margin: 0 }}>
              Crea tu cuenta y accede a cursos exclusivos de nutrición
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

            {/* Name */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Nombre completo</label>
              <div style={{ position: 'relative' }}>
                <div style={iconWrapStyle('name')}>
                  <User size={16} style={iconColor('name')} />
                </div>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('name')}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Correo electrónico</label>
              <div style={{ position: 'relative' }}>
                <div style={iconWrapStyle('email')}>
                  <Mail size={16} style={iconColor('email')} />
                </div>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('email')}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '28px' }}>
              <label style={labelStyle}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <div style={iconWrapStyle('password')}>
                  <Lock size={16} style={iconColor('password')} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={inputStyle('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                    background: 'transparent', cursor: 'pointer', color: '#9ca3af',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s', fontFamily: 'inherit'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.background = '#f3f4f6'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '17px 24px', borderRadius: '16px', border: 'none',
                background: 'linear-gradient(135deg, #c084fc, #a855f7, #9333ea)',
                color: '#fff', fontSize: '15px', fontWeight: 500, fontFamily: 'inherit',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.65 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.4s', position: 'relative', overflow: 'hidden',
                boxShadow: '0 4px 20px -4px rgba(168,85,247,0.4)'
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 40px -8px rgba(168,85,247,0.5)'; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(168,85,247,0.4)'; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>Creando tu cuenta...</span>
                </>
              ) : (
                <>
                  <span>Crear Cuenta</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)' }} />
            <span style={{ fontSize: '12px', color: '#d1d5db', fontWeight: 300 }}>o</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #e5e7eb, transparent)' }} />
          </div>

          {/* Login link */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#9ca3af', fontWeight: 300, margin: 0 }}>
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" style={{
              color: '#a855f7', fontWeight: 500, textDecoration: 'none',
              borderBottom: '1px solid transparent', transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#9333ea'; e.currentTarget.style.borderBottomColor = '#9333ea'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#a855f7'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              Inicia sesión
            </Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#d1d5db', marginTop: '28px', fontWeight: 300 }}>
            Al crear tu cuenta aceptas nuestros términos y condiciones
          </p>
        </div>
      </div>

      {/* ====== RIGHT PANEL — Decorative (desktop only) ====== */}
      <div style={{
        width: '50%',
        background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 25%, #c084fc 50%, #a855f7 75%, #9333ea 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden'
      }} className="hidden lg:flex">

        {/* Blobs */}
        <div className="animate-blob" style={{
          position: 'absolute', width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244,114,182,0.4), transparent)',
          filter: 'blur(60px)', top: '15%', right: '10%'
        }} />
        <div className="animate-blob" style={{
          position: 'absolute', width: '350px', height: '350px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.2), transparent)',
          filter: 'blur(60px)', bottom: '10%', left: '10%', animationDelay: '3s'
        }} />

        {/* Particles */}
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

        {/* SVG lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}>
          <defs>
            <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,200 Q250,120 500,250 T900,180" fill="none" stroke="url(#rg1)" strokeWidth="1.5" className="animate-draw-line" />
          <path d="M0,400 Q200,320 450,420 T800,360" fill="none" stroke="url(#rg1)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: '1s' }} />
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
            <Sparkles size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
            <div style={{ height: '1px', width: '64px', background: 'rgba(255,255,255,0.3)' }} />
          </div>

          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 300, lineHeight: 1.6, marginBottom: '16px' }}>
            Únete a miles de mujeres que ya están transformando su vida.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', fontWeight: 300, lineHeight: 1.7 }}>
            Cursos de nutrición diseñados con amor para guiarte hacia una relación más sana con la alimentación.
          </p>

          {/* Feature cards */}
          <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[
              { icon: <Apple size={22} />, label: 'Nutrición', delay: '0s' },
              { icon: <Heart size={22} />, label: 'Bienestar', delay: '1s' },
              { icon: <Sparkles size={22} />, label: 'Comunidad', delay: '2s' }
            ].map((item, i) => (
              <div key={i} className="animate-float" style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px', padding: '16px 20px',
                border: '1px solid rgba(255,255,255,0.2)',
                animationDelay: item.delay, textAlign: 'center'
              }}>
                <div style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 300, margin: 0 }}>{item.label}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
            {[
              { value: '5K+', label: 'Pacientes' },
              { value: '12', label: 'Cursos' },
              { value: '4.9', label: 'Rating' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: 300, color: '#fff', margin: '0 0 4px 0' }}>{stat.value}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
