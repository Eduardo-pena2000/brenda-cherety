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
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (course.subtitle && course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)',
      paddingBottom: '5rem'
    }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899, #d946ef, #8b5cf6)',
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
          <span style={{
            display: 'inline-block', fontSize: '0.85rem', letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase',
            fontWeight: 500, marginBottom: 16
          }}>Catálogo</span>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 300, color: '#fff',
            lineHeight: 1.2, marginBottom: 12
          }}>
            Todos los{' '}
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>cursos</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', fontWeight: 300,
            maxWidth: 500, margin: '0 auto'
          }}>
            Elige el programa perfecto para tu camino hacia el bienestar
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ maxWidth: 640, margin: '-28px auto 0', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{
          position: 'relative',
          background: '#fff',
          borderRadius: 16,
          boxShadow: searchFocused
            ? '0 20px 60px -15px rgba(236,72,153,0.25), 0 0 0 3px rgba(236,72,153,0.15)'
            : '0 10px 40px -10px rgba(0,0,0,0.12)',
          transition: 'all 0.3s'
        }}>
          <Search size={20} style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            color: searchFocused ? '#ec4899' : '#9ca3af', transition: 'color 0.3s'
          }} />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%', padding: '18px 20px 18px 52px',
              border: 'none', borderRadius: 16,
              fontSize: '1rem', fontFamily: "'Outfit', sans-serif",
              color: '#1f2937', background: 'transparent', outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        {/* Results count */}
        {!loading && (
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300, marginBottom: 24 }}>
            {searchTerm
              ? `${filteredCourses.length} resultado${filteredCourses.length !== 1 ? 's' : ''} para "${searchTerm}"`
              : `${courses.length} curso${courses.length !== 1 ? 's' : ''} disponibles`}
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{
              width: 48, height: 48, border: '3px solid #fce7f3',
              borderTopColor: '#ec4899', borderRadius: '50%',
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
              const thumbnailUrl = course.thumbnail
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
                    background: 'linear-gradient(135deg, #fce7f3, #e9d5ff)'
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
                        <BookOpen size={40} color="#d946ef" strokeWidth={1.5} />
                        <span style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: 300 }}>Sin imagen</span>
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
                        <Play size={22} color="#ec4899" fill="#ec4899" style={{ marginLeft: 2 }} />
                      </div>
                    </div>

                    {/* Featured badge */}
                    {course.featured && (
                      <div style={{
                        position: 'absolute', top: 12, left: 12,
                        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                        padding: '4px 10px', borderRadius: 9999,
                        fontSize: '0.72rem', fontWeight: 500, color: '#ec4899',
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
                      marginTop: 'auto', display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', paddingTop: 16,
                      borderTop: '1px solid #f3f4f6'
                    }}>
                      <div style={{ display: 'flex', gap: 12, color: '#9ca3af', fontSize: '0.82rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Users size={13} /> {Math.floor(Math.random() * 2000) + 500}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Star size={13} color="#facc15" fill="#facc15" /> 4.9
                        </span>
                      </div>
                      <span style={{
                        fontSize: '1.2rem', color: '#ec4899', fontWeight: 400
                      }}>
                        {formatPrice(course.price_cents, course.currency)}
                      </span>
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
