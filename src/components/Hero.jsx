export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-96 h-96 bg-neon/20 rounded-full blur-3xl animate-floaty" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-neon/10 rounded-full blur-3xl animate-glow" />
      {/* grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(90deg,#22C55E 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="section-pad grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="animate-fadeup">
          <span className="chip">⚡ 1,324 exercises · 6 languages</span>
          <h1 className="mt-5 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            Train <span className="neon-text">Smarter.</span><br />Move <span className="neon-text">Stronger.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl">
            A premium fitness engine powered by a real exercise dataset — animation GIFs, muscle-group targeting, equipment data and step-by-step form in your language.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#generator" className="btn-neon">Build My Plan →</a>
            <a href="#library" className="btn-ghost">Explore Library</a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-white/50">
            <div><span className="text-white font-bold text-xl">159k</span> users</div>
            <div><span className="text-white font-bold text-xl">98%</span> finish rate</div>
            <div><span className="text-white font-bold text-xl">★ 4.9</span> rating</div>
          </div>
        </div>

        <div className="relative animate-floaty">
          <div className="glass p-6 shadow-glass">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/60 text-sm">Today's Session</span>
              <span className="chip">Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[["🔥 Calories", "640 kcal"], ["⏱ Time", "32 min"], ["💪 Volume", "8,200 kg"], ["🎯 Streak", "21 days"]].map(([k,v]) => (
                <div key={k} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-2xl mb-1">{k.split(" ")[0]}</div>
                  <div className="text-white/60 text-xs">{k}</div>
                  <div className="text-lg font-bold text-neon mt-1">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full w-3/4 bg-neon shadow-neon" />
            </div>
            <div className="text-right text-xs text-white/50 mt-2">75% complete</div>
          </div>
        </div>
      </div>
    </section>
  );
}