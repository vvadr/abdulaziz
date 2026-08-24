"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { contactLinks, heroSocialLinks, navItems } from "@/data/site";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { Magnetic } from "@/components/shared/Magnetic";
import { smoothScroller } from "@/lib/scroll-state";

const DESKTOP_QUERY = "(min-width: 768px)";
const HIRE_HREF = contactLinks[0].href; // mailto

/**
 * Full-width top bar (deliberately different from the reference site's
 * floating pill): transparent over the hero, frosted glass after scroll,
 * animated gold underline tracking the active section, and — unlike the
 * reference — a real mobile menu.
 */
export function Navbar() {
  const pathname = usePathname();
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isProjectRoute = pathname.startsWith("/projects/");
  const sectionHref = (id: string) => (isProjectRoute ? `/#${id}` : `#${id}`);

  // Active-section spy.
  useEffect(() => {
    if (isProjectRoute) return;
    const sections = ["hero", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
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
  }, [isProjectRoute]);

  // Frosted-after-scroll state.
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 24;
      setScrolled((prev) => (prev === past ? prev : past));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = requestAnimationFrame(onScroll);
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
    smoothScroller.current?.stop();

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
      smoothScroller.current?.start();
      window.removeEventListener("keydown", closeOnEscape);
      mediaQuery.removeEventListener("change", closeOnDesktop);
      trigger?.focus();
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-nav)]">
      <div
        className={`border-b transition-[background-color,border-color] duration-300 ${
          scrolled
            ? "border-glass-border bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-3">
          <a
            href={isProjectRoute ? "/" : "#hero"}
            onClick={closeMenu}
            aria-label="Abdulaziz Yusupaliev — home"
            data-cursor
            className="font-display text-lg font-bold tracking-tight"
          >
            AY<span className="gradient-text">.</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navItems.map((item) => {
              const active = !isProjectRoute && item.id === activeId;
              return (
                <a
                  key={item.id}
                  href={sectionHref(item.id)}
                  aria-current={active ? "true" : undefined}
                  className={`relative py-1.5 text-[0.84rem] transition-colors duration-300 ${
                    active ? "text-accent" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-2"
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
            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <a href={HIRE_HREF} className="btn-primary btn-sm">
                Hire me
              </a>
            </Magnetic>

            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="grid size-10 place-items-center rounded-full border border-glass-border text-foreground transition duration-200 hover:border-accent/50 hover:bg-accent/10 md:hidden"
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
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.06, delayChildren: 0.08 },
  },
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
          className="fixed inset-0 z-[var(--z-menu)] flex flex-col bg-[color-mix(in_srgb,var(--background)_94%,transparent)] px-6 pb-10 pt-4 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-lg font-bold tracking-tight">
              AY<span className="gradient-text">.</span>
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="grid size-10 place-items-center rounded-full border border-glass-border text-foreground transition hover:border-accent/50 hover:text-accent"
            >
              <span className="relative h-4 w-5">
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px rotate-45 bg-current" />
                <span className="absolute left-0 top-[7px] h-px w-5 -translate-y-px -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            className="mt-8 flex flex-1 flex-col justify-center gap-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => {
              const active = !isProjectRoute && item.id === activeId;
              return (
                <motion.a
                  key={item.id}
                  href={isProjectRoute ? `/#${item.id}` : `#${item.id}`}
                  onClick={onClose}
                  variants={reduceMotion ? undefined : linkVariants}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-baseline gap-4 border-b border-glass-border py-4 font-display text-3xl font-bold transition-colors ${
                    active ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  <span className="text-xs font-medium tabular-nums text-muted" aria-hidden>
                    0{index + 1}
                  </span>
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          <motion.div
            variants={reduceMotion ? undefined : linkVariants}
            className="flex items-center justify-between gap-4 border-t border-glass-border pt-6"
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
                    className="glass grid size-11 place-items-center rounded-full text-muted transition hover:border-accent/50 hover:text-accent"
                  >
                    <SocialIcon name={link.icon} className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <a href={HIRE_HREF} onClick={onClose} className="btn-primary btn-sm">
              Hire me
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
