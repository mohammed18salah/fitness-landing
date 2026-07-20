import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { generatePlan } from '../lib/generator.js'
import { addPlan } from '../store.js'
import { getById } from '../data/exercises.js'
import { exportPlanPdf } from '../lib/export.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconGenerator, IconCheck, IconPdf } from '../components/Icons.jsx'

const WEEKDAYS = [
  { en: 'Monday', ar: 'الاثنين' },
  { en: 'Tuesday', ar: 'الثلاثاء' },
  { en: 'Wednesday', ar: 'الأربعاء' },
  { en: 'Thursday', ar: 'الخميس' },
  { en: 'Friday', ar: 'الجمعة' },
  { en: 'Saturday', ar: 'السبت' },
  { en: 'Sunday', ar: 'الأحد' },
]

export default function Generator() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [goal, setGoal] = useState('muscle')
  const [level, setLevel] = useState('beginner')
  const [days, setDays] = useState(3)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(2)
  const [startDate, setStartDate] = useState('')
  const [restDays, setRestDays] = useState([])
  const [plan, setPlan] = useState(null)
  const [saved, setSaved] = useState(false)

  const onGenerate = () => {
    const p = generatePlan({
      goal, level, days, name, lang,
      durationMonths: Number(duration),
      startDate: startDate || null,
      restDays,
    })
    setPlan(p)
    setSaved(false)
  }

  const onSave = () => {
    if (!plan) return
    addPlan(plan)
    setSaved(true)
    setTimeout(() => navigate('/workouts'), 600)
  }

  const onExportPdf = () => {
    if (!plan) return
    exportPlanPdf(plan, { t, lang })
  }

  // Total weeks for the course (durationMonths * 4.33)
  const totalWeeks = plan ? Math.round((plan.durationMonths || 2) * 4.33) : 0

  const goals = ['muscle', 'fat', 'strength']
  const levels = ['beginner', 'intermediate', 'advanced']

  const toggleRest = (idx) => {
    setRestDays((prev) => (prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]))
  }

  return (
    <div className="space-y-5">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <IconGenerator width={22} height={22} className="text-neon" />
        {t('generator.title')}
      </h1>

      {/* Options */}
      <div className="glass space-y-4 p-4">
        <Field label={t('generator.goal')}>
          <div className="flex flex-wrap gap-2">
            {goals.map((g) => (
              <button key={g} onClick={() => setGoal(g)} className={`chip ${goal === g ? 'chip-active' : ''}`}>
                {t(`generator.goals.${g}`)}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t('generator.level')}>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`chip ${level === l ? 'chip-active' : ''}`}>
                {t(`generator.levels.${l}`)}
              </button>
            ))}
          </div>
        </Field>

        <Field label={`${t('generator.days')} (${days} ${t('generator.daysLabel')})`}>
          <input
            type="range"
            min="1"
            max="6"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full accent-neon"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
          </div>
        </Field>

        {/* Duration */}
        <Field label={`${t('generator.duration')} (${duration} ${t('generator.durationLabel')})`}>
          <input
            type="range"
            min="1"
            max="12"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-neon"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>1</span><span>3</span><span>6</span><span>9</span><span>12</span>
          </div>
        </Field>

        {/* Start date */}
        <Field label={t('generator.startDate')}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-neon/50 [color-scheme:dark]"
          />
        </Field>

        {/* Rest days */}
        <Field label={t('generator.restDays')}>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((d, idx) => (
              <button
                key={idx}
                onClick={() => toggleRest(idx)}
                className={`chip ${restDays.includes(idx) ? 'chip-active' : ''}`}
              >
                {lang === 'ar' ? d.ar : d.en}
              </button>
            ))}
          </div>
        </Field>

        <Field label={t('generator.planName')}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('generator.planName')}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-neon/50"
          />
        </Field>

        <button onClick={onGenerate} className="neon-btn-solid flex w-full items-center justify-center gap-2">
          <IconGenerator width={18} height={18} />
          {t('generator.generate')}
        </button>
      </div>

      {/* Result */}
      {plan ? (
        <div className="glass space-y-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neon">{plan.name}</h2>
            <span className="text-xs text-gray-500">
              {plan.days.reduce((a, d) => a + d.exercises.length, 0)} {t('generator.exercises')}
            </span>
          </div>

          {/* Course meta */}
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/[0.03] p-3 text-xs sm:grid-cols-3">
            <Meta label={t('generator.duration')} value={`${plan.durationMonths} ${t('generator.durationLabel')}`} />
            <Meta label={t('generator.startDate')} value={plan.startDate || '—'} />
            <Meta label={t('generator.weeklyProgress')} value={`${totalWeeks} ${t('generator.ofWeeks')}`} />
            {plan.restDays && plan.restDays.length > 0 && (
              <Meta
                label={t('generator.restDays')}
                value={plan.restDays.map((i) => (lang === 'ar' ? WEEKDAYS[i].ar : WEEKDAYS[i].en)).join('، ')}
              />
            )}
          </div>

          {plan.days.map((day, di) => (
            <div key={di} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 font-semibold text-gray-200">
                {t('print.day')} {di + 1}: <span className="text-neon">{day.label}</span>
                <span className="ml-2 text-xs font-normal capitalize text-gray-500">{day.focus}</span>
              </div>
              {day.exercises.length === 0 ? (
                <div className="text-sm text-gray-500">{t('workouts.restDay')}</div>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {day.exercises.map((ex) => {
                    const full = getById(ex.exId)
                    return (
                      <div key={ex.exId} className="flex items-center gap-2 rounded-lg bg-white/5 p-2">
                        <ExerciseImage exercise={full} className="h-12 w-12 shrink-0 rounded-md bg-white/5 object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-100">{ex.name}</div>
                          <div className="text-xs text-neon">
                            {ex.sets} {t('common.sets')} × {ex.reps} {t('common.reps')}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-2">
            <button onClick={onSave} className="neon-btn-solid flex items-center gap-2">
              {saved ? <IconCheck width={18} height={18} /> : null}
              {saved ? t('generator.saved') : t('generator.save')}
            </button>
            <button onClick={onExportPdf} className="neon-btn flex items-center gap-2">
              <IconPdf width={18} height={18} />
              {t('generator.exportPdf')}
            </button>
          </div>
        </div>
      ) : (
        <div className="glass p-6 text-center text-gray-400">{t('generator.empty')}</div>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</div>
      {children}
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-100">{value}</div>
    </div>
  )
}
