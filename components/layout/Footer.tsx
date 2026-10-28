import Link from "next/link";
import { socialLinks } from "@/data/site";

const email = socialLinks.find((link) => link.icon === "email")!;

export function Footer({ withContact = false }: { withContact?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="on-blue">
      <div className="shell flex flex-col gap-4 border-t py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Abdulaziz Yusupaliev. Built with Next.js, set in Archivo.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
          {withContact ? (
            <a href={email.href} className="link">
              Email me
            </a>
          ) : null}
          <Link href="/" className="link">
            Home
          </Link>
          <a href="#top" className="link">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
