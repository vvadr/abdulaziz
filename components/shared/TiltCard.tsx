"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { cn, isCoarsePointer, prefersReducedMotion } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/** 3D perspective tilt that follows the pointer, with an elastic settle. */
export function TiltCard({ children, className, maxTilt = 9 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, {
      rotateY: (px - 0.5) * maxTilt * 2,
      rotateX: (0.5 - py) * maxTilt * 2,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("will-change-transform [transform-style:preserve-3d]", className)}
    >
      {children}
    </div>
  );
}
