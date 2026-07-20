import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import ExerciseDetail from './pages/ExerciseDetail.jsx'
import Generator from './pages/Generator.jsx'
import MyWorkouts from './pages/MyWorkouts.jsx'
import Favorites from './pages/Favorites.jsx'
import Builder from './pages/Builder.jsx'
import { LanguageProvider } from './i18n.jsx'

const NAV = [
  { to: '/', key: 'home', icon: 'home' },
  { to: '/library', key: 'library', icon: 'library' },
  { to: '/builder', key: 'builder', icon: 'dumbbell' },
  { to: '/generator', key: 'generator', icon: 'generator' },
  { to: '/workouts', key: 'workouts', icon: 'workout' },
  { to: '/favorites', key: 'favorites', icon: 'star' },
]

export default function App() {
  const location = useLocation()
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-base text-gray-200">
        {/* ambient neon glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-neon/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-neon/10 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-5xl px-3 pb-28 pt-4 sm:px-5 sm:pb-10 lg:pb-6">
          <Navbar nav={NAV} />
          <main className="mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/library/:id" element={<ExerciseDetail />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/workouts" element={<MyWorkouts />} />
              <Route path="/workouts/:id" element={<MyWorkouts />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </LanguageProvider>
  )
}
