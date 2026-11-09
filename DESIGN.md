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
custom cursor). All of that is gone. The current first-load overlay (see
Motion) is a different thing: pure CSS, on brand, and over as soon as the
page has loaded.

## Color

Strategy: **Committed.** Ultramarine is the only hue; it carries the accent
text, the decoded waveform, and two full-bleed sections (mobile menu and
contact). Tokens are OKLCH in `app/globals.css`; hex equivalents and every
text pair are verified by `node scripts/contrast-check.mjs`.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--bg` | 0.972 0.005 265 | `#f4f6f9` | Page (true cool off-white, not cream) |
| `--surface` | 1 0 0 | `#ffffff` | Image mats behind screenshots |
| `--ink` | 0.2 0.03 268 | `#101524` | Primary text, rules, solid buttons |
| `--ink-soft` | 0.45 0.03 268 | `#4e5566` | Secondary text (6.9:1) |
| `--rule` | 0.87 0.012 268 | `#d1d4dc` | Hairlines |
| `--blue` | 0.48 0.22 266 | `#2349d7` | The accent (6.5:1 on bg) |
| `--blue-deep` | 0.36 0.17 266 | `#132d94` | Text on white buttons inside blue |
| `--blue-pale` | 0.91 0.045 266 | `#d3e1ff` | Secondary text on blue (5.3:1) |
| `--night` | 0.18 0.028 268 | `#0c111e` | Experience section |
| `--night-fg` / `--night-soft` / `--night-blue` | — | — | Text on night (17 / 9.4 / 8:1) |

Section art direction: intro on `--blue` → hero and work on `--bg` →
experience on `--night` (`.on-dark`) → skills and about on `--bg` → contact +
footer on `--blue` (`.on-blue`). The two
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

Section headings carry no eyebrow, and their wording matches the nav (Work →
"Selected work", Experience, Skills, About; Contact is "Say hello."). Lists of
discrete things get a small superscript count (`.count`): "Selected work⁴",
"Also built⁸", "Experience⁴". Skills groups are categories, not items, so no
count.

Measures: `.lede` caps at 40ch, section `.intro` paragraphs at 44ch.

## Layout

