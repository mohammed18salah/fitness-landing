/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0B0B',
        panel: '#141414',
        neon: '#22C55E',
        neonDim: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Tahoma', 'sans-serif'],
        arabic: ['Tajawal', 'system-ui', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 16px rgba(34,197,94,0.35)',
        'neon-sm': '0 0 8px rgba(34,197,94,0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(34,197,94,0.4)' },
          '50%': { boxShadow: '0 0 18px rgba(34,197,94,0.7)' },
        },
      },
      animation: {
        pulseNeon: 'pulseNeon 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
