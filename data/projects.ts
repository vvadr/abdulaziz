export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  state: "Live" | "Case study" | "Source available";
  summary: string;
  description: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Set to false when the deployment sends X-Frame-Options/CSP headers that block iframe embedding. */
  embeddable?: boolean;
};

// Projects are verified from the connected vvadr GitHub account. Private
// client work is intentionally left out of this public list.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "dwelve",
    title: "Dwelve",
    category: "Full-stack platform",
    state: "Live",
    summary:
      "A full-stack exam and test-automation platform for schools and learning centers in Uzbekistan.",
    description:
      "Dwelve lets schools, teachers, and students digitize the exam and homework lifecycle: creating classes and groups, assigning tests and exams, submitting and auto-grading work, and tracking results through role-specific dashboards. The product ships as a full-stack app — a Next.js frontend with authentication-aware, trilingual UI on top of an API-driven backend.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "i18next",
      "react-hook-form",
      "zod",
    ],
    highlights: [
      "Full-stack app: role-based dashboards for students and teachers, backed by an API for classes, assignments, and grading.",
      "Trilingual UI with dedicated flows for exams, homework tasks vs. tests, class/group management, and notifications.",
      "Typed, schema-validated forms (react-hook-form + zod) across authentication, test creation, and submission flows.",
    ],
    liveUrl: "https://dwelve.vercel.app",
    // Dwelve sends X-Frame-Options: DENY in production (it guards authenticated
    // dashboards), so browsers refuse to render it inside our preview iframe.
    embeddable: false,
  },
  {
    slug: "multi-agent-ai-analyst",
    title: "Multi-Agent AI Analyst",
    category: "AI product",
    state: "Source available",
    summary:
      "A document-analysis product with a FastAPI service, durable background work, and a Next.js client.",
    description:
      "Readers can register, upload documents, and ask evidence-backed questions. A supervisor workflow routes work across retrieval, optional research, and analytics before returning a cited answer.",
    stack: ["FastAPI", "Next.js", "PostgreSQL", "Qdrant", "MinIO", "Docker"],
    highlights: [
      "Uses a queued worker model so long-running analysis can survive browser sessions and service restarts.",
      "Streams persisted progress events back to the browser and restores in-flight work after a reconnect.",
      "Separates development, test, and production configuration and documents the complete deployment path.",
    ],
    repoUrl: "https://github.com/vvadr/Multi-Agent-AI-Analyst",
  },
  {
    slug: "yelp-restaurant-rating-prep",
    title: "Yelp Restaurant Data Prep",
    category: "Data engineering",
    state: "Source available",
    summary:
      "A reproducible data-preparation pipeline that turns Yelp Open Dataset files into a clean restaurant dataset.",
    description:
      "The project filters, transforms, and documents restaurant and review data into a 22-column Parquet output. It includes reusable pipeline code, executed learning notebooks, a findings report, and generated figures.",
    stack: ["Python", "Pandas", "Parquet", "Jupyter", "Data pipelines"],
    highlights: [
      "Processes large review files in chunks rather than loading everything into memory at once.",
      "Produces a documented, analysis-ready dataset alongside findings and visual reports.",
      "Captures data cleaning, feature engineering, feature selection, and end-to-end pipeline work in notebooks.",
    ],
    repoUrl: "https://github.com/vvadr/yelp-restaurant-rating-prep",
  },
  {
    slug: "weather-app-react",
    title: "Weather App",
    category: "Web application",
    state: "Live",
    summary:
      "A responsive React weather interface that fetches and presents live API data.",
    description:
      "A client-side weather product built around readable data views, responsive layout behavior, and common React application tooling. The public GitHub Pages deployment is available to try directly from this case study.",
    stack: ["React", "Axios", "React Router", "React Calendar", "React Toastify"],
    highlights: [
      "Connects the interface to weather data through API requests.",
      "Uses routed views and responsive components to keep weather information easy to scan.",
      "Includes a verified public GitHub Pages deployment.",
    ],
    repoUrl: "https://github.com/vvadr/weather-app-react",
    liveUrl: "https://vvadr.github.io/weather-app-react/",
  },
  {
    slug: "geometry-dash",
    title: "Geometry Dash",
    category: "Browser game",
    state: "Live",
    summary:
      "A canvas runner with local score tracking, collision states, and collectible power-ups.",
    description:
      "A browser game inspired by arcade runners. It is implemented without a frontend framework and uses canvas rendering, keyboard controls, local persistence, and responsive page layout.",
    stack: ["HTML", "CSS", "JavaScript", "Canvas API", "localStorage"],
    highlights: [
      "Playable runner controls include jump, pause, and restart interactions.",
      "Tracks current and best scores in the browser using localStorage.",
      "Adds three distinct collectibles that change collision, timing, or jump behavior.",
    ],
    repoUrl: "https://github.com/vvadr/geometry-dash",
    liveUrl: "https://vvadr.github.io/geometry-dash/",
  },
  {
    slug: "udevs-app",
    title: "udevs",
    category: "Full-stack community app",
    state: "Source available",
    summary:
      "A social and community web app with a React client, GraphQL, and a Strapi backend.",
    description:
      "The frontend includes user, profile, blog, saved-content, and topic views. It consumes a GraphQL API and is paired with a Strapi application that provides content and authentication capabilities.",
    stack: ["React", "Apollo Client", "GraphQL", "Material UI", "Sass", "Strapi"],
    highlights: [
      "Combines a routed React client with an API-driven application architecture.",
      "Uses Apollo Client, GraphQL, Material UI, Sass, and browser-side state helpers.",
      "The original public Pages configuration points at an invalid custom domain, so this entry deliberately does not present a broken trial link.",
    ],
    repoUrl: "https://github.com/vvadr/udevs-app",
  },
  {
    slug: "flower-ml-model",
    title: "Flower ML Model",
    category: "Machine learning",
    state: "Source available",
    summary:
      "An introductory Iris-classification notebook that demonstrates a full supervised learning workflow.",
    description:
      "The notebook goes from loading and inspecting the Iris dataset through train/test splitting, Random Forest training, evaluation, and visualization. It is intentionally compact and transparent as an AI/ML learning project.",
    stack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter"],
    highlights: [
      "Uses a held-out test split to make model evaluation explicit.",
      "Builds a human-readable comparison of predicted and actual flower species.",
      "Visualizes the feature space to explain the classifier's result.",
    ],
    repoUrl: "https://github.com/vvadr/Flower_ML_model",
  },
];

export function getProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
