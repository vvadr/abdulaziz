"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const email = socialLinks.find((link) => link.icon === "email")!;

/** Rendered once by the root layout. Home already closes with the contact
 *  section, so it only needs "back to top"; other pages also get email and a
 *  way home. A rule separates the footer from a blue contact section above. */
export function Footer() {
  const pathname = usePathname();
  const home = pathname === "/";
  const afterContact = home || pathname === "/contact";
  const year = new Date().getFullYear();

  return (
    <footer className="on-blue">
      <div className="shell">
        <div
          className={cn(
            "flex flex-col gap-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between",
            afterContact && "border-t",
          )}
        >
          <p>© {year} Abdulaziz Yusupaliev. Built with Next.js, set in Archivo.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {home ? null : (
              <>
                <a href={email.href} className="link">
                  Email me
                </a>
                <Link href="/" className="link">
                  Home
                </Link>
              </>
            )}
            <a href="#content" className="link">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
