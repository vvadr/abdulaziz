import type { SimpleIcon } from "simple-icons";
import {
  siBootstrap,
  siCss,
  siGit,
  siGithub,
  siGitlab,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siNpm,
  siNumpy,
  siPandas,
  siPug,
  siPython,
  siReact,
  siScikitlearn,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons";

export type SkillIcon = {
  name: string;
  icon?: SimpleIcon;
  category: "Language" | "Frontend" | "Styling" | "Tool" | "AI / ML";
  glyph?: string;
  assetSrc?: string;
};

export type PortfolioSkill = {
  name: string;
  shortName?: string;
  assetSrc?: string;
  assetWidth?: number;
  assetHeight?: number;
  fallbackLabel?: string;
  fallbackColor?: string;
  showLabel?: boolean;
};

export type SkillGroup = {
  title: string;
  skills: PortfolioSkill[];
};

export const skillIcons: SkillIcon[] = [
  { name: "React", icon: siReact, category: "Frontend" },
  { name: "Next.js", icon: siNextdotjs, category: "Frontend" },
  { name: "JavaScript", icon: siJavascript, category: "Language" },
  { name: "TypeScript", icon: siTypescript, category: "Language" },
  { name: "HTML5", icon: siHtml5, category: "Styling" },
  { name: "CSS3", icon: siCss, category: "Styling" },
  { name: "Tailwind CSS", icon: siTailwindcss, category: "Styling" },
  { name: "Bootstrap", icon: siBootstrap, category: "Styling" },
  { name: "Pug", icon: siPug, category: "Styling" },
  { name: "Git", icon: siGit, category: "Tool" },
  { name: "GitHub", icon: siGithub, category: "Tool" },
  { name: "GitLab", icon: siGitlab, category: "Tool" },
  { name: "npm", icon: siNpm, category: "Tool" },
  { name: "Vercel", icon: siVercel, category: "Tool" },
  { name: "VS Code", glyph: "VS", category: "Tool" },
  { name: "Python", icon: siPython, category: "Language" },
  { name: "Pandas", icon: siPandas, category: "AI / ML" },
  { name: "NumPy", icon: siNumpy, category: "AI / ML" },
  { name: "Scikit-learn", icon: siScikitlearn, category: "AI / ML" },
  {
    name: "Matplotlib",
    assetSrc: "/matplotlib-logo.svg",
    glyph: "ML",
    category: "AI / ML",
  },
  {
    name: "Seaborn",
    assetSrc: "/seaborn-logo.svg",
    glyph: "SB",
    category: "AI / ML",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", showLabel: true },
      { name: "TypeScript", showLabel: true },
      { name: "Python", showLabel: true },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", showLabel: true },
      { name: "Next.js", showLabel: true },
      { name: "Tailwind CSS", shortName: "Tailwind", showLabel: true },
      { name: "HTML5", shortName: "HTML", showLabel: true },
      { name: "CSS3", shortName: "CSS", showLabel: true },
      { name: "Bootstrap", showLabel: true },
      { name: "Pug", showLabel: true },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", showLabel: true },
      { name: "GitHub", showLabel: true },
      { name: "GitLab", showLabel: true },
      { name: "npm", showLabel: true },
      { name: "Vercel", showLabel: true },
      { name: "VS Code", showLabel: true },
    ],
  },
  {
    title: "AI & ML",
    skills: [
      { name: "Python", showLabel: true },
      { name: "Pandas", showLabel: true },
      { name: "NumPy", showLabel: true },
      { name: "Scikit-learn", shortName: "Scikit", showLabel: true },
      {
        name: "Matplotlib",
        assetSrc: "/matplotlib-logo.svg",
        assetWidth: 80,
        assetHeight: 80,
        showLabel: true,
      },
      {
        name: "Seaborn",
        assetSrc: "/seaborn-logo.svg",
        assetWidth: 150,
        assetHeight: 44,
        showLabel: true,
      },
    ],
  },
];
