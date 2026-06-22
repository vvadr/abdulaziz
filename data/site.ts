import {
  BriefcaseBusiness,
  FolderGit2,
  Mail,
  Send,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
};

export type ExperienceItem = {
  title: string;
  type: string;
  companyUrl?: string;
  period?: string;
  description: string;
  details: string[];
  tech: string[];
};

export type ProjectItem = {
  title: string;
  category: string;
  status: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  details: string[];
};

export type EducationItem = {
  title: string;
  provider: string;
  period: string;
  location: string;
  focus: string;
  description: string;
  subjects: string[];
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export type HeroSocialIconName = "github" | "linkedin" | "telegram" | "email";

export type HeroSocialLink = {
  label: string;
  href: string;
  icon: HeroSocialIconName;
};

// Deployment URL — used for metadata, canonical links, and OG previews.
// Update this to the live domain when it changes.
export const siteUrl = "https://abdulazizyusupaliev.vercel.app";

export const siteMetadata = {
  title: "Abdulaziz Yusupaliev | AI Engineer & Frontend Developer",
  description:
    "Portfolio of Abdulaziz Yusupaliev — an AI Engineer & Frontend Developer from Tashkent shipping production React and Next.js interfaces while growing into machine learning with Python.",
  keywords: [
    "Abdulaziz Yusupaliev",
    "AI Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Machine Learning",
    "TypeScript",
    "Tashkent",
    "Uzbekistan",
  ],
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const greetings = [
  "Hello",
  "\u041F\u0440\u0438\u0432\u0435\u0442",
  "Salom",
  "Assalomu alaykum",
  "Hi",
];

export const heroDescription =
  "I'm growing into AI engineering and machine learning with Python — and I ship clean, responsive production interfaces with React, Next.js, and TypeScript. Frontend is where I deliver today; AI is where I'm headed.";

export const heroLocation = "Tashkent, Uzbekistan";

export const heroSocialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/abdulazizyusupaliev",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdulaziz-yusupaliev-521166377",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:abdulazizyusupaliev009@gmail.com",
    icon: "email",
  },
  {
    label: "Telegram",
    href: "https://t.me/d_vaderrr",
    icon: "telegram",
  },
] satisfies HeroSocialLink[];

