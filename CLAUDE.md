# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Archived under `~/dev/archive` — report-only; do not refactor or upgrade dependencies unless asked.

## Stack

React 19 + TypeScript + Vite single-page portfolio ("Star Space" mark, `donald-filimon-star-space-portfolio`).
No test runner, linter, or CSS framework is configured — only `react`, `react-dom`, Vite, and TypeScript.
`.cursor/` exists but is empty; no `.cursorrules` or copilot instructions.

## Commands (from package.json / README)

- `npm install` then `npm run dev` — Vite dev server on `0.0.0.0:4173`
- `npm run build` — `tsc -b && vite build` (output in `dist/`); `npm run typecheck` — `tsc -b`
- `npm run preview` — serve the built site
- `npm run deploy:all` = `deploy:root` (build with `VITE_BASE=/`, force-push `gh-pages` to
  `donaldfilimon/donaldfilimon.github.io`, writes `CNAME donaldfilimon.com` and `404.html`) then
  `deploy:pages` (pushes a redirect-only `gh-pages` to this repo's `/star-space-portfolio/`).
  README says GitHub Actions is billing-locked, so `.github/workflows/deploy-pages.yml` is not the live path.
- Deploys push to remote branches — treat as side-effectful; do not run casually.

## Architecture

- `index.html` -> `src/main.tsx` -> `src/App.tsx`: one page with Home/About/Projects/Resume/Contact sections;
  active section tracked via `IntersectionObserver`, hash navigation in `src/lib/navigation.ts`.
- Content lives in data modules, not components: `src/data/site.ts` (name, email, GitHub, capabilities),
  `src/data/projects.ts`, `src/data/resume.ts`. Edit copy there.
- `src/components/`: `SiteHeader` (mobile menu with focus trap + Escape), `ParticleField`
  (pointer-reactive canvas hero, honours reduced-motion), `Icons`.
- `src/styles.css` is the whole visual system; `public/` holds `og.svg`, `favicon.svg`, `robots.txt`, `sitemap.xml`.
- `vite.config.ts` reads `VITE_BASE` for the Pages sub-path build.
