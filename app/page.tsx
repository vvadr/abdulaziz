import { Contact } from "@/components/sections/contact/Contact";
import { Education } from "@/components/sections/education/Education";
import { Experience } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { WelcomeIntro } from "@/components/sections/hero/WelcomeIntro";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Projects } from "@/components/sections/projects/Projects";
import { Skills } from "@/components/sections/skills/Skills";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-intro)] focus:rounded-full focus:bg-[var(--accent-solid)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--accent-ink)]"
      >
        Skip to content
      </a>

      <WelcomeIntro />
      <Navbar />
      <main id="content">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
