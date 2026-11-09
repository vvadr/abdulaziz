import { AboutPreview } from "@/components/sections/about/AboutPreview";
import { Contact } from "@/components/sections/contact/Contact";
import { ExperiencePreview } from "@/components/sections/experience/ExperiencePreview";
import { Hero } from "@/components/sections/hero/Hero";
import { WorkPreview } from "@/components/sections/projects/WorkPreview";
import { SkillsPreview } from "@/components/sections/skills/SkillsPreview";

// Home is the overview: a short version of every section, in nav order.
// Each one ends with a link to its own page, where the full version lives.
export default function Home() {
  return (
    <main id="content" className="page-enter overflow-x-clip">
      <Hero />
      <WorkPreview />
      <ExperiencePreview />
      <SkillsPreview />
      <AboutPreview />
      <Contact />
    </main>
  );
}
