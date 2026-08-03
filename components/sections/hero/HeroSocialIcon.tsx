import { Mail } from "lucide-react";
import { siGithub, siTelegram } from "simple-icons";

import type { HeroSocialIconName } from "@/data/site";

type HeroSocialIconProps = {
  name: HeroSocialIconName;
  className?: string;
};

function SimpleIcon({
  icon,
  className,
}: {
  icon: { path: string };
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      role="img"
      fill="currentColor"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <rect x="7.5" y="10" width="2" height="6.25" rx="1" />
      <circle cx="8.5" cy="7.55" r="1" />
      <path d="M12.1 10.05h1.85v.93h.03c.43-.67 1.17-1.08 2.18-1.08 1.95 0 2.74 1.12 2.74 3.23v3.12h-2v-2.84c0-1.01-.29-1.69-1.17-1.69-.91 0-1.51.68-1.51 1.69v2.84h-2.12z" />
    </svg>
  );
}

export function HeroSocialIcon({ name, className }: HeroSocialIconProps) {
  if (name === "github") {
    return <SimpleIcon icon={siGithub} className={className} />;
  }

  if (name === "linkedin") {
    return <LinkedInIcon className={className} />;
  }

  if (name === "telegram") {
    return <SimpleIcon icon={siTelegram} className={className} />;
  }

  return <Mail className={className} />;
}
