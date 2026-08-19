import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit3, Trash2, BookOpen, Eye, EyeOff, ArrowLeft, Layers } from 'lucide-react';
import { apiFetch, formatPrice } from '../../lib/api';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => { loadCourses(); }, []);

  async function loadCourses() {
    try {
      const data = await apiFetch('/courses/admin/all');
      setCourses(data.courses || []);
    } catch {} finally { setLoading(false); }
  }

  async function handleDelete(id) {
    if (!confirm('¿Estás seguro de eliminar este curso? Se eliminarán todas sus lecciones y archivos.')) return;
    setActionLoading(id);
    try {
      await apiFetch(`/courses/${id}`, { method: 'DELETE' });
      setCourses(courses.filter(c => c.id !== id));
    } catch (err) { alert(err.message); }
    finally { setActionLoading(null); }
  }

  async function togglePublish(course) {
    setActionLoading(course.id);
    try {
      await apiFetch(`/courses/${course.id}`, {
        method: 'PUT',
        body: JSON.stringify({ is_published: course.is_published ? 0 : 1 }),
      });
      await loadCourses();
    } catch (err) { alert(err.message); }
    finally { setActionLoading(null); }
  }

  const btnStyle = (bg, color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 14px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 500,
    background: bg, color: color, border: 'none', cursor: 'pointer',
    transition: 'all 0.2s', textDecoration: 'none',
    fontFamily: "'Outfit', sans-serif"
  });

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid #e5e7eb', borderTopColor: 'var(--primary-deep)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280', fontWeight: 300 }}>Cargando cursos...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  return (
    <div className="admin-courses-page">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: '2rem 1.5rem 3rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: 180, height: 180, borderRadius: '50%', background: 'rgba(116,150,149,0.08)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link to="/admin" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300,
            marginBottom: 16, textDecoration: 'none'
          }}>
            <ArrowLeft size={16} /> Panel de Control
          </Link>
          <div className="admin-header-row">
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#fff' }}>
              Gestionar{' '}
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: 'var(--primary)' }}>Cursos</span>
            </h1>
            <Link to="/admin/cursos/nuevo" className="admin-new-btn">
              <PlusCircle size={18} /> Nuevo Curso
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1rem', marginTop: 32 }}>
        {courses.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: 20, padding: '4rem 2rem',
            textAlign: 'center', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)'
          }}>
            <BookOpen size={56} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#4b5563', fontSize: '1.2rem', fontWeight: 400, marginBottom: 8 }}>
              No hay cursos creados
            </h3>
            <p style={{ color: '#9ca3af', fontWeight: 300, marginBottom: 24 }}>
              Comienza creando tu primer curso
            </p>
            <Link to="/admin/cursos/nuevo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: 'linear-gradient(135deg, var(--primary-deep), var(--primary-deep))',
              color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none'
            }}>
              <PlusCircle size={18} /> Crear Curso
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table — hidden on mobile */}
            <div className="admin-table-desktop">
              <div style={{
                background: '#fff', borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)'
              }}>
                {/* Table Header */}
                <div className="admin-table-header">
                  <span>Curso</span>
                  <span>Precio</span>
                  <span>Estado</span>
                  <span style={{ textAlign: 'right' }}>Acciones</span>
                </div>

                {/* Rows */}
                {courses.map((course, i) => (
                  <div
                    key={course.id}
                    className="admin-table-row"
                    onMouseEnter={() => setHoveredRow(course.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      borderBottom: i < courses.length - 1 ? '1px solid #f3f4f6' : 'none',
                      background: hoveredRow === course.id ? 'var(--primary-50)' : 'transparent',
                      animation: `fadeInUp 0.3s ease-out ${i * 0.05}s backwards`
                    }}
                  >
                    {/* Title with thumbnail */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                        background: 'linear-gradient(135deg, var(--primary-light), var(--accent-light))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {course.thumbnail ? (
                          <img src={`/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`}
                            alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <BookOpen size={18} color="var(--primary-deep)" />
                        )}
                      </div>
                      <span style={{
                        fontWeight: 450, color: '#1f2937', fontSize: '0.92rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>{course.title}</span>
                    </div>

                    {/* Price */}
                    <span style={{ color: '#6b7280', fontSize: '0.9rem', fontWeight: 400 }}>
                      {formatPrice(course.price_cents, course.currency)}
                    </span>

                    {/* Status */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      padding: '4px 10px', borderRadius: 9999, fontSize: '0.72rem', fontWeight: 500,
                      background: course.is_published ? '#d1fae5' : '#fef3c7',
                      color: course.is_published ? '#059669' : '#d97706',
                      width: 'fit-content'
                    }}>
                      {course.is_published ? 'Publicado' : 'Borrador'}
                    </span>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      <Link to={`/admin/cursos/${course.id}/editar`} style={btnStyle('#f3f4f6', '#4b5563')}>
                        <Edit3 size={14} /> Editar
                      </Link>
                      <Link to={`/admin/cursos/${course.id}/lecciones`} style={btnStyle('#ede9fe', '#7c3aed')}>
                        <Layers size={14} /> Lecciones
                      </Link>
                      <button
                        onClick={() => togglePublish(course)}
                        disabled={actionLoading === course.id}
                        style={btnStyle(
                          course.is_published ? '#fef3c7' : '#d1fae5',
                          course.is_published ? '#d97706' : '#059669'
                        )}
                      >
                        {course.is_published ? <><EyeOff size={14} /> Ocultar</> : <><Eye size={14} /> Publicar</>}
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        disabled={actionLoading === course.id}
                        style={btnStyle('#fef2f2', '#dc2626')}
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Cards — hidden on desktop */}
            <div className="admin-cards-mobile">
              {courses.map((course, i) => (
                <div key={course.id} className="admin-course-card" style={{
                  animation: `fadeInUp 0.3s ease-out ${i * 0.05}s backwards`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--primary-light), var(--accent-light))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {course.thumbnail ? (
                        <img src={`/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`}
                          alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <BookOpen size={20} color="var(--primary-deep)" />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: 500, color: '#1f2937', fontSize: '0.95rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      }}>{course.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                          {formatPrice(course.price_cents, course.currency)}
                        </span>
                        <span style={{
                          padding: '2px 8px', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 500,
                          background: course.is_published ? '#d1fae5' : '#fef3c7',
                          color: course.is_published ? '#059669' : '#d97706'
                        }}>
                          {course.is_published ? 'Publicado' : 'Borrador'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Link to={`/admin/cursos/${course.id}/editar`} style={btnStyle('#f3f4f6', '#4b5563')}>
                      <Edit3 size={14} /> Editar
                    </Link>
                    <Link to={`/admin/cursos/${course.id}/lecciones`} style={btnStyle('#ede9fe', '#7c3aed')}>
                      <Layers size={14} /> Lecciones
                    </Link>
                    <button
                      onClick={() => togglePublish(course)}
                      disabled={actionLoading === course.id}
                      style={btnStyle(
                        course.is_published ? '#fef3c7' : '#d1fae5',
                        course.is_published ? '#d97706' : '#059669'
                      )}
                    >
                      {course.is_published ? <><EyeOff size={14} /> Ocultar</> : <><Eye size={14} /> Publicar</>}
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      disabled={actionLoading === course.id}
                      style={btnStyle('#fef2f2', '#dc2626')}
                    >
                      <Trash2 size={14} /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .admin-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .admin-new-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, var(--primary-deep), var(--primary-deep));
          color: #fff;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          box-shadow: 0 8px 25px -6px rgba(116,150,149,0.4);
          transition: all 0.3s;
        }

        .admin-table-header {
          display: grid;
          grid-template-columns: 1fr 120px 100px 1fr;
          gap: 16px;
          padding: 14px 24px;
          background: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.78rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .admin-table-row {
          display: grid;
          grid-template-columns: 1fr 120px 100px 1fr;
          gap: 16px;
          padding: 16px 24px;
          align-items: center;
          transition: background 0.2s;
        }

        .admin-cards-mobile {
          display: none;
        }

        .admin-course-card {
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 12px -2px rgba(0,0,0,0.06);
        }

        @media (max-width: 768px) {
          .admin-table-desktop { display: none !important; }
          .admin-cards-mobile { display: block !important; }
          .admin-new-btn {
            padding: 10px 18px;
            font-size: 0.85rem;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
