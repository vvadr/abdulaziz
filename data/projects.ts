/** Which group a project is listed under in "More projects". */
export type ProjectArea = "ai" | "web";

export const projectAreas: { id: ProjectArea; label: string }[] = [
  { id: "ai", label: "AI, ML & data" },
  { id: "web", label: "Web & frontend" },
];

export type ProjectLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  /** Featured projects get a full case-study card on the home page; the rest
   *  are listed compactly under "More projects". */
  featured: boolean;
  area: ProjectArea;
  category: string;
  state: "Live" | "Published" | "Source available";
  /** One sentence for cards: what it is and what it does. */
  summary: string;
  /** My part in it, stated plainly. */
  role: string;
  /** Two or three short proof points for the featured card. */
  keyPoints?: string[];
  /** Case-study intro paragraph. */
  description: string;
  /** Measured outcomes only — never estimates. */
  results?: string[];
  /** What I built, for the case study. */
  highlights: string[];
  /** Known gaps, stated as the repository states them. */
  limitations?: string[];
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Other public artifacts (model hubs, companion repositories). */
  links?: ProjectLink[];
  /** Set to false when the deployment sends X-Frame-Options/CSP headers that block iframe embedding. */
  embeddable?: boolean;
  /** Screenshot shown on the project card; cards fall back to a styled cover. */
  cover?: string;
};

