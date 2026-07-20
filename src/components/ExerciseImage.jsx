// Smart exercise image: loads via the IndexedDB-backed cache, shows a shimmer
// skeleton while pending, and falls back to an elegant labeled placeholder
// (category icon + name) when no real image is available — never a broken icon.
// Prefers the animated GIF; falls back to the static JPG automatically.
import React, { useEffect, useState } from 'react'
import { loadCachedImage } from '../lib/imgcache.js'
import { hasGif } from '../data/exercises.js'

function categoryGlyph(category) {
  const c = (category || '').toLowerCase()
  if (c.includes('chest')) return '◈'
  if (c.includes('back')) return '⩊'
  if (c.includes('leg') || c.includes('waist')) return '⬡'
  if (c.includes('arm')) return '⌇'
  if (c.includes('shoulder')) return '◉'
  if (c.includes('cardio') || c.includes('neck')) return '✦'
  return '◍'
}

export default function ExerciseImage({ exercise, className = '', alt }) {
  const initialUrl = exercise
    ? (hasGif(exercise) ? `/exercises/${exercise.gif}` : exercise.image ? `/exercises/${exercise.image}` : null)
    : null

  const [src, setSrc] = useState(initialUrl)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset state if the exercise changes
  useEffect(() => {
    setSrc(initialUrl)
    setLoaded(false)
    setError(false)
  }, [initialUrl])

  // Warm IndexedDB cache in background and resolve to Blob URL if cached/offline
  useEffect(() => {
    if (!initialUrl) return
    let alive = true

    loadCachedImage(initialUrl)
      .then((cachedUrl) => {
        if (alive && cachedUrl) {
          setSrc(cachedUrl)
        }
      })
      .catch(() => {
        // Ignore cache retrieval errors, keep direct server URL
      })

    return () => {
      alive = false
    }
  }, [initialUrl])

  if (!src || error) {
    return (
      <div className={`flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-white/[0.06] to-white/[0.02] text-neon/50 ${className}`}>
        <span className="text-xl leading-none">{categoryGlyph(exercise?.category)}</span>
        <span className="px-1 text-center text-[9px] font-medium leading-tight text-gray-400 line-clamp-2">
          {exercise?.name || 'exercise'}
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt || (exercise && exercise.name) || 'exercise'}
        loading="lazy"
        decoding="async"
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      {!loaded && (
        <div className={`absolute inset-0 animate-pulse bg-white/5 ${className}`} aria-busy="true" />
      )}
    </div>
  )
}
