"use client";

import { useEffect, useMemo, useRef, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { skillIcons, type SkillIcon } from "@/data/skills";

// Logos placed on a rotating sphere. Real 3D: each point is rotated in space,
// projected to 2D, and depth-scaled (front = larger/brighter, back = small/dim).
// Icons stay flat billboards so they remain readable.
const SPHERE = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Python",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Git",
  "GitHub",
  "Vercel",
  "npm",
];

type Vec = [number, number, number];

function fibonacciSphere(n: number): Vec[] {
  const pts: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const t = golden * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

function project(p: Vec, radius: number, ay: number, ax: number) {
  const [x, y, z] = p;
  const cy = Math.cos(ay);
  const sy = Math.sin(ay);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(ax);
  const sx = Math.sin(ax);
  const y2 = y * cx - z1 * sx;
  const z2 = y * sx + z1 * cx;
  const depth = (z2 + 1) / 2; // 0 = back, 1 = front
  return {
    dx: x1 * radius,
    dy: y2 * radius,
    scale: 0.5 + depth * 0.75,
    opacity: 0.3 + depth * 0.7,
    blur: (1 - depth) * 1.4,
    zIndex: Math.round(depth * 100),
  };
}

// Deterministic initial transform string (identical on server + client → no
// hydration mismatch). The rAF loop takes over on mount.
function initialStyle(p: Vec) {
  const pr = project(p, 150, 0.6, 0.18);
  return {
    transform: `translate(-50%, -50%) translate(${pr.dx.toFixed(2)}px, ${pr.dy.toFixed(2)}px) scale(${pr.scale.toFixed(3)})`,
    opacity: Number(pr.opacity.toFixed(3)),
    zIndex: pr.zIndex,
  };
}

export function HeroSkills3D() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0, active: false });

  const tools = useMemo(
    () =>
      SPHERE.map((name) => skillIcons.find((s) => s.name === name)).filter(
        (s): s is SkillIcon => Boolean(s?.icon),
      ),
    [],
  );
  const base = useMemo(() => fibonacciSphere(tools.length), [tools.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const radius = () => (container.clientWidth || 400) * 0.34;

    const apply = (r: number, ay: number, ax: number) => {
      for (let i = 0; i < base.length; i += 1) {
        const node = itemsRef.current[i];
        if (!node) continue;
        const pr = project(base[i], r, ay, ax);
        node.style.transform = `translate(-50%, -50%) translate(${pr.dx}px, ${pr.dy}px) scale(${pr.scale})`;
        node.style.opacity = String(pr.opacity);
        node.style.zIndex = String(pr.zIndex);
        node.style.filter = pr.blur > 0.25 ? `blur(${pr.blur.toFixed(2)}px)` : "none";
      }
    };

    if (reduceMotion) {
      apply(radius(), 0.6, 0.18);
      return;
    }

    let ay = 0.4;
    let ax = 0.18;
    let raf = 0;
    const loop = () => {
      const targetAx = pointer.current.active ? 0.18 + pointer.current.y * 0.5 : 0.18;
      ax += (targetAx - ax) * 0.045;
      const speed = 0.0026 + (pointer.current.active ? pointer.current.x * 0.0034 : 0);
      ay += speed;
      apply(radius(), ay, ax);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [base, reduceMotion]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointer.current = { x: 0, y: 0, active: false };
  };

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[24rem] sm:max-w-[30rem]"
    >
      {/* soft teal core + halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2/5 w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_40%,transparent),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_72%)] blur-3xl" />

      <div
        ref={containerRef}
        onPointerMove={reduceMotion ? undefined : handlePointerMove}
        onPointerLeave={reduceMotion ? undefined : handlePointerLeave}
        className="absolute inset-0 cursor-grab"
        style={{ perspective: "1000px" }}
      >
        {tools.map((tool, i) => {
          const init = initialStyle(base[i]);
          return (
            <div
              key={tool.name}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              suppressHydrationWarning
              className="absolute left-1/2 top-1/2 flex h-12 w-12 items-center justify-center"
              style={init}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 fill-[color-mix(in_oklab,var(--ink)_92%,var(--accent))] drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]"
              >
                <path d={tool.icon?.path} />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
