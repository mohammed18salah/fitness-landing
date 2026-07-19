import { nutrition } from "../data";

export default function Nutrition() {
  return (
    <section id="nutrition" className="section-pad">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="chip">🥗 Nutrition Dashboard</span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black">Fuel the <span className="neon-text">work.</span></h2>
          <p className="mt-4 text-white/60 max-w-md">Track macros and hydration alongside your training. Balanced intake, auto-calculated from your plan.</p>
          <div className="mt-6 flex gap-4 text-sm text-white/50">
            <div className="glass px-4 py-3"><div className="text-white font-bold text-lg">2,180</div>kcal / day</div>
            <div className="glass px-4 py-3"><div className="text-white font-bold text-lg">4</div>meals</div>
            <div className="glass px-4 py-3"><div className="text-neon font-bold text-lg">+12%</div>protein</div>
          </div>
        </div>
        <div className="glass p-6 shadow-glass space-y-5">
          {nutrition.map((n) => (
            <div key={n.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">{n.label}</span>
                <span className="font-semibold">{n.value}{n.unit} <span className="text-white/40 text-xs">· {n.pct}%</span></span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${n.pct}%`, background: n.color, boxShadow: `0 0 12px ${n.color}88` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}