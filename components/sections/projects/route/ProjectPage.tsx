import type { PortfolioProject } from "@/data/projects";
import { ProjectTrial } from "../ProjectTrial";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectRouteHero } from "./ProjectRouteHero";

function DetailSection({ id, title, items }: { id: string; title: string; items: string[] }) {
  return (
    <section className="grid gap-x-12 gap-y-6 border-t border-ink pt-8 lg:grid-cols-12" aria-labelledby={id}>
      <h2 id={id} className="display-m lg:col-span-4">
        {title}
      </h2>
      <ul className="frames space-y-4 text-lg leading-relaxed lg:col-span-7 lg:col-start-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectPage({
  project,
  previous,
  next,
}: {
  project: PortfolioProject;
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
}) {
  return (
    <main id="content" className="page-enter shell overflow-x-clip pb-24 pt-10 sm:pt-14">
      <ProjectRouteHero project={project} />

      <div className="mt-20 space-y-16 lg:mt-24 lg:space-y-20">
        {project.results ? (
          <DetailSection id="project-results-title" title="Results" items={project.results} />
        ) : null}
        <DetailSection id="project-highlights-title" title="What I built" items={project.highlights} />
        {project.nextSteps ? (
          <DetailSection id="project-next-title" title="Next steps" items={project.nextSteps} />
        ) : null}
      </div>

      {project.liveUrl && project.embeddable !== false ? (
        <div id="live-trial" className="mt-20 scroll-mt-24">
          <ProjectTrial project={project} />
        </div>
      ) : null}

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
