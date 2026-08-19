import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, CheckCircle, PlusCircle, Settings, Users, TrendingUp, Eye } from 'lucide-react';
import { apiFetch } from '../../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, published: 0, draft: 0 });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/courses/admin/all')
      .then(data => {
        const c = data.courses || [];
        setCourses(c);
        setStats({
          courses: c.length,
          published: c.filter(x => x.is_published).length,
          draft: c.filter(x => !x.is_published).length,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#f9fafb'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48, height: 48, border: '3px solid #e5e7eb',
          borderTopColor: 'var(--primary-deep)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
        }} />
        <p style={{ color: '#6b7280', fontWeight: 300 }}>Cargando panel...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  const statCards = [
    { label: 'Total Cursos', value: stats.courses, icon: BookOpen, color: 'var(--accent)', bg: '#ede9fe' },
    { label: 'Publicados', value: stats.published, icon: CheckCircle, color: '#10b981', bg: '#d1fae5' },
    { label: 'Borradores', value: stats.draft, icon: Eye, color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Pacientes', value: '2.5k+', icon: Users, color: 'var(--primary-deep)', bg: 'var(--primary-light)' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: '2.5rem 1rem 3.5rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(116,150,149,0.1)'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '20%',
          width: 150, height: 150, borderRadius: '50%',
          background: 'rgba(116,150,149,0.08)'
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 0.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <BarChart3 size={24} color="var(--primary)" />
            <span style={{
              fontSize: '0.8rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase', fontWeight: 500
            }}>Administración</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 300, color: '#fff',
            marginBottom: 4
          }}>
            Panel de{' '}
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'var(--primary)' }}>
              Control
            </span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
            Gestiona tus cursos, lecciones y contenido
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {statCards.map((s, i) => (
            <div key={i} className="admin-stat-card" style={{
              animation: `fadeInUp 0.4s ease-out ${i * 0.08}s backwards`
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <s.icon size={22} color={s.color} />
              </div>
              <div>
                <p style={{ fontSize: '1.6rem', fontWeight: 300, color: '#1f2937', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 400, marginTop: 2 }}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937', marginBottom: 20 }}>
            Acciones Rápidas
          </h2>
          <div className="admin-actions-grid">
            <Link to="/admin/cursos" className="admin-action-card"
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, var(--primary-light), var(--primary-50))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Settings size={20} color="var(--primary-deep)" />
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.95rem' }}>Gestionar Cursos</p>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 300 }}>Edita, publica o elimina cursos</p>
              </div>
            </Link>

            <Link to="/admin/cursos/nuevo" className="admin-action-card"
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#a78bfa'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'linear-gradient(135deg, #ede9fe, var(--accent-50))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <PlusCircle size={20} color="var(--accent)" />
              </div>
              <div>
                <p style={{ fontWeight: 500, color: '#1f2937', fontSize: '0.95rem' }}>Crear Nuevo Curso</p>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', fontWeight: 300 }}>Agrega contenido a tu plataforma</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Courses */}
        {courses.length > 0 && (
          <div style={{ marginTop: 40, paddingBottom: 60 }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1f2937', marginBottom: 20 }}>
              Cursos Recientes
            </h2>
            <div style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 2px 12px -2px rgba(0,0,0,0.06)'
            }}>
              {courses.slice(0, 5).map((course, i) => (
                <Link key={course.id} to={`/admin/cursos/${course.id}/editar`} className="admin-recent-row"
                  style={{
                    borderBottom: i < Math.min(courses.length, 5) - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, overflow: 'hidden',
                    background: 'linear-gradient(135deg, var(--primary-light), var(--accent-light))', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {course.thumbnail ? (
                      <img src={`/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`}
                        alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <BookOpen size={18} color="var(--primary-deep)" />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontWeight: 450, color: '#1f2937', fontSize: '0.92rem',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}>{course.title}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 500,
                    background: course.is_published ? '#d1fae5' : '#fef3c7',
                    color: course.is_published ? '#059669' : '#d97706',
                    flexShrink: 0
                  }}>
                    {course.is_published ? 'Publicado' : 'Borrador'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 32px;
        }

        .admin-stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px 16px;
          box-shadow: 0 4px 20px -4px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .admin-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .admin-action-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 12px -2px rgba(0,0,0,0.06);
          text-decoration: none;
          transition: all 0.3s;
          border: 1px solid transparent;
        }

        .admin-recent-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          text-decoration: none;
          transition: background 0.2s;
        }

        @media (max-width: 768px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .admin-stat-card {
            padding: 16px 12px;
            gap: 10px;
          }
          .admin-stat-card p:first-child {
            font-size: 1.3rem !important;
          }
          .admin-actions-grid {
            grid-template-columns: 1fr;
          }
          .admin-action-card {
            padding: 16px;
          }
          .admin-recent-row {
            padding: 12px 16px;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
