# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Archived under `~/dev/archive` — report-only; do not refactor or upgrade dependencies unless asked.

## Stack

React 19 + TypeScript + Vite single-page portfolio ("Star Space" mark, `donald-filimon-star-space-portfolio`).
No linter or CSS framework is configured — only `react`, `react-dom`, Vite, and TypeScript. Tests use
Node's built-in `node:test` runner with type stripping (no test dependency); there is no DOM environment,
so tests cover data modules, pure helpers in `src/lib/`, and `bash -n` over `scripts/*.sh`.
No `.cursor/`, `.cursorrules` or copilot instructions.

## Commands (from package.json / README)

- `npm install` then `npm run dev` — Vite dev server on `0.0.0.0:4173`
- `npm run build` — `tsc -b && vite build` (output in `dist/`); `npm run typecheck` — `tsc -b`
  (`tsconfig.node.json` also typechecks `tests/`, `src/lib/*.ts`, `src/data/*.ts`)
- `npm test` — `node --test` over `tests/**/*.test.ts` (Node 22.6+ for `--experimental-strip-types`)
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
- `src/styles.css` is the whole visual system; `public/` holds `og.png` (the social card), `og.svg`,
  `favicon.svg`, `robots.txt`, `sitemap.xml`.
- The mobile-menu breakpoint lives twice: `MOBILE_NAV_QUERY` in `src/lib/navigation.ts` (SiteHeader closes
  an open menu when it stops matching) and the `@media (max-width: 1120px)` block in `styles.css`.
  `tests/navigation.test.ts` fails if they drift.
- `vite.config.ts` reads `VITE_BASE` for the Pages sub-path build.
