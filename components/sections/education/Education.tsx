import { educationItems } from "@/data/site";
import { SectionReveal } from "../../shared/SectionReveal";

export function Education() {
  return (
    <section id="education" className="section">
      <div className="shell max-w-5xl">
        <SectionReveal>
          <p className="section-kicker">{"// education.md"}</p>
          <h2 className="section-title mt-2">Education</h2>
          <p className="section-lead">
            My path started with web fundamentals, moved into the modern frontend
            stack, and now continues into AI and machine learning.
          </p>
        </SectionReveal>

        <ol className="relative mt-14">
          <span className="commit-rail" aria-hidden="true" />

          {educationItems.map((item, index) => (
            <SectionReveal
              key={`${item.provider}-${item.period}-${index}`}
              as="li"
              delay={index * 0.06}
              className="relative pb-14 pl-10 last:pb-0"
            >
              <span className="commit-node" aria-hidden="true">
                <span className="commit-node-dot" />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-mono text-sm text-faint">
                  ## <span className="text-accent-strong">[{item.period}]</span>
                </p>
                <p className="font-mono text-xs text-faint">{item.location}</p>
              </div>

              <h3 className="mt-2 font-mono text-xl font-semibold text-foreground sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1.5 font-mono text-sm text-muted">{item.provider}</p>

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
