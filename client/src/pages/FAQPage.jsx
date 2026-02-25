import { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, CreditCard, Award, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: BookOpen, title: 'Sobre los Cursos', color: '#ec4899', bg: '#fce7f3',
    faqs: [
      { q: '¿Por cuánto tiempo tengo acceso a los cursos?', a: 'Una vez que adquieres un curso, tienes acceso de por vida. Puedes verlo a tu propio ritmo, cuando quieras y cuantas veces lo necesites.' },
      { q: '¿Puedo ver los cursos desde mi celular?', a: 'Sí, nuestra plataforma está completamente optimizada para dispositivos móviles. Puedes acceder desde cualquier dispositivo con conexión a internet.' },
      { q: '¿Los cursos tienen fecha de inicio o fin?', a: 'No, todos nuestros cursos son bajo demanda. No hay fecha límite ni horarios fijos. Puedes empezar cuando quieras.' },
      { q: '¿Cuántas lecciones tienen los cursos?', a: 'Depende del programa. Cada curso incluye entre 8 y 30 lecciones en video, además de materiales descargables y guías prácticas.' },
    ]
  },
  {
    icon: CreditCard, title: 'Pagos y Precios', color: '#8b5cf6', bg: '#ede9fe',
    faqs: [
      { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, American Express) a través de Stripe, nuestra plataforma de pagos segura.' },
      { q: '¿Hay plan de pagos o mensualidades?', a: 'Actualmente todos los cursos se pagan en una sola exhibición. Estamos trabajando en opciones de financiamiento que pronto estarán disponibles.' },
      { q: '¿Puedo pedir reembolso?', a: 'Ofrecemos garantía de satisfacción de 7 días. Si por cualquier razón no estás satisfecha con el curso, te devolvemos tu dinero sin preguntas.' },
      { q: '¿Los precios incluyen IVA?', a: 'Sí, todos los precios mostrados en la plataforma ya incluyen impuestos aplicables según tu país de residencia.' },
    ]
  },
  {
    icon: Award, title: 'Certificados', color: '#10b981', bg: '#d1fae5',
    faqs: [
      { q: '¿Recibo un certificado al terminar?', a: 'Sí, al completar el 100% de las lecciones de cualquier curso recibes un certificado digital firmado por Brenda Cherety que puedes compartir en LinkedIn.' },
      { q: '¿Los certificados tienen validez oficial?', a: 'Los certificados son de reconocimiento profesional. Son emitidos por nuestra plataforma y avalan tu formación en nutrición consciente.' },
      { q: '¿Cómo descargo mi certificado?', a: 'Una vez completado el curso, el certificado aparecerá automáticamente en tu perfil para descargarlo en PDF de alta calidad.' },
    ]
  },
  {
    icon: Headphones, title: 'Soporte', color: '#f59e0b', bg: '#fef3c7',
    faqs: [
      { q: '¿Cómo contacto al equipo de soporte?', a: 'Puedes escribirnos a hola@brendacherety.com o por WhatsApp. Respondemos todos los mensajes en menos de 24 horas hábiles.' },
      { q: '¿Puedo hacer preguntas sobre el contenido del curso?', a: 'Sí, puedes enviar tus preguntas directamente a través del formulario de contacto. Brenda o su equipo te responderán personalmente.' },
      { q: '¿Qué hago si tengo problemas técnicos?', a: 'Escríbenos al correo soporte@brendacherety.com con una descripción del problema y te ayudamos a resolverlo lo antes posible.' },
    ]
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  function toggle(catI, faqI) {
    const key = `${catI}-${faqI}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8,#ffffff,#faf5ff)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#ec4899,#d946ef,#8b5cf6)',
        padding: 'clamp(3rem,6vw,5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <HelpCircle size={32} color="#fff" />
          </div>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 500 }}>Preguntas</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '10px 0 14px' }}>
            Preguntas{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>Frecuentes</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 300 }}>
            Todo lo que necesitas saber sobre nuestros cursos y plataforma
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(2rem,4vw,4rem) 1.5rem 0' }}>
        {categories.map((cat, catI) => (
          <div key={catI} style={{ marginBottom: 40, animation: `fadeInUp 0.4s ease-out ${catI * 0.1}s backwards` }}>
            {/* Category header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <cat.icon size={22} color={cat.color} />
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937' }}>{cat.title}</h2>
            </div>

            {/* FAQs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {cat.faqs.map((faq, faqI) => {
                const key = `${catI}-${faqI}`;
                const isOpen = !!openItems[key];
                return (
                  <div key={faqI} style={{
                    background: '#fff', borderRadius: 16,
                    boxShadow: isOpen ? '0 8px 30px -8px rgba(0,0,0,0.1)' : '0 2px 10px -2px rgba(0,0,0,0.05)',
                    border: `1px solid ${isOpen ? cat.bg : 'transparent'}`,
                    transition: 'all 0.3s', overflow: 'hidden'
                  }}>
                    <button
                      onClick={() => toggle(catI, faqI)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer',
                        textAlign: 'left', gap: 12
                      }}
                    >
                      <span style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.95rem', lineHeight: 1.4 }}>{faq.q}</span>
                      <ChevronDown size={20} color={cat.color} style={{ flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 22px 20px', borderTop: `1px solid ${cat.bg}` }}>
                        <p style={{ color: '#6b7280', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.8, paddingTop: 14 }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div style={{
          background: 'linear-gradient(135deg,#fce7f3,#faf5ff)',
          borderRadius: 24, padding: 'clamp(24px,4vw,40px)',
          textAlign: 'center', border: '1px solid rgba(236,72,153,0.1)'
        }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 400, color: '#1f2937', marginBottom: 10 }}>
            ¿No encontraste tu respuesta?
          </h3>
          <p style={{ color: '#6b7280', fontWeight: 300, marginBottom: 24 }}>
            Escríbeme directamente y te respondo personalmente.
          </p>
          <Link to="/contacto" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 30px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
            color: '#fff', borderRadius: 12, fontSize: '0.95rem', fontWeight: 500,
            textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)'
          }}>
            Contactar a Brenda
          </Link>
        </div>
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
