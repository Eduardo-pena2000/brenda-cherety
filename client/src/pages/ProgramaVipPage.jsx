import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Star, CheckCircle, ArrowRight, Sparkles, Shield, Users, Zap, Heart, MessageCircle, CalendarCheck, Send } from 'lucide-react';

export default function ProgramaVipPage() {
    const [form, setForm] = useState({ name: '', email: '', goal: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setSubmitted(true);
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0f0f14' }}>
            {/* Hero */}
            <section style={{
                padding: 'clamp(5rem, 10vw, 8rem) 1.5rem clamp(4rem, 8vw, 6rem)',
                position: 'relative', overflow: 'hidden', textAlign: 'center'
            }}>
                {/* Background effects */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15), transparent 60%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1), transparent 50%)' }} />
                <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)', filter: 'blur(40px)' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'linear-gradient(135deg, rgba(251,191,36,0.15), rgba(168,85,247,0.15))',
                        border: '1px solid rgba(251,191,36,0.3)',
                        padding: '8px 20px', borderRadius: 9999, marginBottom: 28
                    }}>
                        <Crown size={16} color="#fbbf24" />
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fbbf24', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Cupos limitados</span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 300, color: '#fff',
                        lineHeight: 1.15, marginBottom: 20
                    }}>
                        Programa{' '}
                        <span style={{
                            fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic',
                            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Intensivo VIP</span>
                    </h1>

                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.15rem', fontWeight: 300, lineHeight: 1.7, maxWidth: 600, margin: '0 auto 32px' }}>
                        Una experiencia exclusiva y personalizada para quienes buscan resultados transformadores con acompañamiento premium.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
                        {[
                            { num: '12', label: 'semanas' },
                            { num: '1:1', label: 'personalizado' },
                            { num: '24/7', label: 'soporte' },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: '12px 24px', borderRadius: 16,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)'
                            }}>
                                <p style={{ fontSize: '1.5rem', fontWeight: 300, color: '#fbbf24', lineHeight: 1 }}>{s.num}</p>
                                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <a href="#aplicar" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '16px 36px',
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: '#1f2937', borderRadius: 14,
                        fontSize: '1rem', fontWeight: 600,
                        textDecoration: 'none',
                        boxShadow: '0 12px 35px -8px rgba(251,191,36,0.4)',
                        transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 45px -8px rgba(251,191,36,0.5)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 35px -8px rgba(251,191,36,0.4)'; }}
                    >
                        Quiero aplicar <ArrowRight size={18} />
                    </a>
                </div>
            </section>

            {/* ¿Qué incluye? */}
            <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'linear-gradient(180deg, #0f0f14, #1a1a24)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>Todo incluido</span>
                        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
                            ¿Qué incluye el{' '}
                            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#fbbf24' }}>programa?</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                        {[
                            { icon: CalendarCheck, title: '12 Sesiones 1 a 1', desc: 'Una sesión semanal de 60 min vía Zoom con plan de acción personalizado.', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
                            { icon: Zap, title: 'Plan Nutricional a Medida', desc: 'Menús semanales adaptados a tus gustos, alergias, horarios y presupuesto.', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.2)' },
                            { icon: MessageCircle, title: 'WhatsApp Directo', desc: 'Acceso 24/7 para dudas, ajustes y motivación. Respuesta en menos de 2 horas.', color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
                            { icon: Shield, title: 'Análisis de Laboratorios', desc: 'Interpretación profesional de tus estudios para ajustar el plan a tu bioquímica.', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
                            { icon: Heart, title: 'Soporte Emocional', desc: 'Acompañamiento en tu relación con la comida. Sin culpa, sin presión.', color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.2)' },
                            { icon: Sparkles, title: 'Acceso a Todos los Cursos', desc: 'Mientras seas VIP tendrás acceso completo a todo el catálogo de cursos.', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: item.bg, border: `1px solid ${item.border}`,
                                borderRadius: 20, padding: 24,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                animation: `fadeInUp 0.5s ease-out ${i * 0.08}s backwards`
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px -10px ${item.color}30`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, border: `1px solid ${item.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <item.icon size={22} color={item.color} />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonios VIP */}
            <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: '#0f0f14' }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <span style={{ fontSize: '0.82rem', letterSpacing: '0.2em', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>Resultados VIP</span>
                        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
                            Historias de{' '}
                            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#fbbf24' }}>éxito</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
                        {[
                            { name: 'Daniela M.', result: '-18 kg en 12 semanas', quote: 'El programa VIP cambió todo. Tener a Brenda disponible por WhatsApp fue clave. Nunca me sentí sola en el proceso.', color: '#fbbf24' },
                            { name: 'Fernanda L.', result: 'Sin ansiedad por comer', quote: 'Llevaba años con relación tóxica con la comida. El enfoque de Brenda me devolvió la paz y la libertad de disfrutar comer.', color: '#ec4899' },
                            { name: 'Lucía G.', result: 'Energía todo el día', quote: 'Mi esposo y mis hijos notaron el cambio. Estoy más activa, duermo mejor y cocino con ingredientes que jamás imaginé.', color: '#34d399' },
                        ].map((t, i) => (
                            <div key={i} style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 20, padding: 28,
                                display: 'flex', flexDirection: 'column', gap: 16
                            }}>
                                <div style={{ display: 'flex', gap: 3 }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />)}
                                </div>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.7, fontStyle: 'italic' }}>
                                    "{t.quote}"
                                </p>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}, ${t.color}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 500 }}>{t.name}</p>
                                        <p style={{ color: t.color, fontSize: '0.8rem', fontWeight: 500 }}>{t.result}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Formulario de Aplicación */}
            <section id="aplicar" style={{
                padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
                background: 'linear-gradient(180deg, #1a1a24, #0f0f14)'
            }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)',
                            padding: '8px 18px', borderRadius: 9999, marginBottom: 20
                        }}>
                            <Crown size={16} color="#fbbf24" />
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fbbf24', letterSpacing: '0.1em' }}>SOLICITUD DE INGRESO</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 300, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
                            Aplica al programa{' '}
                            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#fbbf24' }}>VIP</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', fontWeight: 300 }}>
                            No cualquiera puede entrar. Queremos asegurarnos de que este programa sea ideal para ti.
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 24, padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                            display: 'flex', flexDirection: 'column', gap: 20
                        }}>
                            {[
                                { key: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre completo', required: true },
                                { key: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com', required: true },
                                { key: 'goal', label: '¿Cuál es tu meta principal?', type: 'text', placeholder: 'Ej: Bajar de peso, más energía, sanar mi relación con la comida...' },
                            ].map(field => (
                                <div key={field.key}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                                        {field.label} {field.required && <span style={{ color: '#fbbf24' }}>*</span>}
                                    </label>
                                    <input
                                        type={field.type}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        value={form[field.key]}
                                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                        style={{
                                            width: '100%', padding: '14px 16px',
                                            background: 'rgba(255,255,255,0.06)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 12, color: '#fff',
                                            fontSize: '0.92rem', fontFamily: "'Outfit', sans-serif",
                                            outline: 'none', boxSizing: 'border-box',
                                            transition: 'border-color 0.3s'
                                        }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                            ))}

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                                    Cuéntame un poco sobre ti
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="¿Qué has intentado antes? ¿Qué esperas del programa?"
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    style={{
                                        width: '100%', padding: '14px 16px',
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 12, color: '#fff',
                                        fontSize: '0.92rem', fontFamily: "'Outfit', sans-serif",
                                        outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'rgba(251,191,36,0.5)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>

                            <button type="submit" style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                width: '100%', padding: '16px 24px',
                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                color: '#1f2937', borderRadius: 14,
                                fontSize: '1rem', fontWeight: 600,
                                border: 'none', cursor: 'pointer',
                                fontFamily: "'Outfit', sans-serif",
                                boxShadow: '0 8px 25px -6px rgba(251,191,36,0.4)',
                                transition: 'transform 0.3s'
                            }}>
                                <Send size={18} /> Enviar mi aplicación
                            </button>

                            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>
                                Te responderemos en menos de 24 horas.
                            </p>
                        </form>
                    ) : (
                        <div style={{
                            background: 'rgba(52,211,153,0.08)',
                            border: '1px solid rgba(52,211,153,0.2)',
                            borderRadius: 24, padding: 'clamp(2rem, 4vw, 3rem)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: '50%',
                                background: 'rgba(52,211,153,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <CheckCircle size={32} color="#34d399" />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 400, color: '#fff', marginBottom: 8 }}>
                                ¡Aplicación recibida!
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6 }}>
                                Gracias, {form.name.split(' ')[0]}. Revisaremos tu solicitud y te contactaremos por email en menos de 24 horas.
                            </p>
                            <Link to="/" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '12px 24px', color: '#fbbf24',
                                fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', marginTop: 24
                            }}>
                                Volver al inicio <ArrowRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
