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

Precise, honest, a little playful about being a developer's site. The
portfolio *is* a dark code editor: an editor-style nav tab bar, a terminal
hero, a JSON skills manifest, a git-log work history, a file-explorer project
grid, and a status-bar footer. One phosphor-green accent on near-black is the
entire color story. Three words: **exact, legible, unmistakably a
developer's.**

## Anti-references

- Generic dark SaaS portfolios: near-black + one timid accent + a fade-up on
  every section. This site commits harder — a real, consistent editor
  metaphor, not a decorative dark theme.
- Cosplay without function: the terminal/editor framing has to earn its
  keep (line numbers that count real lines, nav tabs that are real nav,
  a live iframe preview inside the "browser chrome" — not just chrome for
  its own sake).
- Overstated junior framing: fake metrics, "10x", hero-metric stat blocks,
  claims of work not actually done.

## Design Principles

1. **Tell the truth, confidently.** Lead with what's real. AI/ML work is
   framed honestly (an internship + learning projects), while proven
   frontend work at Hiwelcome.uz and Delever.uz carries the credibility. No
   invented numbers.
2. **One accent, much dark.** A single phosphor green is the whole color
   story; everything else is near-black restraint.
3. **Contrast is non-negotiable.** Every text/background pair is verified
   readable (`scripts/contrast-check.mjs`). Low-opacity gray "for elegance"
   is banned.
4. **The metaphor is functional, not decorative.** Nav tabs are real
   navigation. The live-preview "browser chrome" wraps a real, working
   iframe. Line numbers correspond to real content lines.
5. **Show the work, then get out of the way.** The fastest path from landing
   to "contact him" wins over decoration.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1, large/bold text ≥3:1, against
actual backgrounds. Full keyboard operability (nav, mobile menu, project
live-preview controls) with visible focus rings. Every decorative animation
(typed/rotating greeting, scroll reveals, tab-indicator slide) has a
`prefers-reduced-motion` path. Semantic landmarks and one true `<h1>` per
page. Green is never the only signal for state — pair it with text, icon, or
weight for color-blind safety.
