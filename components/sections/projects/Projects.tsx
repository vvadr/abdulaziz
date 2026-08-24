import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TiltCard } from "@/components/shared/TiltCard";
import { portfolioProjects } from "@/data/projects";
import { ProjectCover } from "./ProjectCover";

/** Project grid. Unlike the reference (external links only), every card opens
 *  an internal case study with a live, embedded trial where available. */
export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="03 — Projects" align="center">
          Selected <span className="serif-accent gradient-text">work</span>
        </SectionHeading>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {portfolioProjects.map((project) => (
            <div key={project.slug} data-reveal>
              <Link
                href={`/projects/${project.slug}`}
                data-cursor
                aria-label={`${project.title} — open case study`}
                className="block h-full outline-none"
              >
                <TiltCard className="group relative h-full">
                  <div className="absolute -inset-px overflow-hidden rounded-[24px]" aria-hidden>
                    <div className="border-spin" />
                  </div>

                  <article className="glass relative flex h-full flex-col overflow-hidden rounded-3xl">
                    <ProjectCover project={project} />

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
