import React from 'react'
import { useLang } from '../i18n.jsx'
import { getById, hasGif } from '../data/exercises.js'
import { IconClose, IconPrint } from './Icons.jsx'

// A print-friendly workout sheet styled like the PULSE GYM log:
// black/neon header with ECG line + ATHLETE/DATE/COACH bar, then an organised
// table per day with the real exercise image, sets, reps, target muscle,
// weight and notes columns. Renders off-screen as a preview and as a hidden
// printable sheet (white background via @media print in index.css).
export default function PrintSheet({ plan, onClose }) {
  const { t, lang } = useLang()
  if (!plan) return null

  return (
    <>
      {/* On-screen modal preview */}
      <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
        <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl border border-white/10 bg-panel p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-neon">{plan.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <IconClose width={22} height={22} />
            </button>
          </div>
          <div className="mb-4 overflow-hidden rounded-xl bg-white" style={{ color: '#000' }}>
            <PrintBody plan={plan} lang={lang} t={t} />
          </div>
          <button className="neon-btn-solid flex w-full items-center justify-center gap-2" onClick={() => window.print()}>
            <IconPrint width={18} height={18} /> {t('print.print')}
          </button>
        </div>
      </div>

      {/* Hidden printable sheet */}
      <div id="print-sheet" aria-hidden="true" style={{ display: 'none' }}>
        <PrintBody plan={plan} lang={lang} t={t} />
      </div>
    </>
  )
}

// Resolve target muscle / category for an exercise row
function muscleOf(ex) {
  const src = ex.exId ? getById(ex.exId) : null
  return (src && (src.target || src.muscle_group || src.category)) || ex.category || '—'
}

function PrintBody({ plan, lang, t }) {
  const counter = { n: 0 }
  // Dynamic columns: only show weight/notes if any exercise actually has them.
  let anyWeight = false
  let anyNotes = false
  plan.days.forEach((d) => d.exercises.forEach((ex) => {
    if (ex.weight || ex.kg) anyWeight = true
    if (ex.notes) anyNotes = true
  }))

  const extra = []
  if (anyWeight) extra.push({ key: 'weight', label: t('print.weight') || 'KG' })
  if (anyNotes) extra.push({ key: 'notes', label: t('print.notes') || 'NOTES' })
  const colCount = 5 + extra.length

  return (
    <div style={{ color: '#000', fontFamily: 'Inter, system-ui, sans-serif', background: '#000' }}>
      {/* Header */}
      <div style={{ background: '#000', color: '#fff', padding: '18px 20px', textAlign: 'center', borderBottom: '3px solid #22C55E' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <svg width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="#22C55E" strokeWidth="2">
            <path d="M0 7 H10 L13 2 L17 12 L21 4 L25 7 H40" />
          </svg>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#22C55E', letterSpacing: 2 }}>PULSE</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 6 }}>GYM</div>
          </div>
          <svg width="40" height="14" viewBox="0 0 40 14" fill="none" stroke="#22C55E" strokeWidth="2">
            <path d="M0 7 H10 L13 2 L17 12 L21 4 L25 7 H40" />
          </svg>
        </div>
        <div style={{ fontSize: 10, letterSpacing: 1, color: '#bbb', marginTop: 4 }}>
          {lang === 'ar' ? 'تدرّب بقوة. استمر. كن أفضل نسخة منك.' : 'TRAIN HARD. STAY CONSISTENT. BE YOUR BEST.'}
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: '#111', color: '#fff', display: 'flex', fontSize: 11, padding: '8px 20px', gap: 12, borderBottom: '1px solid #333' }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>ATHLETE:</span>
          <span style={{ borderBottom: '1px solid #555', marginLeft: 6, display: 'inline-block', minWidth: 80 }}> </span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>DATE:</span>
          <span style={{ borderBottom: '1px solid #555', marginLeft: 6, display: 'inline-block', minWidth: 80 }}> </span>
        </div>
        <div style={{ flex: 1 }}>
          <span style={{ color: '#22C55E', fontWeight: 700 }}>COACH:</span>
          <span style={{ borderBottom: '1px solid #555', marginLeft: 6, display: 'inline-block', minWidth: 80 }}> </span>
        </div>
      </div>

      {/* Plan name + day sections */}
      <div style={{ background: '#fff', padding: '10px 14px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>{plan.name}</div>
        {plan.days.map((day, di) => (
          <div key={di} style={{ marginTop: 12, breakInside: 'avoid' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#fff', background: '#000', padding: '5px 10px', borderRadius: 4 }}>
              {t('print.day')} {di + 1}: {day.label}
              {day.focus ? `  (${day.focus})` : ''}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 6, fontSize: 10 }}>
              <thead>
                <tr style={{ background: '#000', color: '#fff' }}>
                  <th style={th('#')}>#</th>
                  <th style={th(t('print.exercise') || 'EXERCISE')}>EXERCISE</th>
                  <th style={th(t('print.sets') || 'SETS')}>SETS</th>
                  <th style={th(t('print.reps') || 'REPS')}>REPS</th>
                  <th style={th(t('print.muscle') || 'MUSCLE')}>MUSCLE</th>
                  {extra.map((c) => (
                    <th key={c.key} style={th(c.label)}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {day.exercises.length === 0 && (
                  <tr><td colSpan={colCount} style={{ ...tdBase, color: '#888', textAlign: 'center', padding: 8 }}>{t('workouts.restDay')}</td></tr>
                )}
                {day.exercises.map((ex) => {
                  counter.n += 1
                  const img = hasGif(ex) ? `/exercises/${ex.gif}` : ex.image ? `/exercises/${ex.image}` : null
                  return (
                    <tr key={ex.exId}>
                      <td style={{ ...tdBase, textAlign: 'center', fontWeight: 700 }}>{counter.n}</td>
                      <td style={tdBase}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {img ? (
                            <img
                              src={img}
                              alt={ex.name}
                              style={{ width: 38, height: 38, objectFit: 'cover', borderRadius: 4, background: '#eee' }}
                            />
                          ) : (
                            <div style={{ width: 38, height: 38, background: '#ddd', borderRadius: 4 }} />
                          )}
                          <span style={{ fontWeight: 600 }}>{ex.name}</span>
                        </div>
                      </td>
                      <td style={{ ...tdBase, textAlign: 'center' }}>{ex.sets}</td>
                      <td style={{ ...tdBase, textAlign: 'center' }}>{ex.reps}</td>
                      <td style={tdBase}>{muscleOf(ex)}</td>
                      {anyWeight && <td style={{ ...tdBase, textAlign: 'center' }}>{ex.weight ?? ex.kg ?? ''}</td>}
                      {anyNotes && <td style={tdBase}>{ex.notes || ''}</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ background: '#000', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', fontSize: 9, letterSpacing: 1 }}>
        <span>{lang === 'ar' ? 'تركيز · انضباط · استمرار' : 'FOCUS · DISCIPLINE · CONSISTENCY'}</span>
        <span style={{ color: '#22C55E', fontWeight: 800 }}>PULSE · FEEL THE PULSE</span>
        <span>{lang === 'ar' ? 'أقوى من أمس' : 'STRONGER THAN YESTERDAY'}</span>
      </div>
    </div>
  )
}

const thBase = {
  border: '1px solid #000',
  padding: '4px 6px',
  fontSize: 9,
  textAlign: 'left',
  fontWeight: 800,
  letterSpacing: 0.5,
}
function th(label) {
  return { ...thBase, paddingLeft: 6 }
}
const tdBase = {
  border: '1px solid #ccc',
  padding: '4px 6px',
  verticalAlign: 'middle',
}
