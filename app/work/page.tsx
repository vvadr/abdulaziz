import { Projects } from "@/components/sections/projects/Projects";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("/work");

export default function WorkPage() {
  return (
    <main id="content" className="page-enter">
      <Projects page />
    </main>
  );
}
