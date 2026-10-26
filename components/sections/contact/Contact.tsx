"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { Magnetic } from "@/components/shared/Magnetic";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { resumeLinks, socialLinks } from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const email = socialLinks.find((link) => link.icon === "email")!;
const profiles = socialLinks.filter((link) => link.icon !== "email");

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

        <p data-reveal className="mt-7 max-w-lg text-muted">
          Open to internships and freelance work. Email reaches me fastest.
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

        {/* Profiles */}
        <ul data-reveal className="mt-12 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile) => (
            <li key={profile.label}>
              <Magnetic strength={0.3} className="block h-full">
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="glass group flex h-full items-center justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:border-accent/40"
                >
                  <span className="min-w-0 text-left">
                    <span className="flex items-center gap-2">
                      <SocialIcon name={profile.icon} className="size-4 shrink-0 text-accent" />
                      <span className="font-display text-sm font-semibold">{profile.label}</span>
                    </span>
                    <span className="mt-1 block truncate text-xs text-muted transition-colors group-hover:text-foreground/80">
                      {profile.icon === "linkedin" ? `in/${profile.value}` : `@${profile.value}`}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-accent"
                    aria-hidden
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* CVs */}
        <div data-reveal className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {resumeLinks.map((resume) => (
            <a
              key={resume.label}
              href={resume.href}
              download
              data-cursor
              className="btn-ghost btn-sm"
            >
              <FileText className="size-4 text-accent-2" aria-hidden />
              {resume.label} (PDF)
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
