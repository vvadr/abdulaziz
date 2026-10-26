import { SectionHeading } from "@/components/shared/SectionHeading";
import { featuredProjects, moreProjects, projectAreas } from "@/data/projects";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";

/** The strongest work first, each readable at a glance; everything else in a
 *  compact list grouped by area. Every project has its own case study. */
export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="01 — Work">
          Selected <span className="serif-accent text-accent">work</span>
        </SectionHeading>

        <div className="mt-14 space-y-8">
          {featuredProjects.map((project, index) => (
            <div key={project.slug} data-reveal>
              <FeaturedProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 data-reveal className="font-display text-2xl font-bold sm:text-3xl">
            More projects
          </h3>

          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            {projectAreas.map((area) => (
              <div key={area.id} data-reveal>
                <h4 className="section-label font-display text-xs font-medium uppercase">
                  {area.label}
                </h4>
                <ul className="mt-5 grid gap-3">
                  {moreProjects
                    .filter((project) => project.area === area.id)
                    .map((project) => (
                      <li key={project.slug}>
                        <ProjectCard project={project} />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
