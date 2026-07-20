// localStorage-backed persistence for saved workout plans and favorites.
const PLANS_KEY = 'pulse.plans'
const FAV_KEY = 'pulse.favorites'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

// ---------- Plans ----------
export function loadPlans() {
  const plans = read(PLANS_KEY, [])
  // Ensure each plan has a progress map for checkboxes.
  return plans.map((p) => ({
    ...p,
    days: (p.days || []).map((d) => ({
      ...d,
      exercises: (d.exercises || []).map((ex) => ({
        ...ex,
        done: !!(ex.done),
      })),
    })),
  }))
}

export function savePlans(plans) {
  write(PLANS_KEY, plans)
}

export function addPlan(plan) {
  const plans = loadPlans()
  plans.unshift(plan)
  savePlans(plans)
  return plans
}

export function deletePlan(planId) {
  const plans = loadPlans().filter((p) => p.id !== planId)
  savePlans(plans)
  return plans
}

export function updatePlan(updated) {
  const plans = loadPlans().map((p) => (p.id === updated.id ? updated : p))
  savePlans(plans)
  return plans
}

export function toggleExerciseDone(planId, dayIndex, exId) {
  const plans = loadPlans()
  const plan = plans.find((p) => p.id === planId)
  if (!plan) return plans
  const day = plan.days[dayIndex]
  if (!day) return plans
  const ex = day.exercises.find((e) => e.exId === exId)
  if (!ex) return plans
  ex.done = !ex.done
  savePlans(plans)
  return plans
}

// ---------- Favorites ----------
export function loadFavorites() {
  return read(FAV_KEY, [])
}

export function saveFavorites(ids) {
  write(FAV_KEY, ids)
}

export function toggleFavorite(id) {
  const favs = loadFavorites()
  const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id]
  saveFavorites(next)
  return next
}

export function isFavorite(id) {
  return loadFavorites().includes(id)
}
