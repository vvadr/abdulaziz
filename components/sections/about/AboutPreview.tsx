import Image from "next/image";
import { MoreLink } from "@/components/shared/MoreLink";
import { aboutSummary, educationItems, recognition } from "@/data/site";

const scholarship = educationItems[0];

/** Home page: the portrait, one line, and the two facts a reviewer looks
 *  for. /about has the full background and every program. */
export function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-title" className="section pt-0">
      <div className="shell">
        <div className="grid gap-x-12 gap-y-10 border-t border-ink pt-12 lg:grid-cols-12 lg:pt-16">
          <div className="lg:col-span-4">
            <div className="shot aspect-square max-w-[12rem] lg:max-w-[18rem]" data-wipe>
              <Image
                src="/images/abdulaziz-profile.jpg"
                alt="Portrait of Abdulaziz Yusupaliev"
                width={460}
                height={460}
                sizes="(min-width: 1024px) 18rem, 70vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="about-title" className="display-l">
              About
            </h2>
            <p className="lede mt-6">{aboutSummary}</p>

            <dl className="mb-10 mt-10 grid gap-x-8 gap-y-3 border-t border-rule pt-5 text-[0.9375rem] sm:grid-cols-[7.5rem_1fr]">
              <dt className="font-semibold">Studied</dt>
              <dd className="text-ink-soft">
                {scholarship.title} · {scholarship.provider}, {scholarship.providerNote} ({scholarship.period})
              </dd>
              <dt className="font-semibold">Recognition</dt>
              <dd className="text-ink-soft">{recognition}</dd>
            </dl>

            <MoreLink href="/about">See education and background</MoreLink>
          </div>
        </div>
      </div>
    </section>
  );
}
