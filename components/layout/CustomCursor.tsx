"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHydrated, useMediaQuery } from "@/lib/use-client";

/** Dot + trailing ring cursor. Fine pointers only; the ring swells over
 *  links, buttons, and anything marked with [data-cursor]. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const coarse = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = hydrated && !coarse && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");

    const onOver = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      gsap.to(ring, { scale: 2.1, opacity: 0.5, duration: 0.35 });
      gsap.to(dot, { scale: 0.4, duration: 0.35 });
    };
    const onOut = (e: MouseEvent) => {
      if (!isInteractive(e.target)) return;
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35 });
      gsap.to(dot, { scale: 1, duration: 0.35 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[var(--z-cursor)] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 mix-blend-difference"
      />
    </>
  );
}
