import Image from "next/image";
import { aboutParagraphs, educationItems, heroLocation, recognition } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-rule">
      <div className="shell grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <figure className="max-w-[22rem]">
            <div className="shot aspect-square" data-wipe>
              <Image
                src="/images/abdulaziz-profile.jpg"
                alt="Portrait of Abdulaziz Yusupaliev"
                width={460}
                height={460}
                sizes="(min-width: 1024px) 22rem, 80vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="meta mt-3 text-ink-soft">{heroLocation}</figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <h2 id="about-title" className="display-l">
            About
          </h2>
          <div className="lede mt-8 max-w-[38ch] space-y-5">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue px-4 py-2 text-[0.9375rem] font-semibold text-white">
            <span aria-hidden="true">★</span>
            {recognition}
          </p>

          <h3 className="mt-14 text-lg font-bold">Education & training</h3>
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
    </section>
  );
}
