import { Link } from 'react-router-dom';
import { Facebook, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#111827', color: '#fff',
      padding: 'clamp(3rem,6vw,5rem) 1.5rem 2rem'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 'clamp(2rem,4vw,4rem)',
          marginBottom: 48
        }} className="footer-cols">
          {/* Brand */}
          <div>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: '#6b7280', textTransform: 'uppercase', fontWeight: 400 }}>
              NUTRIÓLOGA
            </span>
            <h3 style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: '1.8rem', fontWeight: 400, fontStyle: 'italic',
              color: '#fff', marginTop: 4, marginBottom: 12
            }}>
              Brenda Cherety
            </h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              Transformando la relación con la comida, un curso a la vez. Nutrición con amor y ciencia.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: Facebook, href: 'https://www.facebook.com/Nutriologacherety?locale=es_LA', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/nutriologacherety/', label: 'Instagram' },
                { icon: Mail, href: 'mailto:hola@brendacherety.com', label: 'Email' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#9ca3af', transition: 'all 0.3s', textDecoration: 'none'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(236,72,153,0.2)'; e.currentTarget.style.color = '#f9a8d4'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#9ca3af'; }}
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h4 style={{ fontWeight: 500, fontSize: '0.9rem', color: '#e5e7eb', marginBottom: 16 }}>Plataforma</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/cursos', label: 'Cursos' },
                { to: '/recetas', label: 'Recetas' },
                { to: '/herramientas', label: 'Herramientas' },
                { to: '/blog', label: 'Blog' },
                { to: '/sobre-mi', label: 'Sobre Mí' },
                { to: '/faq', label: 'Preguntas Frecuentes' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mi Cuenta */}
          <div>
            <h4 style={{ fontWeight: 500, fontSize: '0.9rem', color: '#e5e7eb', marginBottom: 16 }}>Mi Cuenta</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/registro', label: 'Crear Cuenta' },
                { to: '/login', label: 'Iniciar Sesión' },
                { to: '/mis-cursos', label: 'Mis Cursos' },
                { to: '/perfil', label: 'Mi Perfil' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: 500, fontSize: '0.9rem', color: '#e5e7eb', marginBottom: 16 }}>Contacto</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { to: '/consulta', label: 'Consulta Privada' },
                { to: '/contacto', label: 'Contáctame' },
                { to: '/faq', label: 'Soporte' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
                    onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="mailto:hola@brendacherety.com" style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                >
                  hola@brendacherety.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#4b5563', fontSize: '0.82rem', fontWeight: 300, display: 'flex', alignItems: 'center', gap: 6 }}>
            © 2026 Nutrióloga Brenda Cherety. Hecho con <Heart size={13} color="#ec4899" fill="#ec4899" /> Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ to: '/faq', label: 'Términos' }, { to: '/faq', label: 'Privacidad' }].map((l, i) => (
              <Link key={i} to={l.to} style={{ color: '#4b5563', fontSize: '0.78rem', fontWeight: 300, textDecoration: 'none' }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 580px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
