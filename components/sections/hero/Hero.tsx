"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/shared/Magnetic";
import { GreetingRotator } from "./GreetingRotator";
import { heroAvailability, heroLocation, heroTagline } from "@/data/site";
import { appState, subscribeAppReady } from "@/lib/scroll-state";
import { isCoarsePointer, prefersReducedMotion } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function Chars({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} aria-hidden className="char inline-block will-change-transform">
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ready = useSyncExternalStore(
    subscribeAppReady,
    () => appState.ready,
    () => false,
  );

  // Intro: character-staggered name, then the supporting rows fade up.
  // Runs once the preloader releases the page.
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([".char", "[data-hero-fade]"], { autoAlpha: 1, yPercent: 0, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.fromTo(
        ".char",
        { yPercent: 110, rotateX: -60, autoAlpha: 0 },
        { yPercent: 0, rotateX: 0, autoAlpha: 1, duration: 1.1, stagger: 0.035 },
        0.05,
      ).fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
        "-=0.55",
      );
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  // Scroll-out shrink/fade + pointer parallax on [data-depth] layers.
  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        scale: 0.94,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom 20%", scrub: 0.8 },
      });
    }, root);

    let cleanupMouse: (() => void) | undefined;
    if (!isCoarsePointer()) {
      const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
      const setters = layers.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
        depth: Number(el.dataset.depth ?? 0.5),
      }));
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * 38 * s.depth);
          s.y(ny * 38 * 0.65 * s.depth);
        });
      };
      window.addEventListener("mousemove", onMove);
      cleanupMouse = () => window.removeEventListener("mousemove", onMove);
    }

    return () => {
      ctx.revert();
      cleanupMouse?.();
    };
  }, []);

  // The section's vertical padding keeps the centred content clear of the
  // fixed navbar (and the scroll cue) when the viewport is short.
  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-[clamp(5rem,10vh,7.5rem)] text-center sm:px-10"
    >
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        aria-hidden
        data-depth="0.25"
        className="absolute left-[12%] top-[18%] size-[28vmax] rounded-full bg-accent/12 blur-[50px] [animation:pulse-glow_9s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        data-depth="0.4"
        className="absolute bottom-[10%] right-[8%] size-[24vmax] rounded-full bg-accent-2/12 blur-[50px] [animation:pulse-glow_11s_ease-in-out_infinite_reverse]"
      />

      <div
        ref={innerRef}
        className="relative z-10 flex flex-col items-center pb-14 will-change-transform"
      >
        <p
          data-hero-fade
          data-depth="0.18"
          className="glass mb-6 rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.32em] text-muted"
        >
          <span
            aria-hidden
            className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle [animation:pulse-glow_2.4s_ease-in-out_infinite]"
          />
          {heroAvailability} · {heroLocation}
        </p>

        <div data-hero-fade data-depth="0.14" className="mb-2">
          <GreetingRotator />
        </div>

        <h1 data-depth="0.1" className="hero-title font-display font-bold [perspective:900px]">
          <span className="block overflow-hidden pb-1">
            <Chars text="Abdulaziz" />
          </span>
          <span className="hero-serif hero-surname block overflow-hidden pb-2 text-accent">
            <Chars text="Yusupaliev" />
          </span>
        </h1>

        <p
          data-hero-fade
          data-depth="0.16"
          className="mt-7 max-w-xl text-balance text-base text-muted sm:text-lg"
        >
          <span className="serif-accent text-foreground/90">Frontend developer</span>{" "}
          {heroTagline}
        </p>

        <div
          data-hero-fade
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.35}>
            <a href="#projects" className="btn-primary btn-lg">
              View projects
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a href="#contact" className="btn-ghost btn-lg">
              Get in touch
            </a>
          </Magnetic>
        </div>
      </div>

      <div
        data-hero-fade
        aria-hidden
        className="scroll-cue absolute bottom-8 z-10 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-muted"
      >
        <span className="relative h-9 w-[22px] rounded-full border border-muted/60">
          <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded-full bg-accent [animation:scroll-dot_1.9s_ease-in-out_infinite]" />
        </span>
        Scroll
        <ArrowDown className="size-3.5 text-accent" />
      </div>
    </section>
  );
}
