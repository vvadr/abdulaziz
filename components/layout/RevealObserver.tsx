"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Adds `.is-in` to `[data-wipe]` elements as they scroll into view.
 *  The hidden state only applies once `html.can-reveal` is set here, so
 *  without JS (or before hydration) everything is simply visible. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // Hidden tabs and prerenders may never paint a transition; skip the wipe.
    if (!("IntersectionObserver" in window) || document.hidden) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-wipe]:not(.is-in)"),
    );
    // Anything already on screen shows immediately — no wipe on first paint.
    const viewportH = window.innerHeight;
    for (const el of targets) {
      if (el.getBoundingClientRect().top < viewportH * 0.9) el.classList.add("is-in");
    }
    root.classList.add("can-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of targets) if (!el.classList.contains("is-in")) observer.observe(el);

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
