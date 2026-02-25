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

  const btnStyle = (bg, color, hoverBg) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 14px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 500,
    background: bg, color: color, border: 'none', cursor: 'pointer',
    transition: 'all 0.2s', textDecoration: 'none',
    fontFamily: "'Outfit', sans-serif"
  });

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid #e5e7eb', borderTopColor: '#ec4899', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280', fontWeight: 300 }}>Cargando cursos...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: '2rem 1.5rem 3rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: 180, height: 180, borderRadius: '50%', background: 'rgba(236,72,153,0.08)' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link to="/admin" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300,
            marginBottom: 16, textDecoration: 'none'
          }}>
            <ArrowLeft size={16} /> Panel de Control
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#fff' }}>
              Gestionar{' '}
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#f9a8d4' }}>Cursos</span>
            </h1>
            <Link to="/admin/cursos/nuevo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: 'linear-gradient(135deg, #ec4899, #d946ef)',
              color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none', boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)',
              transition: 'all 0.3s'
            }}>
              <PlusCircle size={18} /> Nuevo Curso
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', marginTop: -16 }}>
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
              padding: '12px 24px', background: 'linear-gradient(135deg, #ec4899, #d946ef)',
              color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none'
            }}>
              <PlusCircle size={18} /> Crear Curso
            </Link>
          </div>
        ) : (
          <div style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)'
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 120px 100px 1fr',
              gap: 16, padding: '14px 24px',
              background: '#f9fafb', borderBottom: '1px solid #f3f4f6',
              fontSize: '0.78rem', fontWeight: 600, color: '#9ca3af',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              <span>Curso</span>
              <span>Precio</span>
              <span>Estado</span>
              <span style={{ textAlign: 'right' }}>Acciones</span>
            </div>

            {/* Rows */}
            {courses.map((course, i) => (
              <div
                key={course.id}
                onMouseEnter={() => setHoveredRow(course.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr 120px 100px 1fr',
                  gap: 16, padding: '16px 24px', alignItems: 'center',
                  borderBottom: i < courses.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: hoveredRow === course.id ? '#fdf2f8' : 'transparent',
                  transition: 'background 0.2s',
                  animation: `fadeInUp 0.3s ease-out ${i * 0.05}s backwards`
                }}
              >
                {/* Title with thumbnail */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                    background: 'linear-gradient(135deg, #fce7f3, #e9d5ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {course.thumbnail ? (
                      <img src={`/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`}
                        alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <BookOpen size={18} color="#d946ef" />
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
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .admin-courses div[style*="grid-template-columns: 1fr 120px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
