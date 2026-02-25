import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Trash2, Video, FileText, Upload, BookOpen, X, Save, AlertCircle, Film, File } from 'lucide-react';
import { apiFetch, uploadWithProgress } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminLessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [materialFile, setMaterialFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredLesson, setHoveredLesson] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { loadData(); }, [courseId]);

  async function loadData() {
    try {
      const courseData = await apiFetch(`/courses/admin/${courseId}`);
      setCourse(courseData.course);
      const lessonsData = await apiFetch(`/lessons/course/${courseId}`);
      setLessons(lessonsData.lessons || []);
      setSortOrder((lessonsData.lessons || []).length);
    } catch {} finally { setLoading(false); }
  }

  async function handleCreateLesson(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('course_id', courseId);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('sort_order', String(sortOrder));
      if (videoFile) formData.append('video', videoFile);
      if (materialFile) formData.append('material', materialFile);

      await uploadWithProgress('/api/lessons', formData, token, setUploadProgress);

      setTitle(''); setDescription('');
      setVideoFile(null); setMaterialFile(null);
      setShowForm(false); setUploadProgress(0);
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(lessonId) {
    if (!confirm('¿Eliminar esta lección y sus archivos?')) return;
    setDeletingId(lessonId);
    try {
      await apiFetch(`/lessons/${lessonId}`, { method: 'DELETE' });
      setLessons(lessons.filter(l => l.id !== lessonId));
    } catch (err) { alert(err.message); }
    finally { setDeletingId(null); }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '12px 16px',
    background: focusedField === field ? '#fff' : '#f9fafb',
    border: `2px solid ${focusedField === field ? '#8b5cf6' : '#e5e7eb'}`,
    borderRadius: 12, fontSize: '0.92rem',
    fontFamily: "'Outfit', sans-serif", color: '#1f2937',
    outline: 'none', transition: 'all 0.3s',
    boxShadow: focusedField === field ? '0 0 0 4px rgba(139,92,246,0.1)' : 'none'
  });

  const labelStyle = {
    display: 'block', marginBottom: 6, fontWeight: 500,
    color: '#374151', fontSize: '0.85rem'
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, border: '3px solid #e5e7eb', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#6b7280', fontWeight: 300 }}>Cargando lecciones...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );

  if (!course) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ textAlign: 'center' }}>
        <BookOpen size={56} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ color: '#4b5563', fontWeight: 400 }}>Curso no encontrado</h2>
        <Link to="/admin/cursos" style={{ color: '#8b5cf6' }}>Volver a cursos</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: '2rem 1.5rem 3rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: 180, height: 180, borderRadius: '50%', background: 'rgba(139,92,246,0.1)' }} />
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link to="/admin/cursos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300,
            marginBottom: 16, textDecoration: 'none'
          }}>
            <ArrowLeft size={16} /> Volver a Cursos
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', fontWeight: 300, marginBottom: 4 }}>
                Lecciones de
              </p>
              <h1 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 300, color: '#fff' }}>
                {course.title}
              </h1>
            </div>
            <button onClick={() => setShowForm(!showForm)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px',
              background: showForm ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
              border: 'none', cursor: 'pointer',
              boxShadow: showForm ? 'none' : '0 8px 25px -6px rgba(139,92,246,0.4)',
              transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
            }}>
              {showForm ? <><X size={18} /> Cancelar</> : <><PlusCircle size={18} /> Nueva Lección</>}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 1.5rem', marginTop: -16 }}>
        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px', background: '#fef2f2',
            borderRadius: 12, marginBottom: 20, border: '1px solid #fecaca'
          }}>
            <AlertCircle size={18} color="#dc2626" />
            <span style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        {/* New Lesson Form */}
        {showForm && (
          <div style={{
            background: '#fff', borderRadius: 20, padding: 'clamp(20px, 3vw, 32px)',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.08)', marginBottom: 24,
            border: '1px solid #ede9fe',
            animation: 'slideDown 0.3s ease-out'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#1f2937', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <PlusCircle size={20} color="#8b5cf6" /> Agregar Lección
            </h3>

            <form onSubmit={handleCreateLesson}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Título</label>
                  <input
                    type="text" value={title} required
                    placeholder="Ej: Introducción a la nutrición"
                    onChange={e => setTitle(e.target.value)}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('title')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Orden</label>
                  <input
                    type="number" value={sortOrder} min="0"
                    onChange={e => setSortOrder(Number(e.target.value))}
                    onFocus={() => setFocusedField('order')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle('order'), textAlign: 'center', padding: '12px 8px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Descripción</label>
                <textarea
                  value={description} rows={2}
                  placeholder="Breve descripción de la lección..."
                  onChange={e => setDescription(e.target.value)}
                  onFocus={() => setFocusedField('desc')}
                  onBlur={() => setFocusedField(null)}
                  style={{ ...inputStyle('desc'), resize: 'vertical', minHeight: 70 }}
                />
              </div>

              {/* File uploads */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Video (MP4, WebM)</label>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', background: '#f9fafb',
                    border: '2px dashed #e5e7eb', borderRadius: 12,
                    cursor: 'pointer', transition: 'all 0.3s',
                    fontSize: '0.88rem', color: videoFile ? '#059669' : '#6b7280'
                  }}>
                    <Film size={18} color={videoFile ? '#059669' : '#9ca3af'} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {videoFile ? videoFile.name : 'Seleccionar video'}
                    </span>
                    <input type="file" accept="video/mp4,video/webm,video/quicktime"
                      onChange={e => setVideoFile(e.target.files[0])}
                      style={{ display: 'none' }} />
                  </label>
                </div>
                <div>
                  <label style={labelStyle}>Material PDF</label>
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px', background: '#f9fafb',
                    border: '2px dashed #e5e7eb', borderRadius: 12,
                    cursor: 'pointer', transition: 'all 0.3s',
                    fontSize: '0.88rem', color: materialFile ? '#059669' : '#6b7280'
                  }}>
                    <File size={18} color={materialFile ? '#059669' : '#9ca3af'} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {materialFile ? materialFile.name : 'Seleccionar PDF'}
                    </span>
                    <input type="file" accept="application/pdf"
                      onChange={e => setMaterialFile(e.target.files[0])}
                      style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Progress bar */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div style={{
                  marginBottom: 20, background: '#f3f4f6', borderRadius: 9999,
                  height: 8, overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${uploadProgress}%`, height: '100%',
                    background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                    borderRadius: 9999, transition: 'width 0.3s ease'
                  }} />
                </div>
              )}

              <button type="submit" disabled={saving} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 28px',
                background: saving ? '#9ca3af' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
                border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 25px -6px rgba(139,92,246,0.4)',
                transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
              }}>
                {saving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Subiendo... {uploadProgress}%
                  </>
                ) : (
                  <><Save size={16} /> Agregar Lección</>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Lessons List */}
        {lessons.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: 20, padding: '4rem 2rem',
            textAlign: 'center', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)'
          }}>
            <Video size={56} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ color: '#4b5563', fontSize: '1.2rem', fontWeight: 400, marginBottom: 8 }}>
              No hay lecciones
            </h3>
            <p style={{ color: '#9ca3af', fontWeight: 300 }}>
              Agrega la primera lección a este curso
            </p>
          </div>
        ) : (
          <div style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.06)'
          }}>
            {lessons.map((lesson, i) => (
              <div
                key={lesson.id}
                onMouseEnter={() => setHoveredLesson(lesson.id)}
                onMouseLeave={() => setHoveredLesson(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 24px',
                  borderBottom: i < lessons.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: hoveredLesson === lesson.id ? '#faf5ff' : 'transparent',
                  transition: 'background 0.2s',
                  animation: `fadeInUp 0.3s ease-out ${i * 0.05}s backwards`
                }}
              >
                {/* Number */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #ede9fe, #faf5ff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#7c3aed', fontSize: '0.85rem', fontWeight: 600
                }}>
                  {i + 1}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 500, color: '#1f2937', fontSize: '0.95rem',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                  }}>{lesson.title}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    {lesson.video_path && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 500,
                        background: '#ede9fe', padding: '2px 8px', borderRadius: 6
                      }}>
                        <Film size={11} /> Video
                      </span>
                    )}
                    {lesson.file_path && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: '0.75rem', color: '#059669', fontWeight: 500,
                        background: '#d1fae5', padding: '2px 8px', borderRadius: 6
                      }}>
                        <FileText size={11} /> PDF
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(lesson.id)}
                  disabled={deletingId === lesson.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', background: '#fef2f2', color: '#dc2626',
                    borderRadius: 10, fontSize: '0.82rem', fontWeight: 500,
                    border: 'none', cursor: deletingId === lesson.id ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif",
                    opacity: deletingId === lesson.id ? 0.5 : 1
                  }}
                >
                  <Trash2 size={14} /> Eliminar
                </button>
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
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
