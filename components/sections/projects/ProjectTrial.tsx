"use client";

import { useState } from "react";
import { ExternalLink, FolderGit2, RefreshCw, ShieldAlert } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

function WindowDots() {
  return (
    <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#f87171]" />
      <span className="size-2.5 rounded-full bg-[#fbbf24]" />
      <span className="size-2.5 rounded-full bg-[#34d399]" />
    </span>
  );
}

export function ProjectTrial({ project }: { project: PortfolioProject }) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!project.liveUrl) {
    return (
      <section
        className="glass rounded-3xl p-8 text-center sm:p-12"
        aria-label="Project availability"
      >
        <p className="section-label font-display text-xs font-medium uppercase">
          No live deployment
        </p>
        <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
          Source-only project
        </h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-muted">
          A public source repository is available, but there is no verified
          deployment to preview here. This portfolio doesn&apos;t label source code
          as a live preview.
        </p>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost btn-sm mt-6"
          >
            <FolderGit2 size={16} aria-hidden="true" />
            Open repository
          </a>
        ) : null}
      </section>
    );
  }

  const displayUrl = project.liveUrl.replace(/^https?:\/\//, "");
  const embeddable = project.embeddable !== false;

  return (
    <section aria-labelledby="live-trial-title">
      <h2 id="live-trial-title" className="sr-only">
        Live preview of {project.title}
      </h2>

      <div className="glass-strong flex items-center gap-3 rounded-t-3xl px-4 py-3">
        <WindowDots />
        <span className="min-w-0 flex-1 truncate rounded-full border border-glass-border bg-background/60 px-4 py-1.5 text-xs text-muted">
          {displayUrl}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          {embeddable ? (
            <button
              type="button"
              onClick={() => setRefreshKey((key) => key + 1)}
              className="grid size-9 place-items-center rounded-full border border-glass-border text-muted transition hover:border-accent/50 hover:text-accent"
              aria-label="Reload live preview"
              title="Reload live preview"
            >
              <RefreshCw size={15} aria-hidden="true" />
            </button>
          ) : null}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary btn-sm"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Open
          </a>
        </div>
      </div>

      {embeddable ? (
        <div className="overflow-hidden rounded-b-3xl border border-t-0 border-glass-border bg-background">
          <iframe
            key={refreshKey}
            src={project.liveUrl}
            title={`${project.title} live preview`}
            className="h-[60svh] w-full sm:h-[70vh]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="glass flex flex-col items-center rounded-b-3xl border-t-0 p-10 text-center">
          <ShieldAlert size={28} className="text-accent" aria-hidden="true" />
          <p className="mt-4 max-w-md leading-7 text-muted">
            {project.title} sends security headers that block embedded previews —
            the same protection that keeps its authenticated dashboards safe from
            clickjacking. Open the live site directly to try it.
          </p>
        </div>
      )}
    </section>
  );
}