// Every claim below is taken from the project's repository, its README, or
// the live deployment. Array order is ranking — strongest first; see
// projectsInDisplayOrder for how the home page groups them.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "karakalpak-speech-recognition",
    title: "Karakalpak Speech Recognition",
    featured: true,
    area: "ai",
    category: "Speech recognition",
    state: "Published",
    summary: "Speech-to-text for Karakalpak, a low-resource language.",
    role: "Data pipeline, training, evaluation, and release.",
    keyPoints: [
      "18.61% WER on news, 18.30% on literary speech",
      "Trained on 77 hours of audio",
      "Model and datasets on Hugging Face",
    ],
    description:
      "wav2vec2 XLS-R 300M fine-tuned with LoRA and decoded with a 4-gram KenLM. The model, decoder, and datasets are public.",
    results: [
      "18.61% WER on news and 18.30% on literary speech, down from 38.37% and 22.32% with greedy decoding.",
      "20.3–21.3% WER on three external test sets.",
      "Trained on 17,685 clips (77.45 h) in about 2.5 hours on one GPU.",
    ],
    highlights: [
      "Validated 22,108 recordings with provenance tracking and 37 automated checks.",
      "Karakalpak text normalization and a 35-token character vocabulary.",
      "Scores recomputed from saved predictions before release.",
      "CPU inference client for the published model.",
    ],
    limitations: [
      "No speaker IDs, so accuracy on unseen speakers is unknown.",
      "Overlap between external test sets and training data isn’t ruled out.",
      "No hosted API yet.",
    ],
    stack: ["Python", "PyTorch", "Transformers", "LoRA", "wav2vec2", "KenLM"],
    repoUrl: "https://github.com/vvadr/karakalpak-stt-model",
    cover: "/images/projects/karakalpak-speech-recognition.jpg",
    links: [
      {
        label: "Hugging Face",
        href: "https://huggingface.co/collections/iamabdulaziz/karakalpak-speech-recognition-6adb410958c2ef152fe249f2",
      },
    ],
  },
  {
    slug: "dwelve",
    title: "Dwelve",
    featured: true,
    area: "web",
    category: "Education platform",
    state: "Live",
    summary: "Exam and test platform for schools.",
    role: "Built all four apps, backend to UI.",
    keyPoints: [
      "AI turns PDF exam pages into editable tests",
      "Multi-tenant NestJS + PostgreSQL API",
      "Four apps live on dwelve.uz",
    ],
    description:
      "Schools run classes, tests, and exams, and teachers can import tests from PDFs with AI. Runs as an API, a product app, a public site, and an admin console.",
    highlights: [
      "AI PDF import: Gemini extracts questions from selected pages into a draft test. The original file is never stored.",
      "School-scoped data with admin, teacher, and student roles.",
      "Trilingual Next.js app with validated forms.",
      "Admin console on its own domain, kept out of the student bundle.",
    ],
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "Gemini API", "Next.js"],
    liveUrl: "https://dwelve.uz",
    // Sends X-Frame-Options: DENY.
    embeddable: false,
    cover: "/images/projects/dwelve.jpg",
  },
  {
    slug: "volontyorlar",
    title: "Volontyorlar",
    featured: true,
    area: "web",
    category: "Volunteering platform",
    state: "Live",
    summary: "Volunteering platform for young people in Uzbekistan.",
    role: "Built the API and all five apps.",
    keyPoints: [
      "One NestJS API, five Next.js apps, all live",
      "Telegram, Google, and email sign-in",
      "Uzbek, Russian, and English",
    ],
    description:
      "Organizations post vacancies, admins approve them, volunteers apply, and coordinators confirm attendance and hours. Built for a 4,000+ member community that has supplied volunteers to 50+ events.",
    highlights: [
      "NestJS + Fastify API with PostgreSQL, Prisma, Redis/BullMQ jobs, and a Telegram bot.",
      "Separate apps and sessions for volunteers, coordinators, organizations, and admins.",
      "Typed API clients from OpenAPI; Vitest and Playwright tests.",
      "Localized routes in three languages and a strict CSP.",
    ],
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Next.js"],
    liveUrl: "https://volontyorlar.uz",
    // Sends X-Frame-Options: DENY and CSP frame-ancestors 'none'.
    embeddable: false,
    cover: "/images/projects/volontyorlar.jpg",
  },
  {
    slug: "multi-agent-ai-analyst",
    title: "Multi-Agent AI Analyst",
    featured: true,
    area: "ai",
    category: "AI agents · RAG",
    state: "Live",
    summary: "Ask questions about your documents; agents find and cite the answer.",
    role: "Built the backend. The Next.js client was generated with Claude.",
    keyPoints: [
      "LangGraph supervisor with retrieval, web, SQL, and critic agents",
      "Resumable runs streamed over SSE",
      "27 test modules and CI",
    ],
    description:
      "Upload PDF, Word, or text files and ask questions. A supervisor picks which agents to call, then returns a cited answer checked by a critic.",
    highlights: [
      "Bounded agent graph. The SQL agent is read-only, and model-written code is never run.",
      "Queued, stored runs that survive closed tabs and server restarts.",
      "Tenant isolation, Argon2 auth with rotating sessions, and rate limits.",
      "pytest, GitHub Actions, and RAGAS/Langfuse evaluation hooks.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "Gemini", "Qdrant", "PostgreSQL"],
    repoUrl: "https://github.com/vvadr/Multi-Agent-AI-Analyst",
    liveUrl: "https://multi-agent-ai-analyst-psi.vercel.app",
    embeddable: false,
    cover: "/images/projects/multi-agent-ai-analyst.jpg",
  },
  {
    slug: "loan-terms-assistant",
    title: "Loan Terms Assistant",
    featured: false,
    area: "ai",
    category: "RAG",
    state: "Live",
    summary: "Answers loan questions from the document, with page citations.",
    role: "Built the API, grounding check, and UI.",
    description:
      "Answers only from one loan document. Each answer is checked against the retrieved clauses before it’s shown.",
    highlights: [
      "Cites the page for every answer, or replies “Not stated in the terms.”",
      "Refuses off-topic questions and financial advice.",
      "FastAPI + Qdrant backend; the API key never reaches the browser.",
    ],
    stack: ["FastAPI", "Gemini", "Qdrant", "Next.js"],
    repoUrl: "https://github.com/vvadr/loan-terms-assistant",
    liveUrl: "https://loan-terms-assistant-black.vercel.app",
    cover: "/images/projects/loan-terms-assistant.jpg",
  },
  {
    slug: "loansource-ai",
    title: "LoanSource AI",
    featured: false,
    area: "ai",
    category: "LLM fine-tuning",
    state: "Source available",
    summary: "Qwen2.5-1.5B fine-tuned with QLoRA for loan-document Q&A.",
    role: "Built the data checks, training, retrieval, and app.",
    description:
      "Pick one of five loan documents and ask a question. Retrieval supplies the citations; the fine-tuned model writes the answer. Trains on a free Colab T4.",
    highlights: [
      "43 training and 8 held-out examples, validated before training.",
      "Tests for retrieval, refusals, and data validation.",
      "Refuses financial and legal advice.",
    ],
    stack: ["Qwen2.5", "QLoRA", "PEFT", "Gradio"],
    repoUrl: "https://github.com/vvadr/LoanSource-AI",
  },
  {
    slug: "yelp-restaurant-rating-prep",
    title: "Yelp Restaurant Rating Pipeline",
    featured: false,
    area: "ai",
    category: "Data pipeline",
    state: "Source available",
    summary: "Turns raw Yelp data into a clean dataset of 5,852 restaurants.",
    role: "Built the pipeline and report.",
    description:
      "Filters to one city, processes reviews in chunks, and writes a 22-column Parquet dataset for star-rating prediction.",
    results: [
      "5,852 restaurants, 22 features, mean rating 3.56.",
      "Review sentiment was the strongest feature (importance 0.79).",
    ],
    highlights: ["One CLI command, configurable by city.", "Six notebooks, from cleaning to pipelines."],
    stack: ["Python", "pandas", "scikit-learn"],
    repoUrl: "https://github.com/vvadr/yelp-restaurant-rating-prep",
  },
  {
    slug: "udevs-app",
    title: "udevs",
    featured: false,
    area: "web",
    category: "Social web app",
    state: "Source available",
    summary: "Twitter-style community app on React, GraphQL, and Strapi.",
    role: "Built the client and backend.",
    description: "Profiles, posts, saved content, and topics, served through GraphQL from a Strapi backend.",
    highlights: ["React client with Apollo Client and Material UI.", "Strapi backend for content and auth."],
    limitations: ["No live demo — the old domain no longer works."],
    stack: ["React", "GraphQL", "Strapi"],
    repoUrl: "https://github.com/vvadr/udevs-app",
    links: [
      { label: "Backend source", href: "https://github.com/vvadr/udevs-app-strapi-backend" },
    ],
  },
  {
    slug: "weather-app-react",
    title: "Weather App",
    featured: false,
    area: "web",
    category: "Frontend",
    state: "Live",
    summary: "Early React app showing live weather for Uzbek cities.",
    role: "Built the app.",
    description: "Current weather from OpenWeatherMap, with a city list and search. Built in 2024.",
    highlights: ["Temperature, clouds, humidity, wind, and pressure.", "City list and location search."],
    limitations: [
      "The repo’s main branch now holds a different project; the live demo is the 2024 build.",
    ],
    stack: ["React", "OpenWeatherMap API"],
    repoUrl: "https://github.com/vvadr/weather-app-react",
    liveUrl: "https://vvadr.github.io/weather-app-react/",
    cover: "/images/projects/weather-app-react.jpg",
  },
  {
    slug: "geometry-dash",
    title: "Geometry Dash",
    featured: false,
    area: "web",
    category: "Browser game",
    state: "Live",
    summary: "Canvas runner game in plain JavaScript.",
    role: "Built the game.",
    description: "An arcade runner with no framework: canvas rendering, keyboard controls, and saved scores.",
    highlights: [
      "Jump, pause, restart, and a saved best score.",
      "Three power-ups: shield, slow motion, and high jump.",
    ],
    stack: ["JavaScript", "Canvas API"],
    repoUrl: "https://github.com/vvadr/geometry-dash",
    liveUrl: "https://vvadr.github.io/geometry-dash/",
    cover: "/images/projects/geometry-dash.jpg",
  },
  {
    slug: "sport-team-odds",
    title: "Sport Team Odds",
    featured: false,
    area: "ai",
    category: "Data analysis",
    state: "Source available",
    summary: "Analysis of European soccer betting odds by team.",
    role: "Wrote the notebook.",
    description: "Queries the Kaggle European Soccer Database and compares Bet365 odds across teams.",
    highlights: ["SQLite queries into a focused analysis table.", "Annotated plot of the highest- and lowest-odds teams."],
    stack: ["pandas", "SQLite", "Matplotlib"],
    repoUrl: "https://github.com/vvadr/Sport-team-odds",
  },
  {
    slug: "flower-ml-model",
    title: "Flower ML Model",
    featured: false,
    area: "ai",
    category: "Machine learning",
    state: "Source available",
    summary: "Random Forest on the Iris dataset, end to end.",
    role: "Wrote the notebook.",
    description: "Load, split, train, predict, score, and plot — the full supervised-learning loop in a few cells.",
    highlights: ["Held-out test split.", "Predicted-vs-actual table and a feature plot."],
    stack: ["scikit-learn", "pandas", "Matplotlib"],
    repoUrl: "https://github.com/vvadr/Flower_ML_model",
  },
];

export const featuredProjects = portfolioProjects.filter((project) => project.featured);
export const moreProjects = portfolioProjects.filter((project) => !project.featured);

/** The order a visitor meets projects on the home page — featured first,
 *  then "Also built" grouped by area. Case-study prev/next follows it. */
export const projectsInDisplayOrder = [
  ...featuredProjects,
  ...projectAreas.flatMap((area) => moreProjects.filter((project) => project.area === area.id)),
];

export function getProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
