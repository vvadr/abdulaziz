import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { PortfolioProject } from "@/data/projects";

export function ProjectNavigation({
  previous,
  next,
}: {
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
}) {
  return (
    <nav className="project-navigation" aria-label="Project navigation">
      {previous ? (
        <Link href={`/projects/${previous.slug}`} className="project-navigation-link">
          <ArrowLeft size={18} aria-hidden="true" />
          <span>
            <span className="project-navigation-label">Previous</span>
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`} className="project-navigation-link project-navigation-next">
          <span>
            <span className="project-navigation-label">Next</span>
            {next.title}
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
