// Smart exercise image: loads via the IndexedDB-backed cache, shows a shimmer
// skeleton while pending, and falls back to an elegant labeled placeholder
// (category icon + name) when no real image is available — never a broken icon.
// Prefers the animated GIF; falls back to the static JPG automatically.
import React, { useEffect, useState } from 'react'
import { localImageFor, loadBestImage } from '../lib/imgcache.js'
import { IconImageOff } from './Icons.jsx'

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
  const [state, setState] = useState({ status: 'loading', src: null })
  // Stable string key from the exercise's media refs — avoids re-running the
  // effect on every render (a fresh array reference would cause an infinite
  // render loop and freeze the page).
  const candKey = exercise
    ? `${(exercise.gif || '')}|${(exercise.image || '')}`
    : ''

  useEffect(() => {
    let alive = true
    const candidates = localImageFor(exercise)
    if (!candidates || candidates.length === 0) {
      setState({ status: 'missing', src: null })
      return
    }
    setState({ status: 'loading', src: null })
    loadBestImage(candidates)
      .then((res) => {
        if (!alive) return
        if (res) setState({ status: 'ok', src: res.objUrl })
        else setState({ status: 'missing', src: null })
      })
      .catch(() => alive && setState({ status: 'missing', src: null }))
    return () => {
      alive = false
    }
  }, [candKey, exercise])

  if (state.status === 'missing') {
    return (
      <div className={`flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-white/[0.06] to-white/[0.02] text-neon/50 ${className}`}>
        <span className="text-xl leading-none">{categoryGlyph(exercise?.category)}</span>
        <span className="px-1 text-center text-[9px] font-medium leading-tight text-gray-400 line-clamp-2">
          {exercise?.name || 'exercise'}
        </span>
      </div>
    )
  }

  if (state.status === 'loading') {
    return (
      <div className={`animate-pulse bg-white/5 ${className}`} aria-busy="true" />
    )
  }

  return (
    <img
      src={state.src}
      alt={alt || (exercise && exercise.name) || 'exercise'}
      loading="eager"
      decoding="auto"
      className={className}
    />
  )
}
