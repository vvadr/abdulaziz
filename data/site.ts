export type NavItem = {
  id: string;
  label: string;
};

export type ExperienceItem = {
  company: string;
  /** Another name the company goes by, shown under it. */
  companyAlias?: string;
  companyUrl?: string;
  title: string;
  period: string;
  details: string[];
  tech: string[];
};

export type EducationItem = {
  title: string;
  provider: string;
  /** Extra attribution shown after the provider. */
  providerNote?: string;
  period: string;
  focus: string;
};

export type SocialIconName = "github" | "linkedin" | "telegram" | "email" | "huggingface";

export type SocialLink = {
  label: string;
  /** Handle or address shown next to the label. */
  value: string;
  href: string;
  icon: SocialIconName;
};

export type ResumeLink = {
  label: string;
  href: string;
};

export type HeroHighlight = {
  title: string;
  detail: string;
  href: string;
};

// Two CVs, one per role the site markets.
export const resumeLinks: ResumeLink[] = [
  { label: "AI/ML CV", href: "/abdulaziz-yusupaliev-cv-ai-ml.pdf" },
  { label: "Frontend CV", href: "/abdulaziz-yusupaliev-cv-frontend.pdf" },
];

// Deployment URL — used for metadata, canonical links, and OG previews.
// Update this to the live domain when it changes.
export const siteUrl = "https://abdulazizyusupaliev.vercel.app";

export const siteRole = "Applied AI/ML Engineer & Full-Stack Developer";

export const siteMetadata = {
  title: `Abdulaziz Yusupaliev | ${siteRole}`,
  description:
    "Abdulaziz Yusupaliev is an applied AI/ML engineer and full-stack developer in Tashkent, Uzbekistan — speech recognition, RAG and agent systems, and production web platforms built with Python, PyTorch, FastAPI, NestJS, and Next.js.",
  keywords: [
    "Abdulaziz Yusupaliev",
    "AI/ML Engineer",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "Speech Recognition",
    "RAG",
    "LangGraph",
    "PyTorch",
    "FastAPI",
    "NestJS",
    "Next.js",
    "Tashkent",
    "Uzbekistan",
  ],
};

// Section anchors in page order; the hero is reached via the brand mark.
export const navItems: NavItem[] = [
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export type Greeting = {
  text: string;
  /** BCP 47 tag, shown next to the decoded word and set as its `lang`. */
  lang: string;
};

// Decoded one after another by the hero's waveform.
export const greetings: Greeting[] = [
  { text: "Hello", lang: "en" },
  { text: "Привет", lang: "ru" },
  { text: "Salom", lang: "uz" },
  { text: "Assalomu alaykum", lang: "uz" },
  { text: "Hi", lang: "en" },
];

export const heroAvailability = "Open to internships & freelance";

export const heroLocation = "Tashkent, Uzbekistan";

// The hero line reads: "<heroRole> <heroTagline>", with the role in serif.
export const heroRole = "Applied AI/ML engineer";

export const heroTagline = "and full-stack developer. I train models and ship the products around them.";

// Three proof points under the hero — each one links to its evidence.
export const heroHighlights: HeroHighlight[] = [
  {
    title: "Karakalpak speech model",
    detail: "18.3–18.6% WER, on Hugging Face",
    href: "/projects/karakalpak-speech-recognition",
  },
  {
    title: "Dwelve & Volontyorlar",
    detail: "Two live platforms, end to end",
    href: "#projects",
  },
  {
    title: "Uzinfocom AI Labs",
    detail: "ML engineer at zehnmind.ai",
    href: "#experience",
  },
];

export const aboutParagraphs = [
  "AI/ML engineer and full-stack developer in Tashkent. I started in frontend in 2022 and moved into machine learning in 2026.",
  "Now an ML engineer at Uzinfocom AI Labs and a frontend engineer at Hiwelcome. On the side, I build Dwelve and Volontyorlar.",
];

export const recognition = "National and international AIMO medalist";

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    value: "vvadr",
    href: "https://github.com/vvadr",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "1mabdulaziz",
    href: "https://www.linkedin.com/in/1mabdulaziz/",
    icon: "linkedin",
  },
  {
    label: "Hugging Face",
    value: "iamabdulaziz",
    href: "https://huggingface.co/iamabdulaziz",
    icon: "huggingface",
  },
  {
    label: "Telegram",
    value: "imabdulazz",
    href: "https://t.me/imabdulazz",
    icon: "telegram",
  },
  {
    label: "Email",
    value: "abdulazizyusupaliev009@gmail.com",
    href: "mailto:abdulazizyusupaliev009@gmail.com",
    icon: "email",
  },
];

// Current roles first, then past roles by end date.
export const experienceItems: ExperienceItem[] = [
  {
    company: "Uzinfocom AI Labs",
    companyAlias: "zehnmind.ai",
    companyUrl: "https://zehnmind.ai",
    title: "Machine Learning Engineer",
    period: "Sep 2026 – Present",
    details: [
      "Review and correct transcriptions for speech-to-text training data.",
      "Annotate and quality-check speech datasets for ASR models.",
      "Joined the core team after a three-week internship.",
    ],
    tech: ["ASR", "Speech data", "Dataset QA"],
  },
  {
    company: "Hiwelcome",
    companyUrl: "https://hiwelcome.uz",
    title: "Frontend Engineer",
    period: "Jan 2026 – Present",
    details: [
      "Build pages and reusable components on the company’s APIs.",
      "Mostly the main web app, plus the admin panel and smaller apps.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    company: "IT Park",
    title: "AI/ML Intern",
    period: "Apr 2026 – Aug 2026",
    details: [
      "Cleaned, encoded, and scaled datasets with pandas.",
      "Built and evaluated scikit-learn pipelines (MSE, MAE, R², accuracy).",
    ],
    tech: ["Python", "pandas", "scikit-learn"],
  },
  {
    company: "Delever",
    companyUrl: "https://delever.uz",
    title: "Frontend Developer",
    period: "Feb 2026",
    details: ["Built responsive pages and reusable React components."],
    tech: ["React", "Next.js"],
  },
];

// Newest first.
export const educationItems: EducationItem[] = [
  {
    title: "Full Scholarship Program in AI & ML",
    provider: "Bepro",
    providerNote: "World Bank & IT Park",
    period: "2026",
    focus: "ML, deep learning, model evaluation",
  },
  {
    title: "Frontend Development Program",
    provider: "IT Park",
    period: "2024",
    focus: "React, Next.js, TypeScript",
  },
  {
    title: "Frontend Development Program",
    provider: "Proweb",
    period: "2022 – 2023",
    focus: "HTML, CSS, JavaScript",
  },
];
