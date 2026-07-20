// OCR -> workout matching.
// Given raw OCR text, find exercises in our database whose name (EN) or
// Arabic alias matches a line. Supports fuzzy containment and a small
// Arabic<->English synonym dictionary for common terms the user mentioned
// (e.g. "نشر جانبي واقف" -> lateral raise standing).
import { EXERCISES } from '../data/exercises.js'

// Synonym map: normalised keyword -> list of name fragments to look for.
const SYN = [
  { kw: ['bench press', 'برينج بريس', 'بنش بريس'], frag: ['bench press'] },
  { kw: ['lateral raise', 'نشر جانبي', 'رفع جانبي'], frag: ['lateral raise'] },
  { kw: ['standing', 'واقف'], frag: ['standing'] },
  { kw: ['bent over', 'انحناء', 'انحناء للأمام', 'سحب خلفي'], frag: ['bent over', 'bent-over'] },
  { kw: ['pull', 'سحب', 'جلب'], frag: ['pull'] },
  { kw: ['push up', 'بوش اب', 'ضغط'], frag: ['push-up', 'push up'] },
  { kw: ['squat', 'سكوات', 'قرفصاء'], frag: ['squat'] },
  { kw: ['deadlift', 'ديد لفت', 'رفعة ميتة'], frag: ['deadlift'] },
  { kw: ['curl', 'كيرل', 'لفة'], frag: ['curl'] },
  { kw: ['dip', 'دب', 'غطس'], frag: ['dip'] },
  { kw: ['row', 'رو', 'تجديف'], frag: ['row'] },
  { kw: ['fly', 'فلاي', 'طيران'], frag: ['fly'] },
  { kw: ['crunch', 'كرانش', 'انكماش'], frag: ['crunch'] },
  { kw: ['plank', 'بلانك', 'لوح'], frag: ['plank'] },
  { kw: ['leg press', 'ليج بريس'], frag: ['leg press'] },
  { kw: ['shoulder press', 'شولدر بريس', 'ضغط كتف'], frag: ['shoulder press'] },
  { kw: ['chest', 'صدر', 'صدرية'], frag: ['chest'] },
  { kw: ['back', 'ظهر', 'ظهرية'], frag: ['back'] },
  { kw: ['bicep', 'بايسب', 'عضلة ذراعية'], frag: ['bicep'] },
  { kw: ['tricep', 'ترايسب', 'ثلاثية الرؤوس'], frag: ['tricep'] },
  { kw: ['leg', 'رجل', 'ساق', 'فخذ'], frag: ['leg', 'legs'] },
]

function norm(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[ؐ-ًؚ-ْٰ]/g, '') // strip Arabic diacritics
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Build a searchable index once.
const IDX = EXERCISES.map((e) => ({
  ex: e,
  n: norm(e.name),
  ar: norm(e.arName || ''),
}))

// Match a single normalised line against the DB.
function matchLine(line) {
  const ln = norm(line)
  if (ln.length < 3) return null
  // 1) direct contained name
  let hit = IDX.find((x) => x.n.includes(ln) || ln.includes(x.n))
  if (hit) return hit.ex
  // 2) arabic alias
  hit = IDX.find((x) => x.ar && (x.ar.includes(ln) || ln.includes(x.ar)))
  if (hit) return hit.ex
  // 3) synonym fragments
  for (const s of SYN) {
    if (s.kw.some((k) => ln.includes(norm(k)))) {
      const frag = s.frag
      const h = IDX.find((x) => frag.some((f) => x.n.includes(norm(f))))
      if (h) return h.ex
    }
  }
  // 4) partial token overlap (any word >=4 chars present in a name)
  const toks = ln.split(' ').filter((t) => t.length >= 4)
  for (const tk of toks) {
    const h = IDX.find((x) => x.n.includes(tk))
    if (h) return h.ex
  }
  return null
}

// Parse OCR text into matched exercises + unmatched lines.
// If `markUnknown` is true, unmatched lines are returned as {unknown:true,line}
// so the UI can let the user add them manually.
export function parseWorkoutText(text) {
  const lines = (text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
  const matched = []
  const unknown = []
  const seen = new Set()
  for (const line of lines) {
    const ex = matchLine(line)
    if (ex && !seen.has(ex.id)) {
      seen.add(ex.id)
      matched.push(ex)
    } else if (!ex) {
      unknown.push({ unknown: true, line })
    }
  }
  return { matched, unknown }
}

// --- Handwriting pre-processing -------------------------------------------------
// Lightweight client-side normalisation: upscale, grayscale, contrast/binarise
// so Tesseract reads messy handwriting far better. Runs on a <canvas>, no deps.
export async function preprocessForHandwriting(file) {
  const img = await loadImage(file)
  const scale = 3
  const w = img.width * scale
  const h = img.height * scale
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, w, h)
  const imageData = ctx.getImageData(0, 0, w, h)
  const d = imageData.data
  // Grayscale + simple contrast stretch + binarise
  let min = 255
  let max = 0
  for (let i = 0; i < d.length; i += 4) {
    const g = (d[i] + d[i + 1] + d[i + 2]) / 3
    if (g < min) min = g
    if (g > max) max = g
  }
  const range = max - min || 1
  for (let i = 0; i < d.length; i += 4) {
    let g = (d[i] + d[i + 1] + d[i + 2]) / 3
    g = ((g - min) / range) * 255 // contrast stretch
    const v = g > 140 ? 255 : 0 // binarise
    d[i] = d[i + 1] = d[i + 2] = v
  }
  ctx.putImageData(imageData, 0, 0)
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = reject
    img.src = url
  })
}

