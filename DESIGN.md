# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**. Mood: a matte-black control panel with a single saber-red indicator — cinematic dark-side, technical, exact. Color strategy: **Committed** (one saturated red carries the identity; everything else is deep neutral restraint).

## Color

All tokens OKLCH. Background is near-black with a faint red tint (chroma toward the brand hue, not warm-by-default). The red is the only saturated color on the page.

| Token | OKLCH | Role |
|---|---|---|
| `--bg` | `oklch(0.165 0.006 25)` | Page background, near-black |
| `--surface` | `oklch(0.205 0.008 25)` | Cards, panels |
| `--surface-2` | `oklch(0.245 0.010 25)` | Raised / hover surface |
| `--border` | `oklch(0.34 0.012 25)` | Hairline borders |
| `--ink` | `oklch(0.97 0.004 60)` | Primary text (≈18:1 on bg) |
| `--ink-muted` | `oklch(0.78 0.010 40)` | Secondary text (≥5.6:1 on bg — AA body) |
| `--ink-faint` | `oklch(0.66 0.012 35)` | Tertiary/labels (≥3.4:1 — large/label only) |
| `--accent` | `oklch(0.60 0.214 26)` | Saber red — identity, links, focus glow |
| `--accent-strong` | `oklch(0.66 0.21 27)` | Hover / brighter blade |
| `--accent-solid` | `oklch(0.53 0.20 26)` | Button fill (white text ≥4.5:1) |
| `--accent-ink` | `oklch(0.99 0 0)` | Text on accent-solid |

Rules: never use `--ink-faint` for paragraph copy. Red is never the sole state signal (pair with text/icon/weight). Accent glows use `color-mix`/rgba of `--accent`, not new hues.

## Typography

Pairing on a real contrast axis (characterful display + neutral text + mono labels). None are on the reflex-reject list.

- **Display** — `Bricolage Grotesque Variable` (`--font-display`). Hero name, section titles. Weights 600–800, letter-spacing -0.02 to -0.035em (floor -0.04em). `text-wrap: balance` on h1–h3.
- **Body / UI** — `Geist Variable` (`--font-sans`). Paragraphs, nav, buttons. Neutral so the display and the red carry the voice. Line-height +0.05–0.1 on dark.
- **Mono** — `Geist Mono Variable` (`--font-mono`). Kicker labels, tech tags, section indices, code card. The technical accent — legitimate here because the brand *is* a developer (not mono-as-costume).

Fluid scale via `clamp()`, ratio ≥1.25. Hero display max ≤ 6rem. Body line length capped 65–75ch.

## Layout

- Max content width ~1100–1200px, generous fluid section padding via `clamp()`; vary rhythm (don't pad every section identically).
- Grid for 2D (skills, projects, contact), flex-wrap for 1D (tags, social row). Responsive grids use `repeat(auto-fit, minmax(...))` where breakpoint-free works.
- One consistent section-header treatment across all sections (display title + optional mono kicker), replacing the current mix of giant Skills title vs tiny `.section-kicker`.
- Semantic z-index scale (see globals): base → raised → sticky-nav → overlay-backdrop → overlay-panel → intro.

## Components

- **Buttons**: primary = `--accent-solid` fill + `--accent-ink`, saber-glow shadow on hover; secondary = hairline border + `--ink`, border warms to accent on hover. Radius from `--radius`.
- **Cards** (projects, contact, skill tiles): `--surface`, hairline border, lift + accent-border + soft red glow on hover. No nested cards. No side-stripe borders.
- **Tech tags**: mono, hairline border, subtle accent tint.
- **Project drawer / mobile menu**: portal-free fixed overlays with backdrop, focus-trapped, Escape to close, reduced-motion safe.

## Motion

Library: Framer Motion (present) + a one-time GSAP-free intro. Curves: ease-out (expo/quart), no bounce.
- **Intro**: once per session (sessionStorage), multilingual greeting cascade, slides away. Reduced-motion → instant short fade.
- **Hero**: one orchestrated load (saber sweep + staggered text). The typed greeting is decorative (`aria-hidden`) over a static, accessible `<h1>`.
- **Reveals**: section content is visible by default; reveals enhance, never gate. Vary per section (not one uniform fade). All gated behind `prefers-reduced-motion`.
- **Saber-red glow** is a motion material (box-shadow/filter), used sparingly on focus and primary CTA.
