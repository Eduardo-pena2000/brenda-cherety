import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, BookOpen, Users, Star, Play, Sparkles, Filter } from 'lucide-react';
import { formatPrice } from '../lib/api';

export default function CatalogPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCourses([{
      id: 'mock-1',
      title: 'Lectura de etiquetas nutricionales',
      subtitle: 'Aprende a identificar lo que realmente estás comiendo.',
      price_cents: 32000,
      currency: 'MXN',
      thumbnail: 'mock-url'
    }]);
    setLoading(false);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.subtitle && course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-50), #ffffff, var(--accent-50))',
      paddingBottom: '5rem'
    }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-deep), var(--primary-deep), var(--accent))',
        padding: '4rem 1.5rem 6rem',
        position: 'relative', overflow: 'hidden', textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-40px',
          width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)'
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, color: '#fff',
            lineHeight: 1.2
          }}>
            Elige tu curso y empieza a tomar mejores <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>decisiones</span>
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 0' }}>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{
              width: 48, height: 48, border: '3px solid var(--primary-light)',
              borderTopColor: 'var(--primary-deep)', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
            }} />
            <p style={{ color: '#6b7280', fontWeight: 300 }}>Cargando cursos...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          /* Courses Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {filteredCourses.map((course, index) => {
              const isHovered = hoveredCard === course.id;
              const thumbnailUrl = course.id === 'mock-1'
                ? 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80'
                : course.thumbnail
                  ? `/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`
                  : null;
              return (
                <div
                  key={course.id}
                  onClick={() => navigate(`/curso/${course.id}`)}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: '#fff', borderRadius: 20, overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isHovered
                      ? '0 25px 50px -12px rgba(0,0,0,0.15)'
                      : '0 4px 20px -4px rgba(0,0,0,0.08)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    animation: `fadeInUp 0.5s ease-out ${index * 0.08}s backwards`
                  }}
                >
                  {/* Image */}
                  <div style={{
                    height: 220, overflow: 'hidden', position: 'relative',
                    background: 'linear-gradient(135deg, var(--primary-light), var(--accent-light))'
                  }}>
                    {thumbnailUrl ? (
                      <img src={thumbnailUrl} alt={course.title} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.7s ease',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                      }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column', gap: 8
                      }}>
                        <BookOpen size={40} color="var(--primary-deep)" strokeWidth={1.5} />
                        <span style={{ color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: 300 }}>Sin imagen</span>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                      opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s'
                    }} />

                    {/* Play button */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                      transition: 'all 0.3s'
                    }}>
                      <div style={{
                        width: 56, height: 56, borderRadius: '50%',
                        background: 'rgba(255,255,255,0.95)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                      }}>
                        <Play size={22} color="var(--primary-deep)" fill="var(--primary-deep)" style={{ marginLeft: 2 }} />
                      </div>
                    </div>

                    {/* Featured badge */}
                    {course.featured && (
                      <div style={{
                        position: 'absolute', top: 12, left: 12,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        padding: '4px 10px', borderRadius: 9999,
                        fontSize: '0.72rem', fontWeight: 500, color: 'var(--primary-deep)',
                        display: 'flex', alignItems: 'center', gap: 4
                      }}>
                        <Sparkles size={11} /> Destacado
                      </div>
                    )}

                    {/* Meta overlay */}
                    <div style={{
                      position: 'absolute', bottom: 12, left: 12,
                      display: 'flex', gap: 12, color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.82rem', zIndex: 2,
                      opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={13} /> {course.duration || '4 sem.'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <BookOpen size={13} /> {course.lessons_count || 12} lecc.
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.15rem', fontWeight: 500, color: '#1f2937',
                      marginBottom: 6, lineHeight: 1.3
                    }}>{course.title}</h3>
                    <p style={{
                      color: '#6b7280', fontSize: '0.88rem', fontWeight: 300,
                      marginBottom: 20, lineHeight: 1.5
                    }}>{course.subtitle || 'Curso de nutrición integral'}</p>

                    {/* Footer */}
                    <div style={{
                      marginTop: 'auto', paddingTop: 16,
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <span style={{
                        fontSize: '1.3rem', color: 'var(--primary-deep)', fontWeight: 600, display: 'block', marginBottom: '12px'
                      }}>
                        {formatPrice(course.price_cents || 32000, course.currency || 'MXN')}
                      </span>
                      <button className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '1rem', borderRadius: '0.75rem' }}>
                        Iniciar ahora
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* No results */
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: '#fff', borderRadius: 20,
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.05)'
          }}>
            <Search size={48} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#4b5563', fontSize: '1.2rem', fontWeight: 400, marginBottom: 8 }}>
              Sin resultados
            </h3>
            <p style={{ color: '#9ca3af', fontWeight: 300 }}>
              No se encontraron cursos que coincidan con "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
