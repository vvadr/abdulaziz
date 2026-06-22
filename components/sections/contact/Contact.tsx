import { ArrowUpRight } from "lucide-react";
import { heroSocialLinks, type HeroSocialIconName } from "@/data/site";
import { HeroSocialIcon } from "../hero/HeroSocialIcon";
import { SectionReveal } from "../../shared/SectionReveal";

const contactDetails: Record<
  HeroSocialIconName,
  { value: string; label: string }
> = {
  email: { value: "abdulazizyusupaliev009@gmail.com", label: "Email" },
  telegram: { value: "@d_vaderrr", label: "Telegram" },
  github: { value: "abdulazizyusupaliev", label: "GitHub" },
  linkedin: { value: "Abdulaziz Yusupaliev", label: "LinkedIn" },
};

// Email and Telegram first — the fastest ways to reach me.
const orderedLinks = [...heroSocialLinks].sort(
  (a, b) =>
    ["email", "telegram", "github", "linkedin"].indexOf(a.icon) -
    ["email", "telegram", "github", "linkedin"].indexOf(b.icon),
);

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-5xl">
        <SectionReveal>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="section-lead">
            Open to internships, freelance work, and collaboration. Email or
            Telegram reach me fastest — I usually reply within a day.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {orderedLinks.map((link, index) => {
            const detail = contactDetails[link.icon];
            const external = link.href.startsWith("http");

            return (
              <SectionReveal key={link.label} delay={(index % 2) * 0.08}>
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="card-surface card-interactive group flex h-full items-center justify-between gap-4 p-5"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-white/[0.03] text-foreground transition group-hover:border-accent/50 group-hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] group-hover:text-accent-strong">
                      <HeroSocialIcon name={link.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                        {detail.label}
                      </p>
                      <p className="mt-1.5 truncate text-base font-medium text-foreground">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                    aria-hidden="true"
                  />
                </a>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
