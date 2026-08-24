# Abdulaziz Yusupaliev — Portfolio

Personal portfolio for **Abdulaziz Yusupaliev**, a Frontend Developer & AI/ML
Engineer from Tashkent. A single-page cinematic noir/gold site — a
scroll-driven 3D particle backdrop behind glass surfaces — with hero, about
(including education), experience timeline, projects, skills, and contact,
plus a standalone route per project with a live in-page preview.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** with a hex token system (`app/globals.css`)
- **three.js / @react-three/fiber / drei / postprocessing** — the morphing
  particle backdrop (lazy-loaded, client-only, low-power tier for mobile)
- **GSAP + ScrollTrigger** and **Lenis** — smooth scroll, reveals, the pinned
  Experience timeline
- **Framer Motion** — preloader, mobile menu, nav underline, greeting rotator
- **Space Grotesk / Inter / Instrument Serif** via `next/font/google`
- Icons: `lucide-react` + `simple-icons`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the build
npm run lint     # eslint
```

## Design system

Strategy and visual rules are documented in [`PRODUCT.md`](./PRODUCT.md) and
[`DESIGN.md`](./DESIGN.md). Color contrast is verified with
`node scripts/contrast-check.mjs` (every text/surface pair meets WCAG AA).

Editable content lives in [`data/site.ts`](./data/site.ts) (nav, hero, resume
links, experience, education, contact, metadata) and
[`data/projects.ts`](./data/projects.ts) / [`data/skills.ts`](./data/skills.ts).
Update `siteUrl` in `data/site.ts` when the deployment domain changes.

Each project in `data/projects.ts` gets its own route at `/projects/[slug]`.
Projects with a `liveUrl` get an embedded, refreshable iframe preview on that
route (`components/sections/projects/ProjectTrial.tsx`); projects with only a
`repoUrl` link out to source instead. A project with a `cover` shows that
screenshot on its card; otherwise the card renders a styled category cover.

## Project structure

```
app/                     # layout (scene, FX shell), page, globals.css, OG image
  projects/[slug]/        # per-project route
components/
  layout/                 # Navbar, Footer, ScrollFX, Preloader, cursor, scene/
  sections/<section>/     # hero, about, experience, projects, skills, contact
    projects/route/        # project-page-only pieces (hero, nav, back link)
  shared/                 # Magnetic, TiltCard, Marquee, SectionHeading, icons
data/                     # site.ts, projects.ts, skills.ts
lib/                      # utils, scroll-state (Lenis/GSAP shared store)
public/                   # profile photo, skill assets, resume CVs, screenshots
```

## Deploy

Built for **Vercel**: push to GitHub and import the repo, or run `vercel`.
