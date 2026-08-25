"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { Magnetic } from "@/components/shared/Magnetic";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { contactLinks, resumeLinks, type SocialIconName } from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const email = contactLinks.find((link) => link.label === "Email")!;
const telegram = contactLinks.find((link) => link.label === "Telegram")!;
const socialCards = contactLinks.filter((link) => link.label !== "Email");

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact-title]",
        { scale: 0.82, autoAlpha: 0.25 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 0.7,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative flex min-h-svh flex-col justify-center px-5 pb-24 pt-32 sm:px-10"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p
          data-reveal
          className="section-label mb-6 font-display text-xs font-medium uppercase"
        >
          05 — Contact
        </p>

        <h2
          data-contact-title
          className="font-display text-[clamp(2.8rem,8vw,6.2rem)] font-bold leading-[1.02] tracking-tight will-change-transform"
        >
          Let&apos;s build
          <br />
          something <span className="serif-accent text-accent">together</span>
        </h2>

        <p data-reveal className="mt-7 max-w-md text-muted">
          Open to internships, freelance work, and interesting projects. Reach
          out — I&apos;ll get back to you.
        </p>

        <Magnetic strength={0.25} className="mt-10 max-w-full">
          <a
            href={email.href}
            data-cursor
            className="glass group inline-flex max-w-full items-center gap-3 rounded-full py-4 pl-6 pr-4 font-display text-sm font-semibold transition-colors duration-300 hover:border-accent/50 sm:gap-4 sm:pl-7 sm:pr-5 sm:text-lg"
          >
            <Mail className="size-5 shrink-0 text-accent" aria-hidden />
            <span className="break-all text-left">{email.value}</span>
            <span
              aria-hidden
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-background transition-transform duration-300 group-hover:rotate-45"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </Magnetic>

        {/* Direct channels + both CVs */}
        <div data-reveal className="mt-12 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[email, telegram].map((item) => {
            const Icon = item.icon;
            const external = item.href.startsWith("http");
            return (
              <a
                key={item.label}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                data-cursor
                className="glass group rounded-2xl p-5 text-left transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_40px_var(--shadow-deep)]"
              >
                <Icon className="size-4 text-accent" aria-hidden />
                <p className="mt-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  {item.label}
                </p>
                <p className="mt-1 break-all text-sm font-medium text-foreground/90 transition-colors group-hover:text-accent">
                  {item.value}
                </p>
              </a>
            );
          })}
          {resumeLinks.map((resume) => (
            <a
              key={resume.label}
              href={resume.href}
              download
              data-cursor
              className="glass group rounded-2xl p-5 text-left transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_40px_var(--shadow-deep)]"
            >
              <FileText className="size-4 text-accent-2" aria-hidden />
              <p className="mt-3 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                {resume.label}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground/90 transition-colors group-hover:text-accent">
                Download PDF
              </p>
            </a>
          ))}
        </div>

        {/* Social profiles */}
        <div data-reveal className="mt-6 grid w-full gap-3 sm:grid-cols-3">
          {socialCards.map((social) => {
            const iconName = social.label.toLowerCase() as SocialIconName;
            const handle =
              social.label === "LinkedIn" ? social.value : `@${social.value}`;
            return (
              <Magnetic key={social.label} strength={0.35}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="glass group flex h-full items-center justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:border-accent-2/40"
                >
                  <span className="text-left">
                    <span className="flex items-center gap-2">
                      <SocialIcon name={iconName} className="size-4 text-accent-2" />
                      <span className="font-display text-sm font-semibold">
                        {social.label}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-muted transition-colors group-hover:text-foreground/80">
                      {handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent"
                    aria-hidden
                  />
                </a>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </section>
  );
}
