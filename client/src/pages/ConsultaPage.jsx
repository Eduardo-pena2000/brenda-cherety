import { useState } from 'react';
import { CreditCard, MessageCircle, Clock, ArrowLeft, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

export default function ConsultaPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [buyingType, setBuyingType] = useState(null);

  const whatsappNumber = "528281056153"; 
  const videoMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la video consulta");
  const presencialMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la consulta presencial");

  const handleBuy = async (type) => {
    if (!user) return navigate('/login');
    setBuyingType(type);
    try {
      const data = await apiFetch('/payments/create-consultation-checkout', {
        method: 'POST',
        body: JSON.stringify({ type })
      });
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    } finally {
      setBuyingType(null);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)',
      padding: '3rem 1.5rem 4rem',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 'calc(100vh - 460px)'
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
                <ClipboardList size={16} /> Consulta Online y Presencial
              </div>

              <h1 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#fff',
                lineHeight: 1.2, marginBottom: 16
              }}>
                Consulta <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary)' }}>personalizada</span>
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 300,
                lineHeight: 1.7, marginBottom: 24, maxWidth: 600
              }}>
                En la consulta trabajaremos tus objetivos físicos o de salud de manera personalizada.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
                {[
                  { icon: Clock, label: '60 minutos' },
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
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
                gap: 28,
                width: '100%',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: 20
              }}>
                {[
                  {
                    type: 'online',
                    title: 'Consulta por video llamada',
                    price: '$700.00 MXN',
                    whatsappHref: `https://wa.me/${whatsappNumber}?text=${videoMsg}`,
                  },
                  {
                    type: 'presencial',
                    title: 'Consulta presencial',
                    price: '$800.00 MXN',
                    whatsappHref: `https://wa.me/${whatsappNumber}?text=${presencialMsg}`,
                  },
                ].map((option) => (
                  <div key={option.type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)', fontWeight: 400, color: '#fff', margin: 0 }}>
                        {option.title}
                      </h2>
                      <div style={{
                        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--primary)'
                      }}>
                        {option.price}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, width: '100%' }}>
                      <a
                        href={option.whatsappHref}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          padding: '14px 28px', width: '100%', maxWidth: 260, background: '#25D366',
                          color: '#fff', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                          textDecoration: 'none', transition: 'transform 0.3s',
                          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)'
                        }}
                      >
                        <MessageCircle size={20} /> Agendar en WhatsApp
                      </a>

                      {user?.role === 'admin' ? (
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          padding: '14px 28px', width: '100%', maxWidth: 260,
                          background: '#f3f4f6', color: '#4b5563', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                        }}>
                          Eres el administrador
                        </div>
                      ) : (
                        <button onClick={() => handleBuy(option.type)} disabled={buyingType !== null} style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          padding: '14px 28px', width: '100%', maxWidth: 260,
                          background: buyingType !== null
                            ? '#9ca3af'
                            : 'linear-gradient(135deg, var(--primary-deep), var(--primary-deep))',
                          color: '#fff', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                          border: 'none', cursor: buyingType !== null ? 'not-allowed' : 'pointer',
                          boxShadow: '0 10px 30px -8px rgba(236,72,153,0.4)',
                          transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
                        }}>
                          <CreditCard size={20} />
                          {buyingType === option.type ? 'Procesando...' : 'Pagar Consulta'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
