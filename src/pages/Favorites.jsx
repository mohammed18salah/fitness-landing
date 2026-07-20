import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang, translateTerm } from '../i18n.jsx'
import { getById } from '../data/exercises.js'
import { loadFavorites, toggleFavorite } from '../store.js'
import ExerciseImage from '../components/ExerciseImage.jsx'
import { IconStar, IconLibrary } from '../components/Icons.jsx'

export default function Favorites() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const [favs, setFavs] = useState(loadFavorites())

  useEffect(() => {
    setFavs(loadFavorites())
  }, [])

  const onToggle = (id) => setFavs(toggleFavorite(id))
  const exercises = favs.map((id) => getById(id)).filter(Boolean)

  return (
    <div className="space-y-4">
      <h1 className="flex items-center gap-2 text-xl font-bold">
        <IconStar width={22} height={22} className="text-neon" filled />
        {t('favorites.title')}
      </h1>

      {exercises.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 p-8 text-center text-gray-400">
          {t('favorites.empty')}
          <Link to="/library" className="neon-btn">
            {t('favorites.emptyCta')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {exercises.map((ex) => (
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
                    onToggle(ex.id)
                  }}
                  className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-full bg-neon/20 text-neon"
                  aria-label="unfavorite"
                >
                  <IconStar width={16} height={16} filled />
                </button>
              </div>
              <div className="mt-2 truncate px-1 text-sm font-medium text-gray-100">{ex.name}</div>
              <div className="px-1 text-[11px] capitalize text-gray-500">
                {lang === 'ar' ? translateTerm(ex.target) : ex.target}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
