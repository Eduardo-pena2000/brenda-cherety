import { useState } from 'react';
import { Scale, Droplets, Flame, ChevronRight, Info, RotateCcw } from 'lucide-react';

/* ────────── IMC CALCULATOR ────────── */
function ImcCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h || h <= 0) return;
    const imc = w / (h * h);
    let label, color, advice;
    if (imc < 18.5) { label = 'Bajo peso'; color = '#3b82f6'; advice = 'Considera aumentar tu ingesta calórica con alimentos nutritivos y consulta con un especialista.'; }
    else if (imc < 25) { label = 'Peso normal'; color = '#10b981'; advice = '¡Excelente! Mantén tus hábitos saludables de alimentación y ejercicio.'; }
    else if (imc < 30) { label = 'Sobrepeso'; color = '#f59e0b'; advice = 'Una alimentación equilibrada y actividad física regular pueden ayudarte a alcanzar tu peso ideal.'; }
    else { label = 'Obesidad'; color = '#ef4444'; advice = 'Te recomiendo trabajar con un nutriólogo para diseñar un plan personalizado y seguro.'; }
    setResult({ imc: imc.toFixed(1), label, color, advice });
  }

  function reset() { setWeight(''); setHeight(''); setResult(null); }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Peso (kg)', value: weight, setter: setWeight, placeholder: 'Ej: 65' },
          { label: 'Altura (cm)', value: height, setter: setHeight, placeholder: 'Ej: 165' },
        ].map(field => (
          <div key={field.label}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>{field.label}</label>
            <input type="number" value={field.value} onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              style={{ width: '100%', padding: '12px 14px', border: '2px solid #f3f4f6', borderRadius: 12, fontSize: '1rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
              onFocus={e => e.target.style.borderColor = '#ec4899'}
              onBlur={e => e.target.style.borderColor = '#f3f4f6'}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={calculate} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg,#ec4899,#d946ef)', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.92rem', fontFamily: "'Outfit',sans-serif" }}>
          Calcular IMC
        </button>
        {result && (
          <button onClick={reset} style={{ padding: '13px 16px', background: '#f3f4f6', color: '#6b7280', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
            <RotateCcw size={16} />
          </button>
        )}
      </div>
      {result && (
        <div style={{ marginTop: 20, background: `${result.color}12`, border: `1.5px solid ${result.color}30`, borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 300 }}>Tu IMC</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 300, color: result.color, lineHeight: 1 }}>{result.imc}</p>
            </div>
            <span style={{ background: result.color, color: '#fff', padding: '6px 16px', borderRadius: 50, fontSize: '0.85rem', fontWeight: 600 }}>{result.label}</span>
          </div>
          {/* IMC Bar */}
          <div style={{ height: 8, borderRadius: 50, background: '#e5e7eb', marginBottom: 12, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min((parseFloat(result.imc) / 40) * 100, 100)}%`, background: `linear-gradient(90deg,#3b82f6,#10b981,#f59e0b,#ef4444)`, borderRadius: 50, transition: 'width 0.8s' }} />
          </div>
          <p style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 300, lineHeight: 1.6 }}>{result.advice}</p>
        </div>
      )}
    </div>
  );
}

/* ────────── WATER CALCULATOR ────────── */
function AguaCalculator() {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('sedentario');
  const [result, setResult] = useState(null);

  const activities = [
    { id: 'sedentario', label: 'Sedentario (poco o nada de ejercicio)', factor: 30 },
    { id: 'ligero', label: 'Ligero (1-3 días/semana)', factor: 33 },
    { id: 'moderado', label: 'Moderado (3-5 días/semana)', factor: 35 },
    { id: 'intenso', label: 'Intenso (6-7 días/semana)', factor: 40 },
  ];

  function calculate() {
    const w = parseFloat(weight);
    if (!w) return;
    const factor = activities.find(a => a.id === activity).factor;
    const liters = (w * factor) / 1000;
    const glasses = Math.round(liters / 0.25);
    setResult({ liters: liters.toFixed(1), glasses });
  }

  function reset() { setWeight(''); setActivity('sedentario'); setResult(null); }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>Peso (kg)</label>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Ej: 65"
          style={{ width: '100%', padding: '12px 14px', border: '2px solid #f3f4f6', borderRadius: 12, fontSize: '1rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = '#f3f4f6'}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#374151', marginBottom: 6 }}>Nivel de actividad</label>
        <select value={activity} onChange={e => setActivity(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', border: '2px solid #f3f4f6', borderRadius: 12, fontSize: '0.9rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
          {activities.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={calculate} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg,#3b82f6,#2563eb)', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.92rem', fontFamily: "'Outfit',sans-serif" }}>
          Calcular
        </button>
        {result && (
          <button onClick={reset} style={{ padding: '13px 16px', background: '#f3f4f6', color: '#6b7280', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
            <RotateCcw size={16} />
          </button>
        )}
      </div>
      {result && (
        <div style={{ marginTop: 20, background: '#eff6ff', border: '1.5px solid #bfdbfe', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 300, color: '#3b82f6', lineHeight: 1 }}>{result.liters}L</p>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 300 }}>por día</p>
            </div>
            <div style={{ width: 1, background: '#bfdbfe' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', fontWeight: 300, color: '#3b82f6', lineHeight: 1 }}>{result.glasses}</p>
              <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 300 }}>vasos (250ml)</p>
            </div>
          </div>
          <p style={{ fontSize: '0.83rem', color: '#1e40af', fontWeight: 300, lineHeight: 1.6, textAlign: 'center' }}>
            💡 Distribuye tu ingesta a lo largo del día. Bebe un vaso al levantarte y uno antes de cada comida.
          </p>
        </div>
      )}
    </div>
  );
}

/* ────────── CALORIES CALCULATOR ────────── */
function CaloriasCalculator() {
  const [form, setForm] = useState({ weight: '', height: '', age: '', sex: 'mujer', activity: '1.2', goal: 'mantener' });
  const [result, setResult] = useState(null);

  const activities = [
    { value: '1.2', label: 'Sedentaria (sin ejercicio)' },
    { value: '1.375', label: 'Ligera (1-3 días/semana)' },
    { value: '1.55', label: 'Moderada (3-5 días/semana)' },
    { value: '1.725', label: 'Intensa (6-7 días/semana)' },
    { value: '1.9', label: 'Muy intensa (atleta)' },
  ];

  function calculate() {
    const { weight: w, height: h, age: a, sex, activity, goal } = form;
    if (!w || !h || !a) return;
    // Mifflin-St Jeor
    let bmr = sex === 'mujer'
      ? (10 * parseFloat(w)) + (6.25 * parseFloat(h)) - (5 * parseFloat(a)) - 161
      : (10 * parseFloat(w)) + (6.25 * parseFloat(h)) - (5 * parseFloat(a)) + 5;
    let tdee = bmr * parseFloat(activity);
    let target = tdee;
    if (goal === 'perder') target = tdee - 500;
    if (goal === 'ganar') target = tdee + 300;
    const protein = Math.round(parseFloat(w) * 1.6);
    const carbs = Math.round((target * 0.45) / 4);
    const fat = Math.round((target * 0.3) / 9);
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(target), protein, carbs, fat });
  }

  function reset() { setForm({ weight: '', height: '', age: '', sex: 'mujer', activity: '1.2', goal: 'mantener' }); setResult(null); }
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
        {[{ key: 'weight', label: 'Peso (kg)', ph: '65' }, { key: 'height', label: 'Altura (cm)', ph: '165' }, { key: 'age', label: 'Edad', ph: '30' }].map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: 5 }}>{f.label}</label>
            <input type="number" value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.ph}
              style={{ width: '100%', padding: '11px 12px', border: '2px solid #f3f4f6', borderRadius: 10, fontSize: '0.9rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', boxSizing: 'border-box', transition: 'border-color 0.3s' }}
              onFocus={e => e.target.style.borderColor = '#f97316'}
              onBlur={e => e.target.style.borderColor = '#f3f4f6'}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: 5 }}>Sexo</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['mujer', 'hombre'].map(s => (
              <button key={s} onClick={() => set('sex', s)} style={{ flex: 1, padding: '11px', borderRadius: 10, border: `2px solid ${form.sex === s ? '#f97316' : '#f3f4f6'}`, background: form.sex === s ? '#fff7ed' : '#f9fafb', color: form.sex === s ? '#f97316' : '#6b7280', cursor: 'pointer', fontSize: '0.88rem', fontFamily: "'Outfit',sans-serif", fontWeight: form.sex === s ? 600 : 400, transition: 'all 0.2s' }}>
                {s === 'mujer' ? '👩 Mujer' : '👨 Hombre'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: 5 }}>Objetivo</label>
          <select value={form.goal} onChange={e => set('goal', e.target.value)}
            style={{ width: '100%', padding: '11px 12px', border: '2px solid #f3f4f6', borderRadius: 10, fontSize: '0.88rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
            <option value="perder">Perder peso (-500 kcal)</option>
            <option value="mantener">Mantener peso</option>
            <option value="ganar">Ganar músculo (+300 kcal)</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#374151', marginBottom: 5 }}>Nivel de actividad</label>
        <select value={form.activity} onChange={e => set('activity', e.target.value)}
          style={{ width: '100%', padding: '11px 12px', border: '2px solid #f3f4f6', borderRadius: 10, fontSize: '0.88rem', fontFamily: "'Outfit',sans-serif", outline: 'none', color: '#1f2937', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
          {activities.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={calculate} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg,#f97316,#ef4444)', color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '0.92rem', fontFamily: "'Outfit',sans-serif" }}>
          Calcular Calorías
        </button>
        {result && (
          <button onClick={reset} style={{ padding: '13px 16px', background: '#f3f4f6', color: '#6b7280', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
            <RotateCcw size={16} />
          </button>
        )}
      </div>
      {result && (
        <div style={{ marginTop: 20, background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: 16, padding: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 12, padding: 14 }}>
              <p style={{ fontSize: '2rem', fontWeight: 300, color: '#f97316', lineHeight: 1 }}>{result.target}</p>
              <p style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 300 }}>kcal diarias recomendadas</p>
            </div>
            <div style={{ textAlign: 'center', background: '#fff', borderRadius: 12, padding: 14 }}>
              <p style={{ fontSize: '2rem', fontWeight: 300, color: '#6b7280', lineHeight: 1 }}>{result.tdee}</p>
              <p style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 300 }}>kcal de mantenimiento</p>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 500, marginBottom: 8 }}>Distribución de macros aproximada:</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ label: 'Proteínas', val: `${result.protein}g`, color: '#3b82f6' }, { label: 'Carbos', val: `${result.carbs}g`, color: '#f59e0b' }, { label: 'Grasas', val: `${result.fat}g`, color: '#10b981' }].map(m => (
              <div key={m.label} style={{ flex: 1, textAlign: 'center', background: '#fff', borderRadius: 10, padding: '10px 8px' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 500, color: m.color }}>{m.val}</p>
                <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 300 }}>{m.label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#78350f', marginTop: 12, display: 'flex', alignItems: 'flex-start', gap: 6, lineHeight: 1.5 }}>
            <Info size={13} style={{ flexShrink: 0, marginTop: 2 }} />
            Estos valores son estimaciones. Para un plan personalizado, consulta con Brenda.
          </p>
        </div>
      )}
    </div>
  );
}

