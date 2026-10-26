import { ArrowUpRight, FolderGit2, MonitorPlay } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { ProjectBackLink } from "./ProjectBackLink";

export function ProjectRouteHero({ project }: { project: PortfolioProject }) {
  const previewable = Boolean(project.liveUrl) && project.embeddable !== false;

  return (
    <header>
      <ProjectBackLink />
      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
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

        <dl className="glass space-y-5 rounded-2xl p-6">
          <div>
            <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              Status
            </dt>
            <dd className="mt-1 flex items-center gap-2 text-lg font-medium text-foreground">
              {project.liveUrl ? (
                <MonitorPlay size={18} className="text-accent" aria-hidden="true" />
              ) : (
                <FolderGit2 size={18} className="text-accent" aria-hidden="true" />
              )}
              {project.state}
            </dd>
          </div>
          <div>
            <dt className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
              My role
            </dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/90">{project.role}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-9 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl ? (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary btn-sm">
            Open live site
            <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
        {previewable ? (
          <a href="#live-trial" className="btn-ghost btn-sm">
            <MonitorPlay size={16} aria-hidden="true" />
            Preview on this page
          </a>
        ) : null}
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={project.liveUrl ? "btn-ghost btn-sm" : "btn-primary btn-sm"}
          >
            {link.label}
            <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
        {project.repoUrl ? (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-ghost btn-sm">
            <FolderGit2 size={16} aria-hidden="true" />
            View source
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </header>
  );
}
