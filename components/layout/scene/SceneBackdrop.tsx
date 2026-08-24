"use client";

import dynamic from "next/dynamic";
import { useHydrated, useMediaQuery } from "@/lib/use-client";

// three.js stays out of the critical bundle — the scene streams in after
// hydration and the page is fully usable without it.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export function SceneBackdrop() {
  // Evaluated per visit (not module load) so the quality tier reflects the
  // real viewport/pointer/motion state.
  const hydrated = useHydrated();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const narrow = useMediaQuery("(max-width: 768px)");
  const touch = useMediaQuery("(hover: none) and (pointer: coarse)");

  if (!hydrated) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-scene)]" aria-hidden>
      <SceneCanvas low={reducedMotion || narrow || touch} />
    </div>
  );
}
