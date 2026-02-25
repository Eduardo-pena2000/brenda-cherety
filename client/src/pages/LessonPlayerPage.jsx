import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, BookOpen, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';

export default function LessonPlayerPage() {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [justCompleted, setJustCompleted] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Load progress from localStorage
  const getProgress = (cId) => {
    try {
      return JSON.parse(localStorage.getItem(`lesson_progress_${cId}`)) || [];
    } catch { return []; }
  };

  const saveProgress = (cId, completed) => {
    localStorage.setItem(`lesson_progress_${cId}`, JSON.stringify(completed));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiFetch(`/courses/public/${courseId}`);
        setCourse(data.course);
        setLessons(data.lessons || []);
        const lesson = (data.lessons || []).find(l => l.id === parseInt(lessonId));
        setCurrentLesson(lesson || (data.lessons || [])[0]);
        setCompletedLessons(getProgress(courseId));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    setJustCompleted(false);
  }, [courseId, lessonId]);

  const handleMarkComplete = () => {
    const lid = parseInt(lessonId);
    if (completedLessons.includes(lid)) return;
    const updated = [...completedLessons, lid];
    setCompletedLessons(updated);
    saveProgress(courseId, updated);
    setJustCompleted(true);

    // Auto-advance to next lesson after 1.5s
    const currentIndex = lessons.findIndex(l => l.id === lid);
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      setTimeout(() => {
        navigate(`/clase/${courseId}/${nextLesson.id}`);
      }, 1500);
    }
  };

  const isLessonCompleted = (lid) => completedLessons.includes(lid);

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#111827'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '3px solid #374151',
          borderTopColor: '#ec4899', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ color: '#6b7280', fontSize: '1.1rem', fontWeight: 300 }}>Cargando clase...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (!course || !currentLesson) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#111827', textAlign: 'center'
    }}>
      <div>
        <BookOpen size={64} color="#374151" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ color: '#9ca3af', fontSize: '1.5rem', fontWeight: 300, marginBottom: 8 }}>Clase no encontrada</h2>
        <Link to="/mis-cursos" style={{ color: '#ec4899', fontWeight: 500, textDecoration: 'none' }}>Volver a mis cursos</Link>
      </div>
    </div>
  );

  const videoUrl = `/api/files/video/${currentLesson.id}?token=${token}`;
  const currentIndex = lessons.findIndex(l => l.id === parseInt(lessonId));
  const currentIsCompleted = isLessonCompleted(parseInt(lessonId));
  const allCompleted = lessons.length > 0 && lessons.every(l => completedLessons.includes(l.id));

  return (
    <div style={{
      minHeight: '100vh', background: '#111827', color: '#fff', paddingBottom: '4rem'
    }}>
      {/* Top Bar */}
      <div style={{
        background: 'rgba(17,24,39,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 1.5rem',
        position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <button onClick={() => navigate('/mis-cursos')} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#9ca3af', fontSize: '0.9rem', fontWeight: 300,
            background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.3s', fontFamily: "'Outfit', sans-serif"
          }}>
            <ArrowLeft size={18} /> Volver
          </button>
          <p style={{
            color: '#9ca3af', fontSize: '0.85rem', fontWeight: 300,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            maxWidth: '50%', textAlign: 'center'
          }}>
            {course.title}
          </p>
          <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
            {currentIndex + 1} / {lessons.length}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ maxWidth: 1440, margin: '8px auto 0', height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{
            width: `${lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0}%`,
            height: '100%', background: 'linear-gradient(90deg, #ec4899, #a855f7)',
            borderRadius: 9999, transition: 'width 0.6s ease'
          }} />
        </div>
      </div>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }} className="lesson-grid">
          {/* Main Player Area */}
          <div>
            {/* Video */}
            <div style={{
              position: 'relative', paddingTop: '56.25%',
              background: '#000', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)'
            }}>
              {currentLesson.video_path ? (
                <video
                  key={currentLesson.id}
                  src={videoUrl}
                  controls
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%', objectFit: 'contain'
                  }}
                />
              ) : (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #1f2937, #111827)',
                  flexDirection: 'column', gap: 12
                }}>
                  <Play size={56} color="#374151" />
                  <p style={{ color: '#4b5563', fontSize: '0.95rem', fontWeight: 300 }}>
                    Esta lección no tiene video
                  </p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div style={{ marginTop: 28 }}>
              <h1 style={{
                fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300,
                color: '#fff', marginBottom: 6
              }}>{currentLesson.title}</h1>
              <p style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 300 }}>
                {course.title}
              </p>

              {/* Description Card */}
              <div style={{
                marginTop: 24, padding: 24,
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h3 style={{
                  fontSize: '1rem', fontWeight: 500, color: '#d1d5db', marginBottom: 10
                }}>Descripción</h3>
                <p style={{
                  color: '#9ca3af', fontWeight: 300, lineHeight: 1.7, fontSize: '0.95rem'
                }}>
                  {currentLesson.description || 'Sin descripción disponible.'}
                </p>
              </div>

              {/* ===== MARK AS COMPLETED BUTTON ===== */}
              <div style={{ marginTop: 20 }}>
                {currentIsCompleted ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '14px 24px',
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.2)',
                    borderRadius: 12
                  }}>
                    <CheckCircle size={20} color="#34d399" />
                    <span style={{ color: '#34d399', fontWeight: 500, fontSize: '0.95rem' }}>
                      {justCompleted ? '¡Lección completada! 🎉' : 'Lección completada'}
                    </span>
                    {justCompleted && currentIndex < lessons.length - 1 && (
                      <span style={{ color: '#6b7280', fontSize: '0.85rem', fontWeight: 300, marginLeft: 'auto' }}>
                        Avanzando a la siguiente...
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleMarkComplete}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      width: '100%', padding: '14px 24px',
                      background: 'linear-gradient(135deg, #ec4899, #d946ef)',
                      color: '#fff', borderRadius: 12, fontSize: '0.95rem', fontWeight: 500,
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)',
                      transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px -6px rgba(236,72,153,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px -6px rgba(236,72,153,0.4)'; }}
                  >
                    <CheckCircle size={18} />
                    Marcar como completada
                    {currentIndex < lessons.length - 1 && (
                      <ChevronRight size={16} style={{ opacity: 0.7 }} />
                    )}
                  </button>
                )}

                {/* Show "all completed" celebration */}
                {allCompleted && (
                  <div style={{
                    marginTop: 16, padding: '16px 24px',
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(139,92,246,0.1))',
                    border: '1px solid rgba(236,72,153,0.2)',
                    borderRadius: 12, textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#f472b6', marginBottom: 4 }}>
                      🎓 ¡Felicidades! Has completado todas las lecciones
                    </p>
                    <Link to="/mis-cursos" style={{ color: '#a78bfa', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 400 }}>
                      Ver tu certificado en Mis Cursos →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar / Playlist */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
            padding: 20, height: 'fit-content',
            maxHeight: 'calc(100vh - 120px)', overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 20, paddingBottom: 16,
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <BookOpen size={18} color="#ec4899" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#e5e7eb', flex: 1 }}>
                Contenido del curso
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                {completedLessons.length}/{lessons.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {lessons.map((lesson, index) => {
                const isActive = lesson.id === parseInt(lessonId);
                const isCompleted = isLessonCompleted(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    to={`/clase/${courseId}/${lesson.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px', borderRadius: 12,
                      background: isActive
                        ? 'rgba(236,72,153,0.12)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(236,72,153,0.2)'
                        : '1px solid transparent',
                      textDecoration: 'none',
                      transition: 'all 0.3s'
                    }}
                  >
                    {/* Number/Play/Check icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: isCompleted
                        ? 'rgba(52,211,153,0.15)'
                        : isActive
                          ? 'rgba(236,72,153,0.2)'
                          : 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: isCompleted
                        ? '#34d399'
                        : isActive ? '#f472b6' : '#6b7280',
                      transition: 'all 0.3s'
                    }}>
                      {isCompleted ? (
                        <CheckCircle size={15} />
                      ) : isActive ? (
                        <Play size={13} fill="currentColor" />
                      ) : (
                        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{index + 1}</span>
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: '0.88rem', fontWeight: isActive ? 500 : 400,
                        color: isCompleted ? '#34d399' : isActive ? '#f472b6' : '#d1d5db',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        transition: 'color 0.3s',
                        textDecoration: isCompleted && !isActive ? 'line-through' : 'none',
                        textDecorationColor: 'rgba(52,211,153,0.3)'
                      }}>
                        {lesson.title}
                      </p>
                      <p style={{
                        fontSize: '0.75rem', color: '#6b7280', marginTop: 2,
                        display: 'flex', alignItems: 'center', gap: 4
                      }}>
                        <Clock size={11} /> {lesson.duration || '10:00'} min
                      </p>
                    </div>

                    {/* Active/Completed indicator */}
                    {isActive && !isCompleted && (
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: '#ec4899', flexShrink: 0
                      }} />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .lesson-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .lesson-grid {
            grid-template-columns: 1fr 340px;
          }
        }
      `}</style>
    </div>
  );
}
