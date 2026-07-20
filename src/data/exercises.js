// Loads the curated exercise dataset (1324 entries, English source fields).
// Images: 320 animated GIFs + 1324 static JPGs in /public/exercises.
// We map the dataset to a stable shape and resolve image URLs at runtime.
import raw from '../../public/exercises-meta.json'

export const EXERCISES = raw

// Build fast lookups
export const BY_ID = Object.fromEntries(EXERCISES.map((e) => [e.id, e]))

export const CATEGORIES = Array.from(
  new Set(EXERCISES.map((e) => e.category))
).sort()

export const BODY_PARTS = Array.from(
  new Set(EXERCISES.map((e) => e.body_part))
).sort()

export const EQUIPMENT = Array.from(
  new Set(EXERCISES.map((e) => e.equipment))
).sort()

export function getById(id) {
  return BY_ID[id]
}

// Resolve the BEST image for an exercise: prefer the animated GIF, then the
// static JPG. Both are local files in /public/exercises. Returns an array of
// candidate URLs (most-preferred first) so the cache can cascade.
export function imageCandidates(exercise) {
  if (!exercise) return []
  const out = []
  // GIF gives animation where we have it
  if (exercise.gif) {
    const g = exercise.gif.startsWith('/') ? exercise.gif : `/exercises/${exercise.gif}`
    out.push(g)
  }
  // JPG is the universal fallback (every exercise has one)
  if (exercise.image) {
    const j = exercise.image.startsWith('/') ? exercise.image : `/exercises/${exercise.image}`
    out.push(j)
  }
  return out
}
