import type { SimpleIcon } from "simple-icons";
import { type PortfolioSkill, skillIcons } from "@/data/skills";

function findSkillIcon(name: string) {
  return skillIcons.find((skill) => skill.name === name)?.icon;
}

function channelToLinear(value: number) {
  const channel = value / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string) {
  const r = channelToLinear(parseInt(hex.slice(0, 2), 16));
  const g = channelToLinear(parseInt(hex.slice(2, 4), 16));
  const b = channelToLinear(parseInt(hex.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getIconColor(icon: SimpleIcon) {
  // Near-black brand marks (GitHub #181717, Pandas #150458, Next.js #000000)
  // vanish against the dark surface — lift them to white rather than only
  // special-casing pure black.
  return relativeLuminance(icon.hex) < 0.08 ? "#ffffff" : `#${icon.hex}`;
}

export function SkillGlyph({
  skill,
  className = "h-5 w-5",
}: {
  skill: PortfolioSkill;
  className?: string;
}) {
  const icon = findSkillIcon(skill.name);

  if (skill.assetSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- tiny local brand SVG; next/image adds an aspect-ratio warning here
      <img src={skill.assetSrc} alt="" className={`${className} w-auto object-contain`} />
    );
  }

  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${className} shrink-0`}
        style={{ color: getIconColor(icon) }}
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <span
      className="font-mono text-xs font-bold"
      style={{ color: skill.fallbackColor ?? "#ffffff" }}
    >
      {skill.fallbackLabel ?? skill.name.slice(0, 2)}
    </span>
  );
}
