import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MessageCircle, CreditCard } from 'lucide-react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Phone number for WhatsApp
  const whatsappNumber = "528281056153"; 

  const presencialMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la consulta presencial");
  const videoMsg = encodeURIComponent("¡Hola! Quisiera más información sobre la video consulta");

  // Floating Particles Component
  const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            background: `radial-gradient(circle, rgba(244,114,182,${Math.random() * 0.4 + 0.1}) 0%, transparent 70%)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
    </div>
  );

  // Decorative Lines Component
  const DecorativeLines = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-dark)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--primary-dark)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0,100 Q400,50 800,150 T1600,100" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="animate-draw-line" />
      <path d="M0,200 Q300,150 600,250 T1200,200" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: '0.5s' }} />
      <path d="M0,300 Q500,250 1000,350 T2000,300" fill="none" stroke="url(#lineGradient)" strokeWidth="1" className="animate-draw-line" style={{ animationDelay: '1s' }} />
    </svg>
  );

  return (
    <>
      <FloatingParticles />
      <DecorativeLines />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-blobs">
          <div className="blob hero-blob-1" />
          <div className="blob hero-blob-2" />
          <div className="blob hero-blob-3" />
        </div>

        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className={`hero-content transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="hero-badge">
                <span className="status-dot animate-pulse" />
                <span>Nuevo curso disponible</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Te ayudo a lograr tus{' '}
                <span className="font-serif text-pink italic">objetivos físicos</span> y de{' '}
                <span className="font-serif text-pink italic">salud</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button onClick={() => navigate('/cursos')} className="btn btn-primary btn-lg">
                  Explorar Cursos <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="hero-image-wrapper" style={{ position: 'relative' }}>
              <div className="hero-main-img-container" style={{ width: '100%', height: '100%', minHeight: '500px' }}>
                <img
                  src="/hero-doc.jpg"
                  alt="Brenda Cherety - Nutrióloga"
                  className="hero-main-img"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="hero-overlay" />
              </div>

              {/* Floating Cards */}
              <div className="hero-floating-card" style={{ position: 'absolute', bottom: '2rem', left: '-2rem', flexDirection: 'column', alignItems: 'flex-start', padding: '1rem', gap: '0.5rem', width: '260px', zIndex: 20 }}>
                <div style={{ width: '100%', height: '120px', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '0.5rem', background: '#f3f4f6' }}>
                  <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80" alt="Etiquetas nutricionales" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p className="font-medium text-gray-800" style={{ lineHeight: '1.2', fontSize: '0.95rem' }}>Lectura de etiquetas nutricionales</p>
                <p className="text-pink font-semibold" style={{ fontSize: '1.1rem' }}>$320.00</p>
                <button onClick={() => navigate('/cursos')} className="btn btn-primary btn-sm w-full mt-1" style={{ padding: '0.5rem' }}>
                  Iniciar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONSULTATION SECTION ===== */}
      <section className="section" style={{ minHeight: '600px', background: '#fff', position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2, marginBottom: 16 }}>
            ¿Prefieres atención{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary-deep)' }}>1 a 1</span>?
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 48 }}>
            Agenda una consulta privada conmigo para tener un plan altamente personalizado a tus necesidades
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
            
            {/* Consulta Presencial */}
            <div style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)', border: '1px solid var(--primary-light)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Consulta Presencial</h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Atención personalizada en mi consultorio para una evaluación física completa y plan a medida.
              </p>
              
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
              <h3 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Video Consulta</h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Consulta por videollamada desde la comodidad de tu hogar, sin importar donde estés.
              </p>
              
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
        </div>
      </section>

    </>
  );
}
