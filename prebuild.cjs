// Prebuild: scan public/exercises for actually-present GIF files and emit a
// JSON list so the runtime only requests GIFs that exist (avoids 404s for the
// 1004 exercises that have no animated demo — which otherwise slow the page).
const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, 'public', 'exercises')
const gifs = fs.existsSync(dir)
  ? fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.gif'))
  : []

fs.writeFileSync(
  path.join(__dirname, 'src', 'data', 'gifList.json'),
  JSON.stringify(gifs)
)
console.log(`prebuild: ${gifs.length} GIFs present -> src/data/gifList.json`)
