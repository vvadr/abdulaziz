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

A personal portfolio for **Abdulaziz Yusupaliev** — an Applied AI/ML
Engineer & Full-Stack Developer from Tashkent. It exists to convert a quick
visit into a credible impression and a contact action (email / GitHub /
LinkedIn / Hugging Face / Telegram). Success = the visitor leaves
understanding his real stack, his strongest shipped work (a published
Karakalpak speech-recognition model, the Dwelve and Volontyorlar platforms he
built end to end, a multi-agent RAG backend), his roles at Uzinfocom AI Labs
(zehnmind.ai), Hiwelcome, and IT Park, and how to reach him — and remembers
the site.

## Brand Personality

Precise, signal-minded, quietly confident. The site reads like a clean
technical spec sheet with one live instrument on it: a waveform that decodes
"hello" in three languages, a nod to the speech-recognition work. Cool
off-white page, ink type in wide Archivo, one committed ultramarine. Three
words: **measured, legible, credible.**

## Anti-references

- Generic dark SaaS portfolios: near-black + one timid accent + a fade-up on
  every section. This site commits to a light page with one saturated colour
  and section-level art direction instead.
- Spectacle without function: the one animated piece (the transcriber) is
  about his actual field, and pauses off-screen; nothing else moves for
  its own sake.
- Overstated junior framing: fake metrics, "10x", hero-metric stat blocks,
  claims of work not actually done.

## Design Principles

1. **Tell the truth, confidently.** Lead with what's real and measured:
   published WER scores, live platforms, named roles. Every project states
   the author's actual role (including where code was AI-generated) and its
   next steps, framed positively and without buzzwords. No invented numbers.
2. **One accent, no glow.** Ultramarine carries every accent. Colour appears as solid fill, solid text, or a hairline border —
   never as a gradient in text or a coloured halo.
3. **Contrast is non-negotiable.** Every text/background pair is verified
   readable (`scripts/contrast-check.mjs`). Low-opacity gray "for elegance"
   is banned.
4. **Effects must earn their performance budget.** The backdrop is static;
   motion is reserved for navigation, reveals, and interactions that help the
   visitor understand the page.
5. **Show the work, then get out of the way.** The fastest path from landing
   to "contact him" wins over decoration.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1, large/bold text ≥3:1, against
actual backgrounds. Full keyboard operability (nav, mobile menu, project
live-preview controls) with visible focus rings. Every decorative animation
(typed/rotating greeting, scroll reveals, tab-indicator slide) has a
`prefers-reduced-motion` path. Semantic landmarks and one true `<h1>` per
page. Color is never the only signal for state — project status pairs a label
with a dot shape (filled / square / hollow).
