# Abdulaziz Yusupaliev — Portfolio

Personal portfolio for **Abdulaziz Yusupaliev**, a Frontend Developer & AI/ML
Engineer from Tashkent. A single-page cinematic noir/gold site — a
static atmospheric star field behind dark glass surfaces — with hero, about
(including education), experience timeline, projects, skills, and contact,
plus a standalone route per project with a live in-page preview.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** with a hex token system (`app/globals.css`)
- **Static CSS gradients** — the GPU-light atmospheric backdrop, with no
  canvas, WebGL, or continuous background render loop
- **GSAP + ScrollTrigger** and **Lenis** — smooth scroll, reveals, the pinned
  Experience timeline
- **Framer Motion** — preloader, mobile menu, nav underline, greeting rotator
- **Space Grotesk / Inter / Instrument Serif** via `next/font/google`
- Icons: `lucide-react` + `simple-icons`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3005
```

```bash
npm run build    # production build
npm run start    # serve the build on http://localhost:3005
npm run lint     # eslint
```

Both `dev` and `start` are pinned to port **3005**. Next only auto-shifts the
port when it isn't given one, and a moving port is what leaves a stale browser
tab pointing at a different project's dev server. `next.config.ts` also lists
this machine's current LAN addresses in `allowedDevOrigins`, without which
Next blocks its own HMR socket when the site is opened on anything other than
`localhost` — the usual cause of a dev page reloading over and over.

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
  sections/<section>/     # hero, about, skills, experience, projects, contact
    projects/route/        # project-page-only pieces (hero, nav, back link)
  shared/                 # Magnetic, TiltCard, Marquee, SectionHeading, icons
data/                     # site.ts, projects.ts, skills.ts
lib/                      # utils, scroll-state (Lenis/GSAP shared store)
public/                   # profile photo, skill assets, resume CVs, screenshots
```

## Deploy

Built for **Vercel**: push to GitHub and import the repo, or run `vercel`.
