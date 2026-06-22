# Abdulaziz Yusupaliev — Portfolio

Personal portfolio for **Abdulaziz Yusupaliev**, an AI Engineer & Frontend
Developer from Tashkent. A single-page site with a crimson-on-black "dark-side"
identity: hero, skills, experience, projects, education, and contact.

## Tech stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4** with a custom OKLCH token system (`app/globals.css`)
- **Framer Motion** for the intro, hero entrance, and scroll reveals
- **Variable fonts** (self-hosted via Fontsource): Bricolage Grotesque
  (display), Geist (body), Geist Mono (labels/code)
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

Editable content lives in [`data/site.ts`](./data/site.ts) (hero, experience,
projects, education, contact, metadata) and [`data/skills.ts`](./data/skills.ts).
Update `siteUrl` in `data/site.ts` when the deployment domain changes.

## Project structure

```
app/                     # layout, page, globals.css, opengraph-image
components/
  layout/                # Navbar, Footer
  sections/<section>/    # Hero, Skills, Experience, Projects, Education, Contact
  shared/                # SectionReveal
data/                    # site.ts, skills.ts
public/                  # logo, skill assets, resume
```

## Deploy

Built for **Vercel**: push to GitHub and import the repo, or run `vercel`.
