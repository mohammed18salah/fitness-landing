import React, { useState, useRef, useMemo } from 'react'
import { useLang } from '../i18n.jsx'
import { parseWorkoutText, preprocessForHandwriting } from '../lib/ocr.js'
import { EXERCISES, CATEGORIES, EQUIPMENT } from '../data/exercises.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconBack, IconPlus, IconPdf, IconSearch } from './Icons.jsx'

// Lazy-load Tesseract only when the user actually scans (keeps bundle lean).
async function runOCR(file) {
  const { default: Tesseract } = await import('tesseract.js')
  const lang = 'eng+ara'
  const worker = await Tesseract.createWorker(lang, 1, { logger: () => {} })
  try {
    const { data } = await worker.recognize(file)
    return data.text || ''
  } finally {
    await worker.terminate()
  }
}

export default function OcrModal({ onClose, onAddExercises, activeDayLabel }) {
  const { t, lang } = useLang()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [handwriting, setHandwriting] = useState(true)
  const [status, setStatus] = useState('idle') // idle | norm | reading | done | none
  const [text, setText] = useState('')
  const [matched, setMatched] = useState([])
  const [unknown, setUnknown] = useState([])
  const [libOpen, setLibOpen] = useState(false)
  const [libQ, setLibQ] = useState('')
  const [manualName, setManualName] = useState('')
  const inputRef = useRef(null)
  const libInputRef = useRef(null)

  const pick = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setStatus('idle')
    setMatched([])
    setUnknown([])
  }

  const scan = async () => {
    if (!file) return
    try {
      let target = file
      if (handwriting) {
        setStatus('norm')
        target = await preprocessForHandwriting(file)
      }
      setStatus('reading')
      const raw = await runOCR(target)
      setText(raw)
      const { matched: m, unknown: u } = parseWorkoutText(raw)
      setMatched(m)
      setUnknown(u)
      setStatus(m.length || u.length ? 'done' : 'none')
    } catch (err) {
      setStatus('none')
    }
  }

  const addAll = () => {
    onAddExercises(matched)
    onClose()
  }

  const addManualLine = (line) => {
    onAddExercises([{ id: `manual_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name: line, gif: null, image: null, category: '', equipment: '', target: '' }])
    setUnknown((u) => u.filter((x) => x.line !== line))
  }

  const libResults = useMemo(() => {
    const s = libQ.trim().toLowerCase()
    return EXERCISES.filter((e) => !s || e.name.toLowerCase().includes(s)).slice(0, 60)
  }, [libQ])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-panel" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-white/10 p-3">
          <h3 className="text-base font-bold text-neon">{t('builder.ocrTitle')}</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-300 hover:text-white"><IconBack width={20} height={20} /></button>
        </div>

        <div className="space-y-3 p-3">
          <p className="text-xs text-gray-400">{t('builder.ocrHint')}</p>

          {!preview ? (
            <button onClick={() => inputRef.current?.click()} className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-8 text-gray-400 hover:border-neon/40 hover:text-neon">
              <IconPdf width={28} height={28} />
              <span className="text-sm">{t('builder.ocrUpload')}</span>
            </button>
          ) : (
            <div className="space-y-2">
              <img src={preview} alt="upload" className="max-h-48 w-full rounded-lg object-contain bg-black/30" />
              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input type="checkbox" checked={handwriting} onChange={(e) => setHandwriting(e.target.checked)} className="accent-neon" />
                {t('builder.ocrHandwriting')}
              </label>
              <div className="flex gap-2">
                <button onClick={scan} disabled={status === 'reading' || status === 'norm'} className="neon-btn-solid flex-1 py-2 text-sm disabled:opacity-50">
                  {status === 'reading' ? t('builder.ocrReading') : status === 'norm' ? t('builder.ocrNorm') : t('builder.ocr')}
                </button>
                <button onClick={() => { setPreview(null); setFile(null); setStatus('idle') }} className="rounded-lg bg-white/5 px-3 text-sm text-gray-300">{t('builder.close')}</button>
              </div>
            </div>
          )}
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={pick} />

          {status === 'done' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neon">{t('builder.ocrDone')} {matched.length} {t('builder.results')}</span>
                {matched.length > 0 && (
                  <button onClick={addAll} className="neon-btn flex items-center gap-1 px-3 py-1.5 text-xs"><IconPlus width={14} height={14} />{t('builder.ocrAddAll')}</button>
                )}
              </div>
              <div className="max-h-40 space-y-1 overflow-auto">
                {matched.map((ex) => (
                  <div key={ex.id} className="flex items-center gap-2 rounded-lg bg-white/5 p-1.5">
                    <ExerciseImage exercise={ex} className="h-9 w-9 rounded object-cover" />
                    <span className="flex-1 truncate text-xs text-gray-200">{ex.name}</span>
                  </div>
                ))}
              </div>

              {unknown.length > 0 && (
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                  <div className="mb-1 text-xs font-semibold text-amber-300">{t('builder.ocrUnknown')} ({unknown.length})</div>
                  <p className="mb-2 text-[11px] text-gray-500">{t('builder.ocrUnknownHint')}</p>
                  <div className="space-y-1">
                    {unknown.map((u, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1">
                        <span className="flex-1 truncate text-xs text-gray-300">{u.line}</span>
                        <button onClick={() => addManualLine(u.line)} className="rounded bg-neon/20 px-2 py-0.5 text-[11px] text-neon hover:bg-neon/30">{t('builder.ocrAddManual')}</button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { setLibOpen(true); setLibQ('') }} className="mt-2 w-full rounded-lg bg-white/5 py-1.5 text-xs text-gray-200 hover:text-neon">
                    {t('builder.ocrPickLib')}
                  </button>
                </div>
              )}
            </div>
          )}

          {status === 'none' && (
            <div className="rounded-lg bg-white/5 p-3 text-center text-sm text-gray-400">{t('builder.ocrNone')}</div>
          )}
        </div>
      </div>

      {/* Library picker for manual add */}
      {libOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3" onClick={() => setLibOpen(false)}>
          <div className="max-h-[85vh] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-panel" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <h4 className="text-sm font-bold text-neon">{t('builder.ocrPickLib')}</h4>
              <button onClick={() => setLibOpen(false)} className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-gray-300"><IconBack width={18} height={18} /></button>
            </div>
            <div className="p-3">
              <input ref={libInputRef} value={libQ} onChange={(e) => setLibQ(e.target.value)} placeholder={lang === 'ar' ? 'ابحث…' : 'Search…'} className="mb-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-neon/50" />
              <div className="max-h-64 space-y-1 overflow-auto">
                {libResults.map((ex) => (
                  <button key={ex.id} onClick={() => { onAddExercises([ex]); setLibOpen(false) }} className="flex w-full items-center gap-2 rounded-lg bg-white/5 p-1.5 text-left hover:bg-white/10">
                    <ExerciseImage exercise={ex} className="h-8 w-8 rounded object-cover" />
                    <span className="flex-1 truncate text-xs text-gray-200">{ex.name}</span>
                    <IconPlus width={14} height={14} className="text-neon" />
                  </button>
                ))}
                {libResults.length === 0 && <div className="py-4 text-center text-xs text-gray-500">{t('builder.ocrNoExercise')}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
