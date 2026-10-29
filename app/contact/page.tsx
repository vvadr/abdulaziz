import { Contact } from "@/components/sections/contact/Contact";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("/contact");

export default function ContactPage() {
  return (
    <main id="content" className="page-enter">
      <Contact page />
    </main>
  );
}
