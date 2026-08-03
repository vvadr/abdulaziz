import { ArrowUpRight, Mail } from "lucide-react";
import { heroSocialLinks, type HeroSocialIconName } from "@/data/site";
import { HeroSocialIcon } from "../hero/HeroSocialIcon";
import { SectionReveal } from "../../shared/SectionReveal";

const contactDetails: Record<
  HeroSocialIconName,
  { value: string; command: string }
> = {
  email: { value: "abdulazizyusupaliev009@gmail.com", command: "./email" },
  telegram: { value: "@d_vaderrr", command: "./telegram" },
  github: { value: "vvadr", command: "./github" },
  linkedin: { value: "Abdulaziz Yusupaliev", command: "./linkedin" },
};

// Email and Telegram first — the fastest ways to reach me.
const orderedLinks = [...heroSocialLinks].sort(
  (a, b) =>
    ["email", "telegram", "github", "linkedin"].indexOf(a.icon) -
    ["email", "telegram", "github", "linkedin"].indexOf(b.icon),
);

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="shell max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionReveal>
            <p className="section-kicker">{"// contact.sh"}</p>
            <h2 className="section-title mt-2">Let&apos;s talk</h2>
            <p className="section-lead">
              Open to internships, freelance work, and collaboration. Email or
              Telegram reach me fastest — I usually reply within a day.
            </p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-3.5 py-1.5 text-sm text-accent-strong">
              <span className="pulse-dot" aria-hidden="true" />
              Available now
            </span>

            <div className="mt-7">
              <a href="mailto:abdulazizyusupaliev009@gmail.com" className="btn-primary text-sm">
                <Mail className="h-4 w-4" aria-hidden="true" />
                ./email --send
              </a>
            </div>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {orderedLinks.map((link, index) => {
              const detail = contactDetails[link.icon];
              const external = link.href.startsWith("http");

              return (
                <SectionReveal key={link.label} delay={(index % 2) * 0.07} className="h-full">
                  <a
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="card-surface card-interactive group flex h-full flex-col justify-between gap-6 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-md border border-border-soft bg-white/[0.03] text-foreground transition group-hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] group-hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] group-hover:text-accent-strong">
                        <HeroSocialIcon name={link.icon} className="h-5 w-5" />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-strong"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-accent-strong">
                        $ {detail.command}
                      </p>
                      <p className="mt-1.5 truncate text-base font-medium text-foreground">
                        {detail.value}
                      </p>
                    </div>
                  </a>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
