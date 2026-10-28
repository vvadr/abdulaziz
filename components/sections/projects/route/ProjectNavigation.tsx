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
    <nav className="mt-24 grid border-t border-ink sm:grid-cols-2" aria-label="More projects">
      {previous ? (
        <Link href={`/projects/${previous.slug}`} className="group flex items-start gap-4 border-b border-rule py-8 sm:border-b-0 sm:pr-8">
          <ArrowLeft size={22} className="mt-1 shrink-0 text-blue transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>
            <span className="meta block text-ink-soft">Previous</span>
            <span className="display-m mt-1 block transition-colors group-hover:text-blue">{previous.title}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-start justify-end gap-4 py-8 text-right sm:border-l sm:pl-8"
        >
          <span>
            <span className="meta block text-ink-soft">Next</span>
            <span className="display-m mt-1 block transition-colors group-hover:text-blue">{next.title}</span>
          </span>
          <ArrowRight size={22} className="mt-1 shrink-0 text-blue transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
