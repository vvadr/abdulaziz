"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { markAppReady } from "@/lib/scroll-state";
import { prefersReducedMotion } from "@/lib/utils";

const SEEN_KEY = "ay-preloader-seen";

const noopSubscribe = () => () => {};

function shouldSkip() {
  try {
    if (sessionStorage.getItem(SEEN_KEY) === "1") return true;
  } catch {
    // Storage unavailable (private mode) — the preloader just replays.
  }
  return prefersReducedMotion();
}

function rememberSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage unavailable — nothing to remember.
  }
}

/**
 * Cinematic intro: name reveal + 0→100 counter. Unlike the reference site
 * (fixed 2.1s on every visit), it runs ~1.1s, plays once per session, and is
 * skipped entirely for reduced-motion users. Scroll unlocks via markAppReady.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);
  // SSR renders the overlay (it covers the first paint); the hydration
  // snapshot then decides instantly whether this visit skips it.
  const skip = useSyncExternalStore(noopSubscribe, shouldSkip, () => false);
  const done = skip || finished;

  useEffect(() => {
    if (skip) {
      markAppReady();
      return;
    }

    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.v)),
      onComplete: () => {
        rememberSeen();
        setFinished(true);
        markAppReady();
      },
    });
    return () => {
      tween.kill();
    };
  }, [skip]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          role="status"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[var(--z-preloader)] flex flex-col items-center justify-center bg-background"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.7, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-[clamp(1.6rem,4.5vw,3rem)] font-bold tracking-tight"
            >
              Abdulaziz Yusupaliev<span className="gradient-text">.</span>
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="mt-1 text-sm uppercase tracking-[0.4em] text-muted"
            >
              Portfolio
            </motion.p>
          </div>

          <div
            className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-8 sm:px-14"
            aria-hidden
          >
            <div className="h-px flex-1 self-center overflow-hidden bg-glass-border">
              <div
                className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2),var(--accent-3))]"
                style={{ transform: `scaleX(${count / 100})`, transformOrigin: "left" }}
              />
            </div>
            <span className="ml-8 font-display text-6xl font-bold tabular-nums text-foreground/90 sm:text-7xl">
              {count}
              <span className="text-2xl text-muted">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
