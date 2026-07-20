import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { EXERCISES, CATEGORIES } from '../data/exercises.js'
import { loadFavorites, toggleFavorite } from '../store.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconSearch, IconStar, IconWorkout } from '../components/Icons.jsx'

export default function Library() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [favs, setFavs] = useState(loadFavorites())

  useEffect(() => {
    setFavs(loadFavorites())
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = EXERCISES.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false
      if (q && !e.name.toLowerCase().includes(q)) return false
      return true
    })
    // Stable, grouped sort: by category, then by name — so the grid reads
    // like a tidy catalogue instead of scattered entries.
    list.sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return a.name.localeCompare(b.name)
    })
    return list.slice(0, 600)
  }, [query, cat])

  const onToggleFav = (id) => {
    setFavs(toggleFavorite(id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">{t('library.title')}</h1>

      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <IconSearch width={18} height={18} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('library.searchPlaceholder')}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-neon/50"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCat('all')}
          className={`chip ${cat === 'all' ? 'chip-active' : ''}`}
        >
          {t('library.all')}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip ${cat === c ? 'chip-active' : ''}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-500">
        {filtered.length} {t('library.results')}
      </div>

      {filtered.length === 0 ? (
        <div className="glass p-8 text-center text-gray-400">{t('library.noResults')}</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((ex) => {
            const fav = favs.includes(ex.id)
            return (
              <div
                key={ex.id}
                className="glass group relative cursor-pointer overflow-hidden p-2 transition hover:border-neon/50"
                onClick={() => navigate(`/library/${ex.id}`)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5">
                  <ExerciseImage exercise={ex} className="h-full w-full object-cover" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleFav(ex.id)
                    }}
                    className={`absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full backdrop-blur transition ${
                      fav ? 'bg-neon/20 text-neon' : 'bg-black/40 text-gray-300 hover:text-neon'
                    }`}
                    aria-label="favorite"
                  >
                    <IconStar width={16} height={16} filled={fav} />
                  </button>
                </div>
                <div className="mt-2 truncate px-1 text-sm font-medium text-gray-100">{ex.name}</div>
                <div className="px-1 text-[11px] capitalize text-gray-500">{ex.category}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
