import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, Lock, Clock, CheckCircle, ArrowRight, ArrowLeft, BookOpen, Users, Star, Award, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch, formatPrice } from '../lib/api';

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredLesson, setHoveredLesson] = useState(null);
  const [buying, setBuying] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiFetch(`/courses/public/${id}`);
        setCourse(data.course);
        setLessons(data.lessons || []);

        if (isLoggedIn) {
          try {
            const purchasesData = await apiFetch('/payments/my-purchases');
            const enrolled = (purchasesData.purchases || []).some(p => p.course_id === parseInt(id));
            setIsEnrolled(enrolled);
          } catch {}
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isLoggedIn]);

  const handleBuy = async () => {
    if (!isLoggedIn) return navigate('/login');
    setBuying(true);
    try {
      const data = await apiFetch('/payments/create-checkout', {
        method: 'POST',
        body: JSON.stringify({ courseId: id })
      });
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setBuying(false);
    }
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '3px solid #fce7f3',
          borderTopColor: '#ec4899', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: 300 }}>Cargando curso...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (!course) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)', textAlign: 'center'
    }}>
      <div>
        <BookOpen size={64} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ color: '#4b5563', fontSize: '1.5rem', fontWeight: 400, marginBottom: 8 }}>Curso no encontrado</h2>
        <Link to="/cursos" style={{ color: '#ec4899', fontWeight: 500 }}>Volver al catálogo</Link>
      </div>
    </div>
  );

  const thumbnailUrl = course.thumbnail
    ? `/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`
    : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)',
      paddingBottom: '5rem'
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%)',
        padding: '3rem 1.5rem 4rem', position: 'relative', overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(236,72,153,0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168,85,247,0.1), transparent 50%)'
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Back button */}
          <button onClick={() => navigate('/cursos')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300,
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: 32, transition: 'color 0.3s', fontFamily: "'Outfit', sans-serif"
          }}>
            <ArrowLeft size={18} /> Volver al catálogo
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
              position: 'relative', maxHeight: 400
            }}>
              {thumbnailUrl ? (
                <img src={thumbnailUrl} alt={course.title} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  minHeight: 250, maxHeight: 400
                }} />
              ) : (
                <div style={{
                  width: '100%', height: 300,
                  background: 'linear-gradient(135deg, #374151, #1f2937)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <BookOpen size={64} color="#4b5563" />
                </div>
              )}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 50%)'
              }} />
            </div>

            {/* Info */}
            <div>
              <h1 style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: '#fff',
                lineHeight: 1.2, marginBottom: 16
              }}>{course.title}</h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 300,
                lineHeight: 1.7, marginBottom: 24, maxWidth: 600
              }}>
                {course.description || 'Transforma tu vida con este curso integral de nutrición consciente.'}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
                {[
                  { icon: Clock, label: course.duration || '4 semanas' },
                  { icon: Play, label: `${lessons.length} lecciones` },
                  { icon: CheckCircle, label: 'Certificado' },
                  { icon: Users, label: '2.5k+ pacientes' }
                ].map((item, i) => (
                  <span key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 300
                  }}>
                    <item.icon size={16} color="#f9a8d4" /> {item.label}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                {isEnrolled ? (
                  <Link to={`/clase/${id}/${lessons[0]?.id}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '16px 36px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                    textDecoration: 'none',
                    boxShadow: '0 10px 30px -8px rgba(16,185,129,0.4)',
                    transition: 'all 0.3s'
                  }}>
                    <Play size={20} fill="currentColor" /> Ir a Clases
                  </Link>
                ) : (
                  <>
                    <div style={{
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#f9a8d4'
                    }}>
                      {formatPrice(course.price_cents, course.currency)}
                    </div>
                    <button onClick={handleBuy} disabled={buying} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 10,
                      padding: '16px 36px',
                      background: buying
                        ? '#9ca3af'
                        : 'linear-gradient(135deg, #ec4899, #d946ef)',
                      color: '#fff', borderRadius: 14, fontSize: '1.05rem', fontWeight: 500,
                      border: 'none', cursor: buying ? 'not-allowed' : 'pointer',
                      boxShadow: '0 10px 30px -8px rgba(236,72,153,0.4)',
                      transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
                    }}>
                      {buying ? 'Procesando...' : 'Inscribirme Ahora'}
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Section */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, #fce7f3, #faf5ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <BookOpen size={22} color="#ec4899" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#1f2937' }}>
              Contenido del curso
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300 }}>
              {lessons.length} lecciones disponibles
            </p>
          </div>
        </div>

        {lessons.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: '#fff', borderRadius: 20,
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.05)'
          }}>
            <Clock size={48} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#9ca3af', fontSize: '1rem', fontWeight: 300 }}>
              Próximamente...
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lessons.map((lesson, index) => {
              const isHover = hoveredLesson === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '18px 24px',
                    background: isHover ? '#fff' : 'rgba(255,255,255,0.7)',
                    borderRadius: 16,
                    boxShadow: isHover ? '0 8px 30px -8px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s',
                    transform: isHover ? 'translateX(4px)' : 'translateX(0)',
                    cursor: isEnrolled ? 'pointer' : 'default',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.06}s backwards`
                  }}
                  onClick={() => {
                    if (isEnrolled) navigate(`/clase/${id}/${lesson.id}`);
                  }}
                >
                  {/* Number */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: isHover
                      ? 'linear-gradient(135deg, #ec4899, #d946ef)'
                      : 'linear-gradient(135deg, #fce7f3, #faf5ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isHover ? '#fff' : '#ec4899',
                    fontSize: '0.9rem', fontWeight: 600,
                    transition: 'all 0.3s'
                  }}>
                    {index + 1}
                  </div>

                  {/* Title */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '1rem', fontWeight: 450, color: '#1f2937',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{lesson.title}</p>
                    {lesson.description && (
                      <p style={{
                        fontSize: '0.85rem', color: '#9ca3af', fontWeight: 300,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2
                      }}>{lesson.description}</p>
                    )}
                  </div>

                  {/* Duration + Lock */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      color: '#9ca3af', fontSize: '0.85rem', fontWeight: 300
                    }}>
                      <Clock size={14} /> {lesson.duration || '15:00'}
                    </span>
                    {isEnrolled ? (
                      <Play size={16} color="#ec4899" fill="#ec4899" />
                    ) : (
                      <Lock size={16} color="#d1d5db" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 768px) {
          .course-detail-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
