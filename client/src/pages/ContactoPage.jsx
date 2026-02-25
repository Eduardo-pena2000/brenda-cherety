import { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Send, CheckCircle, MessageCircle } from 'lucide-react';

export default function ContactoPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200)); // Simular envío
    setSent(true);
    setSending(false);
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px',
    background: focused === field ? '#fff' : '#f9fafb',
    border: `2px solid ${focused === field ? '#ec4899' : '#e5e7eb'}`,
    borderRadius: 14, fontSize: '0.95rem',
    fontFamily: "'Outfit',sans-serif", color: '#1f2937',
    outline: 'none', transition: 'all 0.3s',
    boxShadow: focused === field ? '0 0 0 4px rgba(236,72,153,0.1)' : 'none'
  });

  const labelStyle = { display: 'block', marginBottom: 8, fontWeight: 500, color: '#374151', fontSize: '0.9rem' };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hola@brendacherety.com', link: 'mailto:hola@brendacherety.com' },
    { icon: Phone, label: 'WhatsApp', value: '+52 55 1234 5678', link: 'https://wa.me/5215512345678' },
    { icon: Facebook, label: 'Facebook', value: 'Nutrióloga Cherety', link: 'https://www.facebook.com/Nutriologacherety?locale=es_LA' },
    { icon: MapPin, label: 'Ubicación', value: 'Ciudad de México, México', link: null },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8,#ffffff,#faf5ff)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#1f2937,#111827)',
        padding: 'clamp(3rem,6vw,5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 50%, rgba(236,72,153,0.12), transparent 50%)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 500 }}>Contáctame</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '12px 0 16px' }}>
            Estoy aquí para{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>ayudarte</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', fontWeight: 300 }}>
            ¿Tienes dudas sobre mis cursos? ¿Quieres una consulta personalizada? Escríbeme.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', marginTop: 'clamp(2rem,4vw,3rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32, alignItems: 'start' }} className="contact-grid">
          {/* Left: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 4px 20px -4px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937', marginBottom: 6 }}>Información de contacto</h2>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
                Respondo todos los mensajes personalmente. Normalmente contesto en menos de 24 horas.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {contactInfo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: 'linear-gradient(135deg,#fce7f3,#faf5ff)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <item.icon size={20} color="#ec4899" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 400 }}>{item.label}</p>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#1f2937', fontWeight: 450, fontSize: '0.92rem', textDecoration: 'none' }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: '#1f2937', fontWeight: 450, fontSize: '0.92rem' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/5215512345678" target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '16px 24px', background: 'linear-gradient(135deg,#25d366,#128c7e)',
              color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
              textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(37,211,102,0.4)',
              transition: 'transform 0.2s'
            }}>
              <MessageCircle size={20} fill="currentColor" /> Escríbeme en WhatsApp
            </a>
          </div>

          {/* Right: Form */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(24px,4vw,40px)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.07)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', animation: 'popIn 0.4s ease-out'
                }}>
                  <CheckCircle size={36} color="#059669" />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 400, color: '#1f2937', marginBottom: 10 }}>¡Mensaje enviado!</h3>
                <p style={{ color: '#6b7280', fontWeight: 300, lineHeight: 1.7 }}>
                  Gracias por escribirme. Te responderé a la brevedad posible. 💕
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} style={{
                  marginTop: 24, padding: '12px 28px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
                  color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer',
                  fontSize: '0.9rem', fontWeight: 500, fontFamily: "'Outfit',sans-serif"
                }}>
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#1f2937', marginBottom: 4 }}>Envíame un mensaje</h2>
                <p style={{ color: '#9ca3af', fontSize: '0.88rem', fontWeight: 300, marginBottom: 28 }}>Todos los campos son opcionales excepto email y mensaje</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Tu nombre</label>
                      <input name="name" value={form.name} onChange={handleChange}
                        placeholder="María García"
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                        style={inputStyle('name')} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="maria@email.com"
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                        style={inputStyle('email')} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Asunto</label>
                    <input name="subject" value={form.subject} onChange={handleChange}
                      placeholder="¿Sobre qué te gustaría hablar?"
                      onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)}
                      style={inputStyle('subject')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Mensaje *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Cuéntame en qué puedo ayudarte..."
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }} />
                  </div>
                  <button type="submit" disabled={sending} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '15px 32px', background: sending ? '#9ca3af' : 'linear-gradient(135deg,#ec4899,#d946ef)',
                    color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
                    border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)',
                    transition: 'all 0.3s', fontFamily: "'Outfit',sans-serif"
                  }}>
                    {sending ? (
                      <><div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Enviando...</>
                    ) : (
                      <><Send size={17} /> Enviar Mensaje</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
