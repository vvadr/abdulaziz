"use client";

import { useState } from "react";
import { ExternalLink, FolderGit2, RefreshCw } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

export function ProjectTrial({ project }: { project: PortfolioProject }) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!project.liveUrl) {
    return (
      <section className="project-trial-empty" aria-label="Project availability">
        <p className="font-mono text-xs text-accent-strong">$ ls ./deploy/</p>
        <h2 className="mt-4 font-mono text-2xl font-semibold text-foreground">
          No live deployment
        </h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          A public source repository is available, but there is no verified deployment
          to preview here. This portfolio doesn&apos;t label source code as a live preview.
        </p>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-6 text-sm"
          >
            <FolderGit2 size={16} aria-hidden="true" />
            Open repository
          </a>
        ) : null}
      </section>
    );
  }

  const displayUrl = project.liveUrl.replace(/^https?:\/\//, "");

  return (
    <section className="project-trial" aria-labelledby="live-trial-title">
      <h2 id="live-trial-title" className="sr-only">
        Live preview of {project.title}
      </h2>
      <div className="browser-chrome">
        <span className="window-dots" aria-hidden="true">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </span>
        <span className="address-bar">{displayUrl}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            className="icon-button"
            aria-label="Reload live preview"
            title="Reload live preview"
          >
            <RefreshCw size={16} aria-hidden="true" />
          </button>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Open
          </a>
        </div>
      </div>
      <div className="project-frame-wrap">
        <iframe
          key={refreshKey}
          src={project.liveUrl}
          title={`${project.title} live preview`}
          className="project-frame"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
