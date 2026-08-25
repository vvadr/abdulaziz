# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**.
Mood: **quiet night sky** — a near-black cool-slate page with a parallax star
field that follows the pointer and the scroll, one sky-blue accent, bold Space
Grotesk display type, and Instrument Serif italics for accent words. Started
from the reference portfolio the user chose (Habibulloh Karimov's), then moved
away from it: no WebGL, and deliberately no glow (see the notes at the bottom).

## Color

Tokens are hex, defined in `app/globals.css`. Every pair below is verified by
`node scripts/contrast-check.mjs` (WCAG relative luminance).

| Token | Hex | Role | Verified |
|---|---|---|---|
| `--background` | `#070a0f` | Page + backdrop background | — |
| `--foreground` | `#f2f5f9` | Primary text | 18.1:1 on bg |
| `--muted` | `#98a6ba` | Secondary/body text | 8.0:1 on bg |
| `--accent` | `#7dd3fc` | Sky — the single lead accent | 11.9:1 on bg |
| `--accent-2` | `#a5b4fc` | Indigo — quiet support | 9.9:1 on bg |
| `--accent-3` | `#e2e8f0` | Slate — neutral highlight, button hover | 16.1:1 on bg |
| `--glass` | `rgba(13,17,25,0.90)` | Card/nav surface (no backdrop blur) | text ≥7.7:1 |
| `--glass-border` | `rgba(255,255,255,0.09)` | Hairline borders | — |
| `--grid-line` | `rgba(148,163,184,0.05)` | Project-cover grid pattern | — |

Rules: sky is the lead accent and carries almost everything — kickers, active
nav, the surname, tags, buttons, the progress beam. Indigo is support only
(bento group titles, the second orbit ring). **No glowing treatments**: no
text gradients, no coloured drop shadows, no blurred colour orbs, no rotating
conic borders. Accent colour appears as solid fill, solid text, or a hairline
border — nothing that bleeds light. Button text is `--background` on a solid
`--accent` fill (11.9:1), and hover swaps the fill to `--accent-3`.

## Typography

- **Space Grotesk** (`--font-display`) — headings, buttons, nav, numbers.
- **Inter** (`--font-body` → `font-sans`) — body copy. Loaded with the
  Cyrillic subset for the rotating "Привет" greeting.
- **Instrument Serif italic** (`--font-serif`) — accent words inside headings
  (`.serif-accent`, `.hero-serif`) and the sky-blue surname. Latin-only;
  Georgia is the fallback and covers Cyrillic.

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

`components/layout/scene/SceneBackdrop.tsx` — a fixed, full-viewport parallax
composition behind everything (`--z-scene`):

- Three star fields (repeating radial-gradient tiles) and two flattened CSS
  orbit rings, each on its own layer.
- Every layer follows the pointer and counter-scrolls at its own rate, so the
  field reads as depth: the far stars drift ~6px, the near stars ~28px.
- Layers are painted once and then only translated — the motion stays on the
  compositor, with no repaint, no canvas, and no WebGL.
- The rAF loop starts on pointer/scroll input and **stops once the layers
  settle**, so an idle page costs nothing. Measured on the production build:
  ~3% of one core idle, ~2% while scrolling continuously.
- `prefers-reduced-motion` skips the listeners entirely and the layers stay
  put; coarse pointers get scroll parallax only.

An earlier version of this site rendered a three.js scene here (~4,800
particles morphing through six shapes, with bloom). It looked good and cost
far too much: the morph rewrote a 14,400-float vertex buffer and re-uploaded it
to the GPU every frame. The reference portfolio still does this — its deployed
bundle ships a 1.1 MB three.js chunk with `EffectComposer`, `BloomEffect` and
`VignetteEffect` — so there was no cheaper trick there to copy.

Between backdrop and content: `.content-scrim` (fixed radial veil, 0.45→0.78)
plus per-element glass and text shadows. Above content: `.noise-overlay`
(static SVG grain, 4%) and the letterbox gradients (below the nav).

## Layout

- `.shell` caps content at 72rem with clamp() inline padding; sections use
  `py-32` with `px-5 sm:px-10 lg:px-20` (full-bleed elements like the
  Experience track and marquee escape the shell).
- Section header pattern: `SectionHeading` — sky uppercase kicker
  `0N — Label` with gradient hairlines + display title with one serif-italic
  gradient word.
- Section order: hero → about (includes education cards + stats) → skills →
  experience (horizontal timeline) → projects → contact.
- z-scale (tokens in globals.css): scene 0 · content 10 · letterbox 30 ·
  nav 50 · mobile menu 55 · progress beam 60 · noise 65 · cursor 70 ·
  preloader 80 · skip link 90.

## Components

- **Glass** (`.glass`, `.glass-strong`): the universal surface. Their dark,
  nearly opaque fills create depth without live `backdrop-filter` processing.
- **Buttons**: `.btn-primary` (gold→blue gradient pill, background-colored
  text, glow + lift on hover), `.btn-ghost` (glass pill), `.btn-sm`/`.btn-lg`.
- **Tags** (`.tag`): sky-tinted hairline pills for tech stacks.
- **Project cards**: `TiltCard` (pointer 3D tilt) + a border that warms to
  the accent on hover + `.preview-shimmer` sweep; cover is a real screenshot
  (`project.cover`) or a category-colored gradient/glyph fallback.
- **Magnetic**: gsap quickTo pull toward the pointer (buttons, social cards).
- **Marquee**: duplicated-content CSS loop, ±1° rotation, second row
  outline-stroked; pauses on hover.
- **Custom cursor**: dot + trailing ring, `mix-blend-difference`, swells over
  interactive elements. Fine pointers only; native cursor otherwise.
- **Navbar** (deliberately different from the reference's floating pill):
  full-width bar, transparent → opaque after 24px scroll, animated sky
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
4. Static GPU-light atmosphere + stronger scrim keeps Skills text readable
   without a permanent WebGL render loop.
5. Gradient text constrained to high-luminance stops (reference washed out
   mid-animation).
6. Letterbox stacked below the nav, not above it.
7. English-only a11y strings, valid ARIA on split-character text.
8. No quality tier is needed because the backdrop has no active renderer.
