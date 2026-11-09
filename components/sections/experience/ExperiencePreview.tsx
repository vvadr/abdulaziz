import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { experienceItems } from "@/data/site";

/** Home page: every role on one line each. /experience has the details,
 *  the stack, and links to each company. */
export function ExperiencePreview() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="on-dark section">
      <div className="shell">
        <SectionHeader
          id="experience-title"
          title="Experience"
          count={experienceItems.length}
          intro="Two current roles, machine learning at an AI lab and frontend at a product company, then the roles before them."
        />

        <ol>
          {experienceItems.map((item) => (
            <li
              key={`${item.company}-${item.title}`}
              className="grid gap-x-12 gap-y-2 border-t py-6 lg:grid-cols-12 lg:items-baseline"
            >
              <p className="meta tabular text-night-soft lg:col-span-3">{item.period}</p>
              <div className="lg:col-span-4">
                <h3 className="text-xl font-bold tracking-[-0.015em]">{item.title}</h3>
                <p className="text-night-soft">
                  <span className="font-semibold text-night-fg">{item.company}</span>
                  {item.companyAlias ? <span> · {item.companyAlias}</span> : null}
                </p>
              </div>
              <p className="text-night-fg/90 lg:col-span-5">{item.summary}</p>
            </li>
          ))}
        </ol>

        <MoreLink href="/experience">See what I did in each role</MoreLink>
      </div>
    </section>
  );
}
