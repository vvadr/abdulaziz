import { heroLocation, heroSocialLinks } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-glass-border">
      <div className="shell flex flex-col items-center justify-between gap-4 py-7 text-xs text-muted sm:flex-row">
        <span>© {year} Abdulaziz Yusupaliev</span>

        <nav
          className="flex flex-wrap items-center justify-center gap-4"
          aria-label="Social links"
        >
          {heroSocialLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.label}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <span className="flex items-center gap-2">
          <span
            className="inline-block size-1.5 rounded-full bg-accent [animation:pulse-dot_2.6s_ease-in-out_infinite]"
            aria-hidden
          />
          {heroLocation}
        </span>
      </div>
    </footer>
  );
}
