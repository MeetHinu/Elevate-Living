# Elevate Living Design — Site Rebuild

## Background

The Elevate Living Design website ("Elevate Living — Interior Design Studio", Melbourne, kitchens/bathrooms/laundries/living spaces) is currently live on Netlify but has no recoverable source code — it was deployed by drag-and-dropping a pre-built `dist` folder (React + Vite production build) directly into the Netlify dashboard. No git repo or React source was ever kept.

A copy of that `dist` build survives locally at `Downloads\elevate-living-dist\` (minified JS bundle, CSS, and photo assets). A separate, older static HTML/CSS/JS version of the site also exists in `Downloads\files\` and `Downloads\style\`, but the user confirmed the React/Vite version is the one to continue.

This project reconstructs editable React source that reproduces the deployed site, fixes three known issues, and puts the site on a maintainable deploy path (git + Netlify auto-deploy) so source code isn't lost again.

## Goals

1. Reconstruct the site as React + Vite source, faithful to the deployed build (same pages, copy, layout, design tokens, images).
2. Fix three specific issues:
   - About page hero image is a laundry photo; replace with a kitchen photo.
   - All photos read as soft/blurry; sharpen them.
   - The "Book a Consultation" form doesn't deliver submissions anywhere (no email, no notification).
3. Move deployment from manual drag-and-drop to git-based, so the source is never lost again.

## Non-goals

- No new pages, sections, or content beyond what already exists.
- No SMS/text notifications for form submissions (email-only, per user decision).
- No AI upscaling service for images (local sharpening only, per user decision — this cannot add detail that isn't in the source photo, only improve perceived crispness).
- Not creating or logging into the user's GitHub/Netlify accounts — Claude provides source + instructions; the user performs the actual account-linking steps.

## Content Source

Extracted directly from the minified bundle at `Downloads\elevate-living-dist\elevate-living-dist\assets\index-Dky7cSux.js` and its paired CSS file, by pattern-matching string literals and CSS custom properties. This recovered:

- Full nav structure, all page copy (Home, Services, Portfolio, About, Contact), footer content, contact details (`info@elevatelivingdesign.com.au`, `+61 402 601 808`, Fitzroy VIC 3065, studio hours).
- All 19 portfolio items (id, category, tag, title, description, image) across Kitchen/Bathroom/Laundry/Living Spaces.
- Design tokens: colors (`--bg-cream:#FBF8F1`, `--text-ink:#23201B`, `--accent-brass:#A9834F`, `--accent-sage:#8A9482`, etc.), fonts (Fraunces display / Inter body), and every component's CSS (nav, photo-hero, page-hero, photo-card, teaser-grid, filter-bar, service-block, process-row, founder-panel, cta-band, footer, form).
- Exact image-to-section mapping (e.g. home hero = `kitchen-3.jpg`, About hero = `laundry-4.jpg`, Services hero = `bathroom-4.jpg`, Portfolio hero = `kitchen-1.jpg`, Contact hero = `laundry-1.jpg`).

This is source content, not a design decision — the implementation plan should treat it as data to transcribe, not to re-derive.

## Architecture

React + Vite + `react-router-dom`, matching the original build's framework signature (confirmed via bundle inspection: React Router error strings, Vite-style hashed asset filenames, hand-rolled CSS with custom properties — no CSS framework).

```
elevate-living/
  src/
    pages/          Home.jsx, Services.jsx, Portfolio.jsx, About.jsx, Contact.jsx
    components/     Nav.jsx, Footer.jsx, PhotoHero.jsx, PageHero.jsx, PhotoCard.jsx,
                     ProcessRow.jsx, ServiceBlock.jsx, TeaserGrid.jsx, FilterBar.jsx
    data/           portfolio.js, services.js, process.js  (plain JS data, not hardcoded JSX)
    styles/         global.css  (design tokens + component styles, transcribed from the recovered CSS)
  public/
    images/          kitchen/, bathroom/, laundry/, logo/, team/  (sharpened)
  netlify.toml       build command + publish dir, so Netlify builds from source
  package.json, vite.config.js, index.html
```

Routing mirrors the original: `/`, `/services`, `/portfolio`, `/about`, `/contact`.

## Fix Details

### 1. About page hero image
Replace `laundry-4.jpg` with `kitchen-4.jpg` in the About page's `page-hero` (chosen because it isn't already used as a hero elsewhere — `kitchen-3` is the Home hero, `kitchen-1` is the Portfolio hero).

### 2. Image sharpening
All images in `images/{bathroom,kitchen,laundry,logo,team}/` are processed with a one-off Node script using the `sharp` library: unsharp-mask sharpening plus a small contrast/clarity boost, tuned per-image to avoid halos. Originals are copied to `images-original/` (outside the published site, kept in the repo for reference / re-processing) before any file is overwritten.

This is a real limitation to set expectations on: sharpening improves perceived crispness but cannot recover detail a low-resolution or genuinely soft source photo doesn't have. If any image still looks weak afterward, flag it back to the user rather than over-sharpening into artifacts.

### 3. Consultation form delivery
Root cause: Netlify Forms requires (a) a static HTML `<form>` with `data-netlify="true"` and matching `name` present in the deployed HTML at build time, and (b) the live JS-rendered form to POST to `/` as `application/x-www-form-urlencoded` with a `form-name` field matching that static form — otherwise Netlify never registers the submission, regardless of how the form behaves visually. Because the site was drag-and-dropped as a raw `dist` folder rather than built by Netlify from source, and because form email notifications are a separate dashboard setting, submissions had nowhere to go even if the POST succeeded.

Fix:
- Keep the hidden static form (already present in the original `index.html`, named `consultation-request`) and make sure the visible React form's fields and `form-name` exactly match it.
- Confirm the submit handler POSTs correctly (`Content-Type: application/x-www-form-urlencoded`, body includes `form-name=consultation-request&...`).
- Provide the user step-by-step instructions to enable Netlify's built-in email notification (Site settings → Forms → Form notifications → "Email notification" → `info@elevatelivingdesign.com.au`) — this is an account setting Claude cannot change on the user's behalf.
- Phone number stays on the site as a `tel:` click-to-call link; it is not wired to receive form data (email-only delivery, per user decision).

## Deployment

1. `git init` inside `elevate-living/`, commit the reconstructed source.
2. Add `netlify.toml` with `npm run build` / `dist` publish directory.
3. User creates a GitHub repo (or authorizes Claude to do so via `gh` if authenticated) and pushes.
4. User connects that repo to the existing Netlify site in the Netlify dashboard (Site settings → Build & deploy → Link repository) — an account-level action Claude will walk through but not perform.
5. Going forward, every push to the connected branch auto-builds and deploys — no more manual drag-and-drop, no more lost source.

## Testing / Verification

- `npm run build` succeeds with no errors.
- Manually click through all 5 pages in the dev server (`npm run dev`) and the built preview (`npm run preview`), confirming nav, content, images, and the portfolio filter work.
- Visually compare each page against the original `dist` build (already available locally) to confirm faithful reproduction.
- Submit a test consultation form locally against a Netlify dev/CLI context if feasible, or clearly document that live-form verification requires an actual Netlify deploy (local dev servers don't process Netlify Forms).
- Confirm sharpened images visually against their `images-original/` backups — no obvious over-sharpening artifacts.
