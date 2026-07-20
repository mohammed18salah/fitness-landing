import React, { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

// A large, clean rotating feature strip shown ONLY on the Home page.
// Uses real photos from the web (Unsplash) as the full-bleed background,
// with the copy overlaid on a left-side scrim for legibility. Auto-rotates
// every few seconds. No neon glow, redesigned dot indicators.
const PROMOS = [
  {
    id: 'coach',
    title: { en: 'Your Pocket Gym Coach', ar: 'مدربك الرياضي في جيبك' },
    sub: { en: 'Build training plans, track progress, and master every exercise.', ar: 'أنشئ خطط التدريب، تابع تقدمك، وأتقن كل تمرين.' },
    cta: { en: 'Open', ar: 'افتح' },
    to: '/generator',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80',
  },
  {
    id: 'whey',
    title: { en: 'Fuel your reps', ar: 'غذّ تمرينك' },
    sub: { en: 'Whey, creatine & recovery bundles.', ar: 'باقات ويي وكرياتين واسترجاع.' },
    cta: { en: 'Shop', ar: 'تسوّق' },
    to: '/library',
    img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1000&q=80',
  },
  {
    id: 'gear',
    title: { en: 'Gear that lasts', ar: 'معدات تدوم' },
    sub: { en: 'Bands, grips, mats & more.', ar: 'أربطة وقفازات وحصير وأكثر.' },
    cta: { en: 'Explore', ar: 'استكشف' },
    to: '/builder',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80',
  },
  {
    id: 'library',
    title: { en: '1,324 exercises', ar: '١٬٣٢٤ تمرين' },
    sub: { en: 'Animated demos for every movement.', ar: 'عروض متحركة لكل حركة.' },
    cta: { en: 'Browse', ar: 'تصفّح' },
    to: '/library',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=80',
  },
]

export default function PromoStrip() {
  const { t, lang } = useLang()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % PROMOS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const promo = PROMOS[idx]

  return (
    <div className="no-print mt-4">
      <div className="relative flex min-h-[210px] overflow-hidden rounded-3xl border border-white/10">
        {/* Web photo as full-bleed background */}
        <img
          key={promo.id}
          src={promo.img}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: 'promoZoom 6s ease-out' }}
        />
        {/* legibility scrims: stronger on the left where the text sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Copy overlay (left) */}
        <div className="relative z-10 flex w-full flex-col justify-between p-6 sm:p-7">
          <div className="max-w-sm">
            <h2 className="text-2xl font-extrabold leading-tight text-white drop-shadow sm:text-3xl">
              {promo.title[lang]}
            </h2>
            <p className="mt-2 text-sm text-white/90 drop-shadow sm:text-base">{promo.sub[lang]}</p>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => { if (promo.to) window.location.hash = `#${promo.to}` }}
              className="shrink-0 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-gray-900 shadow-lg transition hover:scale-105"
            >
              {promo.cta[lang]}
            </button>
            {/* redesigned dots */}
            <div className="flex items-center gap-1.5">
              {PROMOS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIdx(i)}
                  aria-label={`promo ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
