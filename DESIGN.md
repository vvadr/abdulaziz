# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**.
Mood: **cinematic noir/gold** — a near-black space scene with a scroll-driven
particle cloud behind glass surfaces, gold + blue accents, bold Space Grotesk
display type, and Instrument Serif italics for accent words. Adapted from the
reference portfolio the user chose (Habibulloh Karimov's), reimplemented for
Next.js with the fixes listed at the bottom.

## Color

Tokens are hex, defined in `app/globals.css`. Every pair below is verified by
`node scripts/contrast-check.mjs` (WCAG relative luminance).

| Token | Hex | Role | Verified |
|---|---|---|---|
| `--background` | `#010108` | Page + scene background | — |
| `--foreground` | `#f8f9fc` | Primary text | 19.8:1 on bg |
| `--muted` | `#b8c0d8` | Secondary/body text | 11.5:1 on bg |
| `--accent` | `#fbbf24` | Gold — labels, highlights, primary accent | 12.5:1 on bg |
| `--accent-2` | `#60a5fa` | Blue — secondary accent, group titles | 8.2:1 on bg |
| `--accent-3` | `#fcd34d` | Light gold — gradient stops | 14.4:1 on bg |
| `--glass` | `rgba(4,4,14,0.88)` | Card/nav surface (+ 6–8px backdrop blur) | text ≥11:1 |
| `--glass-border` | `rgba(255,255,255,0.1)` | Hairline borders | — |
| `--grid-line` | `rgba(59,130,246,0.06)` | Hero grid pattern | — |

Rules: gold is the lead accent (kickers, active nav, tags, cursor); blue is
support (bento group titles, secondary hovers). The two blend only in
*decorative* gradients — buttons, the progress beam, orbit rings — never in
text: interpolating gold→blue passes through a grey midpoint that reads
washed out (visible on the reference site's headings). `.gradient-text`
therefore stays in the gold family (every stop ≥12.5:1) and is reserved for
one or two serif words per section, never body copy. Button text is
`--background` on the gold→blue fill (≥8.2:1).

## Typography

- **Space Grotesk** (`--font-display`) — headings, buttons, nav, numbers.
- **Inter** (`--font-body` → `font-sans`) — body copy. Loaded with the
  Cyrillic subset for the rotating "Привет" greeting.
- **Instrument Serif italic** (`--font-serif`) — accent words inside headings
  (`.serif-accent`, `.hero-serif`) and the gold surname. Latin-only; Georgia
  is the fallback and covers Cyrillic.

All three load via `next/font/google` in `app/layout.tsx` (variables
`--font-space-grotesk` / `--font-inter` / `--font-instrument-serif`).
Hero title: `clamp(3.4rem, min(13vw, 18vh), 10.5rem)`, line-height 0.92,
tracking -0.04em — the `18vh` term keeps a wide-but-short window from growing
the name taller than the viewport (which pushed the hero up under the fixed
navbar). Section titles: `clamp(2.2rem, 4.8vw, 4rem)`. Text over the scene
always carries `.text-shadow` (or sits on glass).

The hero reserves `clamp(5rem, 10vh, 7.5rem)` of vertical padding so its
centred content always clears the 4rem navbar, and the scroll cue
(`.scroll-cue`) only renders when the viewport is at least 820px tall.

## The backdrop

`components/layout/scene/` — a fixed, full-viewport react-three-fiber canvas
behind everything (`--z-scene`), lazy-loaded client-only:

- **MorphingCloud** — ~4,800 particles lerping between six shapes as the page
  scrolls (sphere → torus → helix → lattice → galaxy → torus knot), color
  lerping through gold/blue. Spin speed reacts to scroll velocity. The cloud
  dims ~40% through the galaxy stage so Skills copy stays readable.
- **OrbitRings** — two thin additive tori (gold r9 / blue r11), slow rotation.
- **CameraRig** — dolly 16→6 with sinusoidal sway + pointer parallax, FOV
  narrows 48→42.
- Stars + gold Sparkles + Bloom + Vignette on capable devices.
- **Low-power tier** (mobile / coarse pointer / reduced motion — evaluated at
  mount, not module load): 2,200 particles, dpr 1, no post-processing,
  fewer stars.

Between scene and content: `.content-scrim` (fixed radial veil, 0.58→0.84
black) plus per-element glass and text shadows. Above content: `.noise-overlay`
(static SVG grain, 5%) and the letterbox gradients (below the nav).

## Layout

- `.shell` caps content at 72rem with clamp() inline padding; sections use
  `py-32` with `px-5 sm:px-10 lg:px-20` (full-bleed elements like the
  Experience track and marquee escape the shell).
- Section header pattern: `SectionHeading` — gold uppercase kicker
  `0N — Label` with gradient hairlines + display title with one serif-italic
  gradient word.
- Section order: hero → about (includes education cards + stats) →
  experience (horizontal timeline) → projects → skills → contact.
- z-scale (tokens in globals.css): scene 0 · content 10 · letterbox 30 ·
  nav 50 · mobile menu 55 · progress beam 60 · noise 65 · cursor 70 ·
  preloader 80 · skip link 90.

## Components

- **Glass** (`.glass`, `.glass-strong`): the universal surface. Blur kept at
  6–8px — backdrop-filter re-renders every frame over the animated canvas.
- **Buttons**: `.btn-primary` (gold→blue gradient pill, background-colored
  text, glow + lift on hover), `.btn-ghost` (glass pill), `.btn-sm`/`.btn-lg`.
- **Tags** (`.tag`): gold-tinted hairline pills for tech stacks.
- **Project cards**: `TiltCard` (pointer 3D tilt) + `.border-spin` conic
  hover glow + `.preview-shimmer` sweep; cover is a real screenshot
  (`project.cover`) or a category-colored gradient/glyph fallback.
- **Magnetic**: gsap quickTo pull toward the pointer (buttons, social cards).
- **Marquee**: duplicated-content CSS loop, ±1° rotation, second row
  outline-stroked; pauses on hover.
- **Custom cursor**: dot + trailing ring, `mix-blend-difference`, swells over
  interactive elements. Fine pointers only; native cursor otherwise.
- **Navbar** (deliberately different from the reference's floating pill):
  full-width bar, transparent → frosted after 24px scroll, animated gold
  underline (`layoutId`) tracking the active section via IntersectionObserver,
  magnetic "Hire me", hamburger → full-screen staggered overlay on mobile.

## Motion

GSAP + ScrollTrigger, driven by Lenis smooth scroll (`ScrollFX`, duration
1.3). Framer Motion for enter/exit UI (preloader, mobile menu, greeting,
nav underline).

- **Preloader**: name reveal + 0→100 counter (~1.1s), clip-path exit; plays
  once per session, skipped for reduced motion; page scroll unlocks via the
  `app:ready` event (`lib/scroll-state.ts`).
- **Hero**: character-staggered name intro gated on `app:ready`; rotating
  multilingual greeting with blinking caret (sr-only static mirror);
  scroll-out scale/fade; pointer-parallax `data-depth` layers.
- **Reveals**: shared `[data-reveal]` fade/slide/rotateX (ScrollFX re-scans
  per route).
- **Experience**: native scroll-snap horizontal track by default; wide
  fine-pointer screens with motion enabled upgrade to the pinned scroll-scrub
  travel.
- **Scroll state** lives in a mutable module (`lib/scroll-state.ts`) read
  inside rAF — no per-frame React renders.
- Global `prefers-reduced-motion` collapse remains in globals.css; JS motion
  checks `prefersReducedMotion()` per effect.

## Deliberate fixes vs. the reference site

1. Real mobile navigation (reference hid all links below `md`).
2. Experience reachable under reduced motion / touch / no-JS (reference
   clipped cards 2..n when the pin was skipped).
3. Preloader is short, once-per-session, and skipped for reduced motion
   (reference blocked ~3.4s every visit).
4. Scene dims during its brightest morph stage + stronger scrim (reference's
   Skills text drowned in the galaxy).
5. Gradient text constrained to high-luminance stops (reference washed out
   mid-animation).
6. Letterbox stacked below the nav, not above it.
7. English-only a11y strings, valid ARIA on split-character text.
8. Quality tier evaluated at mount, not module load.
