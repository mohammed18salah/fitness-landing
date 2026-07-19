import { weeklyPlan } from "../data";

export default function Plan() {
  return (
    <section id="plan" className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">🗓 Weekly Workout Plan</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">A week that <span className="neon-text">works.</span></h2>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyPlan.map((d, i) => (
          <div key={d.day} className="glass p-5 hover:border-neon/40 transition" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-neon">{d.day}</span>
              <span className="text-[11px] text-white/40">{d.items.length} moves</span>
            </div>
            <div className="text-sm font-semibold mt-2">{d.title}</div>
            <ul className="mt-3 space-y-1.5">
              {d.items.map((it) => (
                <li key={it} className="text-xs text-white/60 flex items-center gap-2">
                  <span className="text-neon">▸</span>{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}