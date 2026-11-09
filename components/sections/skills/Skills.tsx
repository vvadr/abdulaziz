import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skillGroups } from "@/data/skills";
import { SkillList } from "./SkillList";

/** The /skills page. Home shows SkillsPreview instead. */
export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section page-top">
      <div className="shell">
        <SectionHeader
          as="h1"
          id="skills-title"
          title="Skills"
          intro="Grouped by the kind of work, and limited to tools I’ve used in a role or a public repository. Each group links to where."
        />

        <div className="skill-grid">
          {skillGroups.map((group) => (
            <section
              key={group.title}
              aria-labelledby={`skills-${group.title}`}
              className="flex flex-col"
            >
              <h2 id={`skills-${group.title}`} className="text-lg font-bold tracking-[-0.01em]">
                {group.title}
              </h2>
              <SkillList skills={group.skills} />
              <p className="meta mt-auto pt-6 text-ink-soft">
                Used in{" "}
                {group.usedIn.map((evidence, index) => (
                  <span key={evidence.href + evidence.label}>
                    {evidence.href.startsWith("/") ? (
                      <Link href={evidence.href} className="link font-semibold text-ink">
                        {evidence.label}
                      </Link>
                    ) : (
                      <a href={evidence.href} className="link font-semibold text-ink">
                        {evidence.label}
                      </a>
                    )}
                    {index < group.usedIn.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
