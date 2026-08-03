import Image from "next/image";
import { heroLocation } from "@/data/site";

const rows: { label: string; value: string }[] = [
  { label: "role", value: "Frontend Developer · AI/ML Engineer" },
  { label: "stack", value: "React, Next.js, TypeScript" },
  { label: "learning", value: "Python, Pandas, Scikit-learn" },
  { label: "location", value: heroLocation },
];

export function HeroSystemInfo() {
  return (
    <div className="term-window" aria-hidden="true">
      <div className="term-titlebar">
        <span className="window-dots">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
        </span>
        <span className="term-titlebar-label">neofetch</span>
      </div>

      <div className="term-body flex items-start gap-5 text-sm">
        <span className="relative size-20 shrink-0 overflow-hidden rounded-md border border-[color-mix(in_oklab,var(--accent)_35%,var(--border))] sm:size-24">
          <Image
            src="/images/abdulaziz-profile.jpg"
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">abdulaziz@portfolio</p>
          <div className="beam-rule my-3 max-w-[10rem] origin-left" />
          <dl className="grid gap-1.5">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline gap-3 leading-6">
                <dt className="w-[5.2rem] shrink-0 text-accent-strong">{row.label}</dt>
                <dd className="min-w-0 truncate text-muted">{row.value}</dd>
              </div>
            ))}
            <div className="flex items-baseline gap-3 leading-6">
              <dt className="w-[5.2rem] shrink-0 text-accent-strong">status</dt>
              <dd className="flex min-w-0 items-center gap-2 text-muted">
                <span className="pulse-dot shrink-0" />
                Open to internships &amp; freelance
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
