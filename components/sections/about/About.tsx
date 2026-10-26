"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  aboutParagraphs,
  educationItems,
  heroLocation,
  recognition,
  siteRole,
} from "@/data/site";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Portrait — mask reveal + settle while scrolling into view.
      gsap.fromTo(
        portraitRef.current,
        { clipPath: "inset(12% 12% 12% 12% round 28px)", scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0% round 28px)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 0.8,
          },
        },
      );

      // Decorative line draws itself with the scroll.
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 1,
            },
          },
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="about" className="relative px-5 py-32 sm:px-10 lg:px-20">
      <svg
        aria-hidden
        className="pointer-events-none absolute left-0 top-10 h-full w-full opacity-40"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          ref={pathRef}
          d="M-50 120 C 250 40, 420 260, 640 180 S 1050 80, 1280 220"
          stroke="url(#about-grad)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient
            id="about-grad"
            x1="0"
            y1="0"
            x2="1200"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--accent)" />
            <stop offset="0.5" stopColor="var(--accent-2)" />
            <stop offset="1" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Portrait card */}
        <div ref={portraitRef} className="relative mx-auto w-full max-w-sm will-change-transform">
          <div className="glass relative aspect-[3/4] overflow-hidden rounded-[28px]">
            <Image
              src="/images/abdulaziz-profile.jpg"
              alt="Abdulaziz Yusupaliev — portrait"
              fill
              sizes="(min-width: 1024px) 24rem, 90vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent"
            />
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-56 rounded-full bg-accent-2/20 blur-[50px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-16 -left-16 size-56 rounded-full bg-accent/15 blur-[50px]"
            />
            <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
              <span className="font-display text-accent text-5xl font-bold opacity-90">
                AY
              </span>
              <div>
                <p className="font-display text-xl font-semibold sm:text-2xl">{siteRole}</p>
                <p className="mt-1 text-sm text-muted">{heroLocation}</p>
              </div>
            </div>
          </div>
          <div
            aria-hidden
            className="glass absolute right-1 top-8 rounded-2xl px-4 py-3 font-display text-sm [animation:float-y_5s_ease-in-out_infinite]"
          >
            Python · PyTorch · TypeScript
          </div>
        </div>

        {/* Text column */}
        <div>
          <SectionHeading label="04 — About">
            Where models meet{" "}
            <span className="serif-accent text-accent">products</span>
          </SectionHeading>

          <div data-reveal className="mt-7 max-w-2xl space-y-4 text-[1.02rem] leading-relaxed text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* Education */}
          <h3
            data-reveal
            className="mt-12 font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground"
          >
            Education & training
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {educationItems.map((item) => (
              <li
                key={`${item.provider}-${item.period}`}
                data-reveal
                className="glass rounded-2xl p-5"
              >
                <GraduationCap className="mb-3 size-5 text-accent" aria-hidden />
                <p className="font-display text-sm font-semibold">
                  {item.provider}
                  {item.providerNote ? (
                    <span className="font-normal text-muted"> · {item.providerNote}</span>
                  ) : null}
                </p>
                <p className="mt-1.5 text-sm text-foreground/90">{item.title}</p>
                <p className="mt-1 text-xs tabular-nums text-muted">{item.period}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.focus}</p>
              </li>
            ))}
          </ul>

          <p data-reveal className="mt-4 flex items-center gap-3 text-sm text-foreground/90">
            <Award className="size-5 shrink-0 text-accent-2" aria-hidden />
            {recognition}
          </p>
        </div>
      </div>
    </section>
  );
}
