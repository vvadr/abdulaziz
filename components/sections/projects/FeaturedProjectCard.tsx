import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { PortfolioProject, ProjectLink } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";

/** A featured project: what it is, the proof, my role, and where to look —
 *  readable without opening the case study. Covers alternate sides on wide
 *  screens. */
export function FeaturedProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const caseStudy = `/projects/${project.slug}`;
  const externalLinks: ProjectLink[] = [
    ...(project.liveUrl ? [{ label: "Live site", href: project.liveUrl }] : []),
    ...(project.links ?? []),
    ...(project.repoUrl ? [{ label: "Source", href: project.repoUrl }] : []),
  ];

  return (
    <article className="glass group grid overflow-hidden rounded-3xl transition-colors duration-300 hover:border-accent/30 lg:grid-cols-2">
      {/* Duplicate of the title link for pointer users; hidden from the
          keyboard and screen readers. */}
      <Link
        href={caseStudy}
        tabIndex={-1}
        aria-hidden
        className={cn("relative block", index % 2 === 1 && "lg:order-last")}
      >
        <ProjectCover project={project} className="lg:aspect-auto lg:h-full lg:min-h-[24rem]" />
      </Link>

      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        <p className="font-display text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
          <Link href={caseStudy} data-cursor className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

        {project.keyPoints ? (
          <ul className="mt-5 space-y-2">
            {project.keyPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                <span aria-hidden className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-5 border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-foreground">My role: </span>
          {project.role}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-7">
          <Link href={caseStudy} data-cursor className="btn-primary btn-sm">
            Case study
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="btn-ghost btn-sm"
            >
              {link.label}
              <ArrowUpRight size={15} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
