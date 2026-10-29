import { About } from "@/components/sections/about/About";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("/about");

export default function AboutPage() {
  return (
    <main id="content" className="page-enter">
      <About />
    </main>
  );
}
