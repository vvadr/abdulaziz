import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLinks } from "./ExternalLinks";

/** One featured project as a full-width row: screenshot on one side, the
 *  whole story (what, proof, my part, stack, links) on the other — readable
 *  without opening the case study. Sides alternate on wide screens. */
export function FeaturedProject({ project, flip }: { project: PortfolioProject; flip: boolean }) {
  const href = `/projects/${project.slug}`;

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="grid gap-8 border-t border-ink py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn("block lg:col-span-7", flip && "lg:order-2")}
      >
        <div className="shot aspect-[16/10]" data-wipe>
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              width={1000}
              height={625}
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="display-l grid h-full place-items-center text-blue">{project.title}</span>
          )}
        </div>
      </Link>

      <div className={cn("flex flex-col lg:col-span-5", flip && "lg:order-1")}>
        <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft">
          <span>{project.category}</span>
          <span aria-hidden="true">/</span>
          <span className={cn("status", project.state === "Live" && "text-blue")} data-state={project.state}>
            {project.state}
          </span>
        </p>

        <h3 id={`${project.slug}-title`} className="display-m mt-4">
          <Link href={href} className="transition-colors hover:text-blue">
            {project.title}
          </Link>
        </h3>

        <p className="mt-4 text-lg leading-relaxed">{project.summary}</p>

        {project.keyPoints ? (
          <ul className="frames mt-6 space-y-2.5 text-[0.9875rem]">
            {project.keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}

        <dl className="mt-7 grid gap-3 border-t border-rule pt-5 text-[0.9375rem] sm:grid-cols-[6.5rem_1fr]">
          <dt className="font-semibold">My part</dt>
          <dd className="text-ink-soft">{project.role}</dd>
          <dt className="font-semibold">Stack</dt>
          <dd className="text-ink-soft">{project.stack.join(" · ")}</dd>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-auto lg:pt-8">
          <Link href={href} className="btn btn-solid btn-sm">
            Read the case study
            <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
          </Link>
          <ExternalLinks project={project} />
        </div>
      </div>
    </article>
  );
}
