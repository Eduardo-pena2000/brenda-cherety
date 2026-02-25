import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, BookOpen, Star, ArrowRight, CheckCircle, Instagram, Mail } from 'lucide-react';

const certifications = [
  { title: 'Licenciatura en Nutrición', org: 'Universidad Autónoma de México', year: '2015' },
  { title: 'Especialidad en Nutrición Clínica', org: 'Instituto Nacional de Salud', year: '2017' },
  { title: 'Certificación en Alimentación Consciente', org: 'The Center for Mindful Eating', year: '2019' },
  { title: 'Diplomado en Nutrición Deportiva', org: 'ISSN Internacional', year: '2021' },
];

const values = [
  { icon: Heart, title: 'Con amor', desc: 'Cada programa está diseñado con cariño para acompañarte en tu proceso sin juicios ni restricciones.' },
  { icon: BookOpen, title: 'Basado en ciencia', desc: 'Toda mi metodología está respaldada por evidencia científica actualizada y estudios clínicos.' },
  { icon: Star, title: 'Resultados reales', desc: 'Más de 5,000 pacientes han transformado su relación con la comida y su salud con mi acompañamiento.' },
  { icon: CheckCircle, title: 'Accesible', desc: 'Creo que el conocimiento de nutrición debe estar al alcance de todas, sin importar el presupuesto.' },
];

export default function SobreMiPage() {
  const [hoveredVal, setHoveredVal] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: 'clamp(4rem,8vw,7rem) 1.5rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(236,72,153,0.15), transparent 55%), radial-gradient(circle at 20% 80%, rgba(139,92,246,0.1), transparent 45%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', position: 'relative', zIndex: 2 }} className="sobre-grid">
          {/* Text */}
          <div>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 500 }}>Sobre mí</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, margin: '12px 0 20px' }}>
              Hola, soy{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>Brenda</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 16 }}>
              Soy nutrióloga certificada con más de 10 años de experiencia ayudando a mujeres a transformar su relación con la comida desde un lugar de amor, no de restricción.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
              Creo firmemente que la nutrición no se trata solo de lo que comes, sino de cómo te sientes con tu cuerpo y tu vida. Mi misión es guiarte hacia una alimentación consciente, flexible y sostenible.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/cursos" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
                color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)'
              }}>
                Ver Cursos <ArrowRight size={18} />
              </Link>
              <Link to="/contacto" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'rgba(255,255,255,0.1)',
                color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)'
              }}>
                Contáctame
              </Link>
            </div>
          </div>
          {/* Photo */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 'clamp(260px,40vw,380px)', height: 'clamp(320px,50vw,460px)',
              borderRadius: 32, overflow: 'hidden',
              boxShadow: '0 30px 80px -20px rgba(236,72,153,0.4)',
              border: '2px solid rgba(249,168,212,0.3)'
            }}>
              <img
                src="/about-me.jpg"
                alt="Brenda Cherety - Nutrióloga"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Floating card */}
            <div style={{
              position: 'absolute', bottom: 20, left: -10,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
              padding: '14px 20px', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#fce7f3,#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} color="#ec4899" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem', lineHeight: 1 }}>10+ años</p>
                <p style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 300 }}>de experiencia</p>
              </div>
            </div>
            <div style={{
              position: 'absolute', top: 20, right: -10,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)',
              padding: '14px 20px', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#fce7f3,#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} color="#ec4899" fill="#ec4899" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem', lineHeight: 1 }}>5,000+</p>
                <p style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 300 }}>pacientes felices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mi Historia */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500 }}>Mi historia</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#1f2937', margin: '12px 0 24px' }}>
            ¿Por qué me dediqué a la{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>nutrición?</span>
          </h2>
          <div style={{ textAlign: 'left', fontSize: '1.05rem', color: '#4b5563', fontWeight: 300, lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p>
              Desde pequeña tuve una relación complicada con la comida. Crecí escuchando "eso engorda" o "no deberías comer eso", y llegué a la adultez con una relación llena de culpa y restricción con la alimentación.
            </p>
            <p>
              Fue cuando estudié nutrición que entendí que el problema nunca fue la comida en sí, sino la narrativa que construimos alrededor de ella. La nutrición consciente cambió mi vida, y desde entonces me apasiona compartirlo con otras mujeres.
            </p>
            <p>
              Hoy, después de haber atendido a más de 5,000 pacientes en consulta y a través de mis cursos, sé que el bienestar real viene de aprender a escuchar tu cuerpo, de comer con placer y sin culpa, y de entender que cada persona es única.
            </p>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'linear-gradient(135deg,#fdf2f8,#faf5ff)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500 }}>Mi filosofía</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#1f2937', marginTop: 12 }}>
              Lo que me{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>guía</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredVal(i)}
                onMouseLeave={() => setHoveredVal(null)}
                style={{
                  background: '#fff', borderRadius: 20, padding: '28px 24px',
                  boxShadow: hoveredVal === i ? '0 20px 50px -10px rgba(236,72,153,0.15)' : '0 4px 15px -4px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s', transform: hoveredVal === i ? 'translateY(-6px)' : 'none'
                }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'linear-gradient(135deg,#fce7f3,#ede9fe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
                }}>
                  <v.icon size={24} color="#ec4899" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1f2937', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#ec4899', textTransform: 'uppercase', fontWeight: 500 }}>Formación</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#1f2937', marginTop: 12 }}>
              Mis{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899' }}>certificaciones</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {certifications.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 24px', background: 'linear-gradient(135deg,#fdf2f8,#faf5ff)',
                borderRadius: 16, borderLeft: '4px solid #f9a8d4',
                animation: `fadeInUp 0.4s ease-out ${i * 0.1}s backwards`
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                  <Award size={20} color="#ec4899" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.95rem' }}>{c.title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: 300 }}>{c.org}</p>
                </div>
                <span style={{
                  padding: '4px 12px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 500,
                  background: 'rgba(236,72,153,0.1)', color: '#ec4899'
                }}>{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(3rem,6vw,5rem) 1.5rem',
        background: 'linear-gradient(135deg,#ec4899,#d946ef,#8b5cf6)',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#fff', marginBottom: 16 }}>
            ¿Lista para comenzar tu{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>transformación?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', fontWeight: 300, marginBottom: 32 }}>
            Únete a miles de mujeres que ya están viviendo una vida más saludable y feliz.
          </p>
          <Link to="/cursos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 36px', background: '#fff',
            color: '#ec4899', borderRadius: 14, fontSize: '1rem', fontWeight: 500,
            textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
          }}>
            Explorar Cursos <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .sobre-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
