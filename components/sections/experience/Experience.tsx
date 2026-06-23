import { experienceItems } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "../../shared/SectionReveal";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell max-w-5xl">
        <SectionReveal>
          <h2 className="section-title">Experience</h2>
          <p className="section-lead">
            Where I&apos;ve shipped real frontend work in production teams.
          </p>
        </SectionReveal>

        <ol className="relative mt-14">
          {/* connecting rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[7px] top-2 w-px bg-gradient-to-b from-[color-mix(in_oklab,var(--accent)_55%,transparent)] via-border to-transparent"
          />

          {experienceItems.map((item, index) => (
            <SectionReveal
              key={`${item.title}-${item.type}-${index}`}
              as="li"
              delay={index * 0.06}
              className="relative pb-14 pl-10 last:pb-0"
            >
              {/* node */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 grid size-4 place-items-center rounded-full bg-background"
              >
                <span className="size-2.5 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_20%,transparent),0_0_14px_color-mix(in_oklab,var(--accent)_70%,transparent)]" />
              </span>

              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
                {item.period}
              </p>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                  {item.title}
                </h3>
                <span className="text-faint">·</span>
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-muted underline-offset-4 transition hover:text-accent-strong hover:underline"
                  >
                    {item.type}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-muted">{item.type}</span>
                )}
              </div>

              <p className="mt-4 max-w-[68ch] leading-7 text-muted">
                {item.description}
              </p>

              <ul className="mt-5 grid gap-2.5">
                {item.details.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3 leading-7 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-3 size-1.5 shrink-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_70%,transparent)]"
                    />
                    <span className="max-w-[66ch]">{responsibility}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2">
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
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
