export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-14 pb-8">
      <div className="section-pad grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span className="text-neon text-2xl">◆</span> PULSE
          </div>
          <p className="text-white/50 text-sm mt-3 max-w-sm">
            A premium fitness engine powered by the 1,324-exercise dataset — real movement data, muscle targeting and form cues in your language.
          </p>
          <div className="mt-4 flex gap-3">
            {["IG", "X", "YT", "TT"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-xs hover:border-neon hover:text-neon transition">{s}</a>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#generator" className="hover:text-neon">Generator</a></li>
            <li><a href="#library" className="hover:text-neon">Exercise Library</a></li>
            <li><a href="#nutrition" className="hover:text-neon">Nutrition</a></li>
            <li><a href="#plan" className="hover:text-neon">Weekly Plan</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-sm text-white/50">
            <li><a href="#" className="hover:text-neon">About</a></li>
            <li><a href="#" className="hover:text-neon">Careers</a></li>
            <li><a href="#faq" className="hover:text-neon">FAQ</a></li>
            <li><a href="#" className="hover:text-neon">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="section-pad pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between text-xs text-white/40 gap-2">
        <span>© {new Date().getFullYear()} PULSE Fitness. All rights reserved.</span>
        <span>Data: exercises-dataset · Built with React + Vite + Tailwind</span>
      </div>
    </footer>
  );
}