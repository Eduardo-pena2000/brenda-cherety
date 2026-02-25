import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Play, BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function PagoExitosoPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(timer); navigate('/mis-cursos'); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg,#fdf2f8,#ffffff,#faf5ff)',
      padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden'
    }}>
      {/* BG blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(249,168,212,0.2)', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 250, height: 250, borderRadius: '50%', background: 'rgba(196,181,253,0.2)', filter: 'blur(60px)' }} />

      <div style={{ maxWidth: 560, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, animation: 'fadeInUp 0.6s ease-out' }}>
        {/* Icon */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px', boxShadow: '0 15px 40px -10px rgba(16,185,129,0.3)',
          animation: 'popIn 0.5s ease-out 0.2s backwards'
        }}>
          <CheckCircle size={52} color="#059669" strokeWidth={1.5} />
        </div>

        {/* Confetti particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${10 + i * 12}%`, top: `${5 + (i % 3) * 8}%`,
            width: 8, height: 8, borderRadius: 2,
            background: ['#f9a8d4','#c4b5fd','#6ee7b7','#fde68a'][i % 4],
            animation: `confetti ${1 + i * 0.2}s ease-out ${i * 0.15}s both`,
            opacity: 0
          }} />
        ))}

        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '0.8rem', letterSpacing: '0.15em', color: '#059669',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 12,
          background: '#d1fae5', padding: '6px 16px', borderRadius: 9999
        }}>
          <Sparkles size={13} /> Pago exitoso
        </span>

        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)', fontWeight: 300, color: '#1f2937', lineHeight: 1.2, margin: '16px 0 16px' }}>
          ¡Tu curso está listo!
          <span style={{ display: 'block', fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#ec4899', fontSize: '0.9em' }}>
            Bienvenida al programa 🎉
          </span>
        </h1>

        <p style={{ color: '#6b7280', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 32, maxWidth: 420, margin: '0 auto 32px' }}>
          Tu pago fue procesado correctamente. Ya tienes acceso completo a todas las lecciones y materiales del curso.
        </p>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { icon: Play, title: 'Acceso inmediato', desc: 'Comienza a aprender ahora mismo', color: '#ec4899' },
            { icon: BookOpen, title: 'Acceso de por vida', desc: 'Sin fechas límite ni restricciones', color: '#8b5cf6' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, padding: '18px 16px',
              boxShadow: '0 4px 15px -4px rgba(0,0,0,0.07)',
              display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left'
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: `${item.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <item.icon size={20} color={item.color} />
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.88rem' }}>{item.title}</p>
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', fontWeight: 300 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/mis-cursos" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '16px 36px', background: 'linear-gradient(135deg,#ec4899,#d946ef)',
          color: '#fff', borderRadius: 14, fontSize: '1rem', fontWeight: 500,
          textDecoration: 'none', boxShadow: '0 10px 30px -8px rgba(236,72,153,0.45)',
          transition: 'all 0.3s'
        }}>
          <Play size={18} fill="currentColor" /> Ir a Mis Cursos
        </Link>

        <p style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 300, marginTop: 20 }}>
          Redirigiendo en <strong style={{ color: '#ec4899' }}>{count}</strong> segundos...
        </p>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes popIn { from { transform:scale(0.3); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
