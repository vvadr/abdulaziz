import { ArrowRight } from "lucide-react";
import { CvLinks } from "@/components/shared/CvLinks";
import { SocialIcon } from "@/components/shared/SocialIcon";
import {
  heroAvailability,
  heroHighlights,
  heroLocation,
  heroRole,
  heroTagline,
  socialLinks,
} from "@/data/site";
import { Transcriber } from "./Transcriber";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const profiles = socialLinks.filter((link) => link.icon !== "email");

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="shell pb-20 pt-8 sm:pt-12 lg:pb-28">
      <p className="meta fade-in flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft" style={delay(0)}>
        <span className="status text-blue">{heroAvailability}</span>
        <span aria-hidden="true" className="hidden sm:inline">
          /
        </span>
        <span>{heroLocation}</span>
      </p>

      <div className="mt-10 grid items-end gap-x-12 gap-y-10 lg:mt-14 lg:grid-cols-12">
        <h1 id="hero-title" className="name lg:col-span-7">
          <span className="rise">
            <span style={delay(80)}>Abdulaziz</span>
          </span>
          <span className="rise">
            <span style={delay(180)}>Yusupaliev</span>
          </span>
        </h1>

        <div className="fade-in lg:col-span-5 lg:pb-3" style={delay(350)}>
          <Transcriber />
        </div>
      </div>

      <div className="mt-12 grid gap-x-12 gap-y-12 border-t border-ink pt-8 lg:mt-16 lg:grid-cols-12">
        <div className="fade-in lg:col-span-6" style={delay(450)}>
          <p className="lede">
            <strong className="font-bold text-blue">{heroRole}</strong> {heroTagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-solid">
              See the work
            </a>
            <CvLinks />
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem] font-semibold" aria-label="Profiles">
            {profiles.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-blue"
                >
                  <SocialIcon name={profile.icon} className="size-4" />
                  {profile.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul className="fade-in lg:col-span-5 lg:col-start-8" style={delay(550)} aria-label="Highlights">
          {heroHighlights.map((item) => (
            <li key={item.title} className="border-b border-rule first:border-t lg:first:border-t-0">
              <a href={item.href} className="group flex items-center justify-between gap-6 py-4">
                <span>
                  <span className="block font-semibold transition-colors group-hover:text-blue">
                    {item.title}
                  </span>
                  <span className="block text-[0.9375rem] text-ink-soft">{item.detail}</span>
                </span>
                <ArrowRight size={20} className="nudge-x shrink-0 text-blue" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