/* ────────── MAIN PAGE ────────── */
const tools = [
  { id: 'imc', icon: Scale, label: 'Calculadora de IMC', desc: 'Conoce tu Índice de Masa Corporal y recibe recomendaciones personalizadas.', color: '#ec4899', gradient: 'linear-gradient(135deg,#fce7f3,#faf5ff)', component: ImcCalculator },
  { id: 'agua', icon: Droplets, label: 'Hidratación Diaria', desc: 'Descubre cuánta agua deberías tomar según tu peso y nivel de actividad.', color: '#3b82f6', gradient: 'linear-gradient(135deg,#eff6ff,#f0f9ff)', component: AguaCalculator },
  { id: 'calorias', icon: Flame, label: 'Calculadora de Calorías', desc: 'Calcula tus necesidades calóricas diarias con la fórmula Mifflin-St Jeor.', color: '#f97316', gradient: 'linear-gradient(135deg,#fff7ed,#fef2f2)', component: CaloriasCalculator },
];

export default function HerramientasPage() {
  const [activeTool, setActiveTool] = useState('imc');
  const current = tools.find(t => t.id === activeTool);
  const Component = current.component;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg,#1f2937,#111827)', padding: 'clamp(3rem,6vw,5rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 50%, rgba(236,72,153,0.12), transparent 50%)' }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', color: '#f9a8d4', textTransform: 'uppercase', fontWeight: 500, display: 'block', marginBottom: 12 }}>100% gratuito</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Herramientas de{' '}
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', color: '#f9a8d4' }}>nutrición</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7 }}>
            Calculadoras diseñadas para darte información práctica sobre tu salud. Completamente gratis.
          </p>
        </div>
      </section>

      {/* Tool Selector */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {tools.map(tool => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '18px 24px',
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Outfit',sans-serif",
              fontSize: '0.9rem', fontWeight: activeTool === tool.id ? 600 : 400,
              color: activeTool === tool.id ? tool.color : '#6b7280',
              borderBottom: `2px solid ${activeTool === tool.id ? tool.color : 'transparent'}`,
              transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}>
              <tool.icon size={18} /> {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(2rem,4vw,3rem) 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }} className="herramientas-grid">
          {/* Left: Info */}
          <div>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: current.gradient, border: `1px solid ${current.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <current.icon size={26} color={current.color} />
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 300, color: '#1f2937', marginBottom: 12, lineHeight: 1.2 }}>{current.label}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, marginBottom: 24 }}>{current.desc}</p>
            <div style={{ background: current.gradient, border: `1px solid ${current.color}20`, borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: '0.82rem', fontWeight: 600, color: current.color, marginBottom: 8 }}>¿Para qué sirve?</p>
              {current.id === 'imc' && <ul style={{ paddingLeft: 16, color: '#374151', fontSize: '0.85rem', fontWeight: 300, lineHeight: 2 }}><li>Evalúa si tu peso está en rango saludable</li><li>Referencia usada por profesionales de salud</li><li>Útil para seguimiento a lo largo del tiempo</li></ul>}
              {current.id === 'agua' && <ul style={{ paddingLeft: 16, color: '#374151', fontSize: '0.85rem', fontWeight: 300, lineHeight: 2 }}><li>Mejora tu energía y concentración</li><li>Apoya la digestión y el metabolismo</li><li>Personalizada según tu actividad física</li></ul>}
              {current.id === 'calorias' && <ul style={{ paddingLeft: 16, color: '#374151', fontSize: '0.85rem', fontWeight: 300, lineHeight: 2 }}><li>Basada en la fórmula Mifflin-St Jeor</li><li>Incluye distribución de macronutrientes</li><li>Adaptada a tu objetivo personal</li></ul>}
            </div>
          </div>
          {/* Right: Calculator */}
          <div style={{ background: '#fff', borderRadius: 20, padding: 'clamp(1.5rem,3vw,2rem)', boxShadow: '0 4px 20px -4px rgba(0,0,0,0.07)' }}>
            <Component />
          </div>
        </div>
      </div>

      {/* Disclaimer + CTA */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 16, padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <Info size={18} color="#9ca3af" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 300, lineHeight: 1.6 }}>
            <strong style={{ fontWeight: 500 }}>Aviso:</strong> Estas calculadoras son orientativas y no reemplazan la consulta médica o nutricional profesional. Para un plan de alimentación personalizado, te invito a{' '}
            <a href="/consulta" style={{ color: '#ec4899', fontWeight: 500 }}>agendar una consulta privada</a>.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .herramientas-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
