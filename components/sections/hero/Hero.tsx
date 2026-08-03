"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Download, FileText } from "lucide-react";
import {
  greetings,
  heroDescription,
  heroSocialLinks,
  resumeLinks,
} from "@/data/site";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroSocialIcon } from "./HeroSocialIcon";
import { HeroSystemInfo } from "./HeroSystemInfo";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
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
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
    >
      <HeroBackdrop />

      <motion.div
        variants={container}
        initial={false}
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
      >
        <motion.div variants={item} className="term-window">
          <div className="term-titlebar">
            <span className="window-dots" aria-hidden="true">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
            </span>
            <span className="term-titlebar-label">whoami.sh — abdulaziz</span>
          </div>

          <div className="term-body text-sm leading-7 sm:text-[0.95rem]">
            <div className="line-row">
              <span className="line-no">1</span>
              <span>
                <span className="prompt-glyph">$</span> whoami
              </span>
            </div>
            <div className="line-row">
              <span className="line-no">2</span>
              <h1 className="font-mono text-[clamp(2.2rem,1.5rem+3.6vw,4rem)] font-bold leading-[1.05] text-foreground">
                Abdulaziz Yusupaliev
                <span className="blink-cursor align-baseline" aria-hidden="true" />
              </h1>
            </div>
            <div className="line-row">
              <span className="line-no">3</span>
              <span>&nbsp;</span>
            </div>

            <div className="line-row">
              <span className="line-no">4</span>
              <span>
                <span className="prompt-glyph">$</span> ./role.sh
              </span>
            </div>
            <div className="line-row">
              <span className="line-no">5</span>
              <p className="font-semibold text-accent-strong">
                Frontend Developer <span className="text-muted">&amp;</span> AI/ML Engineer
              </p>
            </div>
            <div className="line-row">
              <span className="line-no">6</span>
              <span>&nbsp;</span>
            </div>

            <div className="line-row">
              <span className="line-no">7</span>
              <span>
                <span className="prompt-glyph">$</span> locale --greet
              </span>
            </div>
            <div className="line-row items-center">
              <span className="line-no">8</span>
              <div aria-hidden="true" className="flex h-6 items-center gap-2 text-muted">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={greetings[index]}
                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="font-semibold text-accent"
                  >
                    {greetings[index]}
                  </motion.span>
                </AnimatePresence>
                <span>— welcome, thanks for stopping by.</span>
              </div>
              <span className="sr-only">{greetings[index]} — welcome, thanks for stopping by.</span>
            </div>
            <div className="line-row">
              <span className="line-no">9</span>
              <span>&nbsp;</span>
            </div>

            <div className="line-row">
              <span className="line-no">10</span>
              <span>
                <span className="prompt-glyph">$</span> cat about.md
              </span>
            </div>
            <div className="line-row">
              <span className="line-no">11</span>
              <p className="max-w-[58ch] text-muted">{heroDescription}</p>
            </div>
            <div className="line-row">
              <span className="line-no">12</span>
              <span>&nbsp;</span>
            </div>

            <div className="line-row">
              <span className="line-no">13</span>
              <span>
                <span className="prompt-glyph">$</span> ls ./resume/
              </span>
            </div>
            <div className="line-row">
              <span className="line-no">14</span>
              <div className="flex flex-wrap gap-2.5">
                {resumeLinks.map((resume) => (
                  <a
                    key={resume.href}
                    href={resume.href}
                    download
                    className="btn-ghost text-xs"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    {resume.label}
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="line-row">
              <span className="line-no">15</span>
              <span>&nbsp;</span>
            </div>

            <div className="line-row">
              <span className="line-no">16</span>
              <span>
                <span className="prompt-glyph">$</span> open ./socials/
              </span>
            </div>
            <div className="line-row">
              <span className="line-no">17</span>
              <div className="flex flex-wrap items-center gap-2">
                {heroSocialLinks.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="grid size-9 place-items-center rounded-md border border-border-soft text-foreground transition duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--accent)_55%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] hover:text-accent-strong"
                    >
                      <HeroSocialIcon name={link.icon} className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="line-row">
              <span className="line-no">18</span>
              <span>
                <span className="prompt-glyph">$</span>
                <span className="blink-cursor ml-1 align-baseline" aria-hidden="true" />
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <HeroSystemInfo />
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
        <span className="font-mono text-[0.7rem]">scroll</span>
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
