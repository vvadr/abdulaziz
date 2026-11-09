import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Closes a home-page preview with the way to its full page. The rule takes
 *  the text colour, so it reads as the strong rule on any ground. */
export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-current pt-10">
      <Link href={href} className="btn btn-line">
        {children}
        <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
      </Link>
    </div>
  );
}
