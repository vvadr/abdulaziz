"use client";

import { useEffect, useRef } from "react";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Parallax backdrop: three star fields and two orbit rings that follow the
 * pointer and the scroll position at different rates.
 *
 * Deliberately not WebGL. Each layer is painted once and then only
 * translated, so the work stays on the compositor, and the rAF loop starts on
 * input and stops as soon as the layers settle — an idle page costs nothing.
 */
export function SceneBackdrop() {
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const ringARef = useRef<HTMLDivElement>(null);
  const ringBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // px/py: how far this layer drifts with the pointer, in pixels at full
    // deflection. sy: how far it counter-scrolls, as a fraction of scrollY.
    const layers = [
      { el: farRef.current, px: 6, py: 5, sy: -0.018 },
      { el: midRef.current, px: 15, py: 11, sy: -0.045 },
      { el: nearRef.current, px: 28, py: 21, sy: -0.085 },
      { el: ringARef.current, px: 11, py: 8, sy: -0.03 },
      { el: ringBRef.current, px: -15, py: -10, sy: -0.055 },
    ].filter(
      (
        layer,
      ): layer is { el: HTMLDivElement; px: number; py: number; sy: number } =>
        Boolean(layer.el),
    );
    if (layers.length === 0) return;

    const target = { x: 0, y: 0, s: window.scrollY };
    const current = { x: 0, y: 0, s: window.scrollY };
    let frame = 0;
    let running = false;

    const apply = () => {
      for (const layer of layers) {
        layer.el.style.transform = `translate3d(${(current.x * layer.px).toFixed(
          2,
        )}px, ${(current.y * layer.py + current.s * layer.sy).toFixed(2)}px, 0)`;
      }
    };

    const tick = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const ds = target.s - current.s;

      // Settled — write the exact target once and let the loop die.
      if (Math.abs(dx) < 0.0005 && Math.abs(dy) < 0.0005 && Math.abs(ds) < 0.15) {
        current.x = target.x;
        current.y = target.y;
        current.s = target.s;
        apply();
        running = false;
        return;
      }

      current.x += dx * 0.08;
      current.y += dy * 0.08;
      current.s += ds * 0.12;
      apply();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
      start();
    };

    const onScroll = () => {
      target.s = window.scrollY;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    const finePointer = !isCoarsePointer();
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      cancelAnimationFrame(frame);
      if (finePointer) {
        window.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerleave", onLeave);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="scene-backdrop fixed inset-0 z-[var(--z-scene)] overflow-hidden"
      aria-hidden
    >
      <div ref={farRef} className="scene-layer">
        <div className="scene-stars scene-stars-far" />
      </div>
      <div ref={midRef} className="scene-layer">
        <div className="scene-stars scene-stars-mid" />
      </div>
      <div ref={nearRef} className="scene-layer">
        <div className="scene-stars scene-stars-near" />
      </div>
      <div ref={ringARef} className="scene-layer">
        <div className="scene-orbit scene-orbit-a" />
      </div>
      <div ref={ringBRef} className="scene-layer">
        <div className="scene-orbit scene-orbit-b" />
      </div>
    </div>
  );
}
