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
    <main className="shell pb-20 pt-28 sm:pt-32">
      <ProjectRouteHero project={project} />

      <section
        className="mt-16 grid gap-10 border-t border-glass-border pt-14 lg:grid-cols-[minmax(0,0.85fr)_1.15fr]"
        aria-labelledby="project-overview-title"
      >
        <div data-reveal>
          <p className="section-label font-display text-xs font-medium uppercase">
            Project overview
          </p>
          <h2
            id="project-overview-title"
            className="mt-3 font-display text-3xl font-semibold text-foreground"
          >
            What the project demonstrates
          </h2>
        </div>
        <ul className="space-y-4">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              data-reveal
              className="glass flex items-start gap-3 rounded-2xl p-5 leading-relaxed text-muted"
            >
              <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      <div id="live-trial" className="mt-16 scroll-mt-28">
        <ProjectTrial project={project} />
      </div>

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
