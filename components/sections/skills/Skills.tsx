import type { SimpleIcon } from "simple-icons";
import { type PortfolioSkill, skillGroups, skillIcons } from "@/data/skills";
import { SectionReveal } from "../../shared/SectionReveal";

function slugKey(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

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
      className="group inline-flex items-center gap-2.5 rounded-md border border-border-soft bg-white/[0.02] px-3 py-2 text-sm font-medium text-muted transition duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] hover:text-foreground"
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
          <p className="section-kicker">{"// skills.json"}</p>
          <h2 className="section-title mt-2">Skills &amp; Tools</h2>
          <p className="section-lead">
            The stack I build with day to day — and the Python data tools I&apos;m
            learning AI and machine learning on.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05} className="mt-12 sm:mt-14">
          <div className="term-window">
            <div className="term-titlebar">
              <span className="window-dots" aria-hidden="true">
                <span className="window-dot" />
                <span className="window-dot" />
                <span className="window-dot" />
              </span>
              <span className="term-titlebar-label">skills.json</span>
            </div>

            <div className="term-body text-sm">
              <div className="line-row">
                <span className="line-no">1</span>
                <span className="text-faint">{"{"}</span>
              </div>

              {skillGroups.map((group, groupIndex) => {
                const isLast = groupIndex === skillGroups.length - 1;
                return (
                  <div key={group.title} className="line-row items-start py-1.5">
                    <span className="line-no pt-0.5">{groupIndex + 2}</span>
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-2">
                      <span className="text-accent-strong">&quot;{slugKey(group.title)}&quot;</span>
                      <span className="text-faint">:[</span>
                      <div className="flex flex-1 flex-wrap gap-2 py-1">
                        {group.skills.map((skill) => (
                          <SkillChip key={skill.name} skill={skill} />
                        ))}
                      </div>
                      <span className="text-faint">]{isLast ? "" : ","}</span>
                    </div>
                  </div>
                );
              })}

              <div className="line-row">
                <span className="line-no">{skillGroups.length + 2}</span>
                <span className="text-faint">{"}"}</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
