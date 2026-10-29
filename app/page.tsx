import { Contact } from "@/components/sections/contact/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { Projects } from "@/components/sections/projects/Projects";

// Home is the overview: who, the strongest work, and how to get in touch.
// Every section also has its own page, reached from the nav.
export default function Home() {
  return (
    <main id="content" className="page-enter overflow-x-clip">
      <Hero />
      <Projects />
      <Contact />
    </main>
  );
}
