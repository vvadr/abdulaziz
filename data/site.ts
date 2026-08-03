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
  /** Filename shown on the editor-style nav tab. */
  file: string;
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

export type ResumeLink = {
  label: string;
  href: string;
};

// Two CVs, framed for the two roles the hero markets: frontend and AI/ML.
export const resumeLinks: ResumeLink[] = [
  { label: "Frontend CV", href: "/abdulaziz-yusupaliev-cv-frontend.pdf" },
  { label: "AI/ML CV", href: "/abdulaziz-yusupaliev-cv-ai-ml.pdf" },
];

// Deployment URL — used for metadata, canonical links, and OG previews.
// Update this to the live domain when it changes.
export const siteUrl = "https://abdulazizyusupaliev.vercel.app";

export const siteMetadata = {
  title: "Abdulaziz Yusupaliev | Frontend Developer & AI/ML Engineer",
  description:
    "Portfolio of Abdulaziz Yusupaliev — a frontend developer from Tashkent shipping React and Next.js interfaces while building practical AI/ML workflows with Python.",
  keywords: [
    "Abdulaziz Yusupaliev",
    "AI/ML Engineer",
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
  { id: "home", label: "Home", file: "index.tsx" },
  { id: "skills", label: "Skills", file: "skills.json" },
  { id: "experience", label: "Experience", file: "experience.log" },
  { id: "projects", label: "Projects", file: "projects/" },
  { id: "education", label: "Education", file: "education.md" },
  { id: "contact", label: "Contact", file: "contact.sh" },
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
    href: "https://github.com/vvadr",
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
    value: "vvadr",
    href: "https://github.com/vvadr",
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

