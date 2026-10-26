import Image from "next/image";
import {
  AudioLines,
  BrainCircuit,
  Code2,
  Database,
  Gamepad2,
  Globe2,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Speech recognition": AudioLines,
  "AI agents · RAG": BrainCircuit,
  RAG: BrainCircuit,
  "LLM fine-tuning": BrainCircuit,
  "Machine learning": BrainCircuit,
  "Data pipeline": Database,
  "Data analysis": LineChart,
  "Browser game": Gamepad2,
  Frontend: Code2,
};

/** Card header: a real screenshot when the project has one, otherwise a
 *  styled cover keyed to the project's category. */
export function ProjectCover({
  project,
  className,
}: {
  project: PortfolioProject;
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[project.category] ?? Globe2;

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden", className)}>
      {project.cover ? (
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 36rem, 92vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(125,211,252,0.16) 0%, rgba(7,10,15,0.4) 50%, rgba(165,180,252,0.18) 100%)",
          }}
        >
          <div className="grid-bg absolute inset-0 opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="glass flex size-16 items-center justify-center rounded-2xl text-accent">
              <Icon className="size-8" />
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-muted">
              {project.category}
            </span>
          </div>
        </div>
      )}

      {/* Light app screenshots would glare against the noir page — hold them
          back until the card is hovered. */}
      {project.cover ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-background/45 transition-opacity duration-500 group-hover:opacity-0"
        />
      ) : null}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
      />
      <div aria-hidden className="preview-shimmer absolute inset-0" />

      <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 font-display text-xs">
        {project.state}
      </span>
    </div>
  );
}
