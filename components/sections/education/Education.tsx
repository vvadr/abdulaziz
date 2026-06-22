import { educationItems } from "@/data/site";
import { SectionReveal } from "../../shared/SectionReveal";

export function Education() {
  return (
    <section id="education" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <SectionReveal>
          <h2 className="section-title">Education</h2>
          <p className="section-lead">
            My path started with web fundamentals, moved into the modern frontend
            stack, and now continues into AI and machine learning.
          </p>
        </SectionReveal>

        <div className="mt-14 space-y-14">
          {educationItems.map((item, index) => (
            <SectionReveal
              key={`${item.provider}-${item.period}-${index}`}
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
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-sm text-faint">{item.provider}</p>
                    <p className="text-sm text-faint">{item.location}</p>
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[68ch] leading-7 text-muted">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.subjects.map((subject) => (
                      <span key={subject} className="tag">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
