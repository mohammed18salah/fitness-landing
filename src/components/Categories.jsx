import { categories } from "../data";

export default function Categories() {
  return (
    <section id="categories" className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">🎯 Workout Categories</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">Train by <span className="neon-text">focus.</span></h2>
      </div>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map((c) => (
          <div key={c.id} className="glass p-6 hover:-translate-y-1 hover:border-neon/40 transition duration-300 group">
            <div className="text-4xl mb-3 group-hover:scale-110 transition">{c.icon}</div>
            <div className="text-lg font-bold">{c.name}</div>
            <div className="text-sm text-white/50 mt-1">{c.desc}</div>
            <div className="mt-3 text-xs chip">{c.count} exercises</div>
          </div>
        ))}
      </div>
    </section>
  );
}