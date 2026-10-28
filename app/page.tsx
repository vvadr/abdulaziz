import { About } from "@/components/sections/about/About";
import { Contact } from "@/components/sections/contact/Contact";
import { Experience } from "@/components/sections/experience/Experience";
import { Hero } from "@/components/sections/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Projects } from "@/components/sections/projects/Projects";
import { Skills } from "@/components/sections/skills/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content" className="overflow-x-clip">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
