"use client";

import type { SimpleIcon } from "simple-icons";
import { type PortfolioSkill, skillGroups, skillIcons } from "@/data/skills";
import { SectionReveal } from "../../shared/SectionReveal";

function findSkillIcon(name: string) {
  return skillIcons.find((skill) => skill.name === name)?.icon;
}

function getIconColor(icon: SimpleIcon) {
  // Pure-black brand marks would vanish on the dark bg — lift them to white.
  return icon.hex.toLowerCase() === "000000" ? "#ffffff" : `#${icon.hex}`;
}

function SkillChip({ skill }: { skill: PortfolioSkill }) {
  const icon = findSkillIcon(skill.name);
  const label = skill.shortName ?? skill.name;

  let glyph;
  if (skill.assetSrc) {
    glyph = (
      // eslint-disable-next-line @next/next/no-img-element -- tiny local brand SVG; next/image adds an aspect-ratio warning here
      <img
        src={skill.assetSrc}
        alt=""
        className="h-5 w-auto max-w-[1.75rem] object-contain"
      />
    );
  } else if (icon) {
    glyph = (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        style={{ color: getIconColor(icon) }}
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    );
  } else {
    glyph = (
      <span
        className="font-mono text-xs font-bold"
        style={{ color: skill.fallbackColor ?? "#ffffff" }}
      >
        {skill.fallbackLabel ?? skill.name.slice(0, 2)}
      </span>
    );
  }

  return (
    <span
      title={skill.name}
      className="group inline-flex items-center gap-2.5 rounded-xl border border-border-soft bg-white/[0.02] px-3.5 py-2.5 text-sm font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] hover:text-foreground"
    >
      <span className="grid place-items-center transition-transform duration-200 group-hover:scale-110">
        {glyph}
      </span>
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="shell">
        <SectionReveal>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <p className="section-lead">
            The stack I build with day to day — and the Python data tools I&apos;m
            learning AI and machine learning on.
          </p>
        </SectionReveal>

        <div className="mt-12 sm:mt-16">
          {skillGroups.map((group, groupIndex) => (
            <SectionReveal
              key={group.title}
              as="section"
              delay={groupIndex * 0.05}
            >
              <div
                className={`grid gap-x-10 gap-y-5 py-8 sm:grid-cols-[12rem_1fr] sm:py-9 ${
                  groupIndex > 0 ? "border-t border-border-soft" : ""
                }`}
              >
                <div className="flex items-baseline gap-3 sm:flex-col sm:gap-2">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">
                    {group.title}
                  </h3>
                  <span className="font-mono text-xs text-faint">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
