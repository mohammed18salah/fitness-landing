import { useEffect, useState } from "react";

const links = [
  { href: "#generator", label: "Generator" },
  { href: "#categories", label: "Categories" },
  { href: "#library", label: "Library" },
  { href: "#plan", label: "Plan" },
  { href: "#nutrition", label: "Nutrition" },
  { href: "#stats", label: "Stats" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-ink/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
          <span className="text-neon text-2xl animate-glow">◆</span>
          <span>PULSE</span>
        </a>

        <ul className="hidden md:flex items-center gap-7 text-sm text-white/70">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-neon transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#generator" className="btn-neon text-sm">Get Started</a>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)} aria-label="menu">≡</button>
      </nav>

      {open && (
        <ul className="md:hidden bg-panel border-t border-white/10 px-5 py-4 space-y-3 text-white/80">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={() => setOpen(false)} className="block py-1">{l.label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}