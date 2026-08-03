import { ArrowUpRight, FolderGit2, MonitorPlay } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { ProjectBackLink } from "./ProjectBackLink";

export function ProjectRouteHero({ project }: { project: PortfolioProject }) {
  return (
    <header className="project-route-hero">
      <ProjectBackLink />
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="section-kicker">{project.category}</p>
          <h1 className="mt-4 max-w-4xl font-mono text-[clamp(2.6rem,1.6rem+4.2vw,5.5rem)] font-bold leading-[0.96] text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.description}</p>
        </div>

        <div className="project-route-status">
          <span className="grid size-12 place-items-center rounded-md border border-[color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] text-accent-strong">
            {project.liveUrl ? (
              <MonitorPlay size={22} aria-hidden="true" />
            ) : (
              <FolderGit2 size={22} aria-hidden="true" />
            )}
          </span>
          <p className="mt-5 font-mono text-xs text-faint">$ cat status</p>
          <p className="mt-1 text-lg font-medium text-foreground">{project.state}</p>
          <p className="mt-3 text-sm leading-6 text-muted">
            {project.liveUrl
              ? "Verified public deployment available below."
              : "Public source can be reviewed on GitHub."}
          </p>
        </div>
      </div>

      <div className="mt-9 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
            <FolderGit2 size={16} aria-hidden="true" />
            View source
          </a>
        ) : null}
        {project.liveUrl ? (
          <a href="#live-trial" className="btn-primary text-sm">
            <MonitorPlay size={16} aria-hidden="true" />
            Start live trial
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </header>
  );
}
