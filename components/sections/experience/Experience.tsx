"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { experienceItems } from "@/data/site";
import { useMediaQuery } from "@/lib/use-client";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];

/**
 * Horizontal timeline. Base experience is a native scroll-snap track that
 * works with touch, keyboards, reduced motion, and no JS; wide fine-pointer
 * screens upgrade to the reference's pinned scroll-scrub travel. (In the
 * reference, reduced-motion users simply couldn't reach cards 2..n.)
 */
export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const pinned = wide && !reducedMotion && !coarse;

  useEffect(() => {
    if (!pinned) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [pinned]);

  return (
    <section ref={rootRef} id="experience" className="relative overflow-hidden">
      <div className="flex min-h-svh flex-col justify-center py-20">
        <div className="px-5 sm:px-10 lg:px-20">
          <SectionHeading label="03 — Experience">
            Where I&apos;ve <span className="serif-accent text-accent">worked</span>
          </SectionHeading>
          <p data-reveal className="mt-4 text-sm uppercase tracking-[0.28em] text-muted">
            Travel the timeline →
          </p>
        </div>

        <div
          className={
            pinned
              ? "mt-14"
              : "track-scrollbar mt-14 overflow-x-auto snap-x snap-mandatory pb-4"
          }
        >
          <div
            ref={trackRef}
            className="flex w-max gap-7 px-5 will-change-transform sm:px-10 lg:px-20"
          >
            {experienceItems.map((job, idx) => {
              const accent = ACCENTS[idx % ACCENTS.length];
              return (
                <article
                  key={`${job.type}-${job.title}`}
                  className="glass group relative w-[86vw] shrink-0 snap-center overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-accent/30 sm:w-[560px] sm:p-9"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[7rem] font-bold opacity-[0.06]"
                  >
                    0{idx + 1}
                  </span>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                  />
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold sm:text-3xl">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor
                            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                          >
                            {job.type}
                            <ArrowUpRight className="size-4 text-muted" aria-hidden />
                          </a>
                        ) : (
                          job.type
                        )}
                      </h3>
                      <p className="mt-1 font-medium" style={{ color: accent }}>
                        {job.title}
                      </p>
                    </div>
                    <p className="text-right font-display text-sm text-muted">{job.period}</p>
                  </header>
                  <ul className="mt-6 space-y-3.5">
                    {job.details.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[0.92rem] leading-relaxed text-muted">
                        <span aria-hidden className="mt-1 shrink-0" style={{ color: accent }}>
                          ▹
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}

            {/* Closing card */}
            <div className="flex w-[70vw] shrink-0 snap-center items-center justify-center sm:w-[420px]">
              <p className="text-center font-display text-3xl font-bold leading-snug text-muted">
                Next chapter?
                <br />
                <a href="#contact" className="text-accent" data-cursor>
                  Let&apos;s write it together.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
