"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import {
  greetings,
  heroDescription,
  heroLocation,
  heroSocialLinks,
} from "@/data/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroSkills3D } from "./HeroSkills3D";
import { HeroSocialIcon } from "./HeroSocialIcon";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.085, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % greetings.length);
    }, 2000);
    return () => window.clearInterval(intervalId);
  }, [reduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-32 sm:px-6 sm:pt-36"
    >
      <HeroBackdrop />

      <motion.div
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div className="max-w-2xl">
          {/* Decorative rotating multilingual greeting; the H1 below carries identity for a11y/SEO */}
          <motion.div
            variants={item}
            aria-hidden="true"
            className="flex h-7 items-center gap-1.5 font-mono text-sm tracking-[0.04em] text-accent-strong"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={greetings[index]}
                initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                dir="ltr"
              >
                {greetings[index]}
              </motion.span>
            </AnimatePresence>
            <span className="text-muted">— I&apos;m</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display mt-4 text-[clamp(2.75rem,1.6rem+5.2vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-foreground"
          >
            Abdulaziz
            <br />
            Yusupaliev
            <span className="blink-cursor align-baseline" aria-hidden="true">
              _
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="font-display mt-5 text-[clamp(1.35rem,1rem+1.6vw,2rem)] font-semibold leading-tight"
          >
            <span className="text-accent-strong">AI Engineer</span>
            <span className="text-muted"> &amp; </span>
            <span className="text-accent-strong">Frontend Developer</span>
          </motion.p>

          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white/[0.03] px-3.5 py-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {heroLocation}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] px-3.5 py-1.5 text-sm text-accent-strong">
              <span className="pulse-dot" aria-hidden="true" />
              Open to internships &amp; freelance
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-[60ch] text-base leading-8 text-muted sm:text-lg"
          >
            {heroDescription}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            {heroSocialLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="grid size-12 place-items-center rounded-2xl border border-border-soft bg-white/[0.03] text-foreground transition duration-200 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_55%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] hover:text-accent-strong"
                >
                  <HeroSocialIcon name={link.icon} className="h-5 w-5" />
                </a>
              );
            })}

            <a
              href="/abdulaziz-yusupaliev-resume.txt"
              download
              className="btn-primary ml-1 text-sm"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Resume
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-2 lg:mt-0">
          <HeroSkills3D />
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#skills"
        aria-label="Scroll to skills"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent-strong sm:flex"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-border">
          <motion.span
            className="mt-1.5 h-1.5 w-1 rounded-full bg-accent"
            animate={reduceMotion ? undefined : { y: [0, 9, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
