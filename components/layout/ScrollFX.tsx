"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  appState,
  onAppReady,
  scrollState,
  smoothScroller,
} from "@/lib/scroll-state";
import { prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide scroll machinery: Lenis smooth scrolling (driven by the GSAP
 * ticker), the top progress beam, and the shared [data-reveal] scroll
 * reveals. Mounted once in the root layout.
 */
export function ScrollFX() {
  const pathname = usePathname();
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.3, smoothWheel: true, anchors: true });
    smoothScroller.current = lenis;

    // Scroll stays locked while the preloader plays (first visit only).
    if (!appState.ready) lenis.stop();
    const offReady = onAppReady(() => lenis.start());

    lenis.on("scroll", (instance: Lenis) => {
      scrollState.progress = instance.progress || 0;
      scrollState.velocity = instance.velocity || 0;
      if (beamRef.current) {
        beamRef.current.style.transform = `scaleX(${instance.progress || 0})`;
      }
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Late-loading images/fonts change layout — re-measure the triggers.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      offReady();
      gsap.ticker.remove(raf);
      lenis.destroy();
      smoothScroller.current = null;
    };
  }, []);

  // Shared scroll reveals; re-scanned whenever the route changes.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-reveal]", { autoAlpha: 1 });
        return;
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: 60,
            x: i % 2 === 0 ? -45 : 45,
            rotateX: 8,
            transformPerspective: 900,
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-progress)] h-[3px] bg-white/5"
      aria-hidden
    >
      <div
        ref={beamRef}
        className="h-full origin-left bg-accent will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
