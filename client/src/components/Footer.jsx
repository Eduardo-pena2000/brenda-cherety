import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const whatsappNumber = "528281056153";

  return (
    <footer style={{
      background: '#111827', color: '#fff',
      padding: 'clamp(3rem,6vw,5rem) 1.5rem 2rem'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem,4vw,4rem)',
          marginBottom: 48
        }} className="footer-cols">
          
          {/* Brand & Location */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 20 }}>
              <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 200, fontFamily: "'Assistant', sans-serif", letterSpacing: '0.05em' }}>
                Nutrióloga
              </span>
              <span style={{ fontFamily: "'Gistesy', cursive, serif", fontSize: '3rem', color: '#fff', lineHeight: 0.8 }}>
                Cherety
              </span>
            </div>
            
            <div style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 24 }}>
              <p>CP. 11695313</p>
              <p>Ubicación: Clínica San Andrés, Cadereyta Jiménez, N. L. Col. Centro</p>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: MessageCircle, href: `https://wa.me/${whatsappNumber}`, label: 'WhatsApp' },
                { icon: Facebook, href: 'https://www.facebook.com/Nutriologacherety?locale=es_LA', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/nutriologacherety/', label: 'Instagram' },
                { icon: Mail, href: 'mailto:brendacheretynutricion@gmail.com', label: 'Email' },
                { isTiktok: true, href: '#', label: 'TikTok' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', transition: 'all 0.3s', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary-deep)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#9ca3af'; }}
                >
                  {s.isTiktok ? (
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                  ) : (
                    <s.icon size={17} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mi Cuenta */}
          <div>
            <h4 style={{ fontWeight: 500, fontSize: '1rem', color: '#e5e7eb', marginBottom: 16 }}>Mi cuenta</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { to: '/registro', label: 'Crear cuenta' },
                { to: '/login', label: 'Iniciar sesión' },
                { to: '/mis-cursos', label: 'Mis cursos' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, necesito ayuda")}`} target="_blank" rel="noreferrer" style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                >
                  Necesito ayuda
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#4b5563', fontSize: '0.85rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: 6 }}>
            © 2026 Nutrióloga Cherety. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
