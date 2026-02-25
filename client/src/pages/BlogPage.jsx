import { useState } from 'react';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['Todos', 'Recetas', 'Bienestar', 'Nutrición', 'Mindful Eating', 'Tips'];

const posts = [
  {
    id: 1, category: 'Recetas',
    title: '5 Desayunos Energéticos para Empezar tu Día',
    excerpt: 'Descubre opciones nutritivas y deliciosas que te darán la energía que necesitas cada mañana sin tener que pasar horas en la cocina.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&q=80',
    date: '12 Feb 2026', readTime: '5 min', featured: true
  },
  {
    id: 2, category: 'Bienestar',
    title: '¿Qué es la Alimentación Intuitiva y Por Qué Funciona?',
    excerpt: 'Aprende a escuchar las señales de tu cuerpo y a comer sin culpa ni restricciones. El método que está revolucionando la nutrición.',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=700&q=80',
    date: '8 Feb 2026', readTime: '7 min', featured: true
  },
  {
    id: 3, category: 'Recetas',
    title: 'Smoothie Verde: Mi Receta Favorita para la Mañana',
    excerpt: 'La combinación perfecta de nutrientes para comenzar el día con toda la energía. Lista en menos de 5 minutos.',
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=700&q=80',
    date: '3 Feb 2026', readTime: '3 min', featured: false
  },
  {
    id: 4, category: 'Nutrición',
    title: 'Proteínas: Todo lo que Necesitas Saber',
    excerpt: 'Desmitificando las proteínas: cuánta necesitas realmente, las mejores fuentes y cómo incorporarlas a tus comidas diarias.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80',
    date: '28 Ene 2026', readTime: '8 min', featured: false
  },
  {
    id: 5, category: 'Mindful Eating',
    title: 'Comer con Conciencia: 10 Prácticas para Empezar Hoy',
    excerpt: 'Pequeños cambios en tu relación con la comida que pueden transformar tu bienestar. Prácticas sencillas y poderosas.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80',
    date: '20 Ene 2026', readTime: '6 min', featured: false
  },
  {
    id: 6, category: 'Tips',
    title: 'Meal Prep: Cómo Preparar tu Semana Saludable en 2 Horas',
    excerpt: 'La guía definitiva para preparar tus comidas semanales sin estrés. Ahorra tiempo, dinero y come saludable todos los días.',
    image: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=700&q=80',
    date: '15 Ene 2026', readTime: '9 min', featured: false
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [hovered, setHovered] = useState(null);

  const filtered = posts.filter(p =>
    (activeCategory === 'Todos' || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPost = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || filtered.indexOf(p) > 0);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#fdf2f8,#ffffff,#faf5ff)', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#ec4899,#d946ef,#8b5cf6)',
        padding: 'clamp(3rem,6vw,5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', fontWeight: 500 }}>Blog & Recetas</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 300, color: '#fff', margin: '12px 0 16px' }}>
            Nutrición en{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>cada palabra</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', fontWeight: 300 }}>
            Recetas, consejos y todo lo que necesitas saber sobre alimentación consciente
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Search + Filters */}
        <div style={{ margin: '-20px 0 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: '#fff', borderRadius: 14,
            boxShadow: searchFocused ? '0 15px 50px -10px rgba(236,72,153,0.2), 0 0 0 3px rgba(236,72,153,0.1)' : '0 8px 30px -8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s', position: 'relative'
          }}>
            <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#ec4899' : '#9ca3af', transition: 'color 0.3s' }} />
            <input
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{ width: '100%', padding: '16px 16px 16px 48px', border: 'none', borderRadius: 14, fontSize: '0.95rem', fontFamily: "'Outfit',sans-serif", color: '#1f2937', background: 'transparent', outline: 'none' }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 18px', borderRadius: 9999, fontSize: '0.85rem', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Outfit',sans-serif",
                background: activeCategory === cat ? 'linear-gradient(135deg,#ec4899,#d946ef)' : '#fff',
                color: activeCategory === cat ? '#fff' : '#6b7280',
                boxShadow: activeCategory === cat ? '0 6px 20px -4px rgba(236,72,153,0.35)' : '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: 20 }}>
            <Search size={48} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#9ca3af', fontWeight: 300 }}>No se encontraron artículos</p>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featuredPost && activeCategory === 'Todos' && !searchTerm && (
              <div
                onMouseEnter={() => setHovered('featured')}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff', borderRadius: 24, overflow: 'hidden', marginBottom: 40,
                  boxShadow: hovered === 'featured' ? '0 25px 60px -15px rgba(0,0,0,0.12)' : '0 4px 20px -4px rgba(0,0,0,0.07)',
                  transition: 'all 0.4s', display: 'grid', gridTemplateColumns: '1fr 1fr',
                  cursor: 'pointer'
                }}
                className="featured-grid"
              >
                <div style={{ height: 'clamp(250px,35vw,400px)', overflow: 'hidden', position: 'relative' }}>
                  <img src={featuredPost.image} alt={featuredPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered === 'featured' ? 'scale(1.05)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'linear-gradient(135deg,#ec4899,#d946ef)', color: '#fff', padding: '4px 12px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 500 }}>
                    Destacado
                  </div>
                </div>
                <div style={{ padding: 'clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#ec4899', fontWeight: 500, marginBottom: 12 }}>
                    <Tag size={12} /> {featuredPost.category}
                  </span>
                  <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.9rem)', fontWeight: 400, color: '#1f2937', lineHeight: 1.3, marginBottom: 16 }}>
                    {featuredPost.title}
                  </h2>
                  <p style={{ color: '#6b7280', fontWeight: 300, lineHeight: 1.7, marginBottom: 24, fontSize: '0.95rem' }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: '#9ca3af' }}>
                      <Calendar size={13} /> {featuredPost.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', color: '#9ca3af' }}>
                      <Clock size={13} /> {featuredPost.readTime} lectura
                    </span>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#ec4899', fontWeight: 500, fontSize: '0.9rem' }}>
                    Leer artículo <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            )}

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
              {(activeCategory !== 'Todos' || searchTerm ? filtered : filtered.filter(p => !p.featured || filtered.indexOf(p) > 0)).map((post, i) => (
                <article
                  key={post.id}
                  onMouseEnter={() => setHovered(post.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: '#fff', borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                    boxShadow: hovered === post.id ? '0 20px 50px -10px rgba(0,0,0,0.12)' : '0 4px 15px -4px rgba(0,0,0,0.07)',
                    transition: 'all 0.4s', transform: hovered === post.id ? 'translateY(-6px)' : 'none',
                    animation: `fadeInUp 0.4s ease-out ${i * 0.07}s backwards`
                  }}
                >
                  <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered === post.id ? 'scale(1.07)' : 'scale(1)' }} />
                    <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 500, color: '#ec4899' }}>
                      {post.category}
                    </div>
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#9ca3af' }}>
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: '#9ca3af' }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 500, color: '#1f2937', lineHeight: 1.35, marginBottom: 10 }}>{post.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#ec4899', fontWeight: 500, fontSize: '0.85rem', marginTop: 16 }}>
                      Leer más <ArrowRight size={14} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(25px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
