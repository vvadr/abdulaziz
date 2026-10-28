import Link from "next/link";
import { featuredProjects, moreProjects, projectAreas } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLinks } from "./ExternalLinks";
import { FeaturedProject } from "./FeaturedProject";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section pt-8">
      <div className="shell">
        <div className="grid items-end gap-6 pb-10 lg:grid-cols-12">
          <h2 id="projects-title" className="display-l lg:col-span-7">
            Selected work<span className="count">{featuredProjects.length}</span>
          </h2>
          <p className="max-w-[46ch] text-ink-soft lg:col-span-5">
            Each project says what I built, what it measured, and what still isn’t done.
            Where code was AI-generated, it says that too.
          </p>
        </div>

        {featuredProjects.map((project, index) => (
          <FeaturedProject key={project.slug} project={project} flip={index % 2 === 1} />
        ))}

        <div className="mt-16 border-t border-ink pt-12 lg:mt-24">
          <h2 id="more-projects-title" className="display-m">
            Also built<span className="count">{moreProjects.length}</span>
          </h2>

          {projectAreas.map((area) => {
            const items = moreProjects.filter((project) => project.area === area.id);
            if (items.length === 0) return null;

            return (
              <section key={area.id} aria-labelledby={`area-${area.id}`} className="mt-10">
                <h3
                  id={`area-${area.id}`}
                  className="meta flex items-center gap-3 pb-3 font-semibold text-blue"
                >
                  {area.label}
                  <span className="h-px flex-1 bg-rule" aria-hidden="true" />
                </h3>
                <ul>
                  {items.map((project) => (
                    <li
                      key={project.slug}
                      className="group relative grid gap-x-8 gap-y-2 border-b border-rule py-5 transition-colors hover:bg-surface md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1fr)] md:items-baseline md:px-3"
                    >
                      <div>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-lg font-bold tracking-[-0.01em] after:absolute after:inset-0 group-hover:text-blue"
                        >
                          {project.title}
                        </Link>
                        <p className="meta mt-1 flex flex-wrap gap-x-2 text-ink-soft">
                          <span>{project.category}</span>
                          <span aria-hidden="true">/</span>
                          <span
                            className={cn("status", project.state === "Live" && "text-blue")}
                            data-state={project.state}
                          >
                            {project.state}
                          </span>
                        </p>
                      </div>
                      <p className="text-[0.9875rem] leading-relaxed">{project.summary}</p>
                      <div className="flex flex-col gap-2">
                        <p className="meta text-ink-soft">{project.stack.join(" · ")}</p>
                        {/* Above the stretched title link so these stay clickable. */}
                        <ExternalLinks project={project} className="relative z-10 text-sm" />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
