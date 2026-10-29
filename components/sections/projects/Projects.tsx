import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects, moreProjects, portfolioProjects, projectAreas } from "@/data/projects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { ExternalLinks } from "./ExternalLinks";
import { FeaturedProject } from "./FeaturedProject";

/** On the home page: the featured projects and a link to the rest. On /work
 *  (`page`): the same rows under the page's h1, followed by "Also built". */
export function Projects({ page = false }: { page?: boolean }) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={cn("section", page ? "page-top" : "pt-8")}
    >
      <div className="shell">
        <SectionHeader
          as={page ? "h1" : "h2"}
          id="projects-title"
          title="Selected work"
          count={featuredProjects.length}
          intro="Each one states my part, the stack, and the measured results, with a case study one click away."
        />

        {featuredProjects.map((project, index) => (
          <FeaturedProject
            key={project.slug}
            project={project}
            flip={index % 2 === 1}
            titleAs={page ? "h2" : "h3"}
          />
        ))}

        {page ? (
          <AlsoBuilt />
        ) : (
          <div className="border-t border-ink pt-10">
            <Link href="/work" className="btn btn-line">
              See all {portfolioProjects.length} projects
              <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function AlsoBuilt() {
  return (
    <div className="mt-16 border-t border-ink pt-12 lg:mt-24">
      <h2 id="more-projects-title" className="display-m">
        Also built<span className="count" aria-hidden="true">{moreProjects.length}</span>
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
                  className="group relative grid gap-x-8 gap-y-2 border-b border-rule py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_minmax(0,1fr)] md:items-baseline"
                >
                  <div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-lg font-bold tracking-[-0.01em] transition-colors after:absolute after:inset-0 group-hover:text-blue"
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
  );
}
