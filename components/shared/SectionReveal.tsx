"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { CSSProperties, PropsWithChildren } from "react";

type SectionRevealProps = PropsWithChildren<{
  className?: string;
  /** seconds */
  delay?: number;
  /** entrance offset in px */
  y?: number;
  as?: "div" | "li" | "article" | "section";
}>;

/**
 * Scroll-reveal that ENHANCES an already-visible default rather than gating it.
 * Server render and no-JS render the content fully visible (no inline opacity).
 * On the client, only elements that mount below the fold are hidden imperatively
 * and revealed on scroll — so a failed/headless render never ships blank, and
 * no state is set inside the effect (purely DOM side-effects).
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    // Already in (or above) the viewport on mount → leave visible, no animation.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;

    // Arm the hidden state imperatively (no React state → no cascading renders).
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transitionDelay = "0s";
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.transitionDelay = `${delay}s`;
            el.style.willChange = "auto";
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion, y, delay]);

  const style: CSSProperties = reduceMotion
    ? {}
    : {
        transition:
          "opacity 0.75s var(--ease-out-expo), transform 0.75s var(--ease-out-expo)",
      };

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  );
}
