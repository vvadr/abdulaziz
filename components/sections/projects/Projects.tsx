import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Folder,
  Gamepad2,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";
import { SectionReveal } from "../../shared/SectionReveal";

const categoryMeta: Record<string, { ext: string; icon: LucideIcon }> = {
  "Full-stack platform": { ext: "/", icon: Folder },
  "AI product": { ext: ".py", icon: BrainCircuit },
  "Data engineering": { ext: ".ipynb", icon: BrainCircuit },
  "Machine learning": { ext: ".ipynb", icon: BrainCircuit },
  "Browser game": { ext: ".js", icon: Gamepad2 },
  "Web application": { ext: ".tsx", icon: Globe2 },
  "Full-stack community app": { ext: "/", icon: Folder },
};

function fileNameFor(project: PortfolioProject) {
  const meta = categoryMeta[project.category];
  const ext = meta?.ext ?? ".ts";
  return ext === "/" ? `${project.slug}/` : `${project.slug}${ext}`;
}

function ProjectGlyph({ project }: { project: PortfolioProject }) {
  const meta = categoryMeta[project.category];
  const Icon = meta?.icon ?? Code2;
  const ext = meta?.ext ?? ".ts";

  return (
    <div className="project-glyph" aria-hidden="true">
      <Icon strokeWidth={1.5} />
      <span className="project-glyph-grid" />
      <span className="project-glyph-code">{ext}</span>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <SectionReveal>
          <p className="section-kicker">{"// ~/projects"}</p>
          <h2 className="section-title mt-2">Projects with their own story.</h2>
          <p className="section-lead">
            Each project has an individual route, verified repository status, and a
            live preview where a public deployment is available.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} delay={(index % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }: { project: PortfolioProject; delay: number }) {
  const hasLiveTrial = Boolean(project.liveUrl);

  return (
    <SectionReveal delay={delay} className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="project-card group flex h-full flex-col overflow-hidden border border-border-soft bg-[color-mix(in_oklab,var(--surface)_92%,black)] p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <ProjectGlyph project={project} />
          <span className="project-state">{project.state}</span>
        </div>

        <div className="mt-8">
          <p className="font-mono text-[0.68rem] text-faint">{fileNameFor(project)}</p>
          <h3 className="mt-3 font-mono text-2xl font-semibold leading-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{project.summary}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5 text-sm">
          <span className="font-mono text-xs text-faint">
            {hasLiveTrial ? "Live preview" : "Source available"}
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-accent-strong transition-transform duration-200 group-hover:translate-x-1">
            open <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </SectionReveal>
  );
}
