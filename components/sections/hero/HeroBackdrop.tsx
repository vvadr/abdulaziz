"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Calm twilight backdrop for the hero: a faint edge-masked dot grid with two
 * large, slowly drifting aurora glows (teal + twilight-blue). Decorative only,
 * compositor-friendly (transform/opacity), and static under reduced motion.
 */
export function HeroBackdrop() {
  const reduceMotion = useReducedMotion();

  const drift = (x: number[], y: number[], duration: number) =>
    reduceMotion
      ? undefined
      : {
          x,
          y,
          transition: {
            duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* faint dot grid, fading out toward the edges */}
      <div
        className="dot-grid absolute inset-0 opacity-[0.5]"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 50% 30%, black 0%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 30%, black 0%, transparent 72%)",
        }}
      />

      {/* aurora glows */}
      <motion.div
        className="absolute -left-24 -top-24 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 30%, transparent), transparent 68%)",
        }}
        animate={drift([0, 40, 0], [0, 26, 0], 22)}
      />
      <motion.div
        className="absolute right-[-10%] top-[6%] h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--twilight) 32%, transparent), transparent 66%)",
        }}
        animate={drift([0, -34, 0], [0, 30, 0], 26)}
      />
      <motion.div
        className="absolute bottom-[-12%] left-[28%] h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-soft) 24%, transparent), transparent 70%)",
        }}
        animate={drift([0, 26, 0], [0, -22, 0], 24)}
      />

      {/* thin top hairline + soft bottom fade into the page */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)]" />
    </div>
  );
}
