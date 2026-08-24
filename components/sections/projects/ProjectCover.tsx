import Image from "next/image";
import {
  BrainCircuit,
  Code2,
  Database,
  Gamepad2,
  Globe2,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

type CoverStyle = {
  colors: [string, string];
  icon: LucideIcon;
};

const CATEGORY_STYLES: Record<string, CoverStyle> = {
  "AI engineering": { colors: ["#fbbf24", "#f59e0b"], icon: BrainCircuit },
  "AI product": { colors: ["#60a5fa", "#818cf8"], icon: BrainCircuit },
  "Machine learning": { colors: ["#fcd34d", "#f59e0b"], icon: BrainCircuit },
  "Data engineering": { colors: ["#22d3ee", "#0ea5e9"], icon: Database },
  "Data analysis": { colors: ["#a78bfa", "#8b5cf6"], icon: LineChart },
  "Web application": { colors: ["#60a5fa", "#22d3ee"], icon: Globe2 },
  "Browser game": { colors: ["#f472b6", "#fb7185"], icon: Gamepad2 },
  "Full-stack platform": { colors: ["#34d399", "#10b981"], icon: Globe2 },
  "Full-stack community app": { colors: ["#34d399", "#22d3ee"], icon: Globe2 },
};

const FALLBACK_STYLE: CoverStyle = { colors: ["#fbbf24", "#60a5fa"], icon: Code2 };

/** Card header: a real screenshot when the project has one, otherwise a
 *  styled gradient cover keyed to the project's category. */
export function ProjectCover({ project }: { project: PortfolioProject }) {
  const { colors, icon: Icon } = CATEGORY_STYLES[project.category] ?? FALLBACK_STYLE;
  const [g1, g2] = colors;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-[22px]">
      {project.cover ? (
        <Image
          src={project.cover}
          alt={`${project.title} — screenshot`}
          fill
          sizes="(min-width: 768px) 34rem, 92vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${g1}30 0%, rgba(4,4,14,0.35) 48%, ${g2}36 100%)`,
          }}
        >
          <div className="grid-bg absolute inset-0 opacity-70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span
              className="glass flex size-16 items-center justify-center rounded-2xl"
              style={{ color: g1 }}
            >
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
        className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(80% 60% at 50% 100%, ${g1}22 0%, transparent 70%)`,
        }}
      />
      <div aria-hidden className="preview-shimmer absolute inset-0" />

      <span className="glass absolute right-4 top-4 rounded-full px-3 py-1 font-display text-xs">
        {project.state}
      </span>
    </div>
  );
}
