"use client";

import Image from "next/image";
import type { SimpleIcon } from "simple-icons";
import { type PortfolioSkill, skillGroups, skillIcons } from "@/data/skills";
import { SectionReveal } from "../../shared/SectionReveal";

function findSkillIcon(name: string) {
  return skillIcons.find((skill) => skill.name === name)?.icon;
}

function getIconColor(icon: SimpleIcon) {
  // Pure-black brand marks would vanish on the dark bg — lift them to white.
  return icon.hex.toLowerCase() === "000000" ? "#ffffff" : `#${icon.hex}`;
}

function SkillTile({ skill }: { skill: PortfolioSkill }) {
  const icon = findSkillIcon(skill.name);
  const label = skill.shortName ?? skill.name;

  let glyph;
  if (skill.assetSrc) {
    glyph = (
      <Image
        src={skill.assetSrc}
        alt=""
        width={skill.assetWidth ?? 96}
        height={skill.assetHeight ?? 96}
        className="h-9 w-auto max-w-full object-contain sm:h-11"
        unoptimized
      />
    );
  } else if (icon) {
    glyph = (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-9 w-9 fill-current drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)] sm:h-11 sm:w-11"
        style={{ color: getIconColor(icon) }}
      >
        <path d={icon.path} />
      </svg>
    );
  } else {
    glyph = (
      <span
        className="font-display text-xl font-bold sm:text-2xl"
        style={{ color: skill.fallbackColor ?? "#ffffff" }}
      >
        {skill.fallbackLabel ?? skill.name.slice(0, 2)}
      </span>
    );
  }

  return (
    <div
      className="group flex flex-col items-center gap-2.5 text-center"
      title={skill.name}
    >
      <div className="flex h-12 items-center justify-center transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:h-14">
        {glyph}
      </div>
      <span className="text-xs font-medium leading-none text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionReveal>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <p className="section-lead">
            The stack I build with day to day — and the Python data tools I&apos;m
            learning AI and machine learning on.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, groupIndex) => (
            <SectionReveal
              key={group.title}
              as="section"
              delay={groupIndex * 0.07}
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground">
                {group.title}
              </h3>
              <div className="saber-rule mt-3" />
              <div className="mt-7 grid grid-cols-3 gap-x-4 gap-y-8">
                {group.skills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} />
                ))}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
