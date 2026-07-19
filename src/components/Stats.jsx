import { stats } from "../data";

export default function Stats() {
  return (
    <section id="stats" className="relative py-20 border-y border-white/10">
      <div className="pointer-events-none absolute inset-0 bg-neon/5" />
      <div className="section-pad grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-4xl sm:text-5xl font-black neon-text">{s.value}</div>
            <div className="text-white/60 mt-2 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}