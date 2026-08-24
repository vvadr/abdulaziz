import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  /** Seconds per full loop. */
  speed?: number;
  className?: string;
}

/** Infinite marquee — content is duplicated once and translated by -50%. */
export function Marquee({ children, reverse = false, speed = 30, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee-pause flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className={cn("marquee-track flex w-max shrink-0 items-center", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
