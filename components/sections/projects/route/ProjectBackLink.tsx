import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProjectBackLink() {
  return (
    <Link
      href="/#projects"
      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      All projects
    </Link>
  );
}
