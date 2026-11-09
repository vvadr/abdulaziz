import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skillGroups } from "@/data/skills";

/** Home page: the whole stack set like a transcript, each group's name a
 *  small speaker label before its run of tools. /skills adds where each
 *  group was used. */
export function SkillsPreview() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeader
          id="skills-title"
          title="Skills"
          intro="Grouped by the kind of work, and limited to tools I’ve used in a role or a public repository."
        />

        <ul className="border-t border-ink pb-12 pt-8 text-[clamp(1.35rem,1rem+1.5vw,2.25rem)] font-semibold leading-[1.35] tracking-[-0.015em] lg:pb-16">
          {skillGroups.map((group) => (
            <li key={group.title} className="inline">
              {group.skills.map((skill, index) => (
                <span key={skill}>
                  {/* The label never ends a line apart from its first tool. */}
                  <span className="whitespace-nowrap">
                    {index === 0 ? (
                      <span className="meta mr-2 inline-block -translate-y-[0.55em] text-blue">
                        {group.title}
                      </span>
                    ) : null}
                    {skill}
                  </span>
                  <span className="text-blue">{index < group.skills.length - 1 ? ", " : ". "}</span>
                </span>
              ))}
            </li>
          ))}
        </ul>

        <MoreLink href="/skills">See where each skill was used</MoreLink>
      </div>
    </section>
  );
}