export const experienceItems: ExperienceItem[] = [
  {
    title: "Frontend Engineer",
    type: "Hiwelcome.uz",
    companyUrl: "https://hiwelcome.uz",
    period: "January 2026 - Present",
    description:
      "Worked as a frontend engineer, building responsive website interfaces with React and Next.js. Focused on clean component structure, TypeScript implementation, and Tailwind CSS styling.",
    details: [
      "Built responsive website sections and reusable frontend components for a production-facing web experience.",
      "Used TypeScript to keep component props, UI states, and implementation details easier to maintain.",
      "Focused on clean layout structure, polished spacing, responsive behavior, and Tailwind CSS styling.",
      "Worked with modern Next.js and React patterns while improving practical frontend engineering discipline.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    type: "Delever.uz",
    companyUrl: "https://delever.uz",
    period: "February 2026",
    description:
      "Worked as a frontend developer, building and improving responsive website interfaces with React and Next.js. Focused on clean component structure, Tailwind CSS styling, and practical frontend implementation in a team environment.",
    details: [
      "Improved frontend interfaces with attention to responsive layouts, readable components, and consistent styling.",
      "Practiced team-oriented frontend development by turning interface requirements into clean React sections.",
      "Worked with Next.js, TypeScript, and Tailwind CSS to create maintainable UI implementation.",
      "Strengthened practical development habits around component structure, visual polish, and delivery quality.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export const projectItems: ProjectItem[] = [
  {
    title: "GradeFlow Frontend",
    category: "EdTech Platform",
    status: "Live",
    description:
      "Frontend for an online platform focused on student management plus test and exam automation, built as a modern multi-route web app.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React Hook Form",
      "i18next",
      "Zod",
      "Three.js",
      "shadcn/ui",
    ],
    repoUrl: "https://github.com/DwelveOrg/frontend",
    liveUrl: "https://gradefloworg.vercel.app",
    details: [
      "Repository description positions the product as an online platform for managing students and automating tests and exams.",
      "The app structure includes landing pages, authentication flows, dashboard pages, groups, school views, notifications, profile, and settings areas.",
      "Assignment routes already exist for exams and homework, with animated filtering and card-based UI built into the current frontend.",
      "The codebase uses a modern Next.js App Router stack with localization, form validation, motion, and reusable component patterns.",
    ],
  },
  {
    title: "Flower ML Model",
    category: "AI / Machine Learning",
    status: "Notebook",
    description:
      "A compact machine learning notebook that walks through a full supervised learning workflow using the Iris dataset from loading to evaluation.",
    stack: ["Python", "Pandas", "Matplotlib", "Scikit-learn", "Jupyter Notebook"],
    repoUrl: "https://github.com/abdulazizyusupaliev/Flower_ML_model",
    details: [
      "The notebook is framed as a quick-win AI/ML exercise meant to show the full workflow before going deep into theory.",
      "It loads and inspects the Iris dataset, builds a DataFrame, performs a train and test split, trains a RandomForestClassifier, and checks prediction accuracy.",
      "The stored notebook output reports 100% accuracy on the included test split, which fits the simple Iris classification setup used here.",
      "The notebook also visualizes class separation with a flower-feature scatter plot to make the model behavior easier to understand.",
    ],
  },
  {
    title: "udevs-app",
    category: "Social / Community App",
    status: "Prototype",
    description:
      "A Twitter-like web app for udevs with content sections, profiles, saved items, and a GraphQL-powered frontend architecture.",
    stack: [
      "React",
      "JavaScript",
      "Apollo Client",
      "GraphQL",
      "Material UI",
      "Sass",
      "Axios",
      "React Router",
    ],
    repoUrl: "https://github.com/abdulazizyusupaliev/udevs-app",
    details: [
      "The repository description calls it a Twitter-like web app for udevs, and the source structure includes pages for users, profiles, blogs, saved content, and topic-specific sections.",
      "Apollo Client is wired to a GraphQL endpoint, showing an API-driven frontend rather than a static demo.",
      "The UI stack combines Material UI, Emotion, Sass styling, React Router, and popup state helpers for interface behavior.",
      "A CNAME file exists in the repo, but it currently contains a typo, so there is no reliable live website link to surface yet.",
    ],
  },
  {
    title: "weather-app-react",
    category: "Weather / API Frontend",
    status: "Live",
    description:
      "A React weather app frontend that requests weather API data and presents it in a clean, responsive interface.",
    stack: [
      "React",
      "JavaScript",
      "Axios",
      "React Router",
      "React Calendar",
      "React Toastify",
      "Create React App",
    ],
    repoUrl: "https://github.com/abdulazizyusupaliev/weather-app-react",
    liveUrl: "https://abdulazizyusupaliev.github.io/weather-app-react/",
    details: [
      "Built as a weather-focused frontend that makes API requests and renders the returned data in the UI.",
      "Uses React, Axios, and React Router to organize the interface and handle data-driven views.",
      "Keeps the layout responsive and simple so the weather information is easy to read on desktop and mobile.",
      "Includes a live GitHub Pages deployment for the portfolio card.",
    ],
  },
  {
    title: "Geometry Dash",
    category: "Browser Game",
    status: "Playable Prototype",
    description:
      "A frontend-only Geometry Dash inspired browser project with canvas gameplay, local best-score tracking, and collectible power-ups.",
    stack: ["HTML", "CSS", "JavaScript", "Canvas API", "localStorage"],
    repoUrl: "https://github.com/abdulazizyusupaliev/geometry-dash",
    details: [
      "The game is built with plain HTML, CSS, and JavaScript, with a neon arcade presentation and no frontend framework required.",
      "The README and source code confirm jump, pause, and restart controls along with persistent best-score tracking in localStorage.",
      "Three power-ups are implemented in the current version: Shield Core, Time Warp, and Jump Surge, each changing the run in a different way.",
      "The project includes a landing section, gameplay HUD, overlay states, procedural obstacles, and canvas-based runner logic.",
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    title: "Frontend Development Program",
    provider: "Proweb",
    period: "2022 - 2023",
    location: "Tashkent, Uzbekistan",
    focus: "HTML, CSS, JavaScript, PHP, Webpack",
    description:
      "Learned the basics of web development and frontend structure.",
    subjects: ["HTML", "CSS", "JavaScript", "PHP", "Webpack"],
  },
  {
    title: "Frontend Development Program",
    provider: "IT Park",
    period: "2024",
    location: "Tashkent, Uzbekistan",
    focus: "React, Next.js, TypeScript, SCSS",
    description:
      "Studied modern frontend tools and built work with React-based stack.",
    subjects: ["React", "Next.js", "TypeScript", "SCSS"],
  },
  {
    title: "Full Scholarship Program in AI & ML",
    provider: "Bepro",
    period: "2026",
    location: "Tashkent, Uzbekistan",
    focus: "Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn",
    description:
      "Studied AI and machine learning basics with Python and data tools.",
    subjects: [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
    ],
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "abdulazizyusupaliev009@gmail.com",
    href: "mailto:abdulazizyusupaliev009@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "abdulazizyusupaliev",
    href: "https://github.com/abdulazizyusupaliev",
    icon: FolderGit2,
  },
  {
    label: "LinkedIn",
    value: "Abdulaziz Yusupaliev",
    href: "https://www.linkedin.com/in/abdulaziz-yusupaliev-521166377",
    icon: BriefcaseBusiness,
  },
  {
    label: "Telegram",
    value: "d_vaderrr",
    href: "https://t.me/d_vaderrr",
    icon: Send,
  },
];

