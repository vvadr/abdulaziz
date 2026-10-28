import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { resumeLinks, socialLinks } from "@/data/site";

const email = socialLinks.find((link) => link.icon === "email")!;
const profiles = socialLinks.filter((link) => link.icon !== "email");

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="on-blue section pb-16">
      <div className="shell">
        <h2 id="contact-title" className="display-xl max-w-[12ch]">
          Say hello in any language.
        </h2>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="lede max-w-[36ch] text-blue-pale">
              Open to internships and freelance work. Email reaches me fastest — I reply in
              English, Russian, or Uzbek.
            </p>
            <a
              href={email.href}
              className="group mt-8 inline-flex max-w-full items-center gap-3 border-b-2 border-white pb-2 text-[clamp(1.05rem,0.7rem+1.6vw,1.9rem)] font-bold tracking-[-0.015em]"
            >
              <span className="break-all">{email.value}</span>
              <ArrowUpRight className="nudge size-[1.1em] shrink-0" aria-hidden="true" />
            </a>
            <div className="mt-10 flex flex-wrap gap-3">
              {resumeLinks.map((cv) => (
                <a key={cv.href} href={cv.href} target="_blank" rel="noreferrer" className="btn btn-line">
                  Download {cv.label}
                  <span className="sr-only">(PDF, opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>

          <ul className="lg:col-span-4 lg:col-start-9" aria-label="Profiles">
            {profiles.map((profile) => (
              <li key={profile.label} className="border-b first:border-t">
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-4"
                >
                  <SocialIcon name={profile.icon} className="size-5 shrink-0" />
                  <span className="flex-1">
                    <span className="block font-semibold">{profile.label}</span>
                    <span className="block text-sm text-blue-pale">
                      {profile.icon === "linkedin" ? `in/${profile.value}` : `@${profile.value}`}
                    </span>
                  </span>
                  <ArrowUpRight size={20} className="nudge shrink-0" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
