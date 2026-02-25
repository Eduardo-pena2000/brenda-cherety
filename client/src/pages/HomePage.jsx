import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ChevronRight, ArrowRight, Star, Heart, Calendar, TrendingUp, Zap, Award, CheckCircle, Gift, Mail } from 'lucide-react';
import CourseCard from '../components/CourseCard';

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [counterStarted, setCounterStarted] = useState(false);
  const counterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(err => console.error(err));
  }, []);

  // Counter animation with IntersectionObserver
  useEffect(() => {
    if (!counterRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counterStarted) {
          setCounterStarted(true);
          const target = 5284;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCounterValue(target);
              clearInterval(timer);
            } else {
              setCounterValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [counterStarted]);

  const featuredCourses = Array.isArray(courses) ? courses.filter(c => c.featured || c.id <= 4).slice(0, 4) : [];

  const blogPosts = [
    {
      title: "5 Desayunos Energéticos para Empezar tu Día",
      excerpt: "Descubre opciones nutritivas y deliciosas que te darán la energía que necesitas cada mañana.",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80",
      date: "12 Feb 2026",
      category: "Recetas"
    },
    {
      title: "¿Qué es la Alimentación Intuitiva?",
      excerpt: "Aprende a escuchar las señales de tu cuerpo y a comer sin culpa ni restricciones.",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&q=80",
      date: "8 Feb 2026",
      category: "Bienestar"
    },
    {
      title: "Smoothie Verde: Mi Receta Favorita",
      excerpt: "La combinación perfecta de nutrientes para comenzar el día con toda la energía.",
      image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&q=80",
      date: "3 Feb 2026",
      category: "Recetas"
    }
  ];

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

  // Animated Blob Component
  const AnimatedBlob = ({ className, color, delay = 0 }) => (
    <div
      className={`absolute rounded-full blur-3xl animate-blob ${className}`}
      style={{
        background: color,
        animationDelay: `${delay}s`
      }}
    />
  );

  // Decorative Lines Component
  const DecorativeLines = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0" />
          <stop offset="50%" stopColor="#f472b6" stopOpacity="0.5" />
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

              <h1>
                Nutre tu cuerpo,<br />
                <span className="font-serif text-pink">transforma</span> tu vida
              </h1>

              <p>
                Descubre un enfoque holístico de la nutrición con cursos diseñados para guiarte hacia tu mejor versión. Aprende a tu ritmo, desde cualquier lugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate('/cursos')} className="btn btn-primary btn-lg">
                  Explorar Cursos <ChevronRight size={20} />
                </button>
                <button className="btn btn-secondary btn-lg">
                  <Play size={20} /> Ver Demo
                </button>
              </div>

              {/* Stats */}
              <div className="flex justify-center sm:justify-start gap-12 mt-28 border-t border-gray-200" style={{ paddingTop: '120px' }}>
                <div className="animate-fade-in text-center" style={{ animationDelay: '0.3s' }}>
                  <p className="text-4xl font-light text-gray-800">5K+</p>
                  <p className="text-sm text-gray-500 mt-2">Pacientes felices</p>
                </div>
                <div className="animate-fade-in text-center" style={{ animationDelay: '0.5s' }}>
                  <p className="text-4xl font-light text-gray-800">12</p>
                  <p className="text-sm text-gray-500 mt-2">Cursos disponibles</p>
                </div>
                <div className="animate-fade-in text-center" style={{ animationDelay: '0.7s' }}>
                  <p className="text-4xl font-light text-gray-800">4.9</p>
                  <p className="text-sm text-gray-500 mt-2">Calificación</p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="hero-image-wrapper">
              <div className="hero-main-img-container">
                <img
                  src="/hero-doc.jpg"
                  alt="Brenda Cherety - Nutrióloga"
                  className="hero-main-img"
                />
                <div className="hero-overlay" />

                {/* Floating Cards */}
                <div className="hero-floating-card card-bottom">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink">
                    <Play size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Alimentación Consciente</p>
                    <p className="text-xs text-gray-500">Curso más popular</p>
                  </div>
                </div>

                <div className="hero-floating-card card-top-right animate-float">
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" fill="currentColor" />
                    <span className="font-medium text-gray-800">4.9 Rating</span>
                  </div>
                </div>

                <div className="hero-floating-card card-bottom-left animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="text-pink" fill="currentColor" />
                    <span className="font-medium text-sm text-gray-600">+5k pacientes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider: hero → valores */}
      <div style={{ lineHeight: 0, background: 'linear-gradient(135deg, var(--primary-50, #fdf2f8), var(--white, #fff), var(--accent-50, #faf5ff))' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9e8f7" />
        </svg>
      </div>

      {/* ===== MIS VALORES / POR QUÉ SOY DIFERENTE ===== */}
      <section className="valores-section">
        <div className="valores-container">
          {[
            { icon: '🧬', text: 'Basado en ciencia' },
            { icon: '🚫', text: 'Sin dietas de moda' },
            { icon: '💚', text: 'Sin culpa' },
            { icon: '⏳', text: 'A tu ritmo' },
          ].map((v, i) => (
            <div key={i} className="valores-item">
              <span className="valores-icon">{v.icon}</span>
              <span className="valores-text">{v.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>
              Simple y efectivo
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2 }}>
              ¿Cómo{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>funciona?</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32, position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 28, left: '15%', right: '15%', height: 2, background: 'linear-gradient(90deg,#fce7f3,#ec4899,#a855f7,#fce7f3)', borderRadius: 9999, display: 'none' }} className="connector-line" />

            {[
              { step: '01', title: 'Explora', desc: 'Navega nuestro catálogo y encuentra el curso que mejor se adapta a tus metas y estilo de vida.', color: '#ec4899', bg: '#fce7f3' },
              { step: '02', title: 'Inscríbete', desc: 'Regístrate y realiza tu pago de forma segura. Acceso inmediato a todo el contenido del curso.', color: '#d946ef', bg: '#fae8ff' },
              { step: '03', title: 'Aprende', desc: 'Estudia a tu ritmo con videos, materiales descargables y guías prácticas. Desde cualquier dispositivo.', color: '#8b5cf6', bg: '#ede9fe' },
              { step: '04', title: 'Transforma', desc: 'Aplica lo aprendido y obtén tu certificado. Únete a una comunidad de mujeres que ya viven mejor.', color: '#06b6d4', bg: '#cffafe' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', animation: `fadeInUp 0.5s ease-out ${i * 0.1}s backwards` }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: `linear-gradient(135deg,${item.bg},#fff)`,
                  border: `2px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, position: 'relative',
                  boxShadow: `0 8px 25px -8px ${item.color}40`
                }}>
                  <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 400, color: item.color, fontSize: '1.1rem' }}>{item.step}</span>
                  <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: item.color, opacity: 0.3 }} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(25px); } to { opacity:1; transform:translateY(0); } } @media (min-width: 900px) { .connector-line { display: block !important; } }`}</style>
      </section>

      {/* ===== VIDEO SECTION ===== */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'linear-gradient(135deg,#fdf2f8,#faf5ff)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>Conóceme</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2 }}>
              Un mensaje de{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>Brenda</span>
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300, marginTop: 12, maxWidth: 520, margin: '12px auto 0' }}>
              Descubre mi historia, mi metodología y por qué cientos de pacientes han transformado su vida.
            </p>
          </div>
          <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 70px -20px rgba(236,72,153,0.25)', cursor: 'pointer', aspectRatio: '16/9' }}
            onClick={() => setVideoPlaying(true)}>
            <img src="/hero-doc.jpg" alt="Video de Brenda" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(236,72,153,0.3),rgba(139,92,246,0.3))' }} />
            {!videoPlaying ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 40px rgba(0,0,0,0.2)', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <Play size={32} color="#ec4899" fill="#ec4899" style={{ marginLeft: 4 }} />
                </div>
                <span style={{ color: '#fff', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.05em', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Ver presentación</span>
              </div>
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 300, textAlign: 'center', padding: '0 2rem' }}>
                  Aquí irá el video de Brenda.<br />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginTop: 8 }}>Reemplaza este bloque con el iframe de YouTube o Vimeo.</span>
                </p>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: 10, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ec4899', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#1f2937' }}>Nutrióloga Brenda Cherety</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem,4vw,4rem)', marginTop: 40, flexWrap: 'wrap' }}>
            {[
              { num: '10+', label: 'Años de experiencia' },
              { num: '5,000+', label: 'Pacientes atendidas' },
              { num: '100%', label: 'Basado en ciencia' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 300, color: '#ec4899', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 300, marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider: video → cursos */}
      <div style={{ lineHeight: 0, background: 'linear-gradient(135deg, #fdf2f8, #faf5ff)' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,60 960,0 1440,40 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Featured Courses Section */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Aprende a tu ritmo</span>
            <h2 className="section-title">
              Cursos <span className="font-serif text-pink">destacados</span>
            </h2>
            <p className="section-desc">
              Programas diseñados con amor para guiarte hacia una relación más sana con la alimentación
            </p>
          </div>

          <div className="courses-grid">
            {featuredCourses.length > 0 ? (
              featuredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} delay={index * 100} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">Cargando cursos destacados...</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/cursos" className="btn btn-link inline-flex items-center gap-2 group">
              Ver todos los cursos <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BANNER DE CONSULTA PRIVADA ===== */}
      <section className="consulta-banner-section">
        <div className="consulta-banner-container">
          <div className="consulta-banner-image">
            <img src="/hero-doc.jpg" alt="Brenda Cherety - Consulta privada" />
            <div className="consulta-banner-overlay" />
          </div>
          <div className="consulta-banner-content">
            <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 12 }}>Atención personalizada</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2, marginBottom: 12 }}>
              ¿Prefieres atención{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>1 a 1</span>?
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 8 }}>
              Agenda una consulta privada conmigo. Plan nutricional personalizado, seguimiento continuo y resultados garantizados.
            </p>
            <p style={{ fontSize: '1.8rem', fontWeight: 300, color: '#ec4899', marginBottom: 20 }}>
              $1,200 <span style={{ fontSize: '0.85rem', color: '#9ca3af', fontWeight: 300 }}>MXN / sesión</span>
            </p>
            <Link to="/consulta" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
              color: '#fff', borderRadius: 50, fontSize: '0.95rem', fontWeight: 500,
              textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.5)',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}>
              Agendar Consulta <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRANSFORMACIONES SECTION ===== */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'linear-gradient(135deg,#1f2937,#111827)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 50%, rgba(236,72,153,0.12), transparent 50%), radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1), transparent 50%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>Resultados reales</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
              Historias de{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>transformación</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', fontWeight: 300, marginTop: 12 }}>
              Mujeres reales con resultados reales. Sin dietas extremas, sin restricciones.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
            {[
              { icon: TrendingUp, stat: '-12 kg', period: 'en 3 meses', name: 'Laura V.', age: '34 años', quote: 'Por primera vez en mi vida adelgacé sin pasar hambre y sin contar calorías obsesivamente.', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.2)' },
              { icon: Zap, stat: '+80%', period: 'más energía', name: 'Carmen S.', age: '28 años', quote: 'Dejé el cansancio crónico atrás. Ahora tengo energía para mis hijos y mi trabajo todo el día.', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
              { icon: Award, stat: '6 meses', period: 'sin ansiedad', name: 'Valeria R.', age: '41 años', quote: 'Sané mi relación con la comida. Ya no como por ansiedad ni me siento culpable después de comer.', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
            ].map((t, i) => (
              <div key={i} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: t.bg, border: `1px solid ${t.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <t.icon size={22} color={t.color} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '2rem', fontWeight: 300, color: t.color, lineHeight: 1 }}>{t.stat}</p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{t.period}</p>
                  </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, fontStyle: 'italic' }}>
                  "{t.quote}"
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', fontWeight: 300 }}>{t.age}</p>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} color="#fbbf24" fill="#fbbf24" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'linear-gradient(135deg,#ec4899,#d946ef)', color: '#fff', borderRadius: 50, fontSize: '0.95rem', fontWeight: 500, textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.5)' }}>
              Quiero transformarme <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Wave divider: dark transformaciones → contador */}
      <div style={{ lineHeight: 0, background: 'linear-gradient(135deg, #1f2937, #111827)' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#fdf2f8" />
        </svg>
      </div>

      {/* ===== CONTADOR ANIMADO ===== */}
      <section className="contador-section" ref={counterRef}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500, marginBottom: 20 }}>Comunidad</p>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.3 }}>
            Únete a las{' '}
            <span className="contador-number">
              {counterValue.toLocaleString('es-MX')}
            </span>{' '}
            mujeres que ya están{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>transformando</span>{' '}
            su vida
          </h2>
          <div className="contador-dots">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="contador-dot" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-gradient">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Testimonios</span>
            <h2 className="section-title">
              Lo que dicen mis <span className="font-serif text-pink">pacientes</span>
            </h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                name: "María González",
                role: "Emprendedora",
                text: "El curso de Alimentación Consciente cambió completamente mi perspectiva. Brenda explica todo de manera tan clara y amorosa.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
              },
              {
                name: "Ana Martínez",
                role: "Madre de 2",
                text: "Como mamá primeriza, el curso de Nutrición para Mamás fue mi guía. Las recetas son prácticas y deliciosas.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80"
              },
              {
                name: "Sofía Ruiz",
                role: "Diseñadora",
                text: "El Detox Natural me ayudó a resetear mis hábitos. En solo 21 días noté cambios increíbles en mi energía.",
                avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80"
              }
            ].map((t, i) => (
              <div key={i} className="testimonial-card group">
                <div className="quote-icon">❝</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="author-avatar" />
                  <div>
                    <p className="font-medium text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section section-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="section-label">Blog & Recetas</span>
              <h2 className="section-title">
                Nutrición en <span className="font-serif text-pink">cada palabra</span>
              </h2>
            </div>
            <Link to="/recetas" className="btn btn-link inline-flex items-center gap-2 group">
              Ir a Blog y Recetas <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <article key={index} className="blog-card group">
                <div className="blog-image-wrapper">
                  <img src={post.image} alt={post.title} className="blog-image" />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-date">
                    <Calendar size={14} /> {post.date}
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'linear-gradient(135deg,#fdf2f8,#faf5ff)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#ec4899,#d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 25px -6px rgba(236,72,153,0.4)' }}>
            <Gift size={26} color="#fff" />
          </div>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: 12 }}>Completamente gratis</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2, marginBottom: 12 }}>
            Descarga mi{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>Guía de Desayunos</span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>
            20 desayunos nutritivos y deliciosos que puedes preparar en menos de 15 minutos. ¡Suscríbete y recíbela al instante!
          </p>
          {!subscribed ? (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 220, position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="tu@email.com"
                  style={{ width: '100%', padding: '14px 14px 14px 42px', border: '2px solid #fce7f3', borderRadius: 12, fontSize: '0.92rem', fontFamily: "'Outfit',sans-serif", color: '#1f2937', outline: 'none', background: '#fff', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#fce7f3'}
                />
              </div>
              <button type="submit" style={{ padding: '14px 24px', background: 'linear-gradient(135deg,#ec4899,#d946ef)', color: '#fff', borderRadius: 12, fontSize: '0.92rem', fontWeight: 500, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Outfit',sans-serif", boxShadow: '0 6px 20px -4px rgba(236,72,153,0.4)' }}>
                Quiero mi guía gratis
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 16, padding: '18px 24px', maxWidth: 480, margin: '0 auto' }}>
              <CheckCircle size={22} color="#059669" />
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: '#065f46', fontWeight: 500, fontSize: '0.95rem' }}>¡Enviado! Revisa tu bandeja de entrada</p>
                <p style={{ color: '#059669', fontSize: '0.83rem', fontWeight: 300 }}>Gracias por suscribirte — también recibirás novedades y recetas exclusivas.</p>
              </div>
            </div>
          )}
          <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: 16, fontWeight: 300 }}>
            Sin spam. Puedes cancelar cuando quieras.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="hero-blobs">
          <div className="blob hero-blob-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
        <div className="cta-content">
          <h2 className="cta-title">
            ¿Lista para comenzar tu <span className="font-serif italic">transformación</span>?
          </h2>
          <p className="cta-desc">
            Únete a miles de mujeres que ya están viviendo una vida más saludable y feliz.
          </p>
          <button onClick={() => navigate('/registro')} className="btn btn-secondary btn-lg rounded-full text-pink hover:bg-white hover:text-pink-600">
            Comenzar Ahora <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </section>
    </>
  );
}
