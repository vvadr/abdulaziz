"use client";

import { useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

/** Embedded, reloadable preview of a live deployment. Only rendered for
 *  projects whose site allows framing — the header links out otherwise. */
export function ProjectTrial({ project }: { project: PortfolioProject }) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!project.liveUrl || project.embeddable === false) return null;

  const displayUrl = project.liveUrl.replace(/^https?:\/\//, "");

  return (
    <section aria-labelledby="live-trial-title" className="border-t border-ink pt-8">
      <h2 id="live-trial-title" className="display-m">
        Try it here
      </h2>

      <div className="shot mt-8">
        <div className="flex items-center gap-3 border-b border-ink px-3 py-2.5">
          <span className="meta min-w-0 flex-1 truncate text-ink-soft">{displayUrl}</span>
          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            className="grid size-9 place-items-center rounded-full border border-rule transition-colors hover:border-ink"
            aria-label="Reload live preview"
            title="Reload live preview"
          >
            <RefreshCw size={15} aria-hidden="true" />
          </button>
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-solid btn-sm">
            Open
            <ArrowUpRight size={15} className="nudge" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <iframe
          key={refreshKey}
          src={project.liveUrl}
          title={`${project.title} live preview`}
          className="block h-[60svh] w-full bg-white sm:h-[70vh]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
}
