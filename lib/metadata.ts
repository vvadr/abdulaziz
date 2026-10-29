import type { Metadata } from "next";
import { navItems } from "@/data/site";

/** Title, description, and canonical URL for a section's own page. */
export function sectionMetadata(href: string): Metadata {
  const item = navItems.find((entry) => entry.href === href);
  if (!item) throw new Error(`No nav item for ${href}`);

  return {
    title: item.label,
    description: item.description,
    alternates: { canonical: href },
    openGraph: { title: `${item.label} | Abdulaziz Yusupaliev`, description: item.description },
  };
}
