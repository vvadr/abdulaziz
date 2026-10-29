export type SkillEvidence = {
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  skills: string[];
  /** Where these skills were used — each links to the evidence. */
  usedIn: SkillEvidence[];
};

const project = (label: string, slug: string): SkillEvidence => ({
  label,
  href: `/projects/${slug}`,
});

// Grouped by the kind of work rather than by tool type, and limited to tools
// that appear in a CV, a role, or a public repository.
export const skillGroups: SkillGroup[] = [
  {
    title: "Machine learning",
    skills: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib"],
    usedIn: [
      { label: "IT Park", href: "/experience" },
      project("Yelp pipeline", "yelp-restaurant-rating-prep"),
    ],
  },
  {
    title: "Deep learning & speech",
    skills: ["PyTorch", "Transformers", "LoRA / QLoRA", "wav2vec2 + CTC", "KenLM"],
    usedIn: [
      project("Karakalpak ASR", "karakalpak-speech-recognition"),
      project("LoanSource AI", "loansource-ai"),
    ],
  },
  {
    title: "LLM applications",
    skills: ["RAG", "Embeddings", "LangGraph", "Gemini API", "Qdrant"],
    usedIn: [
      project("Multi-Agent AI Analyst", "multi-agent-ai-analyst"),
      project("Loan Terms Assistant", "loan-terms-assistant"),
      project("Dwelve", "dwelve"),
    ],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker"],
    usedIn: [
      project("Dwelve", "dwelve"),
      project("Volontyorlar", "volontyorlar"),
      project("Multi-Agent AI Analyst", "multi-agent-ai-analyst"),
    ],
  },
  {
    title: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "TanStack Query"],
    usedIn: [
      { label: "Hiwelcome", href: "/experience" },
      project("Dwelve", "dwelve"),
      project("Volontyorlar", "volontyorlar"),
    ],
  },
  {
    title: "Testing & delivery",
    skills: ["Git", "GitHub Actions", "pytest", "Playwright", "Vercel"],
    usedIn: [
      project("Volontyorlar", "volontyorlar"),
      project("Multi-Agent AI Analyst", "multi-agent-ai-analyst"),
    ],
  },
];
