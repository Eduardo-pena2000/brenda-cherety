import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, CheckCircle, Clock, MessageCircle, Star, ArrowRight, CalendarDays, Shield, Sparkles, AlertCircle, Send } from 'lucide-react';

const packages = [
  {
    id: 'individual',
    icon: Video,
    name: 'Consulta Individual',
    price: '$800',
    period: 'por sesión',
    duration: '60 minutos',
    popular: false,
    color: '#6b7280',
    gradient: 'linear-gradient(135deg,#f9fafb,#f3f4f6)',
    border: '#e5e7eb',
    includes: [
      'Evaluación nutricional completa',
      'Plan alimenticio personalizado',
      'Grabación de la sesión',
      'Seguimiento por WhatsApp 7 días',
    ],
  },
  {
    id: 'programa',
    icon: Sparkles,
    name: 'Programa Completo',
    price: '$2,800',
    period: '4 sesiones',
    duration: '3 meses de acompañamiento',
    popular: true,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg,#fdf2f8,#faf5ff)',
    border: '#fce7f3',
    includes: [
      'Todo de consulta individual (×4)',
      'Plan de alimentación mes a mes',
      'Guía de compras y etiquetado',
      'Recetario personalizado',
      'Seguimiento semanal por WhatsApp',
      'Acceso a un curso online incluido',
    ],
  },
  {
    id: 'intensivo',
    icon: Star,
    name: 'Intensivo VIP',
    price: '$4,500',
    period: '3 meses',
    duration: 'Acompañamiento ilimitado',
    popular: false,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg,#faf5ff,#ede9fe)',
    border: '#e9d5ff',
    includes: [
      'Sesiones ilimitadas (hasta 2/mes)',
      'Chat directo con Brenda (lunes-viernes)',
      'Plan completo y ajustes semanales',
      'Análisis de exámenes de laboratorio',
      'Todos los cursos online incluidos',
      'Soporte de emergencia 48 hrs',
    ],
  },
];

const faqs = [
  { q: '¿Cómo son las sesiones?', a: 'Las sesiones se realizan vía videollamada (Zoom o Google Meet). Recibirás el link de acceso 24 horas antes de la cita.' },
  { q: '¿En cuánto tiempo veré resultados?', a: 'Depende de tus objetivos y constancia. La mayoría de mis pacientes notan cambios en energía y bienestar desde la primera semana.' },
  { q: '¿Qué necesito para la primera consulta?', a: 'Solo necesitas tus últimos análisis de sangre (si los tienes), una lista de lo que comes regularmente y ganas de cambiar. Yo me encargo del resto.' },
  { q: '¿Puedo cambiar o cancelar mi cita?', a: 'Sí, puedes reprogramar hasta 24 horas antes sin costo. Cancelaciones con menos de 24 horas tienen un cargo del 50%.' },
  { q: '¿Aceptan pacientes fuera de México?', a: 'Sí, atiendo pacientes de toda Latinoamérica y España. Las sesiones son 100% online.' },
];

