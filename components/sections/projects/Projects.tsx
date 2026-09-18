import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectTabs } from "./ProjectTabs";

/** Ranked project grid, filterable by type. Unlike the reference (external
 *  links only), every card opens an internal case study with a live, embedded
 *  trial where available. */
export function Projects() {
  return (
    <section id="projects" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="04 — Projects" align="center">
          Selected <span className="serif-accent text-accent">work</span>
        </SectionHeading>

        {/* One reveal for the whole block: cards mount and unmount as tabs
            change, and per-card GSAP reveals would leave new cards hidden. */}
        <div data-reveal>
          <ProjectTabs />
        </div>
      </div>
    </section>
  );
}
