import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { experienceItems } from "@/data/site";

export function Experience({ page = false }: { page?: boolean }) {
  const Role = page ? "h2" : "h3";
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className={cn("on-dark section", page && "page-top")}
    >
      <div className="shell">
        <SectionHeader
          as={page ? "h1" : "h2"}
          id="experience-title"
          title="Experience"
          count={experienceItems.length}
          intro="Two current roles, machine learning at an AI lab and frontend at a product company, then the roles before them."
        />

        <ol>
          {experienceItems.map((item) => (
            <li
              key={`${item.company}-${item.title}`}
              className="grid gap-x-12 gap-y-4 border-t py-9 lg:grid-cols-12"
            >
              <p className="meta tabular pt-1 text-night-soft lg:col-span-3">{item.period}</p>

              <div className="lg:col-span-4">
                <Role className="text-2xl font-bold tracking-[-0.015em]">{item.title}</Role>
                <p className="mt-1 text-night-soft">
                  {item.companyUrl ? (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link inline-flex items-center gap-1 font-semibold text-night-fg"
                    >
                      {item.company}
                      <ArrowUpRight size={15} className="nudge" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="font-semibold text-night-fg">{item.company}</span>
                  )}
                  {item.companyAlias ? <span> · {item.companyAlias}</span> : null}
                </p>
              </div>

              <div className="lg:col-span-5">
                <ul className="frames space-y-2 text-night-fg/90">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <p className="meta mt-4 text-night-blue">{item.tech.join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
