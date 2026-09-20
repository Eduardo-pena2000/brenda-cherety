import { useState } from 'react';
import { CreditCard, MessageCircle, Star, Calendar, Clock, CheckCircle, ArrowRight, ArrowLeft, Video, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

export default function ConsultaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [buying, setBuying] = useState(false);

  const whatsappNumber = "528281056153"; 
  const videoMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la video consulta");
  const presencialMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la consulta presencial");

  const handleBuy = async () => {
    if (!user) return navigate('/login');
    setBuying(true);
    try {
      const data = await apiFetch('/payments/create-consultation-checkout', {
        method: 'POST',
        body: JSON.stringify({ type: 'online' })
      });
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setBuying(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-50), #ffffff, var(--accent-50))',
      paddingBottom: '5rem'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)',
        padding: '3rem 1.5rem 4rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(236,72,153,0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.1), transparent 50%)'
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Back button */}
          <button onClick={() => navigate('/')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300,
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: 32, transition: 'color 0.3s', fontFamily: "'Outfit', sans-serif"
          }}>
            <ArrowLeft size={18} /> Volver al inicio
          </button>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr',
            gap: '2.5rem', alignItems: 'center'
          }}
            className="course-detail-grid"
          >
            {/* Image */}
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)',
              position: 'relative', maxHeight: 450
            }}>
              <img src="/hero-doc.jpg" alt="Consulta en línea" style={{
                width: '100%', height: '100%', objectFit: 'cover',
                minHeight: 300, maxHeight: 450, objectPosition: 'top'
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)'
              }} />
            </div>

            {/* Info */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(236,72,153,0.15)', color: '#f9a8d4', padding: '6px 12px', borderRadius: 9999, fontSize: '0.85rem', fontWeight: 500, marginBottom: 16 }}>
                <Video size={16} /> Consulta Online
              </div>

              <h1 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#fff',
                lineHeight: 1.2, marginBottom: 16
              }}>
                Consulta por <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary)' }}>Video Llamada</span>
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 300,
                lineHeight: 1.7, marginBottom: 24, maxWidth: 600
              }}>
                Agenda una sesión privada conmigo. Tendrás una evaluación completa y un plan de alimentación altamente personalizado adaptado a tu estilo de vida y objetivos.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
                {[
                  { icon: Clock, label: '45 minutos' },
                  { icon: ClipboardList, label: 'Plan Personalizado' },
                  { icon: MessageCircle, label: 'Seguimiento por WhatsApp' },
                ].map((item, i) => (
                  <span key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300
                  }}>
                    <item.icon size={16} color="var(--primary)" /> {item.label}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--primary)'
                  }}>
                    $700.00 MXN
                  </div>
                  
                  {user?.role === 'admin' ? (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      padding: '16px 36px',
                      background: '#f3f4f6', color: '#4b5563', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                    }}>
                      Eres el administrador
                    </div>
                  ) : (
                    <button onClick={handleBuy} disabled={buying} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      padding: '16px 36px',
                      background: buying
                        ? '#9ca3af'
                        : 'linear-gradient(135deg, var(--primary-deep), var(--primary-deep))',
                      color: '#fff', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                      border: 'none', cursor: buying ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 30px -8px rgba(236,72,153,0.4)',
                      transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
                    }}>
                      <CreditCard size={20} />
                      {buying ? 'Procesando...' : 'Pagar Consulta'}
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>o si prefieres:</span>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${videoMsg}`}
                    target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 20px', background: '#25D366',
                      color: '#fff', borderRadius: 10, fontSize: '0.95rem', fontWeight: 500,
                      textDecoration: 'none', transition: 'transform 0.3s',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                    }}
                  >
                    <MessageCircle size={18} /> Agendar en WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Como Funciona Section */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--primary-light), var(--accent-50))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <ClipboardList size={22} color="var(--primary-deep)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#1f2937' }}>
              ¿Qué incluye tu consulta?
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300 }}>
              Pasos hacia tu nueva versión
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 800 }}>
          {[
            { title: "Evaluación Nutricional", desc: "Analizaremos tus hábitos actuales, historial clínico, medidas corporales y estilo de vida." },
            { title: "Plan de Alimentación 100% Personalizado", desc: "No hay dietas genéricas. Recibirás un menú adaptado a tus gustos, presupuesto y tiempos." },
            { title: "Recomendación de Suplementación", desc: "Solo si es necesario, te recomendaré los suplementos exactos que tu cuerpo necesita." },
            { title: "Seguimiento por WhatsApp", desc: "Tendrás contacto directo conmigo para resolver dudas durante todo tu proceso." }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16,
              padding: '20px 24px',
              background: '#fff', borderRadius: 16,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg, var(--primary-light), var(--accent-50))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary-deep)', fontSize: '0.9rem', fontWeight: 600
              }}>
                {index + 1}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#1f2937', marginBottom: 4 }}>{item.title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative */}
      <div style={{ maxWidth: 800, margin: '4rem auto 0', padding: '0 1.5rem', textAlign: 'center' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: 20, border: '1px solid #f3f4f6', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#1f2937', marginBottom: '1rem', fontWeight: 400 }}>¿Buscas Consulta Presencial?</h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>También ofrezco consultas presenciales en mi consultorio por $800 MXN.</p>
          <a 
            href={`https://wa.me/${whatsappNumber}?text=${presencialMsg}`}
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: '#f3f4f6',
              color: '#4b5563', borderRadius: 12, fontSize: '0.95rem', fontWeight: 500,
              textDecoration: 'none', transition: 'background 0.3s'
            }}
          >
            <MessageCircle size={18} /> Agendar Presencial
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .course-detail-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
