import Link from "next/link";
import { socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const email = socialLinks.find((link) => link.icon === "email")!;

/** On the home page the contact section sits right above, so the footer only
 *  needs "back to top". Sub-pages also get email and a way home. */
export function Footer({ subpage = false }: { subpage?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-blue">
      <div className="shell">
        {/* The rule separates the footer from the contact section above it on
            the home page; on sub-pages the blue band is separation enough. */}
        <div
          className={cn(
            "flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between",
            !subpage && "border-t",
          )}
        >
          <p>© {year} Abdulaziz Yusupaliev. Built with Next.js, set in Archivo.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {subpage ? (
              <>
                <a href={email.href} className="link">
                  Email me
                </a>
                <Link href="/" className="link">
                  Home
                </Link>
              </>
            ) : null}
            <a href="#top" className="link">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
