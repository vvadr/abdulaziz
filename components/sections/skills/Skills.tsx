import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { skillGroups } from "@/data/skills";

/** Skills grouped by the kind of work, each group tied to where it was used. */
export function Skills() {
  return (
    <section id="skills" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="03 — Skills">
          What I <span className="serif-accent text-accent">build with</span>
        </SectionHeading>
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <li
              key={group.title}
              data-reveal
              className="glass flex flex-col rounded-2xl p-6 transition-colors duration-500 hover:border-accent/30 sm:p-7"
            >
              <div className="flex items-baseline gap-4">
                <span aria-hidden className="font-display text-xs tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold sm:text-2xl">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} tools`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-glass-border px-3 py-1.5 text-xs text-foreground/90"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-5 text-xs leading-relaxed text-muted">
                <span className="font-medium uppercase tracking-[0.16em]">Used in </span>
                {group.usedIn.map((item, i) => (
                  <span key={item.label}>
                    {i > 0 ? <span aria-hidden> · </span> : null}
                    {item.href.startsWith("/") ? (
                      <Link href={item.href} className="text-accent underline-offset-4 hover:underline">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="text-accent underline-offset-4 hover:underline">
                        {item.label}
                      </a>
                    )}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
