// Smart image cache layer.
// 1) IndexedDB-backed cache: once an image is fetched it is stored as a blob
//    and served locally on subsequent loads (offline-friendly, zero re-download).
// 2) In-memory LRU for ultra-fast repeat reads within a session.
// 3) The UI shows a skeleton shimmer while pending and an elegant labeled
//    placeholder when no real image exists (instead of a broken-image icon).
import { EXERCISES, BY_ID, hasGif } from '../data/exercises.js'

const DB_NAME = 'pulse-imgcache'
const STORE = 'imgs'
const VERSION = 1
const MEM_CAP = 200

const memCache = new Map() // url -> objectURL (LRU)

let dbPromise = null
function openDB() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') return reject(new Error('no idb'))
    const req = indexedDB.open(DB_NAME, VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

async function idbGet(key) {
  const db = await openDB()
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(key)
    req.onsuccess = () => resolve(req.result || null)
    req.onerror = () => resolve(null)
  })
}

async function idbPut(key, blob) {
  try {
    const db = await openDB()
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put(blob, key)
  } catch {
    /* ignore quota / private mode */
  }
}

function memSet(url, objUrl) {
  if (memCache.has(url)) memCache.delete(url)
  memCache.set(url, objUrl)
  if (memCache.size > MEM_CAP) {
    const oldest = memCache.keys().next().value
    const old = memCache.get(oldest)
    URL.revokeObjectURL(old)
    memCache.delete(oldest)
  }
}

// Resolve the best local URL candidates for an exercise.
// Prefers the animated GIF, then the static JPG. Returns an array (most
// preferred first) or empty array if none exist.
export function localImageFor(exercise) {
  if (!exercise) return []
  const cands = []
  if (hasGif(exercise)) {
    const raw = exercise.gif
    cands.push(raw.startsWith('/') ? raw : `/exercises/${raw}`)
  }
  if (exercise.image) {
    const raw = exercise.image
    cands.push(raw.startsWith('/') ? raw : `/exercises/${raw}`)
  }
  return cands
}

// Load an image URL, caching the result in IndexedDB + memory.
// Returns an objectURL, or null if the network/file failed.
export async function loadCachedImage(url) {
  if (!url) return null
  if (memCache.has(url)) return memCache.get(url)
  try {
    const cached = await idbGet(url)
    if (cached && cached.size) {
      const objUrl = URL.createObjectURL(cached)
      memSet(url, objUrl)
      return objUrl
    }
  } catch {
    /* ignore */
  }
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const blob = await res.blob()
    const objUrl = URL.createObjectURL(blob)
    memSet(url, objUrl)
    idbPut(url, blob)
    return objUrl
  } catch {
    return null
  }
}

// Try each candidate URL in order, returning the first that loads. The GIF is
// attempted first (animation); if missing, the JPG fallback is used.
export async function loadBestImage(candidates) {
  for (const url of candidates || []) {
    const objUrl = await loadCachedImage(url)
    if (objUrl) return { objUrl, isGif: url.endsWith('.gif') }
  }
  return null
}

// Warm the cache for the exercises most likely to be shown (e.g. library first
// screen). Called once on app mount with low priority.
let warmed = false
export async function warmCache(limit = 120) {
  if (warmed) return
  warmed = true
  const batch = EXERCISES.slice(0, limit)
  for (const ex of batch) {
    const cands = localImageFor(ex)
    if (cands.length) loadBestImage(cands).catch(() => {})
  }
}

export { BY_ID }
