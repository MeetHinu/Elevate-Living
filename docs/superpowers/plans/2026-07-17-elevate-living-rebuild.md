# Elevate Living Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruct the Elevate Living Design website as editable React + Vite source (faithful to the deployed but source-less Netlify site), fix the About hero image, sharpen all photos, and rebuild the consultation form + Netlify wiring so it actually delivers.

**Architecture:** React 18 + Vite + `react-router-dom` v6, 5 routed pages (`/`, `/services`, `/portfolio`, `/about`, `/contact`) sharing a Nav/Footer layout, plain CSS with custom properties (no CSS framework), content-as-data for the portfolio/services/process lists.

**Tech Stack:** React, Vite, react-router-dom, Vitest (pure-logic unit tests), sharp (one-off image sharpening script, dev-only).

---

## Content Reference

All copy below was recovered by reading the deployed production bundle (`Downloads\elevate-living-dist\elevate-living-dist\assets\index-Dky7cSux.js` and its paired CSS) directly — it is a transcription, not a design decision. Two corrections vs. the original deployed site, per user decisions:

- About page hero image: `laundry-4.jpg` → `kitchen-4.jpg`.
- Contact email used everywhere (visible contact info, footer, error-fallback text, Netlify notification target): `info@elevateliving.com.au` (replaces both `elevatedesignliving@gmail.com` and `info@elevatelivingdesign.com.au`, which were inconsistently used in the original).

---

### Task 1: Scaffold the Vite + React project

**Files:**
- Create: `elevate-living/package.json`
- Create: `elevate-living/vite.config.js`
- Create: `elevate-living/index.html`
- Create: `elevate-living/.gitignore`
- Create: `elevate-living/src/main.jsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "elevate-living",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "sharpen-images": "node scripts/sharpen-images.js"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0",
    "vitest": "^2.0.5",
    "sharp": "^0.33.5"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 3: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Elevate Living — Interior Design Studio</title>
  <meta name="description" content="Elevate Living is a Melbourne interior design studio designing kitchens, bathrooms, laundries and living spaces from concept through to final styling." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Hidden form so Netlify detects and registers this form at build time -->
  <form name="consultation-request" data-netlify="true" netlify-honeypot="bot-field" hidden>
    <input type="text" name="name" />
    <input type="email" name="email" />
    <input type="tel" name="phone" />
    <input type="text" name="project" />
    <textarea name="message"></textarea>
  </form>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 4: Create `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 5: Create `src/main.jsx`**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: Install dependencies**

Run: `cd elevate-living && npm install`
Expected: installs with no errors, creates `node_modules` and `package-lock.json`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html .gitignore src/main.jsx
git commit -m "chore: scaffold Vite + React project"
```

---

### Task 2: Global styles

**Files:**
- Create: `elevate-living/src/styles/global.css`

- [ ] **Step 1: Write `src/styles/global.css`**

Transcribed exactly from the recovered production CSS (colors, fonts, and every component class used across the site).

```css
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600&display=swap");

:root {
  --bg-cream: #FBF8F1;
  --bg-cream-alt: #F1EAE0;
  --bg-white: #FFFFFF;
  --text-ink: #23201B;
  --text-ink-dim: rgba(35, 32, 27, .62);
  --text-on-image: #FBF8F1;
  --text-on-image-dim: rgba(251, 248, 241, .78);
  --accent-brass: #A9834F;
  --accent-brass-bright: #C7A46E;
  --accent-sage: #8A9482;
  --accent-sage-dim: #707A69;
  --line: rgba(35, 32, 27, .12);
  --line-on-image: rgba(251, 248, 241, .3);
  --font-display: "Fraunces", serif;
  --font-body: "Inter", -apple-system, sans-serif;
  --max: 1180px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg-cream);
  color: var(--text-ink);
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.wrap { max-width: var(--max); margin: 0 auto; padding: 0 32px; }

h1, h2, h3, h4 {
  font-family: var(--font-display);
  font-weight: 500;
  margin: 0;
  letter-spacing: -.01em;
}
.eyebrow {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--accent-brass);
}
p { line-height: 1.65; margin: 0; }

