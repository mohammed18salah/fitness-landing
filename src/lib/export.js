// PDF export for a workout plan using jsPDF.
// Produces a polished, gym-log style sheet (PULSE GYM): a branded header with
// an ECG line, an ATHLETE/DATE/COACH bar, then one organised table per day with
// the real exercise image, sets, reps, target muscle and (only when present)
// weight + notes columns. Columns are dynamic — empty ones are dropped.
import { jsPDF } from 'jspdf'
import { getById, hasGif } from '../data/exercises.js'

export async function exportPlanPdf(plan, { t, lang }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 36
  const neon = [34, 197, 94]
  const black = [17, 17, 17]
  let y = margin

  const ensureSpace = (needed) => {
    if (y + needed > pageH - margin) {
      doc.addPage()
      y = margin
    }
  }

  // Decide which optional columns to show (dynamic)
  let anyWeight = false
  let anyNotes = false
  for (const d of plan.days) {
    for (const ex of d.exercises) {
      if (ex.weight || ex.kg) anyWeight = true
      if (ex.notes) anyNotes = true
    }
  }
  const extraCols = (anyWeight ? 1 : 0) + (anyNotes ? 1 : 0)

  // ---- Branded header ----
  const headY = y
  doc.setDrawColor(...neon)
  doc.setLineWidth(2)
  // ECG line left
  drawEcg(doc, margin, headY + 14, 70, neon)
  // ECG line right
  drawEcg(doc, pageW - margin - 70, headY + 14, 70, neon)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...neon)
  doc.text('PULSE', pageW / 2, headY + 18, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(40, 40, 40)
  doc.text('GYM', pageW / 2, headY + 32, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  const tagline = lang === 'ar' ? 'تدرب بقوة. استمر. كن أفضل نسخة منك.' : 'TRAIN HARD. STAY CONSISTENT. BE YOUR BEST.'
  doc.text(tagline, pageW / 2, headY + 46, { align: 'center' })
  y = headY + 58

  // ---- Info bar ----
  doc.setFillColor(...black)
  doc.rect(margin, y, pageW - margin * 2, 22, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...neon)
  const cellW = (pageW - margin * 2) / 3
  doc.text('ATHLETE:', margin + 8, y + 14)
  doc.text('DATE:', margin + 8 + cellW, y + 14)
  doc.text('COACH:', margin + 8 + cellW * 2, y + 14)
  y += 30

  // ---- Plan name ----
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(20, 20, 20)
  doc.text(plan.name || 'Workout Plan', margin, y)
  y += 8
  const meta = []
  if (plan.durationMonths) meta.push(`${t('generator.duration')}: ${plan.durationMonths} ${t('generator.durationLabel')}`)
  if (plan.startDate) meta.push(`${t('generator.startDate')}: ${plan.startDate}`)
  if (plan.daysPerWeek) meta.push(`${t('generator.daysWeek') || 'Days/week'}: ${plan.daysPerWeek}`)
  if (meta.length) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(120, 120, 120)
    doc.text(meta.join('    •    '), margin, y)
  }
  y += 14

  // ---- Days / tables ----
  for (const day of plan.days) {
    ensureSpace(60)
    // day header
    doc.setFillColor(...black)
    doc.rect(margin, y, pageW - margin * 2, 20, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(255, 255, 255)
    const dayTitle = `${t('print.day')} ${day.dayIndex + 1}: ${day.label}${day.focus ? '  (' + day.focus + ')' : ''}`
    doc.text(dayTitle, margin + 8, y + 14)
    y += 24

    if (!day.exercises.length) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9)
      doc.setTextColor(140, 140, 140)
      doc.text(t('workouts.restDay'), margin + 8, y)
      y += 16
      continue
    }

    // column widths
    const tableW = pageW - margin * 2
    const baseCols = [28, 150, 46, 46, 120] // #, exercise, sets, reps, muscle
    if (anyWeight) baseCols.push(56)
    if (anyNotes) baseCols.push(tableW - baseCols.reduce((a, b) => a + b, 0) - (anyWeight ? 56 : 0))
    const total = baseCols.reduce((a, b) => a + b, 0)
    // normalise to tableW
    const scale = tableW / total
    const cols = baseCols.map((c) => c * scale)
    const sumCols = cols.reduce((a, b) => a + b, 0)
    const adjCols = [...cols]
    adjCols[adjCols.length - 1] += tableW - sumCols

    // table header row
    doc.setFillColor(235, 235, 235)
    doc.rect(margin, y, tableW, 18, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(20, 20, 20)
    const headLabels = ['#', t('print.exercise'), t('print.sets'), t('print.reps'), t('print.muscle')]
    if (anyWeight) headLabels.push(t('print.weight') || 'KG')
    if (anyNotes) headLabels.push(t('print.notes') || 'NOTES')
    let cx = margin
    headLabels.forEach((h, i) => {
      doc.text(h, cx + 4, y + 12)
      cx += adjCols[i]
    })
    y += 18

    // rows
    let n = 0
    for (const ex of day.exercises) {
      const rowH = 40
      ensureSpace(rowH)
      const src = ex.exId ? getById(ex.exId) : null
      const muscle = (src && (src.target || src.muscle_group)) || ex.category || '—'
      n += 1

      // row background
      doc.setFillColor(250, 250, 250)
      doc.rect(margin, y, tableW, rowH, 'F')
      // row border
      doc.setDrawColor(225, 225, 225)
      doc.setLineWidth(0.5)
      doc.line(margin, y + rowH, margin + tableW, y + rowH)

      let x = margin
      // #
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(20, 20, 20)
      doc.text(String(n), x + 4, y + rowH / 2 + 3)
      x += adjCols[0]
      // exercise (image + name)
      const imgPath = hasGif(ex) ? `/exercises/${ex.gif}` : ex.image ? `/exercises/${ex.image}` : null
      let imgRight = x + 36
      if (imgPath) {
        const dataUrl = await loadImageAsDataUrl(imgPath)
        if (dataUrl) {
          try {
            doc.addImage(dataUrl, 'PNG', x + 2, y + 2, 36, 36, undefined, 'FAST')
          } catch { /* skip */ }
        }
      }
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(20, 20, 20)
      doc.text(doc.splitTextToSize(ex.name || '', adjCols[1] - 42), imgRight + 4, y + rowH / 2 + 3)
      x += adjCols[1]
      // sets
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(20, 20, 20)
      doc.text(String(ex.sets ?? ''), x + 4, y + rowH / 2 + 3)
      x += adjCols[2]
      // reps
      doc.text(String(ex.reps ?? ''), x + 4, y + rowH / 2 + 3)
      x += adjCols[3]
      // muscle
      doc.text(doc.splitTextToSize(muscle, adjCols[4]), x + 4, y + rowH / 2 + 3)
      x += adjCols[4]
      let ci = 5
      if (anyWeight) {
        doc.text(String(ex.weight ?? ex.kg ?? ''), x + 4, y + rowH / 2 + 3)
        x += adjCols[ci]; ci++
      }
      if (anyNotes) {
        doc.text(doc.splitTextToSize(ex.notes || '', adjCols[ci]), x + 4, y + rowH / 2 + 3)
      }
      y += rowH
    }
    y += 10
  }

  // ---- Footer ----
  ensureSpace(20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(130, 130, 130)
  const f1 = lang === 'ar' ? 'تركيز · انضباط · استمرار' : 'FOCUS · DISCIPLINE · CONSISTENCY'
  const f3 = lang === 'ar' ? 'أقوى من أمس' : 'STRONGER THAN YESTERDAY'
  doc.text(f1, margin, y)
  doc.setTextColor(...neon)
  doc.setFont('helvetica', 'bold')
  doc.text('PULSE · FEEL THE PULSE', pageW / 2, y, { align: 'center' })
  doc.setTextColor(130, 130, 130)
  doc.setFont('helvetica', 'normal')
  doc.text(f3, pageW - margin, y, { align: 'right' })

  const safe = (plan.name || 'workout').replace(/\s+/g, '_')
  doc.save(`${safe}.pdf`)
}

function drawEcg(doc, x, y, w, color) {
  doc.setDrawColor(...color)
  doc.setLineWidth(1.5)
  const pts = [
    [x, y], [x + w * 0.25, y], [x + w * 0.32, y - 6],
    [x + w * 0.4, y + 7], [x + w * 0.48, y - 3], [x + w * 0.55, y], [x + w, y],
  ]
  doc.lines([], x, y)
  let px = x, py = y
  pts.slice(1).forEach(([nx, ny]) => {
    doc.line(px, py, nx, ny)
    px = nx; py = ny
  })
}

function loadImageAsDataUrl(path) {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth || 180
        canvas.height = img.naturalHeight || 180
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      } catch { resolve(null) }
    }
    img.onerror = () => resolve(null)
    img.src = path
  })
}
