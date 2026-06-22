"use client";

import { motion, useReducedMotion } from "framer-motion";

const waveRows = [
  { d: "M-20 90C100 40 210 40 330 90S560 140 700 88S940 34 1100 86", opacity: 0.18, duration: 16, delay: 0 },
  { d: "M-20 140C130 88 250 94 390 142S650 196 810 136S1030 78 1180 134", opacity: 0.14, duration: 18, delay: 0.6 },
  { d: "M-20 205C120 150 240 152 370 202S620 262 780 202S1010 140 1160 194", opacity: 0.12, duration: 20, delay: 1.1 },
  { d: "M-20 275C120 224 260 218 410 274S680 334 850 272S1070 216 1210 266", opacity: 0.1, duration: 22, delay: 0.4 },
  { d: "M-20 350C100 306 246 300 390 348S640 410 810 348S1040 290 1180 342", opacity: 0.08, duration: 24, delay: 0.9 },
];

export function HeroWaveBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(226,50,52,0.16),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <svg
        viewBox="0 0 1200 420"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-full w-full"
      >
        {waveRows.map((wave, index) => (
          <motion.path
            key={wave.d}
            d={wave.d}
            fill="none"
            stroke={index === 0 ? "rgba(226,50,52,0.85)" : "rgba(255,255,255,0.7)"}
            strokeWidth={index === 0 ? 1.4 : 1}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0.82, opacity: wave.opacity }}
            animate={
              reduceMotion
                ? undefined
                : {
                    pathLength: [0.8, 1, 0.84],
                    opacity: [wave.opacity * 0.8, wave.opacity, wave.opacity * 0.72],
                    x: [0, 12, -10, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: wave.duration,
                    delay: wave.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </svg>

      <div className="absolute -left-16 top-14 h-52 w-52 rounded-full bg-[#e23234]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl" />
    </div>
  );
}
