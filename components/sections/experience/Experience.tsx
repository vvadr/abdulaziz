import { experienceItems } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "../../shared/SectionReveal";

export function Experience() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <SectionReveal>
          <h2 className="section-title">Experience</h2>
          <p className="section-lead">
            Where I&apos;ve shipped real frontend work in production teams.
          </p>
        </SectionReveal>

        <div className="mt-14 space-y-14">
          {experienceItems.map((item, index) => (
            <SectionReveal
              key={`${item.title}-${item.type}-${index}`}
              as="article"
              delay={index * 0.06}
            >
              <div className="grid gap-5 sm:grid-cols-[11rem_1fr] sm:gap-10">
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)]"
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
                    {item.period}
                  </p>
                </div>

                <div className="border-t border-border pt-6 sm:pt-1">
                  <p className="text-sm text-faint">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="transition hover:text-accent-strong"
                      >
                        {item.type}
                      </a>
                    ) : (
                      item.type
                    )}
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[68ch] leading-7 text-muted">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {item.details.map((responsibility) => (
                      <li
                        key={responsibility}
                        className="flex gap-3 leading-7 text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent/70"
                        />
                        <span className="max-w-[66ch]">{responsibility}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {item.companyUrl ? (
                    <div className="mt-6">
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost text-sm"
                      >
                        Visit {item.type}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
