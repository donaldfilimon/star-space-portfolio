# Donald Filimon — Star Space Portfolio

React + TypeScript + Vite portfolio for Donald Filimon under the Star Space mark.

## Highlights

- Responsive desktop and mobile layout
- Animated, pointer-reactive particle field with reduced-motion and density caps
- Custom Star Space asterisk identity
- Home, About, Projects, Resume, and Contact sections
- Keyboard-accessible navigation (mobile menu focus trap + Escape)
- Real project / GitHub / email destinations from data modules

## Run locally

```bash
npm install
npm run dev
```

Build production output:

```bash
npm run build
```

## Deploy

Push to `main` deploys to GitHub Pages via `.github/workflows/deploy-pages.yml`.

Live URL (after first deploy): https://donaldfilimon.github.io/star-space-portfolio/

## Customize

Edit these files:

- `src/data/site.ts` — name, brand, email, GitHub, tagline, capabilities
- `src/data/projects.ts` — project copy, tags, and links
- `src/data/resume.ts` — timeline entries
- `src/styles.css` — visual system and responsive layout
- `src/components/ParticleField.tsx` — hero animation
