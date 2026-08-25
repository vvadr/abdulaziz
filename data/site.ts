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

export type SocialIconName = "github" | "linkedin" | "telegram" | "email";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
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

// Section anchors in page order; the hero is reached via the brand mark.
export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const greetings = [
  "Hello",
  "Привет",
  "Salom",
  "Assalomu alaykum",
  "Hi",
];

export const heroAvailability = "Open to internships & freelance";

// Rendered after the serif "Frontend developer" opener in the hero.
export const heroTagline =
  "shipping clean, responsive interfaces with React, Next.js, and TypeScript — and growing into AI engineering with Python.";

export const heroLocation = "Tashkent, Uzbekistan";

export const aboutSummary =
  "I started with frontend in 2022 and now build production interfaces at Hiwelcome while studying AI & ML on a full scholarship at Bepro. I care about clean component structure, honest UX, and shipping real things — and I'm steadily moving my Python and machine-learning practice from notebooks toward deployed products.";

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
] satisfies SocialLink[];

export const experienceItems: ExperienceItem[] = [
  {
    title: "AI/ML Intern",
    type: "IT Park",
    period: "April 2026 - Present",
    description:
      "Supporting practical machine-learning workflows in Python, from dataset preparation through model training and evaluation.",
    details: [
      "Prepared datasets in Python by handling missing values, data types, categorical features, encoding, and scaling.",
      "Built supervised ML notebooks with train/test splits, preprocessing pipelines, model training, and evaluation.",
      "Evaluated regression and classification models with MSE, MAE, R² score, accuracy, and confusion matrices.",
      "Kept project notebooks, code, and experiment notes organized in GitHub.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Jupyter Notebook", "GitHub"],
  },
  {
    title: "Frontend Engineer",
    type: "Hiwelcome.uz",
    companyUrl: "https://hiwelcome.uz",
    period: "January 2026 - Present",
    description:
      "Building production-facing web interfaces and API-driven product pages with React, Next.js, TypeScript, and Tailwind CSS.",
    details: [
      "Built production-facing web interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
      "Created reusable components and responsive layouts for API-based product pages.",
      "Worked on data display, UI logic, component structure, and maintainable frontend implementation.",
      "Used Git/GitHub and typed development habits in a real product environment.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer",
    type: "Delever.uz",
    companyUrl: "https://delever.uz",
    period: "February 2026",
    description:
      "Developed responsive React and Next.js interfaces in a collaborative team environment.",
    details: [
      "Developed responsive React/Next.js interfaces in a team environment.",
      "Improved component structure, layout consistency, and user-facing page behavior.",
      "Strengthened practical frontend delivery across requirements, maintainability, review, and implementation.",
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

// Single source for contact details — consumed by the Contact section.
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
