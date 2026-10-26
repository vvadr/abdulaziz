import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

/** Compact entry in "More projects". The title link is stretched over the
 *  whole card, so the card is one target with a short accessible name. */
export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="glass group relative flex h-full flex-col rounded-2xl p-5 transition-colors duration-300 hover:border-accent/40 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted">
            {project.category} · {project.state}
          </p>
          <h4 className="mt-1.5 font-display text-lg font-semibold transition-colors group-hover:text-accent">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            >
              {project.title}
            </Link>
          </h4>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent"
        />
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((item) => (
          <span key={item} className="tag">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
