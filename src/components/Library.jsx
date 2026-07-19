import { useState } from "react";
import { exercises } from "../data";

const filters = ["all", "body weight", "dumbbell", "barbell", "cable", "kettlebell"];

export default function Library() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const list = exercises
    .filter((e) => filter === "all" || e.equipment === filter)
    .filter((e) => e.name.toLowerCase().includes(q.toLowerCase()))
    .slice(0, 24);

  return (
    <section id="library" className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">📚 Exercise Library</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">1,324 moves, <span className="neon-text">one search.</span></h2>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between glass p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search exercises…"
          className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm outline-none focus:border-neon"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs border capitalize transition ${filter === f ? "bg-neon text-ink border-neon" : "border-white/15 hover:border-neon"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map((e) => (
          <div key={e.id} className="glass overflow-hidden hover:border-neon/40 transition group">
            {e.img ? (
              <img src={e.img} alt={e.name} className="w-full h-36 object-cover bg-white/5 group-hover:scale-105 transition duration-500" />
            ) : (
              <div className="w-full h-36 bg-white/5 flex items-center justify-center text-3xl">🏋️</div>
            )}
            <div className="p-3">
              <div className="text-sm font-semibold capitalize leading-tight">{e.name}</div>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-white/50">
                <span className="capitalize">{e.category}</span>·<span className="capitalize">{e.equipment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-white/40 text-sm mt-6">Showing {list.length} of {exercises.length} exercises (search to explore all).</p>
    </section>
  );
}