/* Nav */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg-cream);
  border-bottom: 1px solid var(--line);
}
.site-nav .wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 84px;
}
.logo-mark { display: flex; align-items: center; gap: 12px; }
.logo-mark img { height: 46px; width: auto; }
.nav-links { display: flex; gap: 36px; align-items: center; }
.nav-links a {
  color: var(--text-ink-dim);
  font-size: 14px;
  font-weight: 500;
  transition: color .2s ease;
}
.nav-links a:hover, .nav-links a.active { color: var(--text-ink); }
.nav-cta {
  color: var(--bg-cream) !important;
  background: var(--text-ink);
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 13px !important;
  letter-spacing: .03em;
}
.nav-cta:hover { background: var(--accent-brass); }
.nav-toggle {
  display: none;
  background: none;
  border: 0;
  color: var(--text-ink);
  font-size: 24px;
  cursor: pointer;
}
@media (max-width: 860px) {
  .nav-links {
    position: fixed;
    top: 84px;
    left: 0;
    right: 0;
    background: var(--bg-cream);
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 32px 32px;
    gap: 20px;
    border-bottom: 1px solid var(--line);
    display: none;
  }
  .nav-links.open { display: flex; }
  .nav-toggle { display: block; }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all .2s ease;
}
.btn-primary { background: var(--text-ink); color: var(--bg-cream); }
.btn-primary:hover { background: var(--accent-brass); }
.btn-outline-light { border-color: var(--line-on-image); color: var(--text-on-image); }
.btn-outline-light:hover { border-color: var(--text-on-image); background: #fbf8f11a; }
.btn-outline-dark { border-color: var(--line); color: var(--text-ink); }
.btn-outline-dark:hover { border-color: var(--accent-brass); color: var(--accent-brass); }

/* Sections */
section { padding: 100px 0; }
.section-cream { background: var(--bg-cream); color: var(--text-ink); }
.section-alt { background: var(--bg-cream-alt); color: var(--text-ink); }
.section-white { background: var(--bg-white); color: var(--text-ink); }
.section-head { max-width: 640px; margin-bottom: 56px; }
.section-head h2 { font-size: 38px; margin-top: 14px; }
.section-head p { margin-top: 16px; font-size: 16px; color: var(--text-ink-dim); }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
@media (max-width: 860px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
  section { padding: 64px 0; }
  .section-head h2 { font-size: 29px; }
}
@media (min-width: 861px) and (max-width: 1080px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
}

/* Home hero */
.photo-hero {
  position: relative;
  height: 88vh;
  min-height: 560px;
  max-height: 820px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.photo-hero img {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center;
}
.photo-hero:after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(0deg, #14110db8, #14110d33 45%, #14110d0d 70%);
}
.photo-hero-content {
  position: relative;
  z-index: 2;
  padding: 0 32px 64px;
  max-width: var(--max);
  margin: 0 auto;
  width: 100%;
}
.photo-hero blockquote {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 34px;
  line-height: 1.35;
  color: var(--text-on-image);
  max-width: 640px;
  margin: 0;
}
.photo-hero .hero-actions { margin-top: 32px; display: flex; gap: 16px; flex-wrap: wrap; }
@media (max-width: 860px) {
  .photo-hero { height: 78vh; }
  .photo-hero blockquote { font-size: 24px; }
}

/* Inner-page hero */
.page-hero {
  position: relative;
  height: 46vh;
  min-height: 340px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.page-hero img {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.page-hero:after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(0deg, #14110dad, #14110d1a 60%);
}
.page-hero-content {
  position: relative;
  z-index: 2;
  padding: 0 32px 48px;
  max-width: var(--max);
  margin: 0 auto;
  width: 100%;
}
.page-hero .eyebrow { color: var(--accent-brass-bright); }
.page-hero h1 { font-size: 42px; color: var(--text-on-image); margin-top: 14px; }
.page-hero p { margin-top: 14px; font-size: 16px; color: var(--text-on-image-dim); max-width: 560px; }
@media (max-width: 860px) {
  .page-hero h1 { font-size: 30px; }
  .page-hero { height: 38vh; min-height: 280px; }
}

/* Photo cards / teaser grid */
.photo-card {
  position: relative;
  overflow: hidden;
  background: var(--bg-cream-alt);
  aspect-ratio: 4/5;
}
.photo-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.photo-card:hover img { transform: scale(1.04); }
.photo-card .tag-badge {
  position: absolute;
  top: 16px; left: 16px;
  background: #fbf8f1eb;
  color: var(--text-ink);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 2px;
}
.teaser-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  height: 560px;
}
.teaser-grid .photo-card:first-child { grid-row: 1/3; }
@media (max-width: 860px) {
  .teaser-grid { grid-template-columns: 1fr 1fr; grid-template-rows: repeat(3, 220px); height: auto; }
  .teaser-grid .photo-card:first-child { grid-row: auto; grid-column: 1/3; }
}

/* Portfolio filter */
.filter-bar { display: flex; gap: 12px; margin-bottom: 44px; flex-wrap: wrap; }
.filter-btn {
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .03em;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-ink-dim);
  border-radius: 2px;
  cursor: pointer;
  font-family: var(--font-body);
}
.filter-btn.active-filter { background: var(--text-ink); color: var(--bg-cream); border-color: var(--text-ink); }

/* Services */
.service-block { padding: 36px; border: 1px solid var(--line); background: var(--bg-white); }
.service-block .thumb { height: 180px; overflow: hidden; margin-bottom: 24px; }
.service-block .thumb img { width: 100%; height: 100%; object-fit: cover; }
.service-block h3 { font-size: 22px; }
.service-block ul { margin: 18px 0 0; padding: 0; list-style: none; }
.service-block li { padding: 10px 0; border-top: 1px solid var(--line); font-size: 14px; color: var(--text-ink-dim); }

/* Process */
.process-row { display: flex; gap: 28px; border-top: 1px solid var(--line); padding: 32px 0; }
.process-row:last-child { border-bottom: 1px solid var(--line); }
.process-num { font-family: var(--font-display); font-size: 22px; color: var(--accent-brass); width: 48px; flex-shrink: 0; }
.process-row h4 { font-size: 19px; color: var(--text-ink); }
.process-row p { margin-top: 8px; color: var(--text-ink-dim); font-size: 15px; max-width: 520px; }

/* About founder panel (unused placeholder kept from original design system) */
.founder-panel {
  aspect-ratio: 4/5;
  background: linear-gradient(150deg, var(--bg-cream-alt), var(--accent-sage) 140%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.founder-panel span { font-family: var(--font-display); font-size: 96px; color: var(--bg-cream); letter-spacing: .02em; }

/* CTA band */
.cta-band { background: var(--accent-sage); color: var(--bg-cream); padding: 64px 0; text-align: center; }
.cta-band h2 { font-size: 32px; color: var(--bg-cream); }
.cta-band p { margin-top: 12px; color: #fbf8f1d1; }
.cta-band .btn { margin-top: 28px; }
.cta-band .btn-primary { background: var(--text-ink); color: var(--bg-cream); }
.cta-band .btn-primary:hover { background: var(--accent-brass); }

/* Footer */
footer { background: var(--text-ink); color: #fbf8f1a8; padding: 64px 0 32px; }
.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(251, 248, 241, .14);
}
.footer-logo-mark img { height: 44px; width: auto; filter: brightness(0) invert(1); }
.footer-cols { display: flex; gap: 64px; flex-wrap: wrap; }
.footer-col h5 { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--bg-cream); margin-bottom: 16px; }
.footer-col a, .footer-col p { display: block; font-size: 14px; margin-bottom: 10px; color: #fbf8f1a8; }
.footer-col a:hover { color: var(--bg-cream); }
.footer-bottom { padding-top: 24px; display: flex; justify-content: space-between; font-size: 12px; flex-wrap: wrap; gap: 12px; }
@media (max-width: 860px) {
  .footer-top, .footer-cols { flex-direction: column; gap: 32px; }
}

/* Form */
form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--text-ink-dim);
  margin-bottom: 8px;
  display: block;
}
input, select, textarea {
  width: 100%;
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: 14px;
  border: 1px solid var(--line);
  background: var(--bg-white);
  color: var(--text-ink);
  border-radius: 2px;
}
input:focus, select:focus, textarea:focus { outline: 2px solid var(--accent-brass); outline-offset: 1px; }
textarea { resize: vertical; min-height: 120px; }
@media (max-width: 860px) {
  .form-row { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  * { transition: none !important; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global design tokens and component styles"
```

---

### Task 3: Content data files

**Files:**
- Create: `elevate-living/src/data/portfolio.js`
- Create: `elevate-living/src/data/services.js`
- Create: `elevate-living/src/data/process.js`

- [ ] **Step 1: Write `src/data/portfolio.js`**

```js
export const filterTabs = [
  { key: "all", label: "All Projects" },
  { key: "kitchen", label: "Kitchens" },
  { key: "bathroom", label: "Bathrooms" },
  { key: "laundry", label: "Laundry" },
  { key: "living", label: "Living Spaces" },
];

export const portfolioItems = [
  { id: "bath-1", category: "bathroom", tag: "Bathroom", title: "Arched Powder Room", desc: "Fluted travertine and warm plaster", img: "/images/bathroom/bathroom-1.jpg" },
  { id: "bath-2", category: "bathroom", tag: "Bathroom", title: "Terrazzo Ensuite", desc: "Terrazzo, brass and a curved vanity", img: "/images/bathroom/bathroom-2.jpg" },
  { id: "bath-3", category: "bathroom", tag: "Bathroom", title: "Emerald Marble Bath", desc: "Book-matched marble and brushed gold", img: "/images/bathroom/bathroom-3.jpg" },
  { id: "bath-4", category: "bathroom", tag: "Bathroom", title: "Emerald Cabinetry Suite", desc: "Deep green joinery, herringbone marble floor", img: "/images/bathroom/bathroom-4.jpg" },
  { id: "bath-5", category: "bathroom", tag: "Bathroom", title: "Double Vanity in Calacatta Viola", desc: "Statement stone and oak cabinetry", img: "/images/bathroom/bathroom-5.jpg" },
  { id: "kitchen-1", category: "kitchen", tag: "Kitchen", title: "Olive Cabinetry Kitchen", desc: "Fluted timber hood and stone island", img: "/images/kitchen/kitchen-1.jpg" },
  { id: "kitchen-2", category: "kitchen", tag: "Kitchen", title: "Navy & Brass Island Kitchen", desc: "Marble waterfall island, antique brass", img: "/images/kitchen/kitchen-2.jpg" },
  { id: "kitchen-3", category: "kitchen", tag: "Kitchen", title: "Navy Butler’s Kitchen", desc: "Glass-front joinery and brass hardware", img: "/images/kitchen/kitchen-3.jpg" },
  { id: "kitchen-4", category: "kitchen", tag: "Kitchen", title: "Walnut & Stone Island", desc: "Warm walnut tones with a stone waterfall edge", img: "/images/kitchen/kitchen-4.jpg" },
  { id: "kitchen-5", category: "kitchen", tag: "Kitchen", title: "Light Oak Family Kitchen", desc: "Soft neutrals with a fluted timber island", img: "/images/kitchen/kitchen-5.jpg" },
  { id: "laundry-1", category: "laundry", tag: "Laundry", title: "Sage Laundry & Utility", desc: "Sage cabinetry with concealed appliances", img: "/images/laundry/laundry-1.jpg" },
  { id: "laundry-2", category: "laundry", tag: "Laundry", title: "Terrazzo Butler’s Laundry", desc: "Terrazzo tile and warm oak joinery", img: "/images/laundry/laundry-2.jpg" },
  { id: "laundry-3", category: "laundry", tag: "Laundry", title: "Marble Laundry Counter", desc: "Brushed brass fittings, honed marble benchtop", img: "/images/laundry/laundry-3.jpg" },
  { id: "laundry-4", category: "laundry", tag: "Laundry", title: "Oak Laundry Suite", desc: "Open shelving and a brass tap over dual appliances", img: "/images/laundry/laundry-4.jpg" },
];

export function filterPortfolio(items, key) {
  return key === "all" ? items : items.filter((item) => item.category === key);
}

export function findPortfolioItem(id) {
  const item = portfolioItems.find((i) => i.id === id);
  if (!item) throw new Error(`No portfolio item with id "${id}"`);
  return item;
}
```

- [ ] **Step 2: Write `src/data/services.js`**

```js
export const services = [
  {
    title: "Kitchen Design",
    img: "/images/kitchen/kitchen-2.jpg",
    text: "Layout, joinery, benchtops and appliances planned as one continuous surface.",
    items: ["Layout & Millwork", "Benchtops & Splashbacks", "Lighting Design", "Appliance Integration"],
  },
  {
    title: "Bathroom Design",
    img: "/images/bathroom/bathroom-3.jpg",
    text: "Tiling, fittings and fixtures detailed for daily use and long wear.",
    items: ["Tiling & Waterproofing", "Fixtures & Fittings", "Vanity & Storage", "Wet-Room Detailing"],
  },
  {
    title: "Laundry & Utility",
    img: "/images/laundry/laundry-3.jpg",
    text: "Hardworking spaces designed to feel as considered as the rest of the home.",
    items: ["Cabinetry & Storage", "Benchtops & Sinks", "Appliance Planning", "Drying & Folding Zones"],
  },
  {
    title: "Living Spaces",
    img: "/images/kitchen/kitchen-5.jpg",
    text: "Living and dining areas planned around how you actually live day to day.",
    items: ["Furniture Layout", "Lighting Plans", "Material & Colour Palettes", "Styling & Sourcing"],
  },
];
```

- [ ] **Step 3: Write `src/data/process.js`**

```js
export const processSteps = [
  { num: "01", title: "Consultation", text: "We visit the space, talk through how you use it, and set a budget and timeline you're comfortable with." },
  { num: "02", title: "Concept & Materials", text: "Layout options and a material palette — stone, timber, metal, textiles — presented as physical samples, not just renders." },
  { num: "03", title: "Detailed Design", text: "Joinery drawings, fixture schedules, and lighting plans detailed enough for tradespeople to build from directly." },
  { num: "04", title: "Build Oversight", text: "We stay on site through demolition, rough-in, and installation, checking work against the drawings at each stage." },
  { num: "05", title: "Reveal & Styling", text: "A final walkthrough, styling pass, and snag list before handover, with care notes for every surface and finish we’ve specified." },
];
```

- [ ] **Step 4: Write a Vitest unit test for the pure filter logic**

**Test:** `elevate-living/src/data/portfolio.test.js`

```js
import { describe, it, expect } from "vitest";
import { filterPortfolio, findPortfolioItem, portfolioItems } from "./portfolio.js";

describe("filterPortfolio", () => {
  it("returns all items when key is 'all'", () => {
    expect(filterPortfolio(portfolioItems, "all")).toEqual(portfolioItems);
  });

  it("returns only items matching the category", () => {
    const result = filterPortfolio(portfolioItems, "laundry");
    expect(result.length).toBe(4);
    expect(result.every((item) => item.category === "laundry")).toBe(true);
  });

  it("returns an empty array for a category with no items", () => {
    expect(filterPortfolio(portfolioItems, "living")).toEqual([]);
  });
});

describe("findPortfolioItem", () => {
  it("returns the matching item by id", () => {
    expect(findPortfolioItem("kitchen-2").title).toBe("Navy & Brass Island Kitchen");
  });

  it("throws for an unknown id", () => {
    expect(() => findPortfolioItem("not-real")).toThrow('No portfolio item with id "not-real"');
  });
});
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `cd elevate-living && npx vitest run src/data/portfolio.test.js`
Expected: 5 passing tests (the implementation already exists from Step 1, so this confirms it rather than following red-green — the logic here is simple enough to write directly, but must be verified before moving on).

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "feat: add portfolio, services, and process content data"
```

---

### Task 4: Nav, Footer, and CtaBand components

**Files:**
- Create: `elevate-living/src/components/Nav.jsx`
- Create: `elevate-living/src/components/Footer.jsx`
- Create: `elevate-living/src/components/CtaBand.jsx`

- [ ] **Step 1: Write `src/components/Nav.jsx`**

```jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) => (isActive ? "active" : "");
  const close = () => setOpen(false);

  return (
    <nav className="site-nav">
      <div className="wrap">
        <Link to="/" className="logo-mark" onClick={close}>
          <img src="/images/logo/logo.jpg" alt="Elevate Living Interior Design Studio" />
        </Link>
        <div className={`nav-links${open ? " open" : ""}`}>
          <NavLink to="/" className={linkClass} onClick={close} end>Home</NavLink>
          <NavLink to="/services" className={linkClass} onClick={close}>Services</NavLink>
          <NavLink to="/portfolio" className={linkClass} onClick={close}>Portfolio</NavLink>
          <NavLink to="/about" className={linkClass} onClick={close}>About</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={close}>Contact</NavLink>
          <Link to="/contact" className="nav-cta" onClick={close}>Book a Consultation</Link>
        </div>
        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Write `src/components/Footer.jsx`**

```jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-logo-mark">
            <img src="/images/logo/logo.jpg" alt="Elevate Living Interior Design Studio" />
            <p style={{ marginTop: 14, maxWidth: 280 }}>
              Full-service interior design for kitchens, bathrooms, laundries and living spaces.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h5>Site</h5>
              <Link to="/">Home</Link>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <h5>Studio</h5>
              <p>123 Gertrude Street<br />Fitzroy VIC 3065</p>
              <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>
              <a href="tel:+61402601808">0402601808</a>
              <a href="https://instagram.com/elevateliving.design" target="_blank" rel="noopener noreferrer">
                @elevateliving.design
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Elevate Living Interior Design Studio. All rights reserved.</span>
          <span>Melbourne, Australia</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Write `src/components/CtaBand.jsx`**

```jsx
import { Link } from "react-router-dom";

export default function CtaBand({ title, subtitle }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.jsx src/components/Footer.jsx src/components/CtaBand.jsx
git commit -m "feat: add Nav, Footer, and CtaBand components"
```

---

### Task 5: PageHero, PhotoCard, ServiceBlock, ProcessRow components

**Files:**
- Create: `elevate-living/src/components/PageHero.jsx`
- Create: `elevate-living/src/components/PhotoCard.jsx`
- Create: `elevate-living/src/components/ServiceBlock.jsx`
- Create: `elevate-living/src/components/ProcessRow.jsx`

- [ ] **Step 1: Write `src/components/PageHero.jsx`**

Used by every page except Home (which uses its own hero with a blockquote — see Task 7).

```jsx
export default function PageHero({ image, alt, eyebrow, title, description }) {
  return (
    <header className="page-hero">
      <img src={image} alt={alt} />
      <div className="page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write `src/components/PhotoCard.jsx`**

Shared between the Home page teaser grid and the Portfolio grid.

```jsx
export default function PhotoCard({ project }) {
  return (
    <div className="photo-card">
      <img src={project.img} alt={project.title} loading="lazy" />
      <span className="tag-badge">{project.tag}</span>
    </div>
  );
}
```

- [ ] **Step 3: Write `src/components/ServiceBlock.jsx`**

```jsx
export default function ServiceBlock({ service }) {
  return (
    <div className="service-block">
      <div className="thumb">
        <img src={service.img} alt={service.title} />
      </div>
      <h3>{service.title}</h3>
      <p style={{ color: "var(--text-ink-dim)", fontSize: 15, marginTop: 10 }}>{service.text}</p>
      <ul>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 4: Write `src/components/ProcessRow.jsx`**

```jsx
export default function ProcessRow({ step }) {
  return (
    <div className="process-row">
      <span className="process-num">{step.num}</span>
      <div>
        <h4>{step.title}</h4>
        <p>{step.text}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/PageHero.jsx src/components/PhotoCard.jsx src/components/ServiceBlock.jsx src/components/ProcessRow.jsx
git commit -m "feat: add PageHero, PhotoCard, ServiceBlock, ProcessRow components"
```

---

### Task 6: Home page

**Files:**
- Create: `elevate-living/src/pages/Home.jsx`

- [ ] **Step 1: Write `src/pages/Home.jsx`**

The teaser grid reuses `PhotoCard` with 5 specific items pulled from the portfolio data by id (in the original bundle these were duplicated inline; pulling from the shared data source is a direct DRY win with no behavior change — same 5 images, same tags).

```jsx
import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import { findPortfolioItem } from "../data/portfolio.js";

const teaserIds = ["kitchen-2", "bath-3", "laundry-2", "bath-5", "kitchen-4"];

export default function Home() {
  return (
    <>
      <header className="photo-hero">
        <img src="/images/kitchen/kitchen-3.jpg" alt="Elevate Living Design project" />
        <div className="photo-hero-content">
          <blockquote>
            “Good design should feel like it always belonged — considered in every room, from the kitchen to the laundry.”
          </blockquote>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Book a Consultation</Link>
            <Link to="/portfolio" className="btn btn-outline-light">View Portfolio</Link>
          </div>
        </div>
      </header>

      <section className="section-cream">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Recent work</h2>
            <p>A look at kitchens, bathrooms and laundries we've brought to life.</p>
          </div>
          <div className="teaser-grid">
            {teaserIds.map((id) => (
              <PhotoCard key={id} project={findPortfolioItem(id)} />
            ))}
          </div>
          <div style={{ marginTop: 44 }}>
            <Link to="/portfolio" className="btn btn-outline-dark">Explore Full Portfolio</Link>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-2">
          <div>
            <div className="thumb" style={{ height: 260, marginBottom: 0, overflow: "hidden" }}>
              <img
                src="/images/kitchen/kitchen-5.jpg"
                alt="Kitchen design"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">What We Do</p>
            <h2 style={{ fontSize: 34, marginTop: 14 }}>Full-service interior design</h2>
            <p style={{ marginTop: 16, color: "var(--text-ink-dim)" }}>
              We design every room in the home — kitchens, bathrooms, laundries and living spaces — planned as
              one cohesive material story from concept through to build oversight and final styling.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link to="/services" className="btn btn-outline-dark">Know More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-cream">
        <div className="wrap grid-2">
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">About Us</p>
            <h2 style={{ fontSize: 34, marginTop: 14 }}>Hinal Dave</h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 18,
                marginTop: 6,
                color: "var(--accent-brass)",
              }}
            >
              Founder & Principal Designer
            </p>
            <p style={{ marginTop: 18, color: "var(--text-ink-dim)" }}>
              Elevate Living was founded on the belief that every room in a home deserves the same level of
              care — not just the ones guests see. From kitchens and bathrooms to laundries and living
              spaces, each project is guided from first concept through to the final styled reveal.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link to="/about" className="btn btn-outline-dark">Know More</Link>
            </div>
          </div>
          <div className="photo-card" style={{ aspectRatio: "3/4" }}>
            <img src="/images/team/hinal-dave.jpg" alt="Hinal Dave, Founder & Principal Designer" />
          </div>
        </div>
      </section>

      <CtaBand
        title="Start with a conversation."
        subtitle="Tell us about your space — we'll take it from there."
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add Home page"
```

---

### Task 7: Services page

**Files:**
- Create: `elevate-living/src/pages/Services.jsx`

- [ ] **Step 1: Write `src/pages/Services.jsx`**

```jsx
import PageHero from "../components/PageHero.jsx";
import ServiceBlock from "../components/ServiceBlock.jsx";
import ProcessRow from "../components/ProcessRow.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { services } from "../data/services.js";
import { processSteps } from "../data/process.js";

export default function Services() {
  return (
    <>
      <PageHero
        image="/images/bathroom/bathroom-4.jpg"
        alt="Elevate Living Design services"
        eyebrow="Services"
        title="Every room, considered."
        description="From kitchens and bathrooms to laundries and living spaces — one studio, covered end to end."
      />

      <section className="section-cream">
        <div className="wrap grid-2" style={{ rowGap: 40, columnGap: 40 }}>
          {services.map((service) => (
            <ServiceBlock key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How We Work</p>
            <h2>Our process</h2>
            <p>The same five stages carry every project, whatever room it is, from a first idea to a finished space.</p>
          </div>
          {processSteps.map((step) => (
            <ProcessRow key={step.num} step={step} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a room in mind?"
        subtitle="Let's talk through what's possible for your space."
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Services.jsx
git commit -m "feat: add Services page"
```

---

### Task 8: Portfolio page

**Files:**
- Create: `elevate-living/src/pages/Portfolio.jsx`

- [ ] **Step 1: Write `src/pages/Portfolio.jsx`**

Filtering logic itself (`filterPortfolio`) is already covered by the Task 3 unit tests; this component is a thin, manually-verified wrapper around it.

```jsx
import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import PhotoCard from "../components/PhotoCard.jsx";
import CtaBand from "../components/CtaBand.jsx";
import { filterTabs, portfolioItems, filterPortfolio } from "../data/portfolio.js";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleItems = filterPortfolio(portfolioItems, activeFilter);

  return (
    <>
      <PageHero
        image="/images/kitchen/kitchen-1.jpg"
        alt="Elevate Living Design portfolio"
        eyebrow="Portfolio"
        title="Rooms we've brought to life."
        description="Kitchens, bathrooms, laundries and living spaces — each one designed and overseen from first sketch to final styling."
      />

      <section className="section-cream">
        <div className="wrap">
          <div className="filter-bar">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                className={`filter-btn${activeFilter === tab.key ? " active-filter" : ""}`}
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {visibleItems.length > 0 ? (
            <div className="grid-3">
              {visibleItems.map((item) => (
                <PhotoCard key={item.id} project={item} />
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-ink-dim)" }}>
              Photos for this category are on the way — check back soon, or get in touch to see recent work directly.
            </p>
          )}
        </div>
      </section>

      <CtaBand
        title="See something close to your vision?"
        subtitle="We'd love to talk about what a similar approach could look like in your space."
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Portfolio.jsx
git commit -m "feat: add Portfolio page"
```

---

### Task 9: About page

**Files:**
- Create: `elevate-living/src/pages/About.jsx`

- [ ] **Step 1: Write `src/pages/About.jsx`**

Hero image is `kitchen-4.jpg`, per the user's requested fix (the original used `laundry-4.jpg`).

```jsx
import PageHero from "../components/PageHero.jsx";
import CtaBand from "../components/CtaBand.jsx";

export default function About() {
  return (
    <>
      <PageHero
        image="/images/kitchen/kitchen-4.jpg"
        alt="Elevate Living Design studio"
        eyebrow="About"
        title="A studio for the whole home."
        description="Every room deserves the same level of care — from the kitchen to the laundry."
      />

      <section className="section-cream">
        <div className="wrap grid-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 style={{ fontSize: 32, marginTop: 14 }}>Why Elevate Living</h2>
          </div>
          <div>
            <p style={{ color: "var(--text-ink-dim)" }}>
              Elevate Living was founded on a simple idea: a home is only as good as its least-considered
              room. We design kitchens, bathrooms, laundries and living spaces with the same attention to
              detail — the same care in material choice, lighting, and daily function — so nothing in the
              home feels like an afterthought.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 18 }}>
              That means door hinges chosen for a fifteen-year life, waterproofing specified to outlast the
              tile above it, and lighting plans that account for how a room is actually used morning and
              night.
            </p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-2">
          <div>
            <div className="photo-card" style={{ aspectRatio: "3/4" }}>
              <img src="/images/team/hinal-dave.jpg" alt="Hinal Dave, Founder & Principal Designer" />
            </div>
            <h3 style={{ fontSize: 22, marginTop: 20 }}>Hinal Dave</h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 15,
                marginTop: 4,
                color: "var(--accent-brass)",
              }}
            >
              Founder & Principal Designer
            </p>
          </div>
          <div style={{ alignSelf: "center" }}>
            <p className="eyebrow">Founder's Summary</p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              I'm Hinal, founder of Elevate Living. Interior design has always been about creating spaces
              that genuinely improve the way people live.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              After designing my own home, I discovered how thoughtful planning and great design can
              completely transform everyday living. That passion led me into a career spanning more than 10
              years, working across kitchens, bathrooms, laundries, custom joinery, renovations and new home
              selections.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              Today, I work closely with homeowners, builders and developers across Melbourne to create
              timeless interiors that balance beauty, functionality and long-term value.
            </p>
            <p style={{ color: "var(--text-ink-dim)", marginTop: 16 }}>
              Every project is approached with creativity, practical thinking and attention to detail,
              ensuring every space reflects the people who live in it.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's talk about your home."
        subtitle="We take on a limited number of projects each year — get in touch to check availability."
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/About.jsx
git commit -m "feat: add About page with corrected hero image"
```

---

### Task 10: Contact page and form-encoding logic

**Files:**
- Create: `elevate-living/src/lib/encodeForm.js`
- Create: `elevate-living/src/pages/Contact.jsx`

- [ ] **Step 1: Write the failing test for the form-encoding helper**

**Test:** `elevate-living/src/lib/encodeForm.test.js`

```js
import { describe, it, expect } from "vitest";
import { encodeForm } from "./encodeForm.js";

describe("encodeForm", () => {
  it("encodes a flat object as application/x-www-form-urlencoded", () => {
    const result = encodeForm({ "form-name": "consultation-request", name: "Jane Doe" });
    expect(result).toBe("form-name=consultation-request&name=Jane%20Doe");
  });

  it("percent-encodes special characters in both keys and values", () => {
    const result = encodeForm({ message: "Kitchen & bathroom, 20m²" });
    expect(result).toBe("message=Kitchen%20%26%20bathroom%2C%2020m%C2%B2");
  });

  it("encodes an empty string value as an empty string, not literal 'undefined'", () => {
    expect(encodeForm({ phone: "" })).toBe("phone=");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd elevate-living && npx vitest run src/lib/encodeForm.test.js`
Expected: FAIL — `Cannot find module './encodeForm.js'` (file doesn't exist yet).

- [ ] **Step 3: Write `src/lib/encodeForm.js`**

Same encoding the original bundle used (`Object.keys(...).map(...).join("&")` with `encodeURIComponent` on both key and value) — this part of the original was correct and is being kept, not rewritten.

```js
export function encodeForm(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd elevate-living && npx vitest run src/lib/encodeForm.test.js`
Expected: PASS — 3 passing tests.

- [ ] **Step 5: Write `src/pages/Contact.jsx`**

Form structure, field names, and the hidden `form-name` input exactly match the static hidden form in `index.html` (Task 1) — this pairing is what lets Netlify detect and capture the submission. Contact email is `info@elevateliving.com.au` everywhere, replacing the two inconsistent addresses found in the original.

```jsx
import { useState } from "react";
import PageHero from "../components/PageHero.jsx";
import { encodeForm } from "../lib/encodeForm.js";

const initialState = { name: "", email: "", phone: "", project: "Kitchen", message: "" };

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("sending");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({ "form-name": "consultation-request", ...form }),
    })
      .then(() => {
        setStatus("sent");
        setTimeout(() => {
          setStatus("idle");
          setForm(initialState);
        }, 3000);
      })
      .catch(() => setStatus("error"));
  };

  return (
    <>
      <PageHero
        image="/images/laundry/laundry-1.jpg"
        alt="Contact Elevate Living Design"
        eyebrow="Contact"
        title="Tell us about your space."
        description="Fill in a few details and we'll get back to you within two business days to arrange a consultation."
      />

      <section className="section-cream">
        <div className="wrap grid-2">
          <div>
            <form
              onSubmit={handleSubmit}
              name="consultation-request"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="consultation-request" />
              <p style={{ display: "none" }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="form-row">
                <div>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="project">Project Type</label>
                  <select id="project" name="project" value={form.project} onChange={handleChange}>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Laundry</option>
                    <option>Living Space</option>
                    <option>Whole Home</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message">Tell us about your space</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Room size, current condition, timeline, anything else that helps us prepare."
                />
              </div>

              <div>
                <button type="submit" className="btn btn-primary" disabled={status === "sending" || status === "sent"}>
                  {status === "sending" ? "Sending…" : status === "sent" ? "Request sent" : "Request Consultation"}
                </button>
                {status === "error" && (
                  <p style={{ marginTop: 12, fontSize: 13, color: "#a94442" }}>
                    Something went wrong — please email us directly at{" "}
                    <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>.
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="photo-card" style={{ aspectRatio: "auto", height: "100%", minHeight: 340 }}>
            <img src="/images/bathroom/bathroom-2.jpg" alt="Elevate Living Design project" />
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="wrap grid-3">
          <div>
            <p className="eyebrow">Studio</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Visit Us</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              123 Gertrude Street<br />Fitzroy VIC 3065<br />Australia
            </p>
          </div>
          <div>
            <p className="eyebrow">Reach Out</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Get in Touch</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              <a href="mailto:info@elevateliving.com.au">info@elevateliving.com.au</a>
              <br />
              <a href="tel:+61402601808">0402601808</a>
            </p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <h3 style={{ fontSize: 20, marginTop: 10 }}>Studio Hours</h3>
            <p style={{ marginTop: 10, color: "var(--text-ink-dim)", fontSize: 14 }}>
              Monday – Friday: 9am – 5:30pm<br />Saturday: By appointment
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/encodeForm.js src/lib/encodeForm.test.js src/pages/Contact.jsx
git commit -m "feat: add Contact page with tested form-encoding helper"
```

---

### Task 11: App routing and layout shell

**Files:**
- Create: `elevate-living/src/App.jsx`
- Create: `elevate-living/src/components/ScrollToTop.jsx`

- [ ] **Step 1: Write `src/components/ScrollToTop.jsx`**

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
```

- [ ] **Step 2: Write `src/App.jsx`**

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx src/components/ScrollToTop.jsx
git commit -m "feat: wire up routing and page layout"
```

---

### Task 12: Bring in image assets and fix the About hero

**Files:**
- Create: `elevate-living/public/images/` (copied from the recovered dist build)
- Create: `elevate-living/public/favicon.png`

- [ ] **Step 1: Copy the existing photo assets into `public/images/`**

Run:
```bash
cd "C:\ClaudeCode\elevate-living"
mkdir -p public/images
cp -r "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\images\bathroom" public/images/
cp -r "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\images\kitchen" public/images/
cp -r "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\images\laundry" public/images/
cp -r "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\images\logo" public/images/
cp -r "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\images\team" public/images/
cp "C:\Users\meet.a\Downloads\elevate-living-dist\elevate-living-dist\favicon.png" public/favicon.png
```
Expected: `public/images/{bathroom,kitchen,laundry,logo,team}/` populated, `public/favicon.png` present.

- [ ] **Step 2: Verify file counts match the source**

Run: `find public/images -type f | wc -l`
Expected: `16` (5 bathroom + 5 kitchen + 4 laundry + 1 logo + 1 team).

- [ ] **Step 3: Start the dev server and manually verify all 5 pages**

Run: `npm run dev`, open the printed local URL in a browser.
Check: Home, Services, Portfolio (including each filter tab and the "living" empty state), About (hero is now a kitchen photo, not laundry), Contact (form renders, dropdown has all 6 project types) all render without console errors, and every image loads (no broken image icons).

- [ ] **Step 4: Commit**

```bash
git add public/images public/favicon.png
git commit -m "feat: add photo assets and corrected About hero image"
```

---

### Task 13: Image sharpening script

**Files:**
- Create: `elevate-living/scripts/sharpen-images.js`

- [ ] **Step 1: Write `scripts/sharpen-images.js`**

Backs up every original file under `public/images-original/` before overwriting anything in `public/images/`, so a bad sharpening pass is always recoverable. Uses `sharp`'s unsharp-mask (`sharpen`) plus a mild `linear` contrast boost — no upscaling, since that would require an AI model the user declined to pay for.

```js
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const BACKUP_DIR = path.resolve("public/images-original");
const CATEGORIES = ["bathroom", "kitchen", "laundry", "logo", "team"];

async function listJpgs(dir) {
  const entries = await readdir(dir);
  return entries.filter((name) => name.toLowerCase().endsWith(".jpg"));
}

async function processCategory(category) {
  const sourceDir = path.join(IMAGES_DIR, category);
  const backupDir = path.join(BACKUP_DIR, category);
  await mkdir(backupDir, { recursive: true });

  const files = await listJpgs(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const backupPath = path.join(backupDir, file);

    if (!existsSync(backupPath)) {
      await copyFile(sourcePath, backupPath);
    }

    const before = await stat(sourcePath);
    await sharp(backupPath)
      .sharpen({ sigma: 1.2, m1: 1.0, m2: 2.0 })
      .linear(1.05, -8)
      .jpeg({ quality: 90 })
      .toFile(sourcePath + ".tmp");

    const { rename } = await import("node:fs/promises");
    await rename(sourcePath + ".tmp", sourcePath);
    const after = await stat(sourcePath);
    console.log(`${category}/${file}: ${before.size}b -> ${after.size}b`);
  }
}

async function main() {
  for (const category of CATEGORIES) {
    await processCategory(category);
  }
  console.log("Done. Originals preserved under public/images-original/.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
```

- [ ] **Step 2: Run the script**

Run: `cd elevate-living && npm run sharpen-images`
Expected: one log line per image (16 total) showing before/after byte sizes, ending with "Done. Originals preserved under public/images-original/."

- [ ] **Step 3: Visually spot-check results**

Open a few processed images from `public/images/` next to their `public/images-original/` counterparts (e.g. in the OS file explorer or an image viewer). Confirm they look crisper, not over-sharpened (no harsh white halos around edges). If any image looks worse, note it — do not silently accept a regression.

- [ ] **Step 4: Commit**

```bash
git add scripts/sharpen-images.js public/images public/images-original
git commit -m "feat: sharpen site images, keep originals as backup"
```

---

### Task 14: Netlify build config

**Files:**
- Create: `elevate-living/netlify.toml`

- [ ] **Step 1: Write `netlify.toml`**

Replaces the manual drag-and-drop deploy: once the repo is connected in the Netlify dashboard, this tells Netlify how to build the site from source. The SPA catch-all redirect (previously a standalone `_redirects` file) is expressed here instead, since Netlify processes form-encoded POSTs before redirects — this rule does not interfere with form capture.

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Run a production build to confirm it works end to end**

Run: `cd elevate-living && npm run build`
Expected: succeeds, creates `dist/` with `index.html` and hashed `assets/*.js` / `assets/*.css` files, no errors.

- [ ] **Step 3: Preview the production build**

Run: `npm run preview`, open the printed local URL.
Check: same manual walkthrough as Task 12 Step 3, but against the built output this time — confirms nothing broke between dev and build.

- [ ] **Step 4: Commit**

```bash
git add netlify.toml
git commit -m "chore: add Netlify build config for git-based deploys"
```

---

### Task 15: Full test suite and final verification

**Files:**
- None new — this task runs everything written so far.

- [ ] **Step 1: Run the full automated test suite**

Run: `cd elevate-living && npm test`
Expected: all tests pass (3 from `portfolio.test.js`, 3 from `encodeForm.test.js` — 6 total).

- [ ] **Step 2: Run a fresh production build**

Run: `npm run build`
Expected: succeeds with no errors or warnings about missing assets.

- [ ] **Step 3: Manually walk through every page one more time in `npm run preview`**

Checklist:
- Nav highlights the current page and the mobile toggle (resize browser < 860px) opens/closes the menu.
- Home hero quote, both buttons, all 5 teaser images, "What We Do" and "About Us" teasers, CTA band.
- Services: all 4 service blocks with correct images/items, all 5 process rows, CTA band.
- Portfolio: default "All Projects" shows 14 items; each filter tab shows the right subset; "Living Spaces" shows the empty-state message (there are no living-space portfolio photos in the source data — this matches the original site, not a bug).
- About: hero image is a kitchen photo, founder bio renders in full, CTA band.
- Contact: fill out the form fields, submit — since Netlify Forms only processes submissions on an actual Netlify deploy, a local `sending → error` transition is expected (the fetch to `/` 404s locally); confirm the error-fallback message shows the correct email (`info@elevateliving.com.au`).
- Footer on every page: correct address, email, phone, Instagram link, current year in the copyright line.

- [ ] **Step 4: Commit any fixes found during manual verification**

If the walkthrough surfaces a mismatch, fix it in the relevant file and commit with a message describing exactly what was wrong (e.g. `fix: correct laundry hours copy in Contact page`).

---

### Task 16: Git repo finalization and deploy handoff notes

**Files:**
- Create: `elevate-living/README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# Elevate Living

Source for the Elevate Living Design website (Melbourne interior design studio — kitchens, bathrooms, laundries, living spaces).

## Development

    npm install
    npm run dev

## Testing

    npm test

## Production build

    npm run build
    npm run preview   # serve the build locally to sanity-check it

## Deploying

This repo is meant to be connected to Netlify via Git (see `netlify.toml` for build settings), replacing the old manual drag-and-drop deploy:

1. Push this repo to GitHub (or another Git host).
2. In the Netlify dashboard for the existing site: **Site settings → Build & deploy → Link repository**, and point it at this repo.
3. Push to the connected branch — Netlify builds and deploys automatically from then on.

### Turning on consultation-form email notifications

The contact form posts to Netlify Forms (form name `consultation-request`). To receive submissions by email:

1. Netlify dashboard → your site → **Forms**.
2. Confirm submissions are appearing under the `consultation-request` form (test by submitting the live contact page once it's deployed).
3. **Forms → Form notifications → Add notification → Email notification**, set the address to `info@elevateliving.com.au`.

### Re-running the image sharpening pass

Original (pre-sharpening) photos are kept in `public/images-original/`. To re-run or tune the sharpening:

    npm run sharpen-images
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with dev, deploy, and Netlify form setup instructions"
```

- [ ] **Step 3: Hand off to the user**

Tell the user the local implementation is complete and committed, and that the remaining steps are account actions only they can perform:
1. Create a GitHub repo (or authorize use of `gh` if already authenticated) and push this repo to it.
2. Connect that repo to the existing Netlify site (Site settings → Build & deploy → Link repository).
3. Verify a submitted test consultation-form entry appears under Netlify's Forms tab, then turn on the email notification per the README.

---

## Self-Review Notes

- **Spec coverage:** Architecture (Task 1, 11), content/pages (Tasks 3, 6–10), About hero fix (Task 9), image sharpening (Task 13), consultation form fix (Task 10, 14), deployment (Task 14, 16) — all spec sections have a corresponding task.
- **Type/naming consistency:** `filterPortfolio`, `findPortfolioItem`, `encodeForm` are defined once (Tasks 3, 10) and referenced with the same names and signatures everywhere else they're used (Home, Portfolio, Contact).
- **No placeholders:** every step above contains complete file contents or an exact command with expected output.
