"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, Folder } from "lucide-react";
import { heroSocialLinks, navItems } from "@/data/site";
import { HeroSocialIcon } from "../sections/hero/HeroSocialIcon";

const DESKTOP_QUERY = "(min-width: 768px)";

export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(navItems[0]?.id ?? "home");
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isProjectRoute = pathname.startsWith("/projects/");
  const sectionHref = (id: string) => (isProjectRoute ? `/#${id}` : `#${id}`);

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

  // Scroll progress beam + frosted-after-scroll state.
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
      {/* scroll-progress beam */}
      <div className="h-[2px] bg-white/5">
        <div
          ref={progressRef}
          className="h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--accent-soft),var(--accent)_55%,var(--accent-strong))] shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_70%,transparent)]"
        />
      </div>

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? "border-border-soft bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] backdrop-blur-xl"
            : "border-white/[0.04] bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] backdrop-blur-sm"
        }`}
      >
        <div className="shell flex h-14 items-center justify-between gap-2">
          <a
            href={isProjectRoute ? "/" : "#home"}
            onClick={closeMenu}
            aria-label="Abdulaziz Yusupaliev — home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="window-dots" aria-hidden="true">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
            </span>
            <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10 transition duration-300 group-hover:ring-[color-mix(in_oklab,var(--accent)_55%,transparent)]">
              <Image
                src="/images/abdulaziz-profile.jpg"
                alt=""
                width={24}
                height={24}
                className="h-full w-full object-cover"
                priority
              />
            </span>
            <span className="font-mono text-sm text-foreground">
              ~/<span className="font-semibold">abdulaziz</span>
            </span>
          </a>

          <nav
            className="nav-tabs-scroll hidden min-w-0 items-center overflow-x-auto md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const active = !isProjectRoute && item.id === activeId;
              return (
                <a
                  key={item.id}
                  href={sectionHref(item.id)}
                  title={item.label}
                  aria-current={!isProjectRoute && active ? "page" : undefined}
                  className={`nav-tab ${active ? "nav-tab-active" : ""}`}
                >
                  <span
                    className="nav-tab-dot"
                    style={{ opacity: active ? 0.9 : 0 }}
                    aria-hidden="true"
                  />
                  {item.file}
                  {active ? (
                    <motion.span
                      layoutId="nav-active-tab"
                      className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-accent-strong shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_75%,transparent)]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a href={sectionHref("contact")} className="btn-primary nav-contact text-xs">
              ./contact.sh
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="group relative grid size-10 place-items-center rounded-md border border-border text-foreground transition duration-200 hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)] md:hidden"
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
        isProjectRoute={isProjectRoute}
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
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0 },
};

function MobileMenu({
  id,
  isOpen,
  activeId,
  isProjectRoute,
  reduceMotion,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  activeId: string;
  isProjectRoute: boolean;
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
          className="fixed inset-0 z-[var(--z-overlay)] flex flex-col bg-[color-mix(in_oklab,var(--bg)_95%,transparent)] px-6 pb-10 pt-6 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-xs text-faint">
              <Folder size={14} aria-hidden="true" />
              ~/abdulaziz
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="grid size-10 place-items-center rounded-md border border-border text-foreground transition hover:border-[color-mix(in_oklab,var(--accent)_45%,transparent)] hover:text-accent-strong"
            >
              <span className="relative h-4 w-5">
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px rotate-45 bg-current" />
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col justify-center gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const active = !isProjectRoute && item.id === activeId;
              return (
                <motion.a
                  key={item.id}
                  href={isProjectRoute ? `/#${item.id}` : `#${item.id}`}
                  onClick={onClose}
                  variants={reduceMotion ? undefined : linkVariants}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-baseline gap-3 border-b border-border-soft py-3.5 font-mono text-2xl font-bold transition-colors ${
                    active ? "text-accent-strong" : "text-foreground hover:text-accent-strong"
                  }`}
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-current"
                    style={{ opacity: active ? 0.9 : 0.25 }}
                    aria-hidden="true"
                  />
                  {item.file}
                  <span className="ml-auto text-xs font-normal text-faint">{item.label}</span>
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
                    className="grid size-11 place-items-center rounded-md border border-border text-muted transition hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:text-accent-strong"
                  >
                    <HeroSocialIcon name={link.icon} className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <a href={isProjectRoute ? "/#contact" : "#contact"} onClick={onClose} className="btn-primary text-sm">
              ./contact.sh
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
