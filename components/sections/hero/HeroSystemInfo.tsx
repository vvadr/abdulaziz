import Image from "next/image";
import { portfolioProjects } from "@/data/projects";
import type { PortfolioSkill } from "@/data/skills";
import { experienceItems, heroLocation } from "@/data/site";
import { SkillGlyph } from "../../shared/SkillGlyph";

const liveProjectCount = portfolioProjects.filter((project) => project.liveUrl).length;
const publicRepositoryCount = portfolioProjects.filter((project) => project.repoUrl).length;
const currentRole = experienceItems[0];

// Every row is derived from real data elsewhere on the page — nothing invented.
// Values stay short enough to hold one line at the panel's narrowest width;
// the full role line already reads large in the left-hand terminal.
const rows: { label: string; value: string }[] = [
  { label: "role", value: "Frontend · AI/ML" },
  { label: "current", value: `@ ${currentRole.type}` },
  {
    label: "projects",
    value: `${publicRepositoryCount} repos · ${liveProjectCount} live`,
  },
  { label: "location", value: heroLocation },
  { label: "uptime", value: "coding since 2022" },
];

// Twelve real, already-listed skills (see data/skills.ts) laid out 4×3.
const coreStack: PortfolioSkill[] = [
  { name: "React" },
  { name: "Next.js", shortName: "Next" },
  { name: "TypeScript", shortName: "TS" },
  { name: "JavaScript", shortName: "JS" },
  { name: "Tailwind CSS", shortName: "Tailwind" },
  { name: "HTML5", shortName: "HTML" },
  { name: "Git", shortName: "Git" },
  { name: "GitHub", shortName: "GitHub" },
  { name: "Python" },
  { name: "Pandas" },
  { name: "NumPy" },
  { name: "Scikit-learn", shortName: "Scikit" },
];

// The site's own tokens, rendered the way real neofetch prints a terminal's
// active ANSI colors.
const paletteSwatches = [
  "var(--dot-red)",
  "var(--dot-amber)",
  "var(--accent)",
  "var(--accent-strong)",
  "var(--border)",
  "var(--ink-faint)",
  "var(--ink-muted)",
  "var(--ink)",
];

export function HeroSystemInfo() {
  return (
    <div className="term-window flex h-full flex-col" aria-hidden="true">
      <div className="term-titlebar">
        <span className="window-dots">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </span>
        <span className="term-titlebar-label">neofetch</span>
      </div>

      <div className="term-body flex flex-1 flex-col gap-5 text-sm">
        {/* Stacked on narrow screens so the info rows get the panel's full
            width instead of being squeezed beside the portrait. */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-5">
          <span className="relative size-20 shrink-0 overflow-hidden rounded-md border border-[color-mix(in_oklab,var(--accent)_35%,var(--border))] sm:size-24">
            <Image
              src="/images/abdulaziz-profile.jpg"
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </span>

          <div className="w-full min-w-0 flex-1">
            <p className="font-semibold text-foreground">abdulaziz@portfolio</p>
            <div className="beam-rule my-3 max-w-[10rem] origin-left" />
            {/* grid-cols-1 (minmax(0,1fr)) — an implicit `auto` track would size
                to max-content and push the panel wider than the viewport. */}
            <dl className="grid grid-cols-1 gap-1.5">
              {rows.map((row) => (
                <div key={row.label} className="flex items-baseline gap-3 leading-6">
                  <dt className="w-[5.2rem] shrink-0 text-accent-strong">{row.label}</dt>
                  <dd className="min-w-0 text-muted">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* flex-1 + auto-rows-fr: this grid absorbs whatever vertical slack the
            taller left-hand terminal leaves, so the panel never dead-spaces. */}
        <div className="flex flex-1 flex-col">
          <div className="beam-rule origin-left" />
          <p className="mt-4 font-mono text-xs text-faint">
            <span className="prompt-glyph">$</span> ls ./stack/
          </p>
          <div className="mt-3 grid flex-1 auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4">
            {coreStack.map((skill) => (
              <span
                key={skill.name}
                title={skill.name}
                className="flex min-h-[4.25rem] flex-col items-center justify-center gap-2 rounded-md border border-border-soft bg-white/[0.02] p-2 transition duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]"
              >
                <SkillGlyph skill={skill} className="h-6 w-6" />
                <span className="font-mono text-[0.65rem] leading-none text-muted">
                  {skill.shortName ?? skill.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            {paletteSwatches.map((color) => (
              <span key={color} className="size-2.5 rounded-sm" style={{ background: color }} />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-2 leading-6 text-muted">
            <span className="pulse-dot shrink-0" />
            Open to internships &amp; freelance
          </p>
        </div>
      </div>
    </div>
  );
}
