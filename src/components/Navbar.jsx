import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLang } from '../i18n.jsx'
import { IconHome, IconLibrary, IconGenerator, IconWorkout, IconStar, IconDumbbell } from './Icons.jsx'

const ICONS = {
  home: IconHome,
  library: IconLibrary,
  generator: IconGenerator,
  workout: IconWorkout,
  star: IconStar,
  dumbbell: IconDumbbell,
}

export default function Navbar({ nav }) {
  const { t, lang, setLang } = useLang()

  const toggle = () => {
    const next = lang === 'ar' ? 'en' : 'ar'
    setLang(next)
  }

  return (
    <>
      {/* Top bar (desktop + mobile header) */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* Refined wordmark: solid mark + clean typographic logo, no glow */}
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-neon text-base">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11" />
            </svg>
          </div>
          <div className="leading-none">
            <div className="text-lg font-extrabold tracking-tight text-gray-50">PULSE</div>
            <div className="hidden text-[10px] font-medium uppercase tracking-wider text-gray-500 sm:block">{t('tagline')}</div>
          </div>
        </div>

        <button
          onClick={toggle}
          className="chip no-print flex items-center gap-1.5 hover:border-neon/40"
          aria-label="Toggle language"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
          </svg>
          <span className="font-semibold text-neon">{t('lang.label')}</span>
        </button>
      </header>

      {/* Desktop side nav */}
      <nav className="no-print mt-5 hidden gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1.5 sm:flex">
        {nav.map((item) => {
          const Icon = ICONS[item.icon]
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? 'bg-neon/10 text-neon' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`
              }
            >
              <Icon width={18} height={18} />
              <span>{t(`nav.${item.key}`)}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-appBg/95 backdrop-blur-lg sm:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {nav.map((item) => {
            const Icon = ICONS[item.icon]
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition ${
                    isActive ? 'text-neon' : 'text-gray-500'
                  }`
                }
              >
                <Icon width={22} height={22} />
                <span>{t(`nav.${item.key}`)}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}
