# Product

## Register

brand

## Users

Recruiters, engineering leads, potential collaborators, and reviewers
(including university / scholarship reviewers) who land on the site for
30–90 seconds and need to answer one question fast: *is this person worth
contacting?* They scan on desktop and mobile, often from a link in a message
or application. They are skeptical of junior-developer portfolios that
overstate ability.

## Product Purpose

A personal portfolio for **Abdulaziz Yusupaliev** — a Frontend Developer &
AI/ML Engineer from Tashkent. It exists to convert a quick visit into a
credible impression and a contact action (email / GitHub / LinkedIn /
Telegram). Success = the visitor leaves understanding his real stack, real
shipped work (Hiwelcome.uz, Delever.uz, Dwelve, and a handful of public
GitHub projects — several with live, embedded previews), and how to reach
him — and remembers the site.

## Brand Personality

Cinematic, precise, quietly confident. The portfolio is a noir stage: a
scroll-driven particle universe behind glass surfaces, bold Space Grotesk
display type with Instrument Serif italics, and a gold + blue accent pair on
near-black. The drama stays in the backdrop — the content on top is honest
and legible. Three words: **cinematic, legible, credible.**

## Anti-references

- Generic dark SaaS portfolios: near-black + one timid accent + a fade-up on
  every section. This site commits harder — a full cinematic 3D backdrop that
  responds to scroll, not a decorative dark theme.
- Spectacle without function: the cinematic framing has to earn its keep
  (the particle cloud morphs with real scroll progress, the "browser chrome"
  wraps a real live iframe, the nav underline tracks the section actually on
  screen — not chrome for its own sake).
- Overstated junior framing: fake metrics, "10x", hero-metric stat blocks,
  claims of work not actually done.

## Design Principles

1. **Tell the truth, confidently.** Lead with what's real. AI/ML work is
   framed honestly (an internship + learning projects), while proven
   frontend work at Hiwelcome.uz and Delever.uz carries the credibility. No
   invented numbers.
2. **Two accents, one story.** Gold leads, blue supports, and they only meet
   in the shared gradient; everything else is near-black restraint.
3. **Contrast is non-negotiable.** Every text/background pair is verified
   readable (`scripts/contrast-check.mjs`). Low-opacity gray "for elegance"
   is banned.
4. **The spectacle is functional, not decorative.** The particle cloud is
   driven by real scroll progress, the live-preview "browser chrome" wraps a
   real working iframe, and the nav underline tracks the section on screen.
5. **Show the work, then get out of the way.** The fastest path from landing
   to "contact him" wins over decoration.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1, large/bold text ≥3:1, against
actual backgrounds. Full keyboard operability (nav, mobile menu, project
live-preview controls) with visible focus rings. Every decorative animation
(typed/rotating greeting, scroll reveals, tab-indicator slide) has a
`prefers-reduced-motion` path. Semantic landmarks and one true `<h1>` per
page. Color is never the only signal for state — gold/blue always pairs with
text, icon, or weight for color-blind safety.
