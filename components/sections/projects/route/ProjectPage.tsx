import { Check } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { ProjectTrial } from "../ProjectTrial";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectRouteHero } from "./ProjectRouteHero";

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
    <main className="project-page shell">
      <ProjectRouteHero project={project} />

      <section className="project-overview" aria-labelledby="project-overview-title">
        <div>
          <p className="section-kicker">Project overview</p>
          <h2 id="project-overview-title" className="mt-3 font-display text-3xl font-semibold text-foreground">
            What the project demonstrates
          </h2>
        </div>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>
              <Check size={18} aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      <div id="live-trial" className="scroll-mt-28">
        <ProjectTrial project={project} />
      </div>

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
