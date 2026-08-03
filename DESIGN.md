# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**.
Mood: a dark code editor / terminal — near-black, one phosphor-green accent,
monospace throughout. Developer-tool honest rather than decorative.

## Color

All tokens OKLCH. Background is a near-black neutral (cool, barely-there
chroma). Green is the only saturated color. Every pair below verified with
`node scripts/contrast-check.mjs` (WCAG formula, OKLCH → linear sRGB).

| Token | OKLCH | Role | Verified |
|---|---|---|---|
| `--bg` | `oklch(0.150 0.004 240)` | Page background | — |
| `--surface` | `oklch(0.190 0.005 240)` | Windows, cards, panels | — |
| `--surface-2` | `oklch(0.235 0.006 240)` | Raised / hover surface, title bars | — |
| `--border` | `oklch(0.340 0.009 240)` | Borders | — |
| `--border-soft` | `oklch(0.275 0.007 240)` | Hairline borders | — |
| `--ink` | `oklch(0.955 0.003 240)` | Primary text | 17.3:1 on bg |
| `--ink-muted` | `oklch(0.760 0.006 240)` | Body / secondary text | 9.2:1 on bg |
| `--ink-faint` | `oklch(0.585 0.007 240)` | Tertiary / line numbers / labels | 4.7:1 on bg |
| `--accent` | `oklch(0.780 0.155 152)` | Phosphor green — icons, glows, prompts | 10.4:1 on bg |
| `--accent-strong` | `oklch(0.860 0.175 152)` | Links, active states, hover | 13.7:1 on bg |
| `--accent-soft` | `oklch(0.660 0.130 152)` | Deeper green for gradient depth | — |
| `--accent-solid` | `oklch(0.720 0.175 152)` | Button fill | (ink below) |
| `--accent-ink` | `oklch(0.150 0.030 152)` | Dark text on the green fill | 8.5:1 on accent-solid |

Rules: never use `--ink-faint` for paragraph copy (line numbers/labels only).
Green is never the sole state signal (pair with text/icon/weight). The three
window-chrome "traffic light" dots (`--dot-red`, `--dot-amber`, plus
`--accent` for the green one) are the one deliberate exception to the
single-accent rule — they're fixed, non-semantic UI convention, not content.

## Typography

One typeface, committed: **Geist Mono Variable** (`--font-mono`), used for
everything — headings, body, UI chrome. Weights 400–700. Body line-height
1.7 (monospace needs more air than proportional type to stay readable at
paragraph length). Line length capped ~58–68ch.

`--font-sans` and `--font-display` both alias to the same mono family so
Tailwind's `font-sans`/`font-display`/`font-mono` utilities are interchangeable
— pick whichever reads better at the call site.

## Layout

- `.shell` caps content at 72rem; fluid inline padding via `clamp()`.
- `.section` gives fluid vertical rhythm (`clamp(4.5rem, 3rem + 7vw, 8.5rem)`).
- Section header: `.section-kicker` (a `// file.ext` comment naming the section,
  matching that section's Navbar tab file) + `.section-title` + `.section-lead`.
- Each section leans on a distinct editor/CLI metaphor rather than one repeated
  card template:
  - **Hero** — a terminal window (`whoami.sh`) with numbered command/output
    lines, plus a `neofetch`-style system-info panel.
  - **Skills** — a `skills.json` manifest rendered with line numbers.
  - **Experience** — a git-log timeline: commit hash, message, diff-style `+`
    bullet lines.
  - **Education** — a changelog: `## [year]` version headers.
  - **Projects** — a file-explorer grid (`slug.ext` / `slug/`), each project's
    own route showing a browser-chrome preview pane for live deployments.
  - **Contact** — `contact.sh`: each channel framed as a runnable command.
  - **Navbar** — an editor tab bar (`index.tsx`, `skills.json`, …) with a
    sliding active-tab underline.
  - **Footer** — a VS Code-style status bar (branch, encoding, socials).
- Semantic z-index scale: base → raised → nav → overlay.

## Components

- **Buttons**: primary = `--accent-solid` fill + `--accent-ink`, green-glow
  shadow + lift on hover; ghost = hairline border + `--ink`, border warms to
  green + lift on hover. Sharper radii (`--radius: 0.375rem`) than a typical
  pill-button SaaS site — reads as editor chrome, not marketing UI.
- **Cards** (`.card-surface` + `.card-interactive`): `--surface`, hairline
  border, lift + green border + glow on hover.
- **Terminal chrome** (`.term-window`, `.term-titlebar`, `.window-dots`,
  `.term-body`, `.line-row` + `.line-no`, `.prompt-glyph`): the shared
  primitives behind the Hero terminal and the Skills manifest.
- **Browser chrome** (`.browser-chrome`, `.address-bar`): frames each
  project's live iframe preview like a mock browser window.
- **Git-log rail** (`.commit-rail`, `.commit-node`, `.commit-hash`): the
  timeline used by Experience and Education.
- **Tags** (`.tag`): mono, hairline; naturally monospace since body type is.

## Motion

Framer Motion. Curves: ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)`
(tokenized as `--ease-out-expo`); no bounce, no elastic.

- **Hero**: one orchestrated, staggered entrance. The multilingual greeting
  (`locale --greet`) rotates as decorative terminal output (`aria-hidden`)
  over a static, accessible `<h1>`.
- **Navbar**: active tab indicator slides via `layoutId`.
- **Reveals**: `SectionReveal` enhances an already-visible default (never
  gates content; safe under headless / hidden-tab rendering).
- Every animated element has a `prefers-reduced-motion` path (global media
  query collapses all animation/transition durations to ~0).
