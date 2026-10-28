# Abdulaziz Yusupaliev — Portfolio

Personal portfolio for **Abdulaziz Yusupaliev**, an Applied AI/ML Engineer &
Full-Stack Developer from Tashkent. A light, single-page site built around
"the transcript": a hero waveform that decodes a greeting in three languages,
then selected work, experience, toolkit, about (including education), and
contact, plus a case-study route per project with a live in-page preview where
the deployment allows embedding. See `DESIGN.md` for the visual system.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** with an OKLCH token system (`app/globals.css`)
- **Canvas 2D** for the hero waveform; everything else is CSS. There are no
  animation libraries.
- **Archivo** (variable width) + **Onest** (Cyrillic fallback only) via
  `next/font/google`
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

Each project in `data/projects.ts` gets its own route at `/projects/[slug]`
with its role, results, what was built, and known limits. Array order is
display order; `featured: true` projects get a full card on the home page and
the rest are listed compactly by `area`. Projects whose `liveUrl` allows
framing get an embedded, refreshable iframe preview
(`components/sections/projects/ProjectTrial.tsx`); the others link out. A
project with a `cover` shows that screenshot on its card; otherwise the card
renders a styled category cover.

Content rule: every claim comes from a CV, a role, a repository README, or the
live deployment — no estimated or invented numbers.

## Project structure

```
app/                     # layout (scene, FX shell), page, globals.css, OG image
  projects/[slug]/        # per-project route
components/
  layout/                 # Navbar, Footer, ScrollFX, Preloader, cursor, scene/
  sections/<section>/     # hero, about, skills, experience, projects, contact
    projects/route/        # project-page-only pieces (hero, nav, back link)
  shared/                 # Magnetic, SectionHeading, SocialIcon
data/                     # site.ts, projects.ts, skills.ts
lib/                      # utils, scroll-state (Lenis/GSAP shared store)
public/                   # profile photo, resume CVs, project screenshots
```

## Deploy

Built for **Vercel**: push to GitHub and import the repo, or run `vercel`.
