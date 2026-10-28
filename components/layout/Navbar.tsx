"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CvLinks } from "@/components/shared/CvLinks";
import { navItems, socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const email = socialLinks.find((link) => link.icon === "email")!;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section that crosses the upper third of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape, return focus to the button.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-[var(--z-nav)] border-b bg-bg transition-colors duration-300",
        scrolled ? "border-rule" : "border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href={isHome ? "#top" : "/"}
          className="wide text-[0.95rem] font-extrabold tracking-[-0.01em]"
          aria-label="Abdulaziz Yusupaliev — home"
        >
          Abdulaziz Yusupaliev
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={hrefFor(item.id)}
                  aria-current={active === item.id ? "location" : undefined}
                  className={cn(
                    "relative py-2 transition-colors hover:text-blue",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-blue after:transition-transform after:duration-300",
                    active === item.id ? "text-blue after:scale-x-100" : "after:scale-x-0",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a href={email.href} className="btn btn-solid btn-sm">
            Email me
          </a>
        </div>

        <button
          ref={menuButton}
          type="button"
          className="btn btn-line btn-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="on-blue fixed inset-x-0 bottom-0 top-16 z-[var(--z-menu)] overflow-y-auto md:hidden"
      >
        <nav aria-label="Mobile" className="shell flex min-h-full flex-col justify-between py-10">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={item.id} className="fade-in" style={{ "--d": `${index * 50}ms` } as React.CSSProperties}>
                <a
                  href={hrefFor(item.id)}
                  onClick={() => setOpen(false)}
                  className="display-l block py-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={email.href} className="btn btn-solid">
              Email me
            </a>
            <CvLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}
