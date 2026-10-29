import { Experience } from "@/components/sections/experience/Experience";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("/experience");

export default function ExperiencePage() {
  return (
    <main id="content" className="page-enter">
      <Experience page />
    </main>
  );
}
