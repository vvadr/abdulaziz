# Abdulaziz Yusupaliev — Portfolio

Personal portfolio for **Abdulaziz Yusupaliev**, a Frontend Developer & AI/ML
Engineer from Tashkent. A single-page site styled as a dark code editor /
terminal: hero, skills, experience, projects, education, and contact — plus a
standalone route per project with a live in-page preview.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** with a custom OKLCH token system (`app/globals.css`)
- **Framer Motion** for the hero entrance, nav tab transitions, and scroll reveals
- **Geist Mono Variable** (self-hosted via Fontsource) — the sole typeface,
  sitewide, in keeping with the code-editor identity
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
`repoUrl` link out to source instead.

## Project structure

```
app/                     # layout, page, globals.css, opengraph-image
  projects/[slug]/        # per-project route
components/
  layout/                 # Navbar (editor tab-bar), Footer (status bar)
  sections/<section>/     # Hero, Skills, Experience, Projects, Education, Contact
    projects/route/        # project-page-only pieces (hero, nav, back link)
  shared/                 # SectionReveal
data/                     # site.ts, projects.ts, skills.ts
public/                   # profile photo, skill assets, resume CVs (frontend + AI/ML)
```

## Deploy

Built for **Vercel**: push to GitHub and import the repo, or run `vercel`.
