// Mutable module stores read inside rAF loops (three.js scene, GSAP, progress
// beam). Values update every frame — keeping them out of React state avoids
// re-rendering the tree per frame.

export const scrollState = {
  /** 0..1 — overall page scroll progress */
  progress: 0,
  /** current scroll velocity (drives particle spin) */
  velocity: 0,
};

/** Minimal structural type so consumers don't need the lenis package types. */
export type SmoothScroller = {
  stop: () => void;
  start: () => void;
};

// Set by ScrollFX once Lenis is created; Navbar uses it to lock scroll while
// the mobile menu is open.
export const smoothScroller: { current: SmoothScroller | null } = {
  current: null,
};

// "App ready" fires when the preloader finishes (or is skipped). The hero
// intro and Lenis start are gated on it.
export const appState = { ready: false };

const READY_EVENT = "app:ready";

export function markAppReady() {
  if (appState.ready) return;
  appState.ready = true;
  window.dispatchEvent(new Event(READY_EVENT));
}

/** useSyncExternalStore-style subscription to the ready flag. */
export function subscribeAppReady(onChange: () => void) {
  window.addEventListener(READY_EVENT, onChange);
  return () => window.removeEventListener(READY_EVENT, onChange);
}

/** Runs `callback` once the app is ready (immediately if it already is). */
export function onAppReady(callback: () => void) {
  if (appState.ready) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(READY_EVENT, handler);
}
