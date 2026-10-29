import { ArrowUpRight } from "lucide-react";
import { CvLinks } from "@/components/shared/CvLinks";
import { SocialIcon } from "@/components/shared/SocialIcon";
import { socialLinks } from "@/data/site";
import { cn } from "@/lib/utils";

const email = socialLinks.find((link) => link.icon === "email")!;
const profiles = socialLinks.filter((link) => link.icon !== "email");

/** Closes the home page, and is the whole of /contact (`page`). */
export function Contact({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className={cn("on-blue section pb-16", page && "page-top")}
    >
      <div className="shell">
        <Heading id="contact-title" className="display-xl">
          Say hello.
        </Heading>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="lede intro">
              Open to internships and freelance work. Email reaches me fastest.
            </p>
            <a
              href={email.href}
              className="group mt-8 inline-flex max-w-full items-center gap-3 border-b-2 border-white pb-2 text-[clamp(1.05rem,0.7rem+1.6vw,1.9rem)] font-bold tracking-[-0.015em]"
            >
              <span className="break-all">{email.value}</span>
              <ArrowUpRight className="nudge size-[1.1em] shrink-0" aria-hidden="true" />
            </a>
            <div className="mt-10 flex flex-wrap gap-3">
              <CvLinks />
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
