import { testimonials } from "../data";

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">💬 Testimonials</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">Loved by <span className="neon-text">movers.</span></h2>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name} className="glass p-6 hover:-translate-y-1 hover:border-neon/40 transition">
            <div className="text-3xl">{t.avatar}</div>
            <p className="text-white/80 mt-4 text-sm leading-relaxed">“{t.text}”</p>
            <div className="mt-4">
              <div className="font-semibold">{t.name}</div>
              <div className="text-xs text-neon">{t.role}</div>
            </div>
            <div className="mt-3 text-neon text-sm">★★★★★</div>
          </div>
        ))}
      </div>
    </section>
  );
}