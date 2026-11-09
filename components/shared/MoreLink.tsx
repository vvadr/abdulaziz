import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Closes a home-page preview with the way to its full page. The rule takes
 *  the text colour, so it reads as the strong rule on any ground. */
export function MoreLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-current pt-10", className)}>
      <Link href={href} className="btn btn-line">
        {children}
        <ArrowRight size={16} className="nudge-x" aria-hidden="true" />
      </Link>
    </div>
  );
}
