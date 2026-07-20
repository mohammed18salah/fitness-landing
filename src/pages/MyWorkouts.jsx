import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { loadPlans, deletePlan, toggleExerciseDone } from '../store.js'
import { getById } from '../data/exercises.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import PrintSheet from '../components/PrintSheet.jsx'
import { IconWorkout, IconTrash, IconPrint, IconCheck, IconBack, IconPlay, IconInfo } from '../components/Icons.jsx'

export default function MyWorkouts() {
  const { id } = useParams()
  const { t } = useLang()
  const navigate = useNavigate()
  const [plans, setPlans] = useState(loadPlans())
  const [printPlan, setPrintPlan] = useState(null)
  const [previewEx, setPreviewEx] = useState(null)

  useEffect(() => {
    setPlans(loadPlans())
  }, [id])

  const refresh = () => setPlans(loadPlans())

  if (id) {
    const plan = plans.find((p) => p.id === id)
    if (!plan) {
      return (
        <div className="glass p-8 text-center text-gray-400">
          {t('workouts.noPlans')}
          <div className="mt-3">
            <Link to="/workouts" className="neon-btn">
              {t('workouts.back')}
            </Link>
          </div>
        </div>
      )
    }

    const total = plan.days.reduce((a, d) => a + d.exercises.length, 0)
    const done = plan.days.reduce((a, d) => a + d.exercises.filter((e) => e.done).length, 0)
    const pct = total ? Math.round((done / total) * 100) : 0

    return (
      <div className="space-y-4">
        <div className="no-print flex items-center justify-between">
          <button onClick={() => navigate('/workouts')} className="flex items-center gap-1 text-sm text-gray-400 hover:text-neon">
            <IconBack width={18} height={18} />
            {t('workouts.back')}
          </button>
          <button onClick={() => setPrintPlan(plan)} className="neon-btn flex items-center gap-2">
            <IconPrint width={18} height={18} />
            {t('workouts.print')}
          </button>
        </div>

        <div className="glass p-4">
          <h1 className="text-xl font-bold text-neon">{plan.name}</h1>
          <div className="mt-1 text-xs text-gray-500">
            {plan.daysPerWeek} {t('generator.daysLabel')} · {plan.goal}
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>{t('workouts.progress')}</span>
              <span>
                {done}/{total} ({pct}%)
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-neon transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {plan.days.map((day, di) => (
          <div key={di} className="glass p-3">
            <div className="mb-2 font-semibold text-gray-200">
              {t('print.day')} {di + 1}: <span className="text-neon">{day.label}</span>
              <span className="ml-2 text-xs font-normal capitalize text-gray-500">{day.focus}</span>
            </div>
            {day.exercises.length === 0 ? (
              <div className="text-sm text-gray-500">{t('workouts.restDay')}</div>
            ) : (
              <div className="space-y-2">
                {day.exercises.map((ex) => {
                  const full = getById(ex.exId)
                  return (
                    <label
                      key={ex.exId}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition ${
                        ex.done ? 'bg-neon/10' : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!ex.done}
                        onChange={() => {
                          toggleExerciseDone(plan.id, di, ex.exId)
                          refresh()
                        }}
                        className="peer sr-only"
                      />
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border ${
                          ex.done ? 'border-neon bg-neon text-black' : 'border-white/20 text-transparent'
                        }`}
                      >
                        <IconCheck width={16} height={16} />
                      </span>
                      <ExerciseImage exercise={full} className="h-10 w-10 shrink-0 rounded-md bg-white/5 object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className={`truncate text-sm font-medium ${ex.done ? 'text-neon line-through' : 'text-gray-100'}`}>
                          {ex.name}
                        </div>
                        <div className="text-xs text-neon">
                          {ex.sets} {t('common.sets')} × {ex.reps} {t('common.reps')}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewEx(full)}
                          className="grid h-8 w-8 place-items-center rounded-md bg-white/5 text-gray-300 hover:text-neon"
                          aria-label="show gif"
                        >
                          <IconPlay width={16} height={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/library/${ex.exId}`)}
                          className="grid h-8 w-8 place-items-center rounded-md bg-white/5 text-gray-300 hover:text-neon"
                          aria-label="details"
                        >
                          <IconInfo width={16} height={16} />
                        </button>
                      </div>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        ))}

        {previewEx && (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreviewEx(null)}>
            <div className="max-h-[80vh] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-panel p-3" onClick={(e) => e.stopPropagation()}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-bold text-neon">{previewEx.name}</h3>
                <button onClick={() => setPreviewEx(null)} className="text-gray-400 hover:text-white">
                  <IconBack width={20} height={20} />
                </button>
              </div>
              <ExerciseImage exercise={previewEx} className="aspect-square w-full rounded-lg bg-white/5 object-cover" />
            </div>
          </div>
        )}

        {printPlan && <PrintSheet plan={printPlan} onClose={() => setPrintPlan(null)} />}
      </div>
    )
  }

  // List view
  const onDelete = (pid) => {
    deletePlan(pid)
    refresh()
  }

  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <IconWorkout width={22} height={22} className="text-neon" />
        {t('workouts.title')}
      </h1>

      {plans.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 p-8 text-center text-gray-400">
          {t('workouts.empty')}
          <Link to="/generator" className="neon-btn">
            {t('workouts.emptyCta')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {plans.map((plan) => {
            const total = plan.days.reduce((a, d) => a + d.exercises.length, 0)
            const done = plan.days.reduce((a, d) => a + d.exercises.filter((e) => e.done).length, 0)
            return (
              <div key={plan.id} className="glass flex items-center gap-3 p-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-neon/15 text-neon">
                  <IconWorkout width={22} height={22} />
                </div>
                <Link to={`/workouts/${plan.id}`} className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-gray-100">{plan.name}</div>
                  <div className="text-xs text-gray-500">
                    {plan.daysPerWeek} {t('generator.daysLabel')} · {total} {t('generator.exercises')} · {done} {t('workouts.done')}
                  </div>
                </Link>
                <button
                  onClick={() => setPrintPlan(plan)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gray-300 hover:text-neon"
                  aria-label="print"
                >
                  <IconPrint width={18} height={18} />
                </button>
                <button
                  onClick={() => onDelete(plan.id)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gray-300 hover:text-red-400"
                  aria-label="delete"
                >
                  <IconTrash width={18} height={18} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {printPlan && <PrintSheet plan={printPlan} onClose={() => setPrintPlan(null)} />}
    </div>
  )
}
