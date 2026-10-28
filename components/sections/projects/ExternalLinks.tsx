import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Live site, extra artifacts, and source — plain text links, in that order. */
export function ExternalLinks({
  project,
  className,
}: {
  project: PortfolioProject;
  className?: string;
}) {
  const links = [
    ...(project.liveUrl ? [{ label: "Live site", href: project.liveUrl }] : []),
    ...(project.links ?? []),
    ...(project.repoUrl ? [{ label: "Source", href: project.repoUrl }] : []),
  ];

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem] font-semibold", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="link inline-flex items-center gap-1"
          >
            {link.label}
            <ArrowUpRight size={15} className="nudge" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
