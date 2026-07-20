# ⚡ PULSE - Fitness

PULSE is a premium, high-performance global fitness web application (PWA-style) designed to generate workout schedules, browse an exercise library with animated demonstrations, build custom plans, and export them as organized PDFs. It fully supports both Arabic and English (with native RTL support) and is optimized for both mobile and desktop screens.

---

## 💎 Features

- **⚡ Workout Generator**: Generate personalized workout plans instantly based on your goal, fitness level, and training days per week.
- **📚 Exercise Library**: Browse 1,324 exercises featuring high-quality animated GIF demonstrations.
- **🎬 Animated Promo Banner**: A sliding banner displaying 4 dynamic slides (fetched remotely from Unsplash).
- **🛠️ Custom Plan Builder**: Build your own workout plan by selecting exercises, specifying sets and reps, and organizing them across multiple training days.
- **🔍 OCR (Image to Workout)**: Scan printed texts directly using client-side OCR powered by Tesseract.js.
- **📄 Organized PDF Export**: Download your workout plan as a structured gym log sheet using jsPDF.
- **🖨️ Printable Workout Log**: Dynamically formats tables for print (automatically hiding empty columns).
- **⭐ Favorites System**: Star and save your favorite exercises for quick access.
- **🌍 Bilingual & RTL**: Full translation support for Arabic and English with seamless RTL (Right-to-Left) layout transitions.
- **🚀 Smart Image Caching**: Powered by IndexedDB + LRU eviction to ensure offline-first image rendering.

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Vanilla CSS & Tailwind CSS 3 (+ PostCSS / Autoprefixer)
- **Routing**: React Router DOM 6 - HashRouter (`#/route`)
- **State / Persistence**: Direct `localStorage` caching (key: `pulse.plans`) - 100% serverless
- **PDF Generation**: jsPDF ^4.x
- **OCR Engine**: Tesseract.js ^7.x (Client-side, WASM, keyless, serverless)
- **Local Assets**: 320 animated GIFs + 1,324 static JPG fallback images stored locally in `/public/exercises`

---

## 📐 Architecture & Data Flow

```
+----------------------------------------------+
|              PULSE - Fitness                 |
|       React 18 + Vite 5 (static SPA)         |
+----------------------------------------------+
        |                                   |
        v                                   v
+---------------+               +-------------------------+
|   Browser UI  |               |      HashRouter         |
|  (no backend) |               |  /#/library /#/builder  |
+---------------+               |  /#/generator /#/workouts|
        |                       +-------------------------+
        |                                     |
        v                                     v
+------------------+            +-----------------------------+
|   store.js       |<---------->|  Pages (React components)   |
| localStorage     |            |  read/write plans           |
| key: pulse.plans |            |  & favorites                |
+------------------+            +-----------------------------+
                                               |
                                               v
                                +---------------------------+
                                |  lib/ (smart systems)     |
                                |  generator.js  - plan logic|
                                |  ocr.js       - OCR match |
                                |  imgcache.js  - IndexedDB |
                                |  export.js    - jsPDF sheet|
                                +---------------------------+
                                      |         |          |
                      +---------------+         |          +------------------+
                      v                         v                             v
              +----------------+    +--------------------+     +--------------------+
              | exercises.js   |    | tesseract.js (WASM)|     | jsPDF (browser)    |
              | 1324 entries   |    | printed text ->    |     | PDF file download  |
              | meta.json      |    | workout            |     +--------------------+
              +----------------+    +--------------------+
                      |
            +---------+---------+
            v                   v
    +------------------+   +------------------+
    | public/exercises |   | public/exercises |
    | *.gif (320)      |   | *.jpg (1324)     |
    | animated demos   |   | static fallback  |
    +------------------+   +------------------+
```

* **Remote Media**: The promotional banner images in `PromoStrip.jsx` are loaded from `images.unsplash.com` (requires network connection).
* **Offline Capability**: All other features (exercise library, OCR scanning, workout generator, and custom plan builder) run 100% offline.

---

## 📂 Data & Image Sources

- **Exercise Dataset**: Metadata for 1,324 exercises is stored in `src/data/exercises.js`.
- **Images**: Located locally inside `public/exercises/`:
  - `*.gif` - 320 animated clips for demonstration.
  - `*.jpg` - 1,324 static fallback images.
- **Promo Banner**: Loads images from Unsplash. You can modify URLs in [PromoStrip.jsx](file:///d:/mohammed%20dev/MAtLwedp/src/components/PromoStrip.jsx) to link to your custom hosted images.

---

## 🧠 Smart Systems

1. **The Generator (`generator.js`)**: Converts split preferences (Push/Pull/Legs templates, target days, and difficulty level) into target sets × reps, durations, starting days, and rest days.
2. **OCR Matcher (`ocr.js`)**: Matches text using direct naming, Arabic synonyms, thesaurus lookups, word overlaps, and pre-processing of raw image input using HTML5 Canvas.
3. **Smart Image Cache (`imgcache.js`)**: Utilizing IndexedDB + LRU eviction cache. It implements a cascading fallback structure: it attempts to resolve the animated GIF first, falls back to the static JPG, and shows a placeholder if both fail.
4. **PDF Export (`export.js`)**: Dynamically aligns, styles, and generates a structured, printable PULSE GYM workout sheet.

---

## 🚀 Running the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher is recommended).

### Setup and Start
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/mohammed18salah/fitness-landing.git
   cd fitness-landing
   ```
2. Install the packages:
   ```bash
   npm install
   ```
3. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build production bundle:
   ```bash
   npm run dev
   # Output files will be generated in dist/
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
