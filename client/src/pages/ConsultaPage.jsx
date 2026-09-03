import { CreditCard, MessageCircle, Star, Calendar } from 'lucide-react';

export default function ConsultaPage() {
  const whatsappNumber = "528281056153"; // Mismo número que configuramos antes
  const presencialMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la consulta presencial");
  const videoMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la video consulta");

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '5rem' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: 'clamp(3rem,6vw,5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(236,72,153,0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.1), transparent 45%)' }} />
        
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: 20, textAlign: 'center' }}>
            Agenda una consulta privada conmigo para tener un plan altamente personalizado a tus necesidades.
          </h1>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2rem', marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', fontWeight: 500, marginBottom: 16 }}>
              Algunos objetivos en los que te puedo ayudar:
            </h3>
            <ul style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.8, margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Perdida de grasa corporal</li>
              <li>Aumento de masa muscular</li>
              <li>Recomposición corporal</li>
              <li>Control de diabetes, hipertensión, colesterol, triglicéridos, ácido úrico.</li>
              <li>Control de SOMP y resistencia a la insulina</li>
              <li>Nutrición preconcepcional y durante el embarazo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '16px 1.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#059669', fontSize: '0.95rem', fontWeight: 500 }}>
            <Calendar size={18} /> Próxima cita disponible: esta semana
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(3rem,4vw,4rem) 1.5rem' }}>
        {/* Packages */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: '#1f2937', marginBottom: 8 }}>
            Elige tu{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary-deep)' }}>consulta</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          
          {/* Consulta Presencial */}
          <div style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)', border: '1px solid var(--primary-light)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '2rem' }}>Consulta Presencial</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${presencialMsg}`}
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 24px', background: '#25D366',
                  color: '#fff', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 500,
                  textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={20} /> Agendar en WhatsApp
              </a>
              
              <button style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 24px', background: '#fff',
                color: 'var(--primary-deep)', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 500,
                border: '1px solid var(--primary-deep)', cursor: 'pointer', transition: 'background 0.3s'
              }}>
                <CreditCard size={20} /> Pagar ($800 MXN)
              </button>
            </div>
          </div>

          {/* Video Consulta */}
          <div style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)', border: '1px solid var(--accent-light)' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '2rem' }}>Consulta por video llamada en whatsapp</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${videoMsg}`}
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px 24px', background: '#25D366',
                  color: '#fff', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 500,
                  textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                }}
              >
                <MessageCircle size={20} /> Agendar en WhatsApp
              </a>
              
              <button style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 24px', background: '#fff',
                color: 'var(--primary-dark)', borderRadius: '0.75rem', fontSize: '1rem', fontWeight: 500,
                border: '1px solid var(--primary-dark)', cursor: 'pointer', transition: 'background 0.3s'
              }}>
                <CreditCard size={20} /> Pagar ($700 MXN)
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#1f2937', marginBottom: '2rem' }}>Opiniones en Google Maps</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            {[
              {
                name: "Daniela Garcia",
                time: "Hace 4 meses",
                text: "Excelente nutriologa!! Siempre adapto todos mis antojos y comidas favoritas para que se acoplaran en mi plan, ademas de ser muy comprensiva y flexible❤️",
              },
              {
                name: "Mayra De La Rosa",
                time: "Hace 10 meses",
                text: "Súper recomendable, la Nutrióloga es muy amable, muy accesible, si no bajas de peso no es por ella, es porque no llevaste bien tu plan de alimentación 😁",
              },
              {
                name: "EMILIO V",
                time: "Hace 10 meses",
                text: "Es una excelente Dra. En Nutrición ofrece un plan de alimentación personalizado, basado en tus hábitos alimenticios, estilo de vida y estado de salud 10/10",
              }
            ].map((review, i) => (
              <div key={i} style={{ background: '#fff', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-deep)', fontWeight: 600 }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2937', lineHeight: 1 }}>{review.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 2 }}>{review.time}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: '0.5rem' }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />)}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '2.5rem' }}>
            <a href="https://maps.google.com/?q=Nutriologa+Cherety" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', padding: '10px 20px', borderRadius: '8px', background: '#f3f4f6', color: '#4b5563', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500, transition: 'background 0.3s' }}>
              Ver todas las opiniones en Google Maps
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
