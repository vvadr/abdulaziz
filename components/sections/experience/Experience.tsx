import { experienceItems } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import { SectionReveal } from "../../shared/SectionReveal";

// Deterministic, stable across server/client renders (no Math.random/Date.now).
function commitHash(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(7, "0").slice(0, 7);
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="shell max-w-5xl">
        <SectionReveal>
          <p className="section-kicker">{"// experience.log"}</p>
          <h2 className="section-title mt-2">Experience</h2>
          <p className="section-lead">
            Where I&apos;ve shipped real frontend work in production teams —
            read like a commit history.
          </p>
        </SectionReveal>

        <ol className="relative mt-14">
          <span className="commit-rail" aria-hidden="true" />

          {experienceItems.map((item, index) => (
            <SectionReveal
              key={`${item.title}-${item.type}-${index}`}
              as="li"
              delay={index * 0.06}
              className="relative pb-14 pl-10 last:pb-0"
            >
              <span className="commit-node" aria-hidden="true">
                <span className="commit-node-dot" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="commit-hash font-mono text-sm">{commitHash(item.title + item.type)}</span>
                <h3 className="font-mono text-xl font-semibold text-foreground sm:text-2xl">
                  {item.title}
                </h3>
              </div>

              <p className="mt-2 flex flex-wrap items-center gap-x-2 font-mono text-xs text-faint">
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted underline-offset-4 transition hover:text-accent-strong hover:underline"
                  >
                    {item.type}
                  </a>
                ) : (
                  <span className="text-muted">{item.type}</span>
                )}
                <span aria-hidden="true">·</span>
                <span>{item.period}</span>
              </p>

              <p className="mt-4 max-w-[68ch] leading-7 text-muted">
                {item.description}
              </p>

              <ul className="mt-5 grid gap-2">
                {item.details.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3 font-mono leading-7 text-muted">
                    <span className="shrink-0 text-accent-strong" aria-hidden="true">+</span>
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
