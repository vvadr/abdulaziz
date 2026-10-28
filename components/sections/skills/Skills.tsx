import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeader
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
              <h3 id={`skills-${group.title}`} className="text-lg font-bold tracking-[-0.01em]">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1 text-[1.0625rem]">
                {group.skills.map((skill, index) => (
                  <li key={skill}>
                    {skill}
                    {index < group.skills.length - 1 ? (
                      <span className="text-blue" aria-hidden="true">
                        ,
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
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
