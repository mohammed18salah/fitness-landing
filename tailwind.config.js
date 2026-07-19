/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        panel: "#121212",
        neon: "#22C55E",
        neonDim: "#16A34A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(34,197,94,0.35), 0 0 60px rgba(34,197,94,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      keyframes: {
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        glow: { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        fadeup: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        floaty: "floaty 5s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        fadeup: "fadeup 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};