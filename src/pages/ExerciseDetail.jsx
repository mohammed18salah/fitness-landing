import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLang, translateSteps, translateDesc, translateTerm } from '../i18n.jsx'
import { getById } from '../data/exercises.js'
import { isFavorite, toggleFavorite } from '../store.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconBack, IconStar } from '../components/Icons.jsx'

export default function ExerciseDetail() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const exercise = getById(id)
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setFav(isFavorite(id))
  }, [id])

  if (!exercise) {
    return (
      <div className="glass p-8 text-center text-gray-400">
        {t('library.noResults')}
        <div className="mt-3">
          <Link to="/library" className="neon-btn">
            {t('detail.backToLibrary')}
          </Link>
        </div>
      </div>
    )
  }

  const steps = translateSteps(exercise.en.steps, lang)
  const desc = translateDesc(exercise.en.desc, lang)

  const onFav = () => setFav(toggleFavorite(exercise.id))

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="no-print flex items-center gap-1 text-sm text-gray-400 hover:text-neon">
        <IconBack width={18} height={18} />
        {t('detail.backToLibrary')}
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Image */}
        <div className="glass overflow-hidden p-2">
          <ExerciseImage exercise={exercise} className="aspect-square w-full rounded-lg bg-white/5 object-cover" />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h1 className="text-xl font-bold leading-tight">{exercise.name}</h1>
            <button
              onClick={onFav}
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${
                fav ? 'bg-neon/20 text-neon' : 'bg-white/5 text-gray-300 hover:text-neon'
              }`}
              aria-label="favorite"
            >
              <IconStar width={20} height={20} filled={fav} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="chip chip-active capitalize">{exercise.category}</span>
            <span className="chip capitalize">{exercise.body_part}</span>
            {exercise.equipment && (
              <span className="chip capitalize">{lang === 'ar' ? translateTerm(exercise.equipment) : exercise.equipment}</span>
            )}
          </div>

          <InfoRow label={t('detail.target')} value={lang === 'ar' ? translateTerm(exercise.target) : exercise.target} />
          <InfoRow
            label={t('detail.secondary')}
            value={(exercise.secondary || []).map((s) => (lang === 'ar' ? translateTerm(s) : s)).join(', ')}
          />
          <InfoRow label={t('detail.equipment')} value={lang === 'ar' ? translateTerm(exercise.equipment) : exercise.equipment} />
        </div>
      </div>

      {/* Instructions */}
      <div className="glass p-4">
        <h2 className="mb-3 font-bold text-neon">{t('detail.instructions')}</h2>
        <p className="mb-3 text-sm text-gray-400">{desc}</p>
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-neon/15 text-xs font-bold text-neon">
                {i + 1}
              </span>
              <span className="text-gray-200">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex justify-between gap-3 border-b border-white/5 py-1.5 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium capitalize text-gray-100">{value}</span>
    </div>
  )
}
