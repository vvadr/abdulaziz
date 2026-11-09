import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects, portfolioProjects, type PortfolioProject } from "@/data/projects";
import { MoreLink } from "@/components/shared/MoreLink";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

/** Home page: the four featured projects as a two-by-two gallery, each with
 *  its strongest proof point. /work has the full rows (part, stack, links)
 *  and everything else under "Also built". */
export function WorkPreview() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section pt-8">
      <div className="shell">
        <SectionHeader
          id="projects-title"
          title="Selected work"
          count={featuredProjects.length}
          intro="Each one states my part, the stack, and the measured results, with a case study one click away."
        />

        <div className="grid gap-x-10 gap-y-14 border-t border-ink pb-16 pt-10 md:grid-cols-2 lg:gap-x-14">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <MoreLink href="/work">See all {portfolioProjects.length} projects</MoreLink>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const href = `/projects/${project.slug}`;
  const proof = project.keyPoints?.[0];

  return (
    <article aria-labelledby={`${project.slug}-title`} className="flex flex-col">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
        <div className="shot aspect-[16/10]" data-wipe>
          {project.cover ? (
            <Image
              src={project.cover}
              alt=""
              width={1000}
              height={625}
              sizes="(min-width: 768px) 44vw, 100vw"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="display-m grid h-full place-items-center text-blue">{project.title}</span>
          )}
        </div>
      </Link>

      <p className="meta mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft">
        <span>{project.category}</span>
        <span aria-hidden="true">/</span>
        <span className={cn("status", project.state === "Live" && "text-blue")} data-state={project.state}>
          {project.state}
        </span>
      </p>

      <h3 id={`${project.slug}-title`} className="display-m mt-3">
        <Link href={href} className="transition-colors hover:text-blue">
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 text-lg leading-relaxed">{project.summary}</p>

      {proof ? (
        <ul className="frames mt-4 text-[0.9875rem]">
          <li>{proof}</li>
        </ul>
      ) : null}

      <Link
        href={href}
        className="link mt-6 inline-flex w-fit items-center gap-1.5 text-[0.9375rem] font-semibold"
      >
        Read the case study
        <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
        <span className="sr-only">: {project.title}</span>
      </Link>
    </article>
  );
}
