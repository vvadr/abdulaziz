import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/shared/TiltCard";
import type { PortfolioProject } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

/** One project card. `position` is the card's rank within the list it is
 *  shown in (overall on "All", within the type on a type tab). */
export function ProjectCard({
  project,
  position,
  scope,
}: {
  project: PortfolioProject;
  position: number;
  scope: string;
}) {
  const rankLabel = String(position).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor
      aria-label={`${project.title}, ranked ${position} in ${scope} — open case study`}
      className="block h-full outline-none"
    >
      <TiltCard className="group relative h-full">
        <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 group-hover:border-accent/40">
          <ProjectCover project={project} />

          <span
            aria-hidden
            className="glass absolute left-4 top-4 rounded-full px-3 py-1 font-display text-xs font-semibold tabular-nums text-accent"
          >
            #{rankLabel}
          </span>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {project.title}
              </h3>
              <span
                aria-hidden
                className="glass flex size-10 shrink-0 items-center justify-center rounded-full text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-background"
              >
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>
      </TiltCard>
    </Link>
  );
}
