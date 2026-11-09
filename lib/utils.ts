import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isCoarsePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Deterministic noise, so the same seed always draws the same shape
 *  (on the server and the client alike). */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** The first-load overlay (components/layout/Loader.tsx) keeps `is-loading`
 *  on <html> until the page has loaded. Runs `callback` once it lifts, or
 *  straight away if it already has. Returns a cleanup function. */
export function onSiteReady(callback: () => void) {
  if (!document.documentElement.classList.contains("is-loading")) {
    callback();
    return () => {};
  }
  window.addEventListener("site:ready", callback, { once: true });
  return () => window.removeEventListener("site:ready", callback);
}
