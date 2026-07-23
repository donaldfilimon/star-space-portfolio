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

**Primary URL:** https://donaldfilimon.github.io/

GitHub Actions is blocked on this account (billing lock). Use branch deploys:

```bash
npm run deploy:all
```

That deploys the full site to `donaldfilimon.github.io` (root) and keeps `/star-space-portfolio/` as a redirect.

| Script | Target |
|--------|--------|
| `npm run deploy:all` | Root user site + subpath redirect |
| `npm run deploy:root` | `donaldfilimon.github.io` only |
| `npm run deploy:pages` | Subpath redirect only |

**Custom domain (`donaldfilimon.com`):** deploy includes a `CNAME` file. At your DNS provider, add:

```
donaldfilimon.com  CNAME  donaldfilimon.github.io
```

Then verify the domain under the repo’s GitHub Pages settings.

**Note:** Social previews use `og.svg`. If Twitter or LinkedIn previews look wrong, replace with a PNG/JPG at the same path.

## Customize

Edit these files:

- `src/data/site.ts` — name, brand, email, GitHub, tagline, capabilities
- `src/data/projects.ts` — project copy, tags, and links
- `src/data/resume.ts` — timeline entries
- `src/styles.css` — visual system and responsive layout
- `src/components/ParticleField.tsx` — hero animation
