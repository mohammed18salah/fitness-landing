import React from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { EXERCISES, CATEGORIES, hasGif } from '../data/exercises.js'
import { loadPlans } from '../store.js'
import PromoStrip from '../components/PromoStrip.jsx'
import { IconGenerator, IconLibrary, IconWorkout, IconStar, IconDumbbell } from '../components/Icons.jsx'

// Pick a stable image per card so the background is real and consistent.
function cardImage(i) {
  const ex = EXERCISES[(i * 211) % EXERCISES.length]
  if (!ex) return null
  return hasGif(ex) ? `/exercises/${ex.gif}` : ex.image ? `/exercises/${ex.image}` : null
}

export default function Home() {
  const { t } = useLang()
  const plans = loadPlans()
  const cards = [
    { to: '/generator', icon: IconGenerator, key: 'generator', accent: true },
    { to: '/library', icon: IconLibrary, key: 'library' },
    { to: '/workouts', icon: IconWorkout, key: 'workouts' },
    { to: '/favorites', icon: IconStar, key: 'favorites' },
  ]

  return (
    <div className="space-y-5">
      {/* Rotating feature strip — Home only */}
      <PromoStrip />

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3">
        <Stat label={t('home.stats.exercises')} value={EXERCISES.length} />
        <Stat label={t('home.stats.categories')} value={CATEGORIES.length} />
        <Stat label={t('home.stats.plans')} value={plans.length} />
      </section>

      {/* Cards grid — full-bleed image background, equal size, text on top */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((c, i) => {
          const Icon = c.icon
          const bg = cardImage(i)
          return (
            <Link
              key={c.to}
              to={c.to}
              className="group relative flex h-32 items-end overflow-hidden rounded-2xl border border-white/10 p-4 transition hover:border-neon/50"
            >
              {/* background image */}
              {bg ? (
                <img
                  src={bg}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-300 group-hover:opacity-55 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-neon/10" />
              )}
              {/* readability scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
              {/* content */}
              <div className="relative flex w-full items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-black/40 text-neon ring-1 ring-white/10 backdrop-blur">
                  <Icon width={22} height={22} />
                </div>
                <div>
                  <div className="font-bold text-white drop-shadow">{t(`home.cards.${c.key}.title`)}</div>
                  <div className="text-[13px] text-gray-200 drop-shadow">{t(`home.cards.${c.key}.sub`)}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="glass flex flex-col items-center justify-center p-3 text-center">
      <div className="text-2xl font-extrabold neon-text">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-gray-400">{label}</div>
    </div>
  )
}
