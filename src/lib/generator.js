// Workout plan generator.
// Picks exercises from the dataset based on goal / experience / days-per-week
// and assigns sets x reps per exercise.
import { EXERCISES, CATEGORIES } from '../data/exercises.js'

// Map each training goal to a prioritized list of muscle categories.
const GOAL_CATEGORIES = {
  muscle: ['chest', 'back', 'upper arms', 'shoulders', 'upper legs', 'lower legs', 'waist'],
  fat: ['cardio', 'upper legs', 'back', 'chest', 'shoulders', 'waist', 'lower legs'],
  strength: ['back', 'upper legs', 'chest', 'shoulders', 'upper arms', 'lower legs'],
}

// Default sets x reps per goal and level.
const PRESCRIPTION = {
  muscle: { beginner: [3, '8-12'], intermediate: [4, '8-12'], advanced: [4, '6-10'] },
  fat: { beginner: [3, '12-15'], intermediate: [3, '15-20'], advanced: [4, '15-20'] },
  strength: { beginner: [3, '5-8'], intermediate: [5, '3-5'], advanced: [5, '3-5'] },
}

// A weekly split template keyed by days/week. Each entry is a focus label that
// maps to the category ordering for that training day.
const SPLIT_TEMPLATES = {
  1: [['full', GOAL_CATEGORIES]],
  2: [
    ['upper', ['chest', 'back', 'shoulders', 'upper arms']],
    ['lower', ['upper legs', 'lower legs', 'waist']],
  ],
  3: [
    ['push', ['chest', 'shoulders', 'upper arms']],
    ['pull', ['back', 'upper arms', 'waist']],
    ['legs', ['upper legs', 'lower legs', 'cardio']],
  ],
  4: [
    ['chest', ['chest', 'upper arms']],
    ['back', ['back', 'waist']],
    ['legs', ['upper legs', 'lower legs']],
    ['shoulders', ['shoulders', 'cardio']],
  ],
  5: [
    ['chest', ['chest', 'upper arms']],
    ['back', ['back', 'waist']],
    ['legs', ['upper legs', 'lower legs']],
    ['shoulders', ['shoulders']],
    ['cardio', ['cardio', 'waist']],
  ],
  6: [
    ['chest', ['chest', 'upper arms']],
    ['back', ['back']],
    ['legs', ['upper legs', 'lower legs']],
    ['shoulders', ['shoulders', 'upper arms']],
    ['arms', ['upper arms', 'lower arms']],
    ['cardio', ['cardio', 'waist']],
  ],
}

const DAY_LABELS = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  ar: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
}

// Pre-bucket exercises by category for fast sampling.
const BY_CATEGORY = {}
for (const ex of EXERCISES) {
  const c = ex.category
  ;(BY_CATEGORY[c] = BY_CATEGORY[c] || []).push(ex)
}

function sampleExercises(categories, count, usedIds) {
  const picked = []
  for (const cat of categories) {
    const pool = (BY_CATEGORY[cat] || []).filter((e) => !usedIds.has(e.id))
    // shuffle deterministically-ish
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    for (const e of shuffled) {
      if (picked.length >= count) break
      if (usedIds.has(e.id)) continue
      picked.push(e)
      usedIds.add(e.id)
    }
    if (picked.length >= count) break
  }
  return picked
}

export function generatePlan({ goal, level, days, name, lang = 'en', durationMonths = 2, startDate = null, restDays = [] }) {
  const template = SPLIT_TEMPLATES[days] || SPLIT_TEMPLATES[3]
  const [sets, reps] = (PRESCRIPTION[goal] || PRESCRIPTION.muscle)[level] || [3, '8-12']
  const perDay = days <= 3 ? 5 : days <= 4 ? 4 : 4
  const labels = DAY_LABELS[lang] || DAY_LABELS.en

  const usedIds = new Set()
  const dayObjs = template.map((entry, idx) => {
    const [focus, categories] = entry
    const picks = sampleExercises(categories, perDay, usedIds)
    return {
      dayIndex: idx,
      label: lang === 'ar' ? `${labels[idx]}` : `${labels[idx]}`,
      focus,
      exercises: picks.map((ex) => ({
        exId: ex.id,
        name: ex.name,
        gif: ex.gif,
        image: ex.image,
        sets,
        reps,
        category: ex.category,
        equipment: ex.equipment,
        target: ex.target,
      })),
    }
  })

  const plan = {
    id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: name || defaultName(goal, level, days, lang),
    goal,
    level,
    daysPerWeek: days,
    durationMonths: durationMonths || 2,
    startDate: startDate || null,
    restDays: restDays || [],
    createdAt: new Date().toISOString(),
    days: dayObjs,
  }
  return plan
}

function defaultName(goal, level, days, lang) {
  const g = { muscle: { en: 'Muscle Gain', ar: 'زيادة العضل' }, fat: { en: 'Fat Loss', ar: 'حرق الدهون' }, strength: { en: 'Strength', ar: 'القوة' } }[goal] || { en: 'Plan', ar: 'خطة' }
  return lang === 'ar' ? `${g.ar} — ${days} ${'أيام'}` : `${g.en} — ${days} Day`
}
