# Design

Visual system for the Abdulaziz Yusupaliev portfolio. Register: **brand**.
Concept: **the transcript.** He trains speech-recognition models, so the
signature element is a waveform swept by a playhead that "decodes" a greeting
in English, Russian and Uzbek. Everything else is set like a clean technical
spec sheet: a cool off-white page, ink type, hairline rules, and one committed
ultramarine.

Scene sentence that set the theme: *a recruiter or engineering lead opens the
link from a LinkedIn message at their desk, in a bright office, with a minute
to spare and other candidates in the queue* → light theme, fast to scan.

This replaced the October 2026 "noir / star field" design (dark slate,
parallax stars, Space Grotesk + Instrument Serif, GSAP + Lenis, preloader,
custom cursor). All of that is gone.

## Color

Strategy: **Committed.** Ultramarine is the only hue; it carries the accent
text, the decoded waveform, and two full-bleed sections (mobile menu and
contact). Tokens are OKLCH in `app/globals.css`; hex equivalents and every
text pair are verified by `node scripts/contrast-check.mjs`.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--bg` | 0.972 0.005 265 | `#f4f6f9` | Page (true cool off-white, not cream) |
| `--surface` | 1 0 0 | `#ffffff` | Image mats, list-row hover |
| `--ink` | 0.2 0.03 268 | `#101524` | Primary text, rules, solid buttons |
| `--ink-soft` | 0.45 0.03 268 | `#4e5566` | Secondary text (6.9:1) |
| `--rule` | 0.87 0.012 268 | `#d1d4dc` | Hairlines |
| `--blue` | 0.48 0.22 266 | `#2349d7` | The accent (6.5:1 on bg) |
| `--blue-deep` | 0.36 0.17 266 | `#132d94` | Text on white buttons inside blue |
| `--blue-pale` | 0.91 0.045 266 | `#d3e1ff` | Secondary text on blue (5.3:1) |
| `--night` | 0.18 0.028 268 | `#0c111e` | Experience section |
| `--night-fg` / `--night-soft` / `--night-blue` | — | — | Text on night (17 / 9.4 / 8:1) |

Section art direction: hero, work, skills, about on `--bg` → experience on
`--night` (`.on-dark`) → contact + footer on `--blue` (`.on-blue`). The two
wrappers re-tint borders, focus rings, buttons and counts for their ground.

No gradients, glows, glass or shadows. Colour is solid text, solid fill, or a
hairline.

## Typography

- **Archivo** (variable, `wdth` 62–125, `wght` 100–900) carries everything.
  The width axis is the voice: display text is set at `wdth 125` / 800,
  reading text at normal width.
- **Onest** loads only its Cyrillic subset as a glyph fallback, since Archivo
  has no Cyrillic and the hero greets in Russian.

Scale (all `clamp()`): `.name` (hero, ≤6rem, sized for its 7-column cell) ·
`.display-xl` (≤6rem) · `.display-l` (≤4.25rem) · `.display-m` (≤2.25rem) ·
`.lede` (≤1.45rem) · body 17px · `.meta` 13px tabular. Display tracking
-0.02 to -0.035em.

Section headings carry no eyebrow. Where a section is a countable list, a small
superscript count follows the heading (`.count`: "Selected work⁴").

## Layout

- `.shell`: max 84rem, `--gutter` inline padding. `.section`: fluid
  `--section-pad` block padding.
- 12-column grids on `lg`, asymmetric splits (7/5, 4/7, 3/4/5).
- **Hero:** availability line → name (7 cols) beside the transcriber (5 cols)
  → ink rule → lede + CTAs (6 cols) and three linked proof points (5 cols).
  On mobile the transcriber comes first, then the name.
- **Work:** four featured projects as full-width rows, screenshot and story
  side by side, alternating sides. Then "Also built", grouped by area, as a
  dense three-column index with a stretched title link.
- **Experience:** period / role + company / details + stack rows on night.
- **Toolkit:** six groups in a ruled 3/2/1-column grid, each ending with
  "Used in" links to its evidence.
- **About:** portrait + bio, recognition pill, education as a dated list.
- **Contact:** blue. Big heading, email as the primary target, profiles list,
  CV downloads.
- Case studies (`/projects/[slug]`): same system. Title, description, and a
  part/stack/links `dl`, the cover, then Results / What I built / Not done yet
  as ruled two-column sections, an optional live iframe, and prev/next.
- z-scale: content 0 · nav 50 · mobile menu 60 · skip link 90.

## Components

- **Buttons** (`.btn` + `.btn-solid` / `.btn-line`, `.btn-sm`): pills with
  ink fill or ink outline, blue on hover. Inverted inside `.on-blue`.
- **Links** (`.link`): underline whose thickness and colour firm up on hover.
  `.nudge` arrows shift up-right on hover.
- **Status** (`.status[data-state]`): a dot before the project state, and the
  shape differs too (filled = Live, square = Published, hollow = Source
  available), so state never depends on colour alone.
- **Frames** (`ul.frames`): bullets drawn as short blue bars, like decoded
  frames.
- **Shot** (`.shot`): 1px-ink-bordered image frame with a slow zoom on hover.
- **Navbar:** sticky, solid `--bg`, hairline after scroll, blue underline on
  the section in view. Below `md`, a full-screen blue menu (Escape closes it,
  and focus returns to the button).

## Motion

No animation libraries. CSS + one canvas.

- **Transcriber** (`components/sections/hero/Transcriber.tsx`): canvas
  waveform built from the word (one burst per character, vowels louder),
  swept by a playhead; characters appear as their bars are passed, with a fake
  timestamp. rAF runs only during a sweep. It pauses when off-screen or the
  tab is hidden. Reduced motion: static, fully decoded "Hello". It is
  `aria-hidden` because it is decoration.
- **Hero load:** the name rises out of a mask (`.rise`), the rest fades up
  (`.fade-in`) with staggered `--d` delays. The end state is the default.
- **Screenshot wipe:** `[data-wipe]` reveals with a `clip-path` wipe on scroll
  (`RevealObserver`). It is only armed after hydration (`html.can-reveal`),
  is skipped in hidden tabs, and anything already on screen shows at once.
- `prefers-reduced-motion` collapses every animation and transition globally.
