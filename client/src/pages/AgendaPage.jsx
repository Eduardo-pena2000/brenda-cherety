import { Calendar, Clock, Video, MessageCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgendaPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fdf2f8, #ffffff, #faf5ff)' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #ec4899, #d946ef, #a855f7)',
                padding: '4rem 1.5rem 5rem', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '10%', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '8px 18px', borderRadius: 9999, marginBottom: 20 }}>
                        <Calendar size={16} color="#fff" />
                        <span style={{ fontSize: '0.82rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', fontWeight: 500 }}>Agenda en línea</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2, marginBottom: 12 }}>
                        Reserva tu{' '}
                        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>Consulta</span>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', fontWeight: 300, maxWidth: 500, margin: '0 auto' }}>
                        Elige el día y horario que mejor te funcione. Sin formularios, sin esperas.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', marginTop: '-2rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }} className="agenda-grid">
                    {/* Calendly Embed */}
                    <div style={{
                        background: '#fff', borderRadius: 24, overflow: 'hidden',
                        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.1)',
                        minHeight: 650
                    }}>
                        <iframe
                            src="https://calendly.com/brenda-cherety"
                            style={{ width: '100%', height: '100%', minHeight: 650, border: 'none' }}
                            title="Agenda una cita con Brenda Cherety"
                        />
                    </div>

                    {/* Sidebar Benefits */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Pricing Card */}
                        <div style={{
                            background: '#fff', borderRadius: 20, padding: 28,
                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
                            border: '1px solid #fce7f3'
                        }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: 16 }}>
                                Consulta Nutricional
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 300, color: '#ec4899' }}>$1,500</span>
                                <span style={{ fontSize: '0.92rem', color: '#9ca3af', fontWeight: 300 }}>MXN</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                                {[
                                    { icon: Clock, text: 'Sesión de 45-60 minutos' },
                                    { icon: Video, text: 'Online o presencial' },
                                    { icon: MessageCircle, text: 'Seguimiento por WhatsApp' },
                                    { icon: CheckCircle, text: 'Plan personalizado incluido' },
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <item.icon size={16} color="#ec4899" />
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 400 }}>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Card */}
                        <div style={{
                            background: 'linear-gradient(135deg, #1f2937, #111827)',
                            borderRadius: 20, padding: 28
                        }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', marginBottom: 16 }}>
                                ¿Por qué elegirme?
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    'Más de 10 años de experiencia clínica',
                                    'Enfoque basado en ciencia, sin dietas de moda',
                                    'Más de 5,000 pacientes atendidas',
                                    'Seguimiento continuo post-consulta',
                                ].map((text, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                        <CheckCircle size={16} color="#34d399" style={{ flexShrink: 0, marginTop: 2 }} />
                                        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Alt CTA */}
                        <div style={{
                            background: '#fff', borderRadius: 20, padding: 24, textAlign: 'center',
                            border: '1px solid #f3f4f6'
                        }}>
                            <p style={{ fontSize: '0.92rem', color: '#6b7280', fontWeight: 300, marginBottom: 16 }}>
                                ¿Prefieres contarme tu caso primero?
                            </p>
                            <Link to="/consulta" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '12px 24px', border: '2px solid #ec4899',
                                color: '#ec4899', borderRadius: 12, fontSize: '0.9rem', fontWeight: 500,
                                textDecoration: 'none', transition: 'all 0.3s'
                            }}>
                                Llenar formulario <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .agenda-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .agenda-grid {
            grid-template-columns: 1fr 340px;
          }
        }
      `}</style>

            <div style={{ height: '4rem' }} />
        </div>
    );
}
