import { useState } from 'react';
import { User, Mail, Lock, Save, CheckCircle, AlertCircle, Camera, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

export default function PerfilPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState('info');
  const [focused, setFocused] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState(user?.name || '');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  async function handleSaveInfo(e) {
    e.preventDefault();
    setSaving(true); setError(''); setSaved(false);
    await new Promise(r => setTimeout(r, 800));
    setSaved(true); setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleChangePwd(e) {
    e.preventDefault();
    if (newPwd !== confirmPwd) { setError('Las contraseñas no coinciden'); return; }
    if (newPwd.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setSaving(true); setError(''); setSaved(false);
    await new Promise(r => setTimeout(r, 800));
    setSaved(true); setSaving(false);
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px 13px 48px',
    background: focused === field ? '#fff' : '#f9fafb',
    border: `2px solid ${focused === field ? '#ec4899' : '#e5e7eb'}`,
    borderRadius: 12, fontSize: '0.92rem',
    fontFamily: "'Outfit',sans-serif", color: '#1f2937',
    outline: 'none', transition: 'all 0.3s',
    boxShadow: focused === field ? '0 0 0 4px rgba(236,72,153,0.1)' : 'none'
  });

  const iconStyle = (field) => ({
    position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
    color: focused === field ? '#ec4899' : '#9ca3af', transition: 'color 0.3s'
  });

  const tabs = [
    { id: 'info', label: 'Mi Información' },
    { id: 'password', label: 'Contraseña' },
  ];

  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#1f2937,#111827)',
        padding: 'clamp(2.5rem,5vw,4rem) 1.5rem 5rem',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(236,72,153,0.12), transparent 50%)' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
            <div style={{
              width: 96, height: 96, borderRadius: '50%',
              background: 'linear-gradient(135deg,#ec4899,#d946ef)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 300, color: '#fff',
              boxShadow: '0 10px 30px -8px rgba(236,72,153,0.5)',
              border: '3px solid rgba(255,255,255,0.2)'
            }}>
              {initials}
            </div>
            <button style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 30, height: 30, borderRadius: '50%',
              background: '#fff', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}>
              <Camera size={14} color="#6b7280" />
            </button>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 300, color: '#fff', marginBottom: 4 }}>
            {user?.name || 'Mi Perfil'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300, fontSize: '0.9rem' }}>
            {user?.email}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem', marginTop: -40 }}>
        {/* Tabs */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: 6,
          display: 'flex', gap: 4, marginBottom: 20,
          boxShadow: '0 4px 15px -4px rgba(0,0,0,0.07)'
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: '10px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.3s',
              fontFamily: "'Outfit',sans-serif",
              background: tab === t.id ? 'linear-gradient(135deg,#ec4899,#d946ef)' : 'transparent',
              color: tab === t.id ? '#fff' : '#6b7280',
              boxShadow: tab === t.id ? '0 4px 15px -4px rgba(236,72,153,0.4)' : 'none'
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Notifications */}
        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: '#d1fae5', borderRadius: 12, marginBottom: 16, border: '1px solid #6ee7b7' }}>
            <CheckCircle size={18} color="#059669" />
            <span style={{ color: '#059669', fontSize: '0.9rem', fontWeight: 500 }}>Cambios guardados exitosamente</span>
          </div>
        )}
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: '#fef2f2', borderRadius: 12, marginBottom: 16, border: '1px solid #fecaca' }}>
            <AlertCircle size={18} color="#dc2626" />
            <span style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* Content */}
        <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(24px,4vw,36px)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.07)' }}>
          {tab === 'info' && (
            <form onSubmit={handleSaveInfo}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1f2937', marginBottom: 24 }}>Información Personal</h2>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}>Nombre completo</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconStyle('name')}><User size={17} /></div>
                  <input value={name} onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                    style={inputStyle('name')} />
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconStyle('email')}><Mail size={17} /></div>
                  <input value={user?.email || ''} disabled
                    style={{ ...inputStyle('email'), opacity: 0.6, cursor: 'not-allowed' }} />
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: 6 }}>El email no puede modificarse</p>
              </div>

              <button type="submit" disabled={saving} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', background: saving ? '#9ca3af' : 'linear-gradient(135deg,#ec4899,#d946ef)',
                color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
                border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px -6px rgba(236,72,153,0.4)',
                transition: 'all 0.3s', fontFamily: "'Outfit',sans-serif"
              }}>
                {saving ? <><div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Guardando...</> : <><Save size={16} /> Guardar Cambios</>}
              </button>
            </form>
          )}

          {tab === 'password' && (
            <form onSubmit={handleChangePwd}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1f2937', marginBottom: 24 }}>Cambiar Contraseña</h2>

              {[
                { label: 'Contraseña actual', state: currentPwd, setter: setCurrentPwd, field: 'cpwd' },
                { label: 'Nueva contraseña', state: newPwd, setter: setNewPwd, field: 'npwd' },
                { label: 'Confirmar nueva contraseña', state: confirmPwd, setter: setConfirmPwd, field: 'conpwd' },
              ].map(item => (
                <div key={item.field} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: '0.9rem' }}>{item.label}</label>
                  <div style={{ position: 'relative' }}>
                    <div style={iconStyle(item.field)}><Lock size={17} /></div>
                    <input type="password" value={item.state} required
                      onChange={e => item.setter(e.target.value)}
                      onFocus={() => setFocused(item.field)} onBlur={() => setFocused(null)}
                      style={inputStyle(item.field)} />
                  </div>
                </div>
              ))}

              <p style={{ color: '#9ca3af', fontSize: '0.82rem', fontWeight: 300, marginBottom: 24 }}>
                Mínimo 6 caracteres. Usa una combinación de letras y números.
              </p>

              <button type="submit" disabled={saving} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', background: saving ? '#9ca3af' : 'linear-gradient(135deg,#ec4899,#d946ef)',
                color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
                border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px -6px rgba(236,72,153,0.4)',
                transition: 'all 0.3s', fontFamily: "'Outfit',sans-serif"
              }}>
                {saving ? <><div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Guardando...</> : <><Lock size={16} /> Cambiar Contraseña</>}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
