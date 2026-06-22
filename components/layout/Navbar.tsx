"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroSocialLinks, navItems } from "@/data/site";
import { HeroSocialIcon } from "../sections/hero/HeroSocialIcon";

const DESKTOP_QUERY = "(min-width: 768px)";

export function Navbar() {
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "home");
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Active-section spy.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const current = visible[0]?.target;
        if (current?.id) setActiveId(current.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.08, 0.18, 0.32, 0.48] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Scroll progress saber + frosted-after-scroll state.
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, top / max) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      const past = top > 24;
      setScrolled((prev) => (prev === past ? prev : past));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll); // async initial sync — no setState in effect body
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Mobile menu: scroll lock, escape, close on resize to desktop, focus restore.
  useEffect(() => {
    if (!isMenuOpen) return;

    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    mediaQuery.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      mediaQuery.removeEventListener("change", closeOnDesktop);
      trigger?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      {/* scroll-progress saber */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/5">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,#7c1518,#e23234_60%,#ff6466)] shadow-[0_0_12px_rgba(226,50,52,0.7)]"
        />
      </div>

      <div className="px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2.5 transition-all duration-300 md:px-4 ${
            scrolled
              ? "border border-white/10 bg-surface/70 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "border border-white/[0.04] bg-white/[0.02] backdrop-blur-sm"
          }`}
        >
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="Abdulaziz Yusupaliev — home"
            className="group flex items-center gap-3"
          >
            <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 transition group-hover:ring-accent/50 group-hover:shadow-[0_0_18px_-3px_rgba(226,50,52,0.7)]">
              <Image
                src="/darth-vader-logo.svg"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="font-display text-sm font-semibold tracking-[-0.01em] text-foreground">
              Abdulaziz
            </span>
          </a>

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const active = item.id === activeId;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "text-accent-strong" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_40%,transparent)]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn-primary hidden text-sm md:inline-flex">
              Let&apos;s talk
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="group relative grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition hover:border-accent/45 hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] md:hidden"
            >
              <span className="relative h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-px w-5 bg-current transition duration-300 ${
                    isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-px w-5 bg-current transition duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-5 bg-current transition duration-300 ${
                    isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        id={menuId}
        isOpen={isMenuOpen}
        activeId={activeId}
        reduceMotion={Boolean(reduceMotion)}
        onClose={closeMenu}
      />
    </header>
  );
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0 },
};

function MobileMenu({
  id,
  isOpen,
  activeId,
  reduceMotion,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  activeId: string;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={id}
          variants={reduceMotion ? undefined : overlayVariants}
          initial={reduceMotion ? { opacity: 1 } : "hidden"}
          animate={reduceMotion ? { opacity: 1 } : "visible"}
          exit={reduceMotion ? { opacity: 0 } : "exit"}
          className="fixed inset-0 z-[var(--z-overlay)] flex flex-col bg-background/95 px-6 pb-10 pt-6 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-faint">
              Menu
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition hover:border-accent/45 hover:text-accent-strong"
            >
              <span className="relative h-4 w-5">
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px rotate-45 bg-current" />
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col justify-center gap-1" aria-label="Mobile navigation">
            {navItems.map((item, index) => {
              const active = item.id === activeId;
              return (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClose}
                  variants={reduceMotion ? undefined : linkVariants}
                  aria-current={active ? "page" : undefined}
                  className={`font-display text-4xl font-bold tracking-[-0.03em] transition-colors ${
                    active ? "text-accent-strong" : "text-foreground hover:text-accent-strong"
                  }`}
                >
                  <span className="mr-3 font-mono text-sm text-faint">
                    0{index + 1}
                  </span>
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            variants={reduceMotion ? undefined : linkVariants}
            className="flex items-center justify-between gap-4 border-t border-border pt-6"
          >
            <div className="flex items-center gap-2">
              {heroSocialLinks.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    onClick={onClose}
                    className="grid size-11 place-items-center rounded-xl border border-border text-muted transition hover:border-accent/50 hover:text-accent-strong"
                  >
                    <HeroSocialIcon name={link.icon} className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <a href="#contact" onClick={onClose} className="btn-primary text-sm">
              Let&apos;s talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
