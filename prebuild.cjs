// prebuild: copy matching GIFs + build rich slim exercises.json
const fs = require("fs");
const path = require("path");

const base = process.cwd();
const src = path.join(base, "dataset");
const raw = JSON.parse(fs.readFileSync(path.join(src, "data/exercises.json"), "utf8"));

const imgMap = {};
fs.readdirSync(path.join(src, "images")).forEach((f) => {
  if (f.endsWith(".jpg")) imgMap[f.split("-")[0]] = f;
});
const gifMap = {};
fs.readdirSync(path.join(src, "videos")).forEach((f) => {
  if (f.endsWith(".gif")) gifMap[f.split("-")[0]] = f;
});

const pub = path.join(base, "public/exercises");
fs.mkdirSync(pub, { recursive: true });

// copy up to N gifs that also have an image
let gifCopied = 0;
const LIMIT = 320;
for (const [eid, gfn] of Object.entries(gifMap)) {
  if (gifCopied >= LIMIT) break;
  if (imgMap[eid]) {
    fs.copyFileSync(path.join(src, "videos", gfn), path.join(pub, gfn));
    gifCopied++;
  }
}

const out = raw.map((d) => {
  const eid = d.id;
  return {
    id: eid,
    name: d.name,
    category: d.category,
    body_part: d.body_part,
    equipment: d.equipment,
    muscle_group: d.muscle_group || null,
    secondary: d.secondary_muscles || [],
    target: d.target || null,
    image: imgMap[eid] || null,
    gif: gifMap[eid] || null,
    steps: (d.instruction_steps && d.instruction_steps.en) || [],
    desc: (d.instructions && d.instructions.en) || "",
  };
});

fs.writeFileSync(path.join(base, "src/exercises.json"), JSON.stringify(out));
console.log("exercises.json:", out.length, "| gifs copied:", gifCopied, "| with gif:", out.filter((o) => o.gif).length);
