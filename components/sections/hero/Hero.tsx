import { ArrowUpRight } from "lucide-react";
import {
  heroAvailability,
  heroHighlights,
  heroLocation,
  heroRole,
  heroTagline,
  resumeLinks,
} from "@/data/site";
import { Transcriber } from "./Transcriber";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="shell pb-20 pt-8 sm:pt-12 lg:pb-28">
      <p className="meta fade-in flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-soft" style={delay(0)}>
        <span className="status text-blue">{heroAvailability}</span>
        <span aria-hidden="true">/</span>
        <span>{heroLocation}</span>
      </p>

      <div className="mt-10 grid items-end gap-x-12 gap-y-12 lg:mt-14 lg:grid-cols-12">
        <h1 id="hero-title" className="name order-2 lg:order-1 lg:col-span-7">
          <span className="rise">
            <span style={delay(80)}>Abdulaziz</span>
          </span>
          <span className="rise">
            <span style={delay(180)}>Yusupaliev</span>
          </span>
        </h1>

        <div className="fade-in order-1 lg:order-2 lg:col-span-5 lg:pb-3" style={delay(350)}>
          <Transcriber />
        </div>
      </div>

      <div className="mt-12 grid gap-x-12 gap-y-12 border-t border-ink pt-8 lg:mt-16 lg:grid-cols-12">
        <div className="fade-in lg:col-span-6" style={delay(450)}>
          <p className="lede max-w-[34ch]">
            <strong className="font-bold text-blue">{heroRole}</strong> {heroTagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-solid">
              See the work
            </a>
            {resumeLinks.map((cv) => (
              <a key={cv.href} href={cv.href} target="_blank" rel="noreferrer" className="btn btn-line">
                {cv.label}
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
            ))}
          </div>
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
                <ArrowUpRight size={20} className="nudge shrink-0 text-blue" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
