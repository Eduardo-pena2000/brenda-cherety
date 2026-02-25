import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChevronRight, Search, Flame, Leaf, Coffee, UtensilsCrossed, Apple, Star } from 'lucide-react';

const recipes = [
  {
    id: 1, category: 'Desayuno', title: 'Bowl de Açaí con Frutas', time: '10 min', servings: 1,
    difficulty: 'Fácil', calories: 320, tags: ['vegano', 'sin gluten'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80',
    excerpt: 'Un desayuno lleno de antioxidantes, perfecto para empezar el día con energía y vitalidad.',
    color: '#ec4899',
  },
  {
    id: 2, category: 'Desayuno', title: 'Tostadas de Aguacate con Huevo', time: '15 min', servings: 2,
    difficulty: 'Fácil', calories: 380, tags: ['vegetariano', 'proteína'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
    excerpt: 'Las famosas tostadas de aguacate con el toque perfecto de especias y huevo pochado.',
    color: '#10b981',
  },
  {
    id: 3, category: 'Comida', title: 'Bowl de Quinoa con Verduras', time: '25 min', servings: 2,
    difficulty: 'Media', calories: 450, tags: ['vegano', 'proteína', 'sin gluten'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    excerpt: 'Un bowl completo y nutritivo con quinoa, verduras asadas y aderezo de tahini.',
    color: '#f59e0b',
  },
  {
    id: 4, category: 'Comida', title: 'Salmón con Espárragos al Horno', time: '30 min', servings: 2,
    difficulty: 'Media', calories: 520, tags: ['sin gluten', 'omega-3'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    excerpt: 'Salmón jugoso con espárragos asados. Una cena elegante y supersaludable.',
    color: '#f97316',
  },
  {
    id: 5, category: 'Snack', title: 'Energy Balls de Avena y Cacao', time: '20 min', servings: 12,
    difficulty: 'Fácil', calories: 95, tags: ['vegano', 'sin horno'],
    image: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600&q=80',
    excerpt: 'Bocados energéticos hechos con dátiles, avena y cacao. Perfectos para media tarde.',
    color: '#8b5cf6',
  },
  {
    id: 6, category: 'Cena', title: 'Sopa de Lentejas con Cúrcuma', time: '35 min', servings: 4,
    difficulty: 'Fácil', calories: 280, tags: ['vegano', 'antiinflamatorio'],
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
    excerpt: 'Una sopa reconfortante con propiedades antiinflamatorias gracias a la cúrcuma.',
    color: '#f59e0b',
  },
  {
    id: 7, category: 'Snack', title: 'Smoothie Verde Detox', time: '5 min', servings: 1,
    difficulty: 'Fácil', calories: 180, tags: ['vegano', 'detox'],
    image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=600&q=80',
    excerpt: 'Un smoothie verde con espinacas, pepino, limón y menta. Refrescante y depurativo.',
    color: '#10b981',
  },
  {
    id: 8, category: 'Cena', title: 'Wrap de Pollo y Aguacate', time: '20 min', servings: 2,
    difficulty: 'Fácil', calories: 420, tags: ['proteína', 'equilibrado'],
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80',
    excerpt: 'Wraps ligeros y sabrosos de pollo a la plancha con aguacate, tomate y lechuga.',
    color: '#ec4899',
  },
];

const categories = [
  { id: 'Todos', icon: UtensilsCrossed, label: 'Todas' },
  { id: 'Desayuno', icon: Coffee, label: 'Desayunos' },
  { id: 'Comida', icon: Leaf, label: 'Comidas' },
  { id: 'Cena', icon: Star, label: 'Cenas' },
  { id: 'Snack', icon: Apple, label: 'Snacks' },
];

export default function RecetasPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const filtered = recipes.filter(r => {
    const matchCat = activeCategory === 'Todos' || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: 'clamp(3rem,6vw,5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(236,72,153,0.15), transparent 50%)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>
            Nutrición deliciosa
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Recetas{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>saludables</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 32, maxWidth: 540, margin: '0 auto 32px' }}>
            Recetas nutritivas y deliciosas, probadas y aprobadas. Comer sano nunca fue tan rico.
          </p>
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#ec4899' : '#9ca3af', transition: 'color 0.3s' }} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              placeholder="Buscar receta..."
              style={{ width: '100%', padding: '16px 16px 16px 48px', background: '#fff', border: `2px solid ${searchFocused ? '#ec4899' : 'transparent'}`, borderRadius: 16, fontSize: '0.95rem', fontFamily: "'Outfit',sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
            />
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto', padding: '16px 0', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '9px 20px', borderRadius: 50, border: 'none', cursor: 'pointer',
              fontSize: '0.88rem', fontWeight: 500, whiteSpace: 'nowrap',
              fontFamily: "'Outfit',sans-serif", transition: 'all 0.3s',
              background: activeCategory === cat.id ? 'linear-gradient(135deg,#ec4899,#d946ef)' : '#f3f4f6',
              color: activeCategory === cat.id ? '#fff' : '#6b7280',
              boxShadow: activeCategory === cat.id ? '0 4px 14px -4px rgba(236,72,153,0.4)' : 'none',
            }}>
              <cat.icon size={15} /> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(2rem,4vw,3rem) 1.5rem' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: 12 }}>🥗</p>
            <p style={{ color: '#9ca3af', fontSize: '1rem' }}>No encontramos recetas con ese filtro.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg,#ec4899,#d946ef)', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem', textAlign: 'center', marginTop: 24 }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#fff', marginBottom: 12, lineHeight: 1.3 }}>
            ¿Quieres aprender a cocinar de forma{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic' }}>realmente nutritiva?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', fontWeight: 300, marginBottom: 28 }}>
            En mis cursos aprenderás no solo recetas sino a entender tu alimentación.
          </p>
          <Link to="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#fff', color: '#ec4899', borderRadius: 50, fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}>
            Ver Cursos <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function RecipeCard({ recipe }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: hovered ? '0 20px 50px -12px rgba(0,0,0,0.12)' : '0 4px 15px -4px rgba(0,0,0,0.06)', transition: 'all 0.4s', transform: hovered ? 'translateY(-4px)' : 'none', cursor: 'pointer' }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
        <span style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 600, color: recipe.color }}>
          {recipe.category}
        </span>
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 8 }}>
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', borderRadius: 50, padding: '2px 10px', fontSize: '0.72rem', backdropFilter: 'blur(4px)' }}>{tag}</span>
          ))}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: '18px 20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1f2937', marginBottom: 6, lineHeight: 1.3 }}>{recipe.title}</h3>
        <p style={{ fontSize: '0.86rem', color: '#6b7280', fontWeight: 300, lineHeight: 1.6, marginBottom: 16 }}>{recipe.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: 14 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: '#9ca3af' }}>
              <Clock size={13} /> {recipe.time}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: '#9ca3af' }}>
              <Users size={13} /> {recipe.servings}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', color: '#9ca3af' }}>
              <Flame size={13} /> {recipe.calories} kcal
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', fontWeight: 500, color: recipe.color, background: `${recipe.color}15`, padding: '3px 10px', borderRadius: 50 }}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </article>
  );
}
