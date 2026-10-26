import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experienceItems } from "@/data/site";

/** Roles, newest first: when and where on the left, what I do on the right. */
export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="02 — Experience">
          Where I&apos;ve <span className="serif-accent text-accent">worked</span>
        </SectionHeading>

        <ol className="mt-14 space-y-5">
          {experienceItems.map((job) => (
            <li
              key={`${job.company}-${job.title}`}
              data-reveal
              className="glass grid gap-6 rounded-3xl p-6 transition-colors duration-500 hover:border-accent/30 sm:p-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10"
            >
              <header>
                <p className="font-display text-sm tabular-nums text-muted">{job.period}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">
                  {job.companyUrl ? (
                    <a
                      href={job.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="transition-colors hover:text-accent"
                    >
                      {/* The arrow is glued to the last word so it never wraps alone. */}
                      {job.company.includes(" ")
                        ? `${job.company.slice(0, job.company.lastIndexOf(" "))} `
                        : null}
                      <span className="whitespace-nowrap">
                        {job.company.slice(job.company.lastIndexOf(" ") + 1)}
                        <ArrowUpRight
                          className="ml-1.5 inline-block size-4 align-baseline text-muted"
                          aria-hidden
                        />
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                {job.companyAlias ? (
                  <p className="mt-0.5 text-sm text-muted">{job.companyAlias}</p>
                ) : null}
                <p className="mt-1 font-medium text-accent">{job.title}</p>
              </header>

              <div>
                <ul className="space-y-2.5">
                  {job.details.map((point) => (
                    <li key={point} className="flex gap-3 text-[0.94rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-accent/70" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.tech.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
          I also build{" "}
          <a href="#projects" className="text-accent underline-offset-4 hover:underline">
            Dwelve and Volontyorlar
          </a>{" "}
          end to end.
        </p>
      </div>
    </section>
  );
}
