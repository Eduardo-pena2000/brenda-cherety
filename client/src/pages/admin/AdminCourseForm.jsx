import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save, BookOpen, DollarSign, FileText, Image, AlertCircle } from 'lucide-react';
import { apiFetch, uploadWithProgress } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function AdminCourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priceCents, setPriceCents] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (isEditing) {
      apiFetch(`/courses/admin/${id}`)
        .then(data => {
          setTitle(data.course.title);
          setDescription(data.course.description || '');
          setPriceCents(String(data.course.price_cents));
          setCurrency(data.course.currency);
          if (data.course.thumbnail) {
            setThumbnailPreview(`/api/files/thumbnail/${data.course.thumbnail.replace('thumbnails/', '')}`);
          }
        })
        .catch(err => setError(err.message));
    }
  }, [id]);

  function handleThumbnailChange(e) {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      let courseId = id;

      if (isEditing) {
        await apiFetch(`/courses/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, description, price_cents: Number(priceCents), currency }),
        });
      } else {
        const data = await apiFetch('/courses', {
          method: 'POST',
          body: JSON.stringify({ title, description, price_cents: Number(priceCents), currency }),
        });
        courseId = data.course.id;
      }

      if (thumbnail) {
        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        setUploading(true);
        await uploadWithProgress(`/api/courses/${courseId}/thumbnail`, formData, token, () => {});
      }

      navigate('/admin/cursos');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '14px 16px 14px 48px',
    background: focusedField === field ? '#fff' : '#f9fafb',
    border: `2px solid ${focusedField === field ? '#ec4899' : '#e5e7eb'}`,
    borderRadius: 14, fontSize: '0.95rem',
    fontFamily: "'Outfit', sans-serif", color: '#1f2937',
    outline: 'none', transition: 'all 0.3s',
    boxShadow: focusedField === field ? '0 0 0 4px rgba(236,72,153,0.1)' : 'none'
  });

  const labelStyle = {
    display: 'block', marginBottom: 8, fontWeight: 500,
    color: '#374151', fontSize: '0.9rem'
  };

  const iconWrap = (field) => ({
    position: 'absolute', left: 14, top: 14,
    color: focusedField === field ? '#ec4899' : '#9ca3af',
    transition: 'color 0.3s'
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        padding: '2rem 1.5rem 3rem', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: 180, height: 180, borderRadius: '50%', background: 'rgba(139,92,246,0.08)' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <Link to="/admin/cursos" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300,
            marginBottom: 16, textDecoration: 'none'
          }}>
            <ArrowLeft size={16} /> Volver a Cursos
          </Link>
          <h1 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 300, color: '#fff'
          }}>
            {isEditing ? 'Editar' : 'Nuevo'}{' '}
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#f9a8d4' }}>Curso</span>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1.5rem', marginTop: -20 }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: 'clamp(24px, 4vw, 40px)',
          boxShadow: '0 4px 20px -4px rgba(0,0,0,0.08)'
        }}>
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 18px', background: '#fef2f2',
              borderRadius: 12, marginBottom: 24,
              border: '1px solid #fecaca'
            }}>
              <AlertCircle size={18} color="#dc2626" />
              <span style={{ color: '#dc2626', fontSize: '0.9rem' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Título del Curso</label>
              <div style={{ position: 'relative' }}>
                <div style={iconWrap('title')}><BookOpen size={18} /></div>
                <input
                  type="text" value={title} required
                  placeholder="Ej: Nutrición Consciente"
                  onChange={e => setTitle(e.target.value)}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle('title')}
                />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Descripción</label>
              <div style={{ position: 'relative' }}>
                <div style={{ ...iconWrap('desc'), top: 16 }}><FileText size={18} /></div>
                <textarea
                  value={description} rows={4}
                  placeholder="Describe el contenido del curso..."
                  onChange={e => setDescription(e.target.value)}
                  onFocus={() => setFocusedField('desc')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle('desc'),
                    resize: 'vertical', minHeight: 120
                  }}
                />
              </div>
            </div>

            {/* Price + Currency Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={labelStyle}>Precio (centavos, ej: 2999 = $29.99)</label>
                <div style={{ position: 'relative' }}>
                  <div style={iconWrap('price')}><DollarSign size={18} /></div>
                  <input
                    type="number" value={priceCents} required min="0"
                    placeholder="2999"
                    onChange={e => setPriceCents(e.target.value)}
                    onFocus={() => setFocusedField('price')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('price')}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Moneda</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: '#f9fafb', border: '2px solid #e5e7eb',
                    borderRadius: 14, fontSize: '0.95rem',
                    fontFamily: "'Outfit', sans-serif", color: '#1f2937',
                    outline: 'none', cursor: 'pointer', appearance: 'auto'
                  }}
                >
                  <option value="usd">USD</option>
                  <option value="mxn">MXN</option>
                  <option value="eur">EUR</option>
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>Imagen del Curso</label>
              <div style={{
                border: '2px dashed #e5e7eb', borderRadius: 16,
                padding: 24, textAlign: 'center',
                background: '#fafafa', cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden'
              }}
                onClick={() => document.getElementById('thumbnail-input').click()}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f9a8d4'; e.currentTarget.style.background = '#fdf2f8'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#fafafa'; }}
              >
                {thumbnailPreview ? (
                  <div>
                    <img src={thumbnailPreview} alt="Preview" style={{
                      maxHeight: 200, borderRadius: 12, margin: '0 auto',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} />
                    <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: 12, fontWeight: 300 }}>
                      Click para cambiar imagen
                    </p>
                  </div>
                ) : (
                  <div>
                    <div style={{
                      width: 56, height: 56, borderRadius: 14,
                      background: 'linear-gradient(135deg, #fce7f3, #faf5ff)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Image size={24} color="#ec4899" />
                    </div>
                    <p style={{ color: '#6b7280', fontWeight: 400, fontSize: '0.95rem' }}>
                      Click para subir imagen
                    </p>
                    <p style={{ color: '#9ca3af', fontSize: '0.82rem', fontWeight: 300, marginTop: 4 }}>
                      JPG, PNG o WebP
                    </p>
                  </div>
                )}
                <input
                  id="thumbnail-input"
                  type="file" accept="image/jpeg,image/png,image/webp"
                  onChange={handleThumbnailChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" disabled={saving || uploading} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px',
                background: (saving || uploading)
                  ? '#9ca3af'
                  : 'linear-gradient(135deg, #ec4899, #d946ef)',
                color: '#fff', borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
                border: 'none', cursor: (saving || uploading) ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 25px -6px rgba(236,72,153,0.4)',
                transition: 'all 0.3s', fontFamily: "'Outfit', sans-serif"
              }}>
                {saving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    {uploading ? 'Subiendo imagen...' : 'Guardando...'}
                  </>
                ) : (
                  <><Save size={18} /> {isEditing ? 'Actualizar Curso' : 'Crear Curso'}</>
                )}
              </button>

              <button type="button" onClick={() => navigate('/admin/cursos')} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', background: '#f3f4f6', color: '#4b5563',
                borderRadius: 14, fontSize: '0.95rem', fontWeight: 500,
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                fontFamily: "'Outfit', sans-serif"
              }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
