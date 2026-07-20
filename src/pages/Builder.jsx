import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang, translateTerm } from '../i18n.jsx'
import { EXERCISES, CATEGORIES, EQUIPMENT, getById } from '../data/exercises.js'
import { addPlan } from '../store.js'
import { exportPlanPdf } from '../lib/export.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import OcrModal from '../components/OcrModal.jsx'
import { IconWorkout, IconPlus, IconTrash, IconCheck, IconPlay, IconInfo, IconList, IconGrid, IconCalendar, IconPdf, IconBack, IconSearch } from '../components/Icons.jsx'

const DAY_LABELS = {
  en: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  ar: ['يوم 1', 'يوم 2', 'يوم 3', 'يوم 4', 'يوم 5', 'يوم 6', 'يوم 7'],
}

export default function Builder() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [numDays, setNumDays] = useState(3)
  const [days, setDays] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({ label: DAY_LABELS[lang][i], exercises: [] }))
  )
  const [activeDay, setActiveDay] = useState(0)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('cards') // list | cards | weekly
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [equip, setEquip] = useState('all')
  const [previewId, setPreviewId] = useState(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const [equipOpen, setEquipOpen] = useState(false)
  const [ocrOpen, setOcrOpen] = useState(false)

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return EXERCISES.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false
      if (equip !== 'all' && e.equipment !== equip) return false
      if (s && !e.name.toLowerCase().includes(s)) return false
      return true
    }).slice(0, 120)
  }, [q, cat, equip])

  const rebuildDays = (n, prev) => {
    const next = Array.from({ length: n }, (_, i) => prev[i] || { label: DAY_LABELS[lang][i], exercises: [] })
    setDays(next)
    if (activeDay >= n) setActiveDay(0)
  }

  const addToDay = (ex, di) => {
    setDays((prev) => {
      const copy = [...prev]
      const exists = copy[di].exercises.some((x) => x.exId === ex.id)
      if (exists) return prev
      copy[di] = {
        ...copy[di],
        exercises: [
          ...copy[di].exercises,
          { exId: ex.id, name: ex.name, gif: ex.gif, image: ex.image, sets: 3, reps: '8-12', category: ex.category, equipment: ex.equipment, target: ex.target },
        ],
      }
      return copy
    })
  }

  const updateEx = (di, exId, field, value) => {
    setDays((prev) => {
      const copy = [...prev]
      copy[di].exercises = copy[di].exercises.map((e) => (e.exId === exId ? { ...e, [field]: value } : e))
      return copy
    })
  }

  const removeEx = (di, exId) => {
    setDays((prev) => {
      const copy = [...prev]
      copy[di].exercises = copy[di].exercises.filter((e) => e.exId !== exId)
      return copy
    })
  }

  const addExercises = (list) => {
    setDays((prev) => {
      const copy = [...prev]
      const di = activeDay
      const existing = new Set(copy[di].exercises.map((x) => x.exId))
      const toAdd = (list || []).filter((ex) => !existing.has(ex.id || ex.exId)).map((ex) => ({
        exId: ex.id || ex.exId,
        name: ex.name,
        gif: ex.gif || null,
        image: ex.image || null,
        sets: 3,
        reps: '8-12',
        category: ex.category || '',
        equipment: ex.equipment || '',
        target: ex.target || '',
      }))
      copy[di] = { ...copy[di], exercises: [...copy[di].exercises, ...toAdd] }
      return copy
    })
  }

  const onSave = () => {
    const plan = {
      id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: name || (lang === 'ar' ? 'خطة مخصصة' : 'Custom Plan'),
      goal: 'custom',
      level: 'custom',
      daysPerWeek: numDays,
      durationMonths: 2,
      startDate: null,
      restDays: [],
      createdAt: new Date().toISOString(),
      custom: true,
      days: days.map((d, i) => ({ dayIndex: i, label: d.label, focus: '', exercises: d.exercises })),
    }
    addPlan(plan)
    setSaved(true)
    setTimeout(() => navigate('/workouts'), 600)
  }

  const onExport = () => {
    const plan = {
      id: 'custom',
      name: name || (lang === 'ar' ? 'خطة مخصصة' : 'Custom Plan'),
      durationMonths: 2,
      startDate: null,
      days: days.map((d, i) => ({ dayIndex: i, label: d.label, focus: '', exercises: d.exercises })),
    }
    exportPlanPdf(plan, { t, lang })
  }

  const totalEx = days.reduce((a, d) => a + d.exercises.length, 0)

  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <IconWorkout width={22} height={22} className="text-neon" />
        {lang === 'ar' ? 'تمرينك الخاص' : 'Your Workout'}
      </h1>

      {/* Setup */}
      <div className="glass space-y-4 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[160px_1fr]">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase text-gray-400">{lang === 'ar' ? 'عدد الأيام' : 'Number of days'}</div>
            <input type="number" min="1" max="7" value={numDays} onChange={(e) => { const n = Math.min(7, Math.max(1, Number(e.target.value) || 1)); setNumDays(n); rebuildDays(n, days) }} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-neon/50" />
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold uppercase text-gray-400">{lang === 'ar' ? 'اسم الخطة' : 'Plan name'}</div>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === 'ar' ? 'خطة مخصصة' : 'Custom Plan'} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-neon/50" />
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase text-gray-400">{lang === 'ar' ? 'الأيام' : 'Days'}</div>
          <div className="flex flex-wrap gap-2">
            {days.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)} className={`chip ${activeDay === i ? 'chip-active' : ''}`}>
                {d.label} ({d.exercises.length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Builder board */}
      <div className="glass p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-gray-100">{days[activeDay]?.label}</h2>
          <div className="flex gap-1 rounded-xl bg-white/5 p-1">
            <button onClick={() => setView('list')} className={`grid h-8 w-8 place-items-center rounded-lg ${view === 'list' ? 'bg-neon text-black' : 'text-gray-300 hover:text-neon'}`} aria-label="list"><IconList width={16} height={16} /></button>
            <button onClick={() => setView('cards')} className={`grid h-8 w-8 place-items-center rounded-lg ${view === 'cards' ? 'bg-neon text-black' : 'text-gray-300 hover:text-neon'}`} aria-label="cards"><IconGrid width={16} height={16} /></button>
            <button onClick={() => setView('weekly')} className={`grid h-8 w-8 place-items-center rounded-lg ${view === 'weekly' ? 'bg-neon text-black' : 'text-gray-300 hover:text-neon'}`} aria-label="weekly"><IconCalendar width={16} height={16} /></button>
          </div>
        </div>

        {days[activeDay]?.exercises.length === 0 ? (
          <div className="py-6 text-center text-sm text-gray-500">{lang === 'ar' ? 'أضف تمارين من المكتبة بالأسفل' : 'Add exercises from the library below'}</div>
        ) : view === 'weekly' ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {days.map((d, di) => (
              <div key={di} className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <div className="mb-1 text-xs font-semibold text-neon">{d.label}</div>
                {d.exercises.map((ex) => (
                  <div key={ex.exId} className="flex items-center gap-2 border-b border-white/5 py-1 text-xs">
                    <ExerciseImage exercise={getById(ex.exId)} className="h-7 w-7 rounded object-cover" />
                    <span className="flex-1 truncate text-gray-200">{ex.name}</span>
                    <span className="text-neon">{ex.sets}×{ex.reps}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className={view === 'cards' ? 'grid grid-cols-1 gap-2 sm:grid-cols-2' : 'space-y-2'}>
            {days[activeDay]?.exercises.map((ex) => (
              <div key={ex.exId} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                <ExerciseImage exercise={getById(ex.exId)} className="h-12 w-12 shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-gray-100">{ex.name}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span className="text-gray-500">{t('builder.sets')}</span>
                    <input type="number" min="1" value={ex.sets} onChange={(e) => updateEx(activeDay, ex.exId, 'sets', Number(e.target.value))} className="w-12 rounded bg-white/10 px-1 py-0.5 text-center text-neon outline-none" />
                    <span className="text-gray-500">{t('builder.reps')}</span>
                    <input value={ex.reps} onChange={(e) => updateEx(activeDay, ex.exId, 'reps', e.target.value)} className="w-16 rounded bg-white/10 px-1 py-0.5 text-center text-neon outline-none" />
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <button onClick={() => setPreviewId(ex.exId)} className="grid h-7 w-7 place-items-center rounded bg-white/5 text-gray-300 hover:text-neon" aria-label="gif"><IconPlay width={14} height={14} /></button>
                  <button onClick={() => navigate(`/library/${ex.exId}`)} className="grid h-7 w-7 place-items-center rounded bg-white/5 text-gray-300 hover:text-neon" aria-label="details"><IconInfo width={14} height={14} /></button>
                  <button onClick={() => removeEx(activeDay, ex.exId)} className="grid h-7 w-7 place-items-center rounded bg-white/5 text-gray-300 hover:text-red-400" aria-label="remove"><IconTrash width={14} height={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Big picker launcher */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button onClick={() => setPickerOpen(true)} className="neon-btn-solid flex items-center justify-center gap-2 py-3.5 text-[15px]">
          <IconPlus width={18} height={18} />
          {lang === 'ar' ? 'تصفح المكتبة وأضف تمارين' : 'Browse Library & Add'}
        </button>
        <button onClick={() => setOcrOpen(true)} className="neon-btn flex items-center justify-center gap-2 py-3.5 text-[15px]">
          <IconSearch width={18} height={18} />
          {t('builder.ocr')}
        </button>
      </div>

      {/* Library popup */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center" onClick={() => setPickerOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/10 bg-panel sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-3">
              <h2 className="text-base font-bold text-neon">{t('builder.browse')}</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t('builder.addingTo')} <span className="text-neon">{days[activeDay]?.label}</span></span>
                <button onClick={() => setPickerOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-gray-300 hover:text-white"><IconBack width={20} height={20} /></button>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-2 border-b border-white/10 p-3">
              <div className="relative">
                <IconSearch width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === 'ar' ? 'ابحث عن تمرين...' : 'Search exercise...'} className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm outline-none focus:border-neon/50" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* Categories popup */}
                <div className="relative">
                  <button onClick={() => { setCatOpen((v) => !v); setEquipOpen(false) }} className={`chip ${catOpen ? 'chip-active' : ''}`}>
                    {lang === 'ar' ? 'الفئات' : 'Categories'}: {cat === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : cat}
                  </button>
                  {catOpen && (
                    <div className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-xl border border-white/10 bg-panel p-1 shadow-xl">
                      <button onClick={() => { setCat('all'); setCatOpen(false) }} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-gray-300 hover:bg-white/5">{lang === 'ar' ? 'كل الفئات' : 'All categories'}</button>
                      {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => { setCat(c); setCatOpen(false) }} className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-white/5 ${cat === c ? 'text-neon' : 'text-gray-300'}`}>{c}</button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Equipment popup */}
                <div className="relative">
                  <button onClick={() => { setEquipOpen((v) => !v); setCatOpen(false) }} className={`chip ${equipOpen ? 'chip-active' : ''}`}>
                    {lang === 'ar' ? 'الأجهزة' : 'Equipment'}: {equip === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : (lang === 'ar' ? translateTerm(equip) : equip)}
                  </button>
                  {equipOpen && (
                    <div className="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-xl border border-white/10 bg-panel p-1 shadow-xl">
                      <button onClick={() => { setEquip('all'); setEquipOpen(false) }} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-gray-300 hover:bg-white/5">{lang === 'ar' ? 'كل الأجهزة' : 'All equipment'}</button>
                      {EQUIPMENT.map((e) => (
                        <button key={e} onClick={() => { setEquip(e); setEquipOpen(false) }} className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-white/5 ${equip === e ? 'text-neon' : 'text-gray-300'}`}>{lang === 'ar' ? translateTerm(e) : e}</button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="ml-auto text-xs text-gray-500">{results.length} {t('builder.results')}</span>
              </div>
            </div>

            {/* Results grid */}
            <div className="grid max-h-[55vh] grid-cols-2 gap-2 overflow-auto p-3 sm:grid-cols-3 lg:grid-cols-4">
              {results.length === 0 ? (
                <div className="col-span-full py-8 text-center text-sm text-gray-500">{t('builder.emptyResults')}</div>
              ) : results.map((ex) => (
                <div key={ex.id} className="relative overflow-hidden rounded-lg bg-white/5 p-1">
                  <ExerciseImage exercise={ex} className="aspect-square w-full rounded object-cover" />
                  <div className="truncate px-1 py-1 text-[11px] text-gray-200">{ex.name}</div>
                  <button onClick={() => addToDay(ex, activeDay)} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-neon text-black shadow transition hover:scale-110" aria-label="add"><IconPlus width={16} height={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save / export */}
      <div className="glass flex flex-wrap items-center gap-2 p-3">
        <button onClick={onSave} className="neon-btn-solid flex items-center gap-2">
          {saved ? <IconCheck width={18} height={18} /> : null}
          {saved ? (lang === 'ar' ? 'تم الحفظ!' : 'Saved!') : (lang === 'ar' ? 'حفظ الخطة' : 'Save Plan')}
        </button>
        <button onClick={onExport} className="neon-btn flex items-center gap-2"><IconPdf width={18} height={18} />{lang === 'ar' ? 'تصدير PDF' : 'Export PDF'}</button>
        <span className="ml-auto self-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300">
          {totalEx} {lang === 'ar' ? 'تمرين' : 'exercises'}
        </span>
      </div>

      {previewId && getById(previewId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewId(null)}>
          <div className="max-h-[80vh] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-panel p-3" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-neon">{getById(previewId).name}</h3>
              <button onClick={() => setPreviewId(null)} className="text-gray-400 hover:text-white"><IconBack width={20} height={20} /></button>
            </div>
            <ExerciseImage exercise={getById(previewId)} className="aspect-square w-full rounded-lg bg-white/5 object-cover" />
          </div>
        </div>
      )}

      {ocrOpen && (
        <OcrModal
          activeDayLabel={days[activeDay]?.label}
          onAddExercises={addExercises}
          onClose={() => setOcrOpen(false)}
        />
      )}
    </div>
  )
}
