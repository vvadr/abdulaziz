import { ArrowUpRight, FolderGit2, MonitorPlay } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { ProjectBackLink } from "./ProjectBackLink";

export function ProjectRouteHero({ project }: { project: PortfolioProject }) {
  return (
    <header>
      <ProjectBackLink />
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="section-label font-display text-xs font-medium uppercase">
            {project.category}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,1.6rem+4.2vw,5.5rem)] font-bold leading-[0.96] tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {project.description}
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <span className="grid size-12 place-items-center rounded-xl border border-accent/35 bg-accent/10 text-accent">
            {project.liveUrl ? (
              <MonitorPlay size={22} aria-hidden="true" />
            ) : (
              <FolderGit2 size={22} aria-hidden="true" />
            )}
          </span>
          <p className="mt-5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Status
          </p>
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
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost btn-sm"
          >
            <FolderGit2 size={16} aria-hidden="true" />
            View source
          </a>
        ) : null}
        {project.liveUrl ? (
          <a href="#live-trial" className="btn-primary btn-sm">
            <MonitorPlay size={16} aria-hidden="true" />
            Start live trial
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </header>
  );
}
