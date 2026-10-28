import Image from "next/image";
import { aboutParagraphs, educationItems, heroLocation, recognition } from "@/data/site";

export function About() {
  // No top padding: Skills above already ends with a section's worth of
  // space, and the ink rule marks the change.
  return (
    <section id="about" aria-labelledby="about-title" className="section pt-0">
      <div className="shell">
        <div className="grid gap-x-12 gap-y-12 border-t border-ink pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <div className="shot aspect-square max-w-[22rem]" data-wipe>
              <Image
                src="/images/abdulaziz-profile.jpg"
                alt="Portrait of Abdulaziz Yusupaliev"
                width={460}
                height={460}
                sizes="(min-width: 1024px) 22rem, 80vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="about-title" className="display-l">
              About
            </h2>
            <div className="lede mt-8 space-y-5">
              {aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-3 border-t border-rule pt-5 text-[0.9375rem] sm:grid-cols-[7.5rem_1fr]">
              <dt className="font-semibold">Based in</dt>
              <dd className="text-ink-soft">{heroLocation}</dd>
              <dt className="font-semibold">Recognition</dt>
              <dd className="text-ink-soft">{recognition}</dd>
            </dl>

            <h3 className="mt-14 text-lg font-bold tracking-[-0.01em]">Education & training</h3>
            <ol className="mt-4 border-t border-ink">
              {educationItems.map((item) => (
                <li
                  key={`${item.provider}-${item.period}`}
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-5 sm:grid-cols-[7.5rem_1fr]"
                >
                  <p className="meta tabular pt-0.5 text-ink-soft">{item.period}</p>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-[0.9375rem] text-ink-soft">
                      {item.provider}
                      {item.providerNote ? ` · ${item.providerNote}` : ""} — {item.focus}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
