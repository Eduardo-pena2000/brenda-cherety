import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, BookOpen, Star, ArrowRight, CheckCircle, Instagram, Mail } from 'lucide-react';

const certifications = [
  { title: 'Lic. en Salud Publica y Nutrición', org: '', year: '2012 - 2018' },
  { title: 'Diplomado en diabetes mellitus', org: 'Facultad de Salud Pública y Nutrición, UANL', year: '2018' },
  { title: 'Diplomado en nutrición deportiva', org: 'Colegio Mexicano de Nutriólogos, A.C.', year: '2019' },
  { title: 'Nutrición en diferentes tipos de enfermedad renal', org: 'Colegio Mexicano de Nutriólogos Renales, A.C.', year: '2019' },
  { title: 'Bioquímica Clínica', org: 'CIICEM', year: '2019' },
  { title: 'Nutrición en distintos tipos de enfermedad renal', org: 'COMENUR', year: '2019' },
  { title: 'Generalidades de apoyo nutricio', org: 'ASEPROS', year: '2020' },
  { title: 'Experto en Running', org: 'CND', year: '2020' },
  { title: 'Enfermedades gastrointestinales', org: 'ASEPROS', year: '2021' },
  { title: 'Hipertensión arterial para personal de primer contacto', org: 'Asociación nacional de cardiólogos de México A.C.', year: '2021' },
  { title: 'Foro internacional de nutrición en ciencias aplicadas al deporte, actividad física y fitness', org: 'CDN', year: '2022' },
  { title: 'Soporte nutricional', org: 'Feel Good INC.', year: '2025' },
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--primary-50), #ffffff, var(--accent-50))' }}>
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
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 500 }}>Sobre mí</span>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, margin: '12px 0 20px' }}>
              Hola, soy{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary)' }}>Brenda</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 16 }}>
              Hola, soy Brenda Cherety. Soy Lic. En Nutrición con 9 años de experiencia en consulta, acompañando a personas camino a sus metas físicas y/o de salud de manera personalizada.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 16 }}>
              El objetivo no es solo lograr tu meta, también es llegar a ella de manera saludable y que en el camino aprendas a hacerlo sostenible.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
              ¡Será un gusto ayudarte a ti también!
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/cursos" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'linear-gradient(135deg,var(--primary-deep),var(--primary-deep))',
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
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,var(--primary-light),#ede9fe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={20} color="var(--primary-deep)" />
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem', lineHeight: 1 }}>9 años</p>
                <p style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 300 }}>de experiencia</p>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* Certificaciones */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#1f2937', marginTop: 12 }}>
              Mi{' '}
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: 'var(--primary-deep)' }}>formación</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {certifications.map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 24px', background: 'linear-gradient(135deg,var(--primary-50),var(--accent-50))',
                borderRadius: 16, borderLeft: '4px solid var(--primary)',
                animation: `fadeInUp 0.4s ease-out ${i * 0.1}s backwards`
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', flexShrink: 0 }}>
                  <Award size={20} color="var(--primary-deep)" />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.95rem' }}>{c.title}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: 300 }}>{c.org}</p>
                </div>
                <span style={{
                  padding: '4px 12px', borderRadius: 9999, fontSize: '0.78rem', fontWeight: 500,
                  background: 'rgba(236,72,153,0.1)', color: 'var(--primary-deep)'
                }}>{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'clamp(3rem,6vw,5rem) 1.5rem',
        background: 'linear-gradient(135deg,var(--primary-deep),var(--primary-deep),var(--accent))',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: '#fff', marginBottom: 32 }}>
            Empieza a tomar mejores{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>decisiones</span>
          </h2>
          <Link to="/cursos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '16px 36px', background: '#fff',
            color: 'var(--primary-deep)', borderRadius: 14, fontSize: '1rem', fontWeight: 500,
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
