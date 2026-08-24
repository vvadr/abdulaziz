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
    <nav
      className="mt-16 grid gap-3 border-t border-glass-border pt-8 sm:grid-cols-2"
      aria-label="Project navigation"
    >
      {previous ? (
        <Link
          href={`/projects/${previous.slug}`}
          data-cursor
          className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-accent/40"
        >
          <ArrowLeft
            size={18}
            className="shrink-0 text-muted transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
          <span>
            <span className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
              Previous
            </span>
            <span className="mt-1 block font-display font-semibold text-foreground transition-colors group-hover:text-accent">
              {previous.title}
            </span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/projects/${next.slug}`}
          data-cursor
          className="glass group flex items-center justify-end gap-4 rounded-2xl p-5 text-right transition-all duration-300 hover:border-accent/40"
        >
          <span>
            <span className="block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted">
              Next
            </span>
            <span className="mt-1 block font-display font-semibold text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </span>
          <ArrowRight
            size={18}
            className="shrink-0 text-muted transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
