import Image from "next/image";
import { heroSocialLinks } from "@/data/site";
import { HeroSocialIcon } from "../sections/hero/HeroSocialIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-10 pt-6 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="beam-rule" />
        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
              <Image
                src="/darth-vader-logo.svg"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </span>
            <p className="text-sm text-muted">© {year} Abdulaziz Yusupaliev</p>
          </div>

          <nav className="flex items-center gap-2" aria-label="Social links">
            {heroSocialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="grid size-10 place-items-center rounded-xl border border-border-soft text-muted transition hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:text-accent-strong"
                >
                  <HeroSocialIcon name={link.icon} className="h-4 w-4" />
                </a>
              );
            })}
          </nav>

          <p className="font-mono text-xs text-faint">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
