import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { EXERCISES, CATEGORIES } from '../data/exercises.js'
import { loadFavorites, toggleFavorite } from '../store.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconSearch, IconStar, IconWorkout } from '../components/Icons.jsx'

function getPageNumbers(current, total) {
  const pages = []
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) {
      pages.push('...')
    }
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    if (current < total - 2) {
      pages.push('...')
    }
    pages.push(total)
  }
  return pages
}

export default function Library() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [favs, setFavs] = useState(loadFavorites())
  const [page, setPage] = useState(1)

  const itemsPerPage = 30

  useEffect(() => {
    setFavs(loadFavorites())
  }, [])

  // Reset page to 1 on filter/search change
  useEffect(() => {
    setPage(1)
  }, [query, cat])

  // Scroll to top of page smoothly when switching pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

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
    return list
  }, [query, cat])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }, [filtered, page])

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

      {paginated.length === 0 ? (
        <div className="glass p-8 text-center text-gray-400">{t('library.noResults')}</div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {paginated.map((ex) => {
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

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
              <div className="text-xs text-gray-500">
                {lang === 'ar' ? (
                  <>
                    عرض {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, filtered.length)} من أصل {filtered.length} تمرين
                  </>
                ) : (
                  <>
                    Showing {(page - 1) * itemsPerPage + 1} - {Math.min(page * itemsPerPage, filtered.length)} of {filtered.length} exercises
                  </>
                )}
              </div>
              <div className="flex items-center gap-1 flex-wrap justify-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:border-neon hover:text-neon disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-400 transition"
                >
                  {lang === 'ar' ? 'السابق' : 'Previous'}
                </button>

                {getPageNumbers(page, totalPages).map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-xs text-gray-500 select-none">
                        ...
                      </span>
                    )
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`min-w-8 h-8 px-2.5 rounded-lg text-xs font-bold transition ${
                        page === p
                          ? 'bg-neon text-black border border-neon'
                          : 'bg-white/5 border border-white/10 hover:border-neon hover:text-neon'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold hover:border-neon hover:text-neon disabled:opacity-50 disabled:hover:border-white/10 disabled:hover:text-gray-400 transition"
                >
                  {lang === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
