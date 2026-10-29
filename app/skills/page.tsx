import { Skills } from "@/components/sections/skills/Skills";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("/skills");

export default function SkillsPage() {
  return (
    <main id="content" className="page-enter">
      <Skills page />
    </main>
  );
}
