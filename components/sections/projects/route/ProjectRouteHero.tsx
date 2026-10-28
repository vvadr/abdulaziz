import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ExternalLinks } from "../ExternalLinks";

export function ProjectRouteHero({ project }: { project: PortfolioProject }) {
  const previewable = Boolean(project.liveUrl) && project.embeddable !== false;

  return (
    <header>
      <Link href="/#projects" className="meta link inline-flex items-center gap-2 font-semibold">
        <ArrowLeft size={15} aria-hidden="true" />
        All work
      </Link>

      <p className="meta fade-in mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft">
        <span>{project.category}</span>
        <span aria-hidden="true">/</span>
        <span className={cn("status", project.state === "Live" && "text-blue")} data-state={project.state}>
          {project.state}
        </span>
      </p>

      <h1 className="display-xl mt-5 max-w-[16ch] break-words">
        <span className="rise">
          <span style={{ "--d": "60ms" } as React.CSSProperties}>{project.title}</span>
        </span>
      </h1>

      <div className="mt-10 grid gap-x-12 gap-y-10 border-t border-ink pt-8 lg:grid-cols-12">
        <p className="lede fade-in lg:col-span-7" style={{ "--d": "200ms" } as React.CSSProperties}>
          {project.description}
        </p>

        <dl className="grid gap-x-6 gap-y-3 text-[0.9375rem] sm:grid-cols-[6.5rem_1fr] lg:col-span-4 lg:col-start-9">
          <dt className="font-semibold">My part</dt>
          <dd className="text-ink-soft">{project.role}</dd>
          <dt className="font-semibold">Stack</dt>
          <dd className="text-ink-soft">{project.stack.join(" · ")}</dd>
          <dt className="font-semibold">Links</dt>
          <dd>
            <ExternalLinks project={project} />
            {previewable ? (
              <a href="#live-trial" className="link mt-2 inline-flex items-center gap-1 text-[0.9375rem] font-semibold">
                Try it on this page
                <ArrowUpRight size={15} className="nudge rotate-90" aria-hidden="true" />
              </a>
            ) : null}
          </dd>
        </dl>
      </div>

      {project.cover ? (
        <div className="shot fade-in mt-12 aspect-[16/10]" style={{ "--d": "300ms" } as React.CSSProperties}>
          <Image
            src={project.cover}
            alt={`Screenshot of ${project.title}`}
            width={1000}
            height={625}
            sizes="(min-width: 84rem) 80rem, 100vw"
            priority
            className="h-full w-full object-cover object-top"
          />
        </div>
      ) : null}
    </header>
  );
}
