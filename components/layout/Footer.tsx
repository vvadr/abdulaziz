import { GitBranch } from "lucide-react";
import { heroSocialLinks } from "@/data/site";
import { HeroSocialIcon } from "../sections/hero/HeroSocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6">
      <div className="shell">
        <div className="status-bar flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="status-item">
              <GitBranch size={13} aria-hidden="true" />
              main
            </span>
            <span className="status-item">
              <span className="pulse-dot" aria-hidden="true" />
              available
            </span>
            <span className="status-item">UTF-8</span>
            <span className="status-item">Next.js · Tailwind CSS</span>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1.5" aria-label="Social links">
              {heroSocialLinks.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    className="grid size-7 place-items-center rounded text-muted transition hover:text-accent-strong"
                  >
                    <HeroSocialIcon name={link.icon} className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </nav>
            <span className="status-item">© {year} Abdulaziz Yusupaliev</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
