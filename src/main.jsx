import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { warmCache } from './lib/imgcache.js'
import './index.css'

// Pre-load the most-likely-shown exercise images into the smart cache.
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) requestIdleCallback(() => warmCache(120))
  else setTimeout(() => warmCache(120), 800)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
