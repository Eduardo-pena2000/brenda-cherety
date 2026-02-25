import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play, Clock, Award, ArrowRight, Sparkles, Share2, Copy, Linkedin, CheckCircle, X } from 'lucide-react';
import { apiFetch } from '../lib/api';

export default function MyCoursesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [courseLessons, setCourseLessons] = useState({});
  const [shareModal, setShareModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(null);

  // Get progress from localStorage
  const getProgress = (courseId) => {
    try {
      return JSON.parse(localStorage.getItem(`lesson_progress_${courseId}`)) || [];
    } catch { return []; }
  };

  useEffect(() => {
    apiFetch('/payments/my-purchases')
      .then(data => {
        const purch = data.purchases || [];
        setPurchases(purch);
        // Fetch lesson counts for each course
        purch.forEach(p => {
          apiFetch(`/courses/public/${p.course_id}`)
            .then(d => {
              setCourseLessons(prev => ({
                ...prev,
                [p.course_id]: d.lessons || []
              }));
            })
            .catch(() => { });
        });
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const getPercent = (courseId) => {
    const lessons = courseLessons[courseId];
    if (!lessons || lessons.length === 0) return 0;
    const completed = getProgress(courseId);
    return Math.round((completed.length / lessons.length) * 100);
  };

  const getProgressLabel = (pct) => {
    if (pct === 0) return 'Comenzar';
    if (pct === 100) return '¡Completado!';
    return `${pct}%`;
  };

  const handleShare = (type, p) => {
    const text = `🎓 ¡Acabo de completar el curso "${p.title}" en la plataforma de Brenda Cherety! 💖\n\nTransformando mi vida con nutrición consciente.\n\n#BrendaCherety #NutriciónConsciente #Transformación`;
    const url = window.location.origin;

    if (type === 'copy') {
      navigator.clipboard.writeText(text + '\n' + url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (type === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, '_blank');
    } else if (type === 'instagram') {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        alert('¡Texto copiado! Pégalo en tu historia de Instagram 📱');
      });
    }
  };

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '3px solid #fce7f3',
          borderTopColor: '#ec4899', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: 300 }}>Cargando tus cursos...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)',
      paddingBottom: '4rem'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #ec4899, #d946ef, #a855f7)',
        padding: '4rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-50px', right: '-50px',
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-30px', left: '10%',
          width: 150, height: 150, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)'
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <BookOpen size={28} color="rgba(255,255,255,0.9)" />
            <span style={{
              fontSize: '0.85rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.8)',
              textTransform: 'uppercase', fontWeight: 500
            }}>Mi Aprendizaje</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#fff',
            lineHeight: 1.2, marginBottom: 8
          }}>
            Mis <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>Cursos</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', fontWeight: 300 }}>
            {purchases.length > 0
              ? `Tienes ${purchases.length} curso${purchases.length > 1 ? 's' : ''} en tu biblioteca`
              : 'Tu biblioteca de cursos te espera'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem', marginTop: '-2rem' }}>
        {purchases.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: 24, padding: 'clamp(2rem, 5vw, 4rem)',
            textAlign: 'center', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.1)',
            maxWidth: 600, margin: '0 auto'
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #fce7f3, #faf5ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Sparkles size={36} color="#ec4899" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 400, color: '#1f2937', marginBottom: 12 }}>
              Aún no tienes cursos
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300, marginBottom: 32, lineHeight: 1.6 }}>
              Explora nuestro catálogo y encuentra el curso perfecto para comenzar tu transformación.
            </p>
            <Link to="/cursos" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: 'linear-gradient(135deg, #f9a8d4, #f472b6)',
              color: '#fff', borderRadius: 9999, fontSize: '1rem', fontWeight: 500,
              textDecoration: 'none', boxShadow: '0 10px 30px -10px rgba(244,114,182,0.4)',
              transition: 'all 0.3s'
            }}>
              Explorar Cursos <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {purchases.map((p, index) => {
              const thumbnailUrl = p.thumbnail
                ? `/api/files/thumbnail/${p.thumbnail.split('/').pop()}`
                : null;
              const isHovered = hoveredCard === p.id;
              const percent = getPercent(p.course_id);
              const isComplete = percent === 100;
              return (
                <div key={p.id} style={{
                  background: '#fff', borderRadius: 20, overflow: 'hidden',
                  boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(0,0,0,0.15)'
                    : '0 4px 20px -4px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  position: 'relative'
                }}
                  onMouseEnter={() => setHoveredCard(p.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Confetti overlay for 100% */}
                  {showConfetti === p.id && (
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 10,
                      pointerEvents: 'none', overflow: 'hidden'
                    }}>
                      {[...Array(20)].map((_, i) => (
                        <div key={i} style={{
                          position: 'absolute',
                          left: `${Math.random() * 100}%`,
                          top: '-10px',
                          width: `${Math.random() * 8 + 4}px`,
                          height: `${Math.random() * 8 + 4}px`,
                          background: ['#ec4899', '#d946ef', '#a855f7', '#fbbf24', '#34d399'][i % 5],
                          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                          animation: `confettiFall ${Math.random() * 2 + 1.5}s ease-out ${Math.random() * 0.5}s forwards`
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Image */}
                  <div style={{
                    height: 200, overflow: 'hidden', position: 'relative',
                    background: 'linear-gradient(135deg, #fce7f3, #e9d5ff)'
                  }}>
                    {thumbnailUrl ? (
                      <img src={thumbnailUrl} alt={p.title} style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)'
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
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                      opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s'
                    }} />
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
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      }}>
                        <Play size={22} color="#ec4899" fill="#ec4899" style={{ marginLeft: 2 }} />
                      </div>
                    </div>
                    {/* Badge */}
                    <div style={{
                      position: 'absolute', top: 12, left: 12,
                      background: isComplete ? 'rgba(52,211,153,0.95)' : 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 12px', borderRadius: 9999,
                      fontSize: '0.75rem', fontWeight: 500,
                      color: isComplete ? '#fff' : '#10b981',
                      display: 'flex', alignItems: 'center', gap: 4
                    }}>
                      {isComplete ? <><CheckCircle size={12} /> ¡Completado! 🎉</> : <><Award size={12} /> Adquirido</>}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <h3 style={{
                      fontSize: '1.15rem', fontWeight: 500, color: '#1f2937',
                      marginBottom: 8, lineHeight: 1.3
                    }}>{p.title}</h3>
                    <p style={{
                      color: '#6b7280', fontSize: '0.9rem', fontWeight: 300,
                      lineHeight: 1.5, marginBottom: 20,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    }}>
                      {p.description || 'Continúa aprendiendo y transforma tu vida.'}
                    </p>

                    {/* Progress bar */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 400 }}>Progreso</span>
                        <span style={{
                          fontSize: '0.8rem',
                          color: isComplete ? '#10b981' : '#ec4899',
                          fontWeight: 500
                        }}>
                          {getProgressLabel(percent)}
                        </span>
                      </div>
                      <div style={{ height: 4, background: '#f3f4f6', borderRadius: 9999, overflow: 'hidden' }}>
                        <div style={{
                          width: `${percent}%`, height: '100%',
                          background: isComplete
                            ? 'linear-gradient(90deg, #10b981, #34d399)'
                            : 'linear-gradient(90deg, #ec4899, #a855f7)',
                          borderRadius: 9999, transition: 'width 0.6s ease'
                        }} />
                      </div>
                    </div>

                    {/* Action buttons */}
                    {isComplete ? (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Link to={`/clase/${p.course_id}/${p.course_id}`} style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          flex: 1, padding: '12px 16px',
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: '#fff', borderRadius: 12, fontSize: '0.88rem', fontWeight: 500,
                          textDecoration: 'none', transition: 'all 0.3s'
                        }}>
                          <Play size={14} fill="currentColor" /> Repasar
                        </Link>
                        <button
                          onClick={() => {
                            setShareModal(p);
                            setShowConfetti(p.id);
                            setTimeout(() => setShowConfetti(null), 3000);
                          }}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            padding: '12px 16px',
                            background: 'linear-gradient(135deg, #ec4899, #d946ef)',
                            color: '#fff', borderRadius: 12, fontSize: '0.88rem', fontWeight: 500,
                            border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                            fontFamily: "'Outfit', sans-serif",
                            boxShadow: '0 6px 20px -4px rgba(236,72,153,0.4)'
                          }}
                        >
                          <Share2 size={14} /> Compartir
                        </button>
                      </div>
                    ) : (
                      <Link to={`/clase/${p.course_id}/${p.course_id}`} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        width: '100%', padding: '12px 20px',
                        background: isHovered
                          ? 'linear-gradient(135deg, #ec4899, #d946ef)'
                          : 'linear-gradient(135deg, #f9a8d4, #f472b6)',
                        color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
                        textDecoration: 'none', transition: 'all 0.3s',
                        boxShadow: isHovered ? '0 8px 25px -6px rgba(236,72,153,0.5)' : 'none'
                      }}>
                        <Play size={16} fill="currentColor" /> {percent > 0 ? 'Continuar' : 'Ir a Clases'}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.3s ease'
        }}
          onClick={() => setShareModal(null)}
        >
          <div style={{
            background: '#fff', borderRadius: 24, padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            maxWidth: 440, width: '90%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            animation: 'slideUp 0.3s ease',
            position: 'relative'
          }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShareModal(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: '#f3f4f6', border: 'none', borderRadius: '50%',
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#6b7280'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #d946ef)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px', fontSize: '1.8rem'
              }}>
                🎓
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#1f2937', marginBottom: 8 }}>
                ¡Felicidades! 🎉
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: 300 }}>
                Completaste <strong>"{shareModal.title}"</strong>. ¡Comparte tu logro!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={() => handleShare('copy', shareModal)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '14px 20px',
                  background: copied ? '#d1fae5' : '#f9fafb',
                  border: copied ? '1px solid #6ee7b7' : '1px solid #e5e7eb',
                  borderRadius: 12, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.92rem', fontWeight: 400,
                  color: copied ? '#065f46' : '#374151',
                  transition: 'all 0.3s'
                }}
              >
                {copied ? <CheckCircle size={18} color="#10b981" /> : <Copy size={18} color="#6b7280" />}
                {copied ? '¡Copiado al portapapeles!' : 'Copiar texto para compartir'}
              </button>

              <button
                onClick={() => handleShare('linkedin', shareModal)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '14px 20px',
                  background: '#0077b5', border: 'none',
                  borderRadius: 12, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.92rem', fontWeight: 500,
                  color: '#fff', transition: 'all 0.3s'
                }}
              >
                <Linkedin size={18} />
                Compartir en LinkedIn
              </button>

              <button
                onClick={() => handleShare('instagram', shareModal)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  width: '100%', padding: '14px 20px',
                  background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                  border: 'none', borderRadius: 12, cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.92rem', fontWeight: 500,
                  color: '#fff', transition: 'all 0.3s'
                }}
              >
                📸 Copiar para Instagram Story
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
