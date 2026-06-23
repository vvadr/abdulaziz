"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { greetings } from "@/data/site";

const STEP_MS = 470;
const HOLD_MS = 560;
const SESSION_KEY = "ay-intro-seen";

export function WelcomeIntro() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    // Returning visitor: unmount on the next tick, no animation, no scroll lock.
    if (alreadySeen) {
      const id = window.setTimeout(() => setMounted(false), 0);
      return () => window.clearTimeout(id);
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* storage unavailable — still play once */
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timers: number[] = [];

    if (reduceMotion) {
      timers.push(window.setTimeout(() => setClosing(true), 850));
    } else {
      const intervalId = window.setInterval(() => {
        setIndex((current) => (current + 1) % greetings.length);
      }, STEP_MS);
      timers.push(intervalId);
      timers.push(
        window.setTimeout(() => {
          window.clearInterval(intervalId);
          setClosing(true);
        }, greetings.length * STEP_MS + HOLD_MS),
      );
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      timers.forEach((id) => {
        window.clearInterval(id);
        window.clearTimeout(id);
      });
    };
  }, [reduceMotion]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={closing ? (reduceMotion ? { opacity: 0 } : { y: "-100%" }) : { y: 0, opacity: 1 }}
      transition={{
        duration: reduceMotion ? 0.3 : 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
      onAnimationComplete={() => {
        if (closing) {
          document.body.style.overflow = "";
          setMounted(false);
        }
      }}
      className="fixed inset-0 z-[var(--z-intro)] flex items-center justify-center overflow-hidden bg-background"
      aria-label="Welcome"
      role="presentation"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_24%,transparent),transparent_70%)] blur-3xl" />

      <div className="relative flex flex-col items-center gap-7 px-6 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid size-16 place-items-center rounded-full ring-1 ring-[color-mix(in_oklab,var(--accent)_30%,transparent)] sm:size-20"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_72%)] blur-md" />
          <Image
            src="/darth-vader-logo.svg"
            alt=""
            width={80}
            height={80}
            priority
            className="relative h-full w-full object-contain"
          />
        </motion.div>

        <div className="flex min-h-[4.5rem] items-center sm:min-h-[6rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={greetings[index]}
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-extrabold tracking-[-0.045em] text-foreground sm:text-7xl"
              dir="ltr"
            >
              {greetings[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="beam-rule w-44 origin-center"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: greetings.length * (STEP_MS / 1000), ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