- **One page per section, with a short version on home.** Home (`/`) is the
  overview: the hero, then a preview of every section in nav order, each
  closed by a `MoreLink` ("See all 12 projects", "See what I did in each
  role", "See where each skill was used", "See education and background")
  to its full page. Each nav item opens that page — `/work`, `/experience`,
  `/skills`, `/about`, `/contact` — instead of scrolling. Previews live next
  to their full versions as `*Preview.tsx` and are deliberately a different
  shape, not the full page cut short:
  - **Work:** the four featured projects as a 2×2 gallery (shot, title, one
    line, the strongest proof point). `/work` has full rows and "Also built".
  - **Experience:** one line per role (period, role and company, summary).
    `/experience` adds the details, stack and company links.
  - **Skills:** the six groups in the ruled skill grid, each tool as an
    icon tile + name. `/skills` adds the "Used in" evidence.
  - **About:** portrait, one line, and two facts (studied, recognition).
    `/about` adds the bio and every program.
  - **Contact:** the same blue section on both. On its own page a section's
  title is the `<h1>` (`page` prop / `SectionHeader as="h1"`), its
  subheadings move up a level, and it starts just under the nav
  (`.section.page-top`). Navbar and footer live in the root layout; `main`
  carries `.page-enter` so each route settles in with a short fade.
- `.shell`: max 84rem, `--gutter` inline padding. `.section`: fluid
  `--section-pad` block padding.
- 12-column grids on `lg`, asymmetric splits (7/5, 4/7, 3/4/5).
- **Hero:** availability line → name (7 cols) beside the transcriber (5 cols)
  → ink rule → lede, CTAs and profile links (6 cols) beside three linked
  proof points (5 cols). On mobile the name comes first, then the
  transcriber.
- Every rule and list edge lines up with the `.shell` content edge — rules
  live inside the shell, never on the padded box, and list rows are not
  indented.
- **Section header** (`components/shared/SectionHeader.tsx`): title in 7
  columns, intro in 5, used by Work, Experience and Skills.
- **Work** (`/work`): four featured projects as full-width rows, screenshot
  and story side by side, alternating sides. Then "Also built", grouped by
  area, as a dense three-column index with a stretched title link. Case-study
  prev/next follows this order (`projectsInDisplayOrder`), not the raw array.
- **Experience:** period / role + company / details + stack rows on night.
- **Skills:** six groups in a ruled 3/2/1-column grid (`.skill-grid`, plain
  CSS so the dividers stay correct at every column count). Each tool is a
  row of icon tile + name, two to a line (`SkillList`), and each group ends
  with "Used in" links to its evidence.
- **About** (`/about`): portrait + bio, a `dl` (based in, recognition) in the
  same label/value pattern as the project rows, education as a dated list.
- **Contact:** blue. "Say hello.", email as the primary target, profiles
  list, CV downloads.
- **Footer:** blue band, rendered once by the root layout. On home it carries
  only "Back to top"; every other page adds "Email me" and "Home". A rule
  separates it from a blue contact section above (home, `/contact`). The body
  is a flex column so the footer sits at the bottom of short pages.
- **404** (`app/not-found.tsx`): "Nothing to decode here." with links home
  and to the work.
- Case studies (`/projects/[slug]`): same system. Title, description, and a
  part/stack/links `dl`, the cover, then Results / What I built / Next steps
  as ruled two-column sections, an optional live iframe, and prev/next.
- z-scale: content 0 · nav 50 · mobile menu 60 · loader 80 · skip link 90.

## Copy

Positive and plain. Projects say what was built and measured, and what comes
next ("Next steps"), never what is missing. Features are phrased as what the
software does ("keeps to the loan document", "the API key stays on the
server"), not as refusals. No buzzwords: no "passionate", "cutting-edge",
"seamless", "leverage", "robust".

## Components

- **Buttons** (`.btn` + `.btn-solid` / `.btn-line`, `.btn-sm`): pills with
  ink fill or ink outline, blue on hover. Inverted inside `.on-blue`.
- **Links** (`.link`): underline whose thickness and colour firm up on hover.
- **Arrows:** ↗ (`ArrowUpRight` + `.nudge`) only for links that leave the site
  — live sites, source, profiles, email. → (`ArrowRight` + `.nudge-x`) for
  everything that stays: case studies, section pages, home.
- **Skill icons** (`components/sections/skills/SkillIcon.tsx`): the tool's
  own mark from simple-icons, or a lucide line icon for methods without a
  logo (LoRA → layers, wav2vec2 + CTC → waveform, RAG → file search,
  embeddings → scatter, Playwright → masks). All in ink, in a 36px white
  tile with a hairline border (`.skill-icon`), so brand marks and line
  icons read as one set and the page keeps one accent colour.
- **More link** (`components/shared/MoreLink.tsx`): a strong rule in the
  text colour, then a `.btn-line` with →. It closes every home preview.
- **CV buttons** (`components/shared/CvLinks.tsx`): one component, so the
  labels and the "(PDF, opens in a new tab)" hint are identical in the hero,
  mobile menu and contact.
- **Status** (`.status[data-state]`): a dot before the project state, and the
  shape differs too (filled = Live, square = Published, hollow = Source
  available), so state never depends on colour alone.
- **Frames** (`ul.frames`): bullets drawn as short blue bars, like decoded
  frames.
- **Shot** (`.shot`): 1px-ink-bordered image frame with a slow zoom on hover.
- **Navbar:** sticky, solid `--bg`, hairline after scroll, blue underline and
  `aria-current="page"` on the current page (case studies count as Work).
  Below `md`, a full-screen blue menu (Escape closes it, and focus returns to
  the button).

## Motion

No animation libraries. CSS + one canvas.

- **Intro** (`components/layout/Loader.tsx`): plays once per tab session,
  in three beats on the blue ground.
  1. *Listening* (0–1 s): a 3D audio waterfall swoops in. Sixteen
     speech-like ridges stand on a floor in CSS 3D (`perspective`,
     `preserve-3d`, `rotate: x -90deg`); each is "recorded" at a white
     record head on the front edge, then recedes and fades. The camera
     (`.loader-camera`) dollies in from above, and the floor pans ±7°. A
     "Listening" label and a CSS-counted clock (`@property` integers) sit
     above it, the transcriber's header.
  2. *Decoding* (1–2 s): the waterfall dims and sinks into a backdrop, and
     the name is typed out, one step per letter, with the transcriber's
     caret, under a "Decoding" status line. Both sit where the hero's h1
     and status line sit; the script re-measures the h1 every 150 ms and
     nudges the decoded name onto it to the pixel.
  3. *Hand-off*: the panel clears from the top down (0.8 s), uncovering the
     real heading exactly where the decoded one was. The hero name skips
     its own rise this time (`html.intro-played` puts it at its end state);
     the rest of the hero fades in around it.
  - It runs before hydration: an inline script at the top of `<body>` sets
    `is-loading` + `intro-played` on `<html>`, then swaps to `is-leaving`
    at the later of the sequence and `load` + webfonts (capped at 6.5 s),
    and fires `site:ready`. State lives only on `<html>`, never on
    React-managed nodes, so hydration sees untouched markup.
  - Any click or key skips it. Reloads and in-site links in the same tab
    go straight to the page (sessionStorage). It never shows without
    JavaScript, in hidden tabs, or with reduced motion.
  - The page's own entrance (`.rise`, `.fade-in`, `.page-enter`) is paused
    while it plays, and the transcriber waits for `site:ready`.
  - The 16 ridges reuse 8 SVG shapes via `<use>`, about 2 KB gzipped.
  - The wipe's keyframes set both ends: from `clip-path: none` it would not
    interpolate and would cut at the halfway mark instead.
- **Transcriber** (`components/sections/hero/Transcriber.tsx`): canvas
  waveform built from the word (one burst per character, vowels louder, and
  fewer bars per character when a long greeting would not fit the canvas),
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
