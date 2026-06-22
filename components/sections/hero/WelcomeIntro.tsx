"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { greetings } from "@/data/site";

const STEP_MS = 440;
const HOLD_MS = 520;
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
      timers.push(window.setTimeout(() => setClosing(true), 900));
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
        duration: reduceMotion ? 0.3 : 0.75,
        ease: [0.76, 0, 0.24, 1],
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
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,50,52,0.22),transparent_70%)] blur-3xl" />

      <div className="relative flex flex-col items-center gap-7 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-accent-strong">
          Welcome
        </p>

        <div className="flex min-h-[4.5rem] items-center sm:min-h-[6rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={greetings[index]}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="font-display text-5xl font-extrabold tracking-[-0.05em] text-foreground sm:text-7xl"
              dir="ltr"
            >
              {greetings[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="saber-rule w-40 origin-center"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: greetings.length * (STEP_MS / 1000), ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
