import { Check, CircleAlert, TrendingUp, type LucideIcon } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { ProjectTrial } from "../ProjectTrial";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectRouteHero } from "./ProjectRouteHero";

function DetailSection({
  id,
  label,
  title,
  items,
  icon: Icon,
  iconClassName,
}: {
  id: string;
  label: string;
  title: string;
  items: string[];
  icon: LucideIcon;
  iconClassName: string;
}) {
  return (
    <section
      className="grid gap-10 border-t border-glass-border pt-14 lg:grid-cols-[minmax(0,0.85fr)_1.15fr]"
      aria-labelledby={id}
    >
      <div data-reveal>
        <p className="section-label font-display text-xs font-medium uppercase">{label}</p>
        <h2 id={id} className="mt-3 font-display text-3xl font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            data-reveal
            className="glass flex items-start gap-3 rounded-2xl p-5 leading-relaxed text-muted"
          >
            <Icon size={18} className={`mt-1 shrink-0 ${iconClassName}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
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
    <main className="shell pb-20 pt-28 sm:pt-32">
      <ProjectRouteHero project={project} />

      <div className="mt-16 space-y-16">
        {project.results ? (
          <DetailSection
            id="project-results-title"
            label="Results"
            title="What it achieved"
            items={project.results}
            icon={TrendingUp}
            iconClassName="text-accent"
          />
        ) : null}
        <DetailSection
          id="project-highlights-title"
          label="Build"
          title="What I built"
          items={project.highlights}
          icon={Check}
          iconClassName="text-accent"
        />
        {project.limitations ? (
          <DetailSection
            id="project-limitations-title"
            label="Limits"
            title="What isn't done yet"
            items={project.limitations}
            icon={CircleAlert}
            iconClassName="text-accent-2"
          />
        ) : null}
      </div>

      {project.liveUrl && project.embeddable !== false ? (
        <div id="live-trial" className="mt-16 scroll-mt-28">
          <ProjectTrial project={project} />
        </div>
      ) : null}

      <ProjectNavigation previous={previous} next={next} />
    </main>
  );
}
