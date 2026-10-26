"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
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

/** Embedded, reloadable preview of a live deployment. Only rendered for
 *  projects whose site allows framing — the header links out otherwise. */
export function ProjectTrial({ project }: { project: PortfolioProject }) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!project.liveUrl || project.embeddable === false) return null;

  const displayUrl = project.liveUrl.replace(/^https?:\/\//, "");

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
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            className="grid size-9 place-items-center rounded-full border border-glass-border text-muted transition hover:border-accent/50 hover:text-accent"
            aria-label="Reload live preview"
            title="Reload live preview"
          >
            <RefreshCw size={15} aria-hidden="true" />
          </button>
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
    </section>
  );
}
