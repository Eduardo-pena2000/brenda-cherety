import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Users, Star, Play, Sparkles } from 'lucide-react';
import { formatPrice } from '../lib/api';

export default function CourseCard({ course, delay = 0 }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl = course.thumbnail
    ? `/api/files/thumbnail/${course.thumbnail.replace('thumbnails/', '')}`
    : null;

  return (
    <div
      onClick={() => navigate(`/curso/${course.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(0,0,0,0.15)'
          : '0 4px 20px -4px rgba(0,0,0,0.08)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        display: 'flex', flexDirection: 'column', height: '100%',
        animation: `cardFadeIn 0.5s ease-out ${delay}ms backwards`
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

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s'
        }} />

        {/* Play Button */}
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

        {/* Featured Badge */}
        {course.featured && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
            padding: '4px 10px', borderRadius: 9999,
            fontSize: '0.72rem', fontWeight: 500, color: '#ec4899',
            display: 'flex', alignItems: 'center', gap: 4, zIndex: 2
          }}>
            <Sparkles size={11} /> Destacado
          </div>
        )}

        {/* Meta Overlay */}
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
            <BookOpen size={13} /> {course.lessons ? course.lessons.length : 12} lecc.
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

      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