export default function ConsultaPage() {
  const [selectedPackage, setSelectedPackage] = useState('programa');
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setSending(false);
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px',
    background: focused === field ? '#fff' : '#f9fafb',
    border: `2px solid ${focused === field ? '#ec4899' : '#e5e7eb'}`,
    borderRadius: 12, fontSize: '0.92rem', fontFamily: "'Outfit',sans-serif",
    color: '#1f2937', outline: 'none', transition: 'all 0.3s',
    boxSizing: 'border-box',
    boxShadow: focused === field ? '0 0 0 4px rgba(236,72,153,0.1)' : 'none',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: 'clamp(3rem,6vw,5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(236,72,153,0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.1), transparent 45%)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', letterSpacing: '0.15em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16, background: 'rgba(249,168,212,0.1)', padding: '5px 14px', borderRadius: 50 }}>
            <Video size={13} /> Consulta Privada Online
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Trabaja{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>conmigo</span>
            {' '}de forma personalizada
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>
            Atención 1 a 1 con Brenda. Diseñamos juntas un plan de nutrición 100% adaptado a tu estilo de vida, objetivos y historia clínica.
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ icon: Video, text: '100% Online' }, { icon: Shield, text: 'Garantía 30 días' }, { icon: CalendarDays, text: 'Horarios flexibles' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                <item.icon size={16} color="#f9a8d4" /> {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '14px 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 3 }}>{[...Array(5)].map((_, i) => <Star key={i} size={16} color="#fbbf24" fill="#fbbf24" />)}</div>
          <span style={{ color: '#374151', fontSize: '0.9rem', fontWeight: 500 }}>4.9 / 5</span>
          <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>·</span>
          <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 300 }}>Más de 200 pacientes atendidas</span>
          <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>·</span>
          <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 300 }}>Próxima cita disponible: esta semana</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem' }}>
        {/* Packages */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: '#1f2937', marginBottom: 8 }}>
            Elige tu{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>programa</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: 300 }}>Todos los precios en pesos mexicanos (MXN). Pagos en línea seguros.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 24, marginBottom: 56 }}>
          {packages.map(pkg => (
            <div key={pkg.id} onClick={() => setSelectedPackage(pkg.id)} style={{
              background: pkg.gradient, border: `2px solid ${selectedPackage === pkg.id ? pkg.color : pkg.border}`,
              borderRadius: 24, padding: 28, cursor: 'pointer', transition: 'all 0.3s', position: 'relative',
              boxShadow: selectedPackage === pkg.id ? `0 12px 40px -8px ${pkg.color}30` : '0 4px 15px -4px rgba(0,0,0,0.06)',
              transform: selectedPackage === pkg.id ? 'translateY(-4px)' : 'none',
            }}>
              {pkg.popular && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#ec4899,#d946ef)', color: '#fff', padding: '4px 16px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  ⭐ Más elegido
                </div>
              )}
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${pkg.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <pkg.icon size={22} color={pkg.color} />
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>{pkg.name}</h3>
              <p style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 300, marginBottom: 16 }}>{pkg.duration}</p>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: '2rem', fontWeight: 300, color: pkg.color }}>{pkg.price}</span>
                <span style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 300 }}> {pkg.period}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 20 }}>
                {pkg.includes.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: '#374151', fontWeight: 300 }}>
                    <CheckCircle size={14} color={pkg.color} style={{ flexShrink: 0, marginTop: 2 }} /> {item}
                  </li>
                ))}
              </ul>
              {selectedPackage === pkg.id && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: pkg.color, fontWeight: 600 }}>
                  <CheckCircle size={14} /> Seleccionado — completa el formulario abajo
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form + FAQ side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }} className="consulta-layout">
          {/* Form */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(1.5rem,3vw,2.5rem)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.07)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937', marginBottom: 6 }}>Agenda tu consulta</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 300, marginBottom: 24 }}>
              Paquete seleccionado: <strong style={{ color: '#ec4899' }}>{packages.find(p => p.id === selectedPackage)?.name}</strong>
            </p>
            {sent ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '3rem 1rem', textAlign: 'center' }}>
                <div style={{ width: 70, height: 70, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <CheckCircle size={32} color="#059669" />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1f2937' }}>¡Solicitud enviada!</h4>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7 }}>
                  Te contactaré en las próximas 24 horas para confirmar tu cita y enviarte los detalles de pago.
                </p>
                <Link to="/contacto" style={{ color: '#ec4899', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                  ¿Tienes dudas? Contáctame <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { key: 'name', label: 'Nombre completo', type: 'text', ph: 'Tu nombre' },
                  { key: 'email', label: 'Email', type: 'email', ph: 'tu@email.com' },
                  { key: 'phone', label: 'WhatsApp (opcional)', type: 'tel', ph: '+52 55 1234 5678' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>{field.label}</label>
                    <input type={field.type} value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      placeholder={field.ph} required={field.key !== 'phone'}
                      onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)}
                      style={inputStyle(field.key)} />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>Tu objetivo principal</label>
                  <select value={form.goal} onChange={e => setForm(f => ({ ...f, goal: e.target.value }))} required
                    onFocus={() => setFocused('goal')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('goal'), cursor: 'pointer' }}>
                    <option value="">Selecciona una opción</option>
                    <option>Perder peso de forma sostenible</option>
                    <option>Ganar masa muscular</option>
                    <option>Mejorar mi energía y digestión</option>
                    <option>Alimentación para embarazo/lactancia</option>
                    <option>Control de diabetes o condición médica</option>
                    <option>Mejorar mi relación con la comida</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>Cuéntame más sobre ti (opcional)</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="¿Cuánto tiempo llevas con este objetivo? ¿Has intentado algo antes?"
                    rows={4} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('message'), resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={sending} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px', background: sending ? '#9ca3af' : 'linear-gradient(135deg,#ec4899,#d946ef)',
                  color: '#fff', borderRadius: 12, fontSize: '0.95rem', fontWeight: 500,
                  border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)', fontFamily: "'Outfit',sans-serif",
                  transition: 'all 0.3s',
                }}>
                  {sending ? (
                    <><div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Enviando...</>
                  ) : (
                    <><Send size={16} /> Solicitar consulta</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937', marginBottom: 20 }}>Preguntas frecuentes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, border: '1px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif", textAlign: 'left' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#1f2937' }}>{faq.q}</span>
                    <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none', color: '#ec4899', fontSize: '1.2rem', fontWeight: 300 }}>+</div>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 18px 16px', borderTop: '1px solid #f9fafb' }}>
                      <p style={{ color: '#6b7280', fontSize: '0.87rem', fontWeight: 300, lineHeight: 1.7 }}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div style={{ marginTop: 24, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={20} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: '0.88rem', fontWeight: 500, color: '#166534' }}>¿Prefieres hablar primero?</p>
                <a href="https://wa.me/521234567890" target="_blank" rel="noreferrer" style={{ fontSize: '0.83rem', color: '#22c55e', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  Escríbeme por WhatsApp <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width: 768px) { .consulta-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
