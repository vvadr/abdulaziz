import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skillGroups } from "@/data/skills";
import { SkillList } from "./SkillList";

/** Home page: the six groups with every tool and its mark. /skills adds
 *  where each group was used, linked to the evidence. */
export function SkillsPreview() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="shell">
        <SectionHeader
          id="skills-title"
          title="Skills"
          intro="Grouped by the kind of work, and limited to tools I’ve used in a role or a public repository."
        />

        <div className="skill-grid">
          {skillGroups.map((group) => (
            <section key={group.title} aria-labelledby={`skills-${group.title}`}>
              <h3 id={`skills-${group.title}`} className="text-lg font-bold tracking-[-0.01em]">
                {group.title}
              </h3>
              <SkillList skills={group.skills} />
            </section>
          ))}
        </div>

        {/* The strong rule sits on the grid's last hairline (-mt-px); grid
            cells paint late, so `relative` lifts the rule above theirs. */}
        <MoreLink href="/skills" className="relative -mt-px">
          See where each skill was used
        </MoreLink>
      </div>
    </section>
  );
}
