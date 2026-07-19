// Real dataset from hasaneyldrm/exercises-dataset (1,324 exercises).
// `exercises` is imported from exercises.json (generated from the repo).
import exercisesRaw from "./exercises.json";

// expose images that we bundled into /public/exercises
export const exercises = exercisesRaw.map((e) => ({
  ...e,
  img: e.image ? `/exercises/${e.image}` : null,
}));

export const categories = [
  { id: "upper arms", name: "Upper Arms", icon: "💪", desc: "Sculpt biceps & triceps", count: exercises.filter((e) => e.category === "upper arms").length },
  { id: "upper legs", name: "Upper Legs", icon: "🦵", desc: "Quads, hamstrings & glutes", count: exercises.filter((e) => e.category === "upper legs").length },
  { id: "back",       name: "Back",       icon: "🧗", desc: "Pull strength & posture", count: exercises.filter((e) => e.category === "back").length },
  { id: "waist",      name: "Core / Waist", icon: "🧘", desc: "Bulletproof midsection", count: exercises.filter((e) => e.category === "waist").length },
  { id: "chest",      name: "Chest",      icon: "🛏️", desc: "Push power & definition", count: exercises.filter((e) => e.category === "chest").length },
  { id: "shoulders",  name: "Shoulders",  icon: "🤸", desc: "Broad, capped delts", count: exercises.filter((e) => e.category === "shoulders").length },
  { id: "cardio",     name: "Cardio",     icon: "🔥", desc: "Burn & endurance", count: exercises.filter((e) => e.category === "cardio").length },
  { id: "lower legs", name: "Lower Legs", icon: "🦶", desc: "Calves & stability", count: exercises.filter((e) => e.category === "lower legs").length },
];

export const weeklyPlan = [
  { day: "Mon", title: "Push — Chest & Triceps", items: ["Bench Press", "Push-Up", "Cable Fly", "Tricep Dip"] },
  { day: "Tue", title: "Pull — Back & Biceps",   items: ["Deadlift", "Pull-Up", "Lat Pulldown", "Bicep Curl"] },
  { day: "Wed", title: "Legs & Glutes",          items: ["Barbell Squat", "Lunges", "Leg Press", "Calf Raise"] },
  { day: "Thu", title: "Active Recovery",        items: ["Yoga Flow", "Mobility Drills", "Light Walk"] },
  { day: "Fri", title: "HIIT & Core",            items: ["Burpee", "Mountain Climber", "Russian Twist", "Plank"] },
  { day: "Sat", title: "Full Body Power",        items: ["Kettlebell Swing", "Battle Ropes", "Shoulder Press"] },
  { day: "Sun", title: "Rest & Recharge",        items: ["Stretch", "Hydrate", "Sleep 8h"] },
];

export const nutrition = [
  { label: "Protein", value: 165, unit: "g", pct: 82, color: "#22C55E" },
  { label: "Carbs",   value: 210, unit: "g", pct: 64, color: "#38BDF8" },
  { label: "Fats",    value: 58,  unit: "g", pct: 48, color: "#F59E0B" },
  { label: "Water",   value: 3.2, unit: "L", pct: 91, color: "#A78BFA" },
];

export const stats = [
  { value: "1,324", label: "Exercises" },
  { value: "10",    label: "Languages" },
  { value: "159k",  label: "Active Users" },
  { value: "98%",   label: "Completion Rate" },
];

export const testimonials = [
  { name: "Layla H.",  role: "Lost 12kg in 4 months", text: "The smart generator built a plan that actually fits my life. I've never stuck with training this long.", avatar: "👩" },
  { name: "Omar K.",   role: "Marathon finisher",     text: "Exercise library is insane — every movement has clear form cues. My knees have never felt better.", avatar: "🧔" },
  { name: "Sara M.",   role: "Busy mom of 3",         text: "20-minute HIIT days fit between school runs. The neon UI makes me want to open it every day.", avatar: "👩‍🦰" },
];

export const faqs = [
  { q: "Do I need a gym membership?", a: "No. Over 300 exercises are bodyweight-only and need zero equipment. The generator adapts to what you have." },
  { q: "Is the data real and safe?",  a: "Every exercise comes from a curated 1,324-movement dataset with muscle-group, equipment and form data verified by trainers." },
  { q: "Can I train in Arabic?",      a: "Instructions ship in 10 languages including many you can switch between instantly — you never guess a rep." },
  { q: "How does the generator work?", a: "Pick your goal, level and available days. It assembles a balanced weekly split from the exercise library instantly." },
];