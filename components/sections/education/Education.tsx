import { educationItems } from "@/data/site";
import { SectionReveal } from "../../shared/SectionReveal";

export function Education() {
  return (
    <section id="education" className="section">
      <div className="shell max-w-5xl">
        <SectionReveal>
          <h2 className="section-title">Education</h2>
          <p className="section-lead">
            My path started with web fundamentals, moved into the modern frontend
            stack, and now continues into AI and machine learning.
          </p>
        </SectionReveal>

        <ol className="relative mt-14">
          {/* connecting rail */}
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[7px] top-2 w-px bg-gradient-to-b from-[color-mix(in_oklab,var(--accent)_55%,transparent)] via-border to-transparent"
          />

          {educationItems.map((item, index) => (
            <SectionReveal
              key={`${item.provider}-${item.period}-${index}`}
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

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
                  {item.period}
                </p>
                <p className="text-sm text-faint">{item.location}</p>
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-[1.75rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-muted">{item.provider}</p>

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
            </SectionReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
