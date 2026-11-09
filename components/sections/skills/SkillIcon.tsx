import type { LucideIcon } from "lucide-react";
import { AudioWaveform, BookText, ChartScatter, ChartSpline, Drama, FileSearch, Layers2 } from "lucide-react";
import {
  siDocker,
  siFastapi,
  siGit,
  siGithubactions,
  siGooglegemini,
  siHuggingface,
  siLanggraph,
  siNestjs,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPrisma,
  siPytest,
  siPython,
  siPytorch,
  siQdrant,
  siReact,
  siReactquery,
  siRedis,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";
import { SimpleIcon } from "@/components/shared/SocialIcon";

type Brand = { path: string };

// Keyed by the names in data/skills.ts. Tools get their own mark; methods
// that have no logo (LoRA, CTC, RAG, …) get a line icon for what they do.
const icons: Record<string, Brand | LucideIcon> = {
  Python: siPython,
  pandas: siPandas,
  NumPy: siNumpy,
  "scikit-learn": siScikitlearn,
  Matplotlib: ChartSpline,
  PyTorch: siPytorch,
  Transformers: siHuggingface,
  "LoRA / QLoRA": Layers2,
  "wav2vec2 + CTC": AudioWaveform,
  KenLM: BookText,
  RAG: FileSearch,
  Embeddings: ChartScatter,
  LangGraph: siLanggraph,
  "Gemini API": siGooglegemini,
  Qdrant: siQdrant,
  FastAPI: siFastapi,
  NestJS: siNestjs,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Redis: siRedis,
  Docker: siDocker,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  "TanStack Query": siReactquery,
  Git: siGit,
  "GitHub Actions": siGithubactions,
  pytest: siPytest,
  Playwright: Drama,
  Vercel: siVercel,
};

/** A skill's mark in a small square tile, one ink colour for all of them so
 *  the page keeps its single accent. Decorative: the name sits beside it. */
export function SkillIcon({ name }: { name: string }) {
  const icon = icons[name];
  return (
    <span className="skill-icon" aria-hidden="true">
      {icon ? <Glyph icon={icon} /> : <span className="text-[0.6875rem] font-bold">{name.slice(0, 2)}</span>}
    </span>
  );
}

function Glyph({ icon: Icon }: { icon: Brand | LucideIcon }) {
  if ("path" in Icon) return <SimpleIcon icon={Icon} className="size-[1.05rem]" />;
  return <Icon className="size-[1.15rem]" strokeWidth={1.75} />;
}
