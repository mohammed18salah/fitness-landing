import { useState } from "react";
import { exercises } from "../data";

const goals = ["Build Muscle", "Lose Fat", "Get Stronger", "Stay Healthy"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const days = [3, 4, 5, 6];

function pick(list, n) {
  const pool = [...list];
  const out = [];
  while (out.length < n && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

export default function Generator() {
  const [goal, setGoal] = useState("Build Muscle");
  const [level, setLevel] = useState("Beginner");
  const [day, setDay] = useState(4);
  const [result, setResult] = useState(null);

  const generate = () => {
    // map goal -> preferred body parts
    const focus = {
      "Build Muscle": ["chest", "back", "upper arms", "shoulders", "upper legs"],
      "Lose Fat": ["cardio", "waist", "upper legs", "back"],
      "Get Stronger": ["back", "upper legs", "chest", "shoulders"],
      "Stay Healthy": ["waist", "lower legs", "back", "shoulders"],
    }[goal];
    const pool = exercises.filter((e) => focus.includes(e.category));
    const chosen = pick(pool.length ? pool : exercises, day * 2);
    setResult(chosen);
  };

  return (
    <section id="generator" className="section-pad">
      <div className="text-center max-w-2xl mx-auto">
        <span className="chip">⚡ Smart Workout Generator</span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-black">Your plan, <span className="neon-text">in seconds.</span></h2>
        <p className="mt-4 text-white/60">Tell us your goal, level and available days. We pull from 1,324 real exercises to build a balanced split.</p>
      </div>

      <div className="glass mt-10 p-6 sm:p-8 shadow-glass">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm text-white/60">Goal</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {goals.map((g) => (
                <button key={g} onClick={() => setGoal(g)} className={`px-4 py-2 rounded-full text-sm border transition ${goal === g ? "bg-neon text-ink border-neon" : "border-white/15 hover:border-neon"}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60">Level</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {levels.map((l) => (
                <button key={l} onClick={() => setLevel(l)} className={`px-4 py-2 rounded-full text-sm border transition ${level === l ? "bg-neon text-ink border-neon" : "border-white/15 hover:border-neon"}`}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60">Days / week</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {days.map((d) => (
                <button key={d} onClick={() => setDay(d)} className={`w-12 h-10 rounded-full text-sm border transition ${day === d ? "bg-neon text-ink border-neon" : "border-white/15 hover:border-neon"}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button onClick={generate} className="btn-neon text-base">⚡ Generate My Plan</button>
        </div>
      </div>

      {result && (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeup">
          {result.map((e) => (
            <div key={e.id} className="glass p-4 hover:border-neon/50 transition">
              {e.img ? (
                <img src={e.img} alt={e.name} className="w-full h-32 object-cover rounded-xl mb-3 bg-white/5" loading="lazy" />
              ) : (
                <div className="w-full h-32 rounded-xl mb-3 bg-white/5 flex items-center justify-center text-3xl">🏋️</div>
              )}
              <div className="text-sm font-semibold capitalize">{e.name}</div>
              <div className="text-xs text-white/50 mt-1 capitalize">{e.category} · {e.equipment}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}