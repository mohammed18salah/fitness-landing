import { useState } from "react";
import { faqs } from "../data";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">❓ FAQ</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">Questions? <span className="neon-text">Answered.</span></h2>
      </div>
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-semibold">{f.q}</span>
              <span className={`text-neon text-xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-white/60 animate-fadeup">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}