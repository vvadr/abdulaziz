"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { greetings } from "@/data/site";

/**
 * Rotating multilingual hello — Hello / Привет / Salom / Assalomu alaykum /
 * Hi — with a blinking caret. Screen readers get a single static greeting;
 * reduced motion pins the first word.
 */
export function GreetingRotator() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % greetings.length),
      2000,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <p className="flex h-9 items-center justify-center text-[clamp(1.25rem,2.6vw,1.8rem)]">
      <span className="sr-only">{greetings[0]}</span>
      <span aria-hidden className="hero-serif flex items-center text-accent-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={greetings[index]}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {greetings[index]}
          </motion.span>
        </AnimatePresence>
        <span
          className="ml-1.5 inline-block h-[1.05em] w-[2px] bg-accent [animation:cursor-blink_1.1s_steps(1)_infinite]"
          aria-hidden
        />
      </span>
    </p>
  );
}
