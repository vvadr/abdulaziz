# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**. Mood: a calm twilight control panel lit by a single soft teal indicator — open, relaxing, still cinematic. The Vader helmet stays as the mark, but recolored: its visor now glows teal (the light-side blade to the old Sith red). Color strategy: **Committed restraint** (one soft teal carries the identity; everything else is deep blue-slate).

## Color

All tokens OKLCH. Background is a deep blue-slate, lifted off pure black so the page breathes; a faint cool-blue tint (chroma toward the accent hue, not warm-by-default). Teal is the only saturated color. Every pair below verified in-browser (canvas-sampled sRGB, WCAG formula).

| Token | OKLCH | Role | Verified |
|---|---|---|---|
| `--bg` | `oklch(0.211 0.022 248)` | Page background, deep twilight slate | — |
| `--surface` | `oklch(0.252 0.024 248)` | Cards, panels | — |
| `--surface-2` | `oklch(0.295 0.026 247)` | Raised / hover surface | — |
| `--border` | `oklch(0.40 0.028 246)` | Borders | — |
| `--border-soft` | `oklch(0.33 0.024 247)` | Hairline borders | — |
| `--ink` | `oklch(0.972 0.005 230)` | Primary text | 16.3:1 on bg |
| `--ink-muted` | `oklch(0.805 0.018 226)` | Body / secondary text | 9.7:1 on bg · 8.7:1 on surface |
| `--ink-faint` | `oklch(0.672 0.022 232)` | Tertiary / labels | 6.0:1 on bg · 5.4:1 on surface |
| `--accent` | `oklch(0.82 0.114 193)` | Soft teal — icons, glows | 10.6:1 on bg |
| `--accent-strong` | `oklch(0.882 0.12 191)` | Links, highlights, hover | 13.0:1 on bg · 11.6:1 on surface |
| `--accent-soft` | `oklch(0.72 0.092 200)` | Deeper teal for gradient depth | — |
| `--accent-solid` | `oklch(0.805 0.115 193)` | Button fill | (ink below) |
| `--accent-ink` | `oklch(0.20 0.03 244)` | Dark slate text on the teal fill | 10.4:1 on accent-solid |
| `--twilight` | `oklch(0.62 0.10 256)` | Cool companion for gradient depth only (not a 2nd accent) | — |

Rules: never use `--ink-faint` for paragraph copy (labels/tags only). Teal is never the sole state signal (pair with text/icon/weight). Glows use `color-mix(in oklab, var(--accent) …%, transparent)` — a single source of truth, no new hues. A faint fixed twilight wash (`body::before`, teal + `--twilight` radial gradients at the top) gives the "open sky" lift.

## Typography

Identity-preserved pairing on a real contrast axis (characterful display + neutral text + mono labels). None on the reflex-reject list.

- **Display** — `Bricolage Grotesque Variable` (`--font-display`). Hero name, section titles. Weights 600–800, letter-spacing -0.02 to -0.04em. `text-wrap: balance` on h1–h3.
- **Body / UI** — `Geist Variable` (`--font-sans`). Paragraphs, nav, buttons. Line-height 1.65 on dark.
- **Mono** — `Geist Mono Variable` (`--font-mono`). Periods, tech tags, counts, scroll cue. The technical accent — legitimate because the brand *is* a developer.

Fluid scale via `clamp()`, ratio ≥1.25. Hero display max ≤ 5.5rem. Body line length capped 65–68ch.

## Layout

- `.shell` caps content at 72rem (sections that read better narrower add `max-w-5xl`); fluid inline padding via `clamp()`.
- `.section` gives fluid vertical rhythm (`clamp(4.5rem, 3rem + 7vw, 8.5rem)`) — varied, not padded identically.
- One consistent section header: `.section-title` (display) + `.section-lead`. **No repeated eyebrow** above every section (deliberately avoided the AI-grammar trope).
- Skills: a "spec-board" of horizontal bands (category label + flowing icon chips, separated by hairline rules) — not an identical icon grid.
- Experience / Education: a single connected timeline (gradient rail + glowing teal nodes).
- Projects: the flagship is a full-width featured card with a highlights teaser; the rest in a 2-col grid. Click opens a focus-trapped drawer.
- Semantic z-index scale: base → raised → nav → overlay → intro.

## Components

- **Buttons**: primary = `--accent-solid` fill + `--accent-ink`, teal-glow shadow + lift on hover; ghost = hairline border + `--ink`, border warms to teal + lift on hover.
- **Cards** (`.card-surface` + `.card-interactive`): `--surface`, soft hairline, lift + teal border + teal glow on hover. No nested cards. No side-stripe borders.
- **Tags** (`.tag`): mono, hairline; `.tag-accent` for teal-tinted status chips.
- **Skill chips**: hairline pill, brand-colored icon (lifts black→white), label; hover lift + teal border. Distinct from the monochrome hero sphere.
- **Project drawer / mobile menu**: fixed overlays with themed (`color-mix` bg) backdrop, focus-managed, Escape to close, reduced-motion safe.

## Motion

Framer Motion + a one-time intro. Curves: ease-out-expo `cubic-bezier(0.16, 1, 0.3, 1)` (tokenized as `--ease-out-expo`); no bounce, no elastic. Durations tokenized (`--dur-fast/dur/dur-slow`).

- **Intro**: once per session (sessionStorage). Teal helmet + halo, gentle greeting crossfade (blur in/out), teal beam fills, eased lift-away. Reduced-motion → short fade.
- **Hero**: one orchestrated, staggered entrance (expo). Rotating multilingual greeting is decorative (`aria-hidden`) over a static, accessible `<h1>`. Calm twilight backdrop = faint dot grid (edge-masked) + slow mirror-drifting aurora glows. A 3D skill sphere rotates via rAF (initial transform rounded → no hydration mismatch).
- **Reveals**: `SectionReveal` enhances an already-visible default (never gates content; safe under headless / hidden-tab). Per-section stagger.
- **Caveat**: the perpetual rAF / Framer loops mean automated full-page screenshots can't reach "idle" in this environment; verify visuals under `prefers-reduced-motion` (which makes the page static) or by computed-style inspection.
