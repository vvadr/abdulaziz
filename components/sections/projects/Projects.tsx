"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ArrowUpRight, FolderGit2, Globe, X } from "lucide-react";
import { projectItems, type ProjectItem } from "@/data/site";
import { SectionReveal } from "../../shared/SectionReveal";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  const openProject = (project: ProjectItem, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
    // Return focus to the card that opened the drawer.
    triggerRef.current?.focus();
  };

  const handleCardKeyDown =
    (project: ProjectItem) => (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(project, event.currentTarget);
      }
    };

  return (
    <section id="projects" className="section">
      <div className="shell">
        <SectionReveal>
          <h2 className="section-title">Projects</h2>
          <p className="section-lead">
            Shipped frontends, a machine-learning notebook, and a few things I
            built to learn. Open any card for the full story.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projectItems.map((project, index) => {
            const featured = index === 0;
            return (
              <SectionReveal
                key={project.title}
                delay={(index % 2) * 0.07}
                className={featured ? "lg:col-span-2" : "h-full"}
              >
                <article
                  role="button"
                  tabIndex={0}
                  onClick={(event) => openProject(project, event.currentTarget)}
                  onKeyDown={handleCardKeyDown(project)}
                  aria-label={`View details for ${project.title}`}
                  className={`card-surface card-interactive flex h-full cursor-pointer flex-col p-6 sm:p-7 ${
                    featured ? "lg:flex-row lg:gap-10" : ""
                  }`}
                >
                  <div className={`flex flex-col ${featured ? "lg:flex-1" : "h-full"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                          {featured ? "Featured · " : ""}
                          {project.category}
                        </p>
                        <h3 className="mt-2.5 font-display font-semibold tracking-[-0.02em] text-foreground text-xl sm:text-2xl">
                          {project.title}
                        </h3>
                      </div>
                      <span className="tag tag-accent shrink-0 uppercase tracking-[0.12em]">
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-muted">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.slice(0, featured ? 8 : 5).map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                      {project.stack.length > (featured ? 8 : 5) ? (
                        <span className="tag text-faint">
                          +{project.stack.length - (featured ? 8 : 5)}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-7 text-sm">
                      <div className="flex items-center gap-3 text-faint">
                        <span className="inline-flex items-center gap-1.5">
                          <FolderGit2 size={15} aria-hidden="true" /> Repo
                        </span>
                        {project.liveUrl ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Globe size={15} aria-hidden="true" /> Live
                          </span>
                        ) : null}
                      </div>
                      <span className="inline-flex items-center gap-1.5 font-medium text-accent-strong">
                        View details
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  {/* featured highlights teaser */}
                  {featured ? (
                    <div className="mt-7 rounded-2xl border border-border-soft bg-white/[0.02] p-5 lg:mt-0 lg:w-80 lg:shrink-0">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-strong">
                        Highlights
                      </p>
                      <ul className="mt-4 grid gap-3">
                        {project.details.slice(0, 3).map((detail) => (
                          <li key={detail} className="flex gap-2.5 text-sm leading-6 text-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-[color-mix(in_oklab,var(--accent)_70%,transparent)]"
                            />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>

      <ProjectDrawer item={selectedProject} onClose={closeProject} />
    </section>
  );
}

function ProjectDrawer({
  item,
  onClose,
}: {
  item: ProjectItem | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (item) {
      // Move focus into the drawer for keyboard + screen-reader users.
      const id = window.setTimeout(() => closeRef.current?.focus(), 80);
      return () => window.clearTimeout(id);
    }
  }, [item]);

  return (
    <div
      className={`fixed inset-0 z-[var(--z-overlay)] transition ${
        item ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!item}
    >
      <button
        type="button"
        tabIndex={item ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-[color-mix(in_oklab,var(--bg)_65%,transparent)] backdrop-blur-sm transition-opacity duration-300 ${
          item ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close project details"
      />

      <aside
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-xl flex-col overflow-y-auto overscroll-contain border-l border-border bg-surface p-6 shadow-[-28px_0_80px_rgba(0,0,0,0.55)] transition-transform duration-[400ms] [transition-timing-function:var(--ease-out-expo)] sm:p-8 ${
          item ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={item ? `${item.title} details` : "Project details"}
      >
        {item ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-strong">
                  {item.category}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-faint">{item.status}</p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition hover:border-[color-mix(in_oklab,var(--accent)_50%,transparent)] hover:text-accent-strong"
                aria-label="Close project details"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <p className="mt-7 leading-8 text-muted">{item.description}</p>

            <div className="mt-8">
              <h4 className="font-display text-lg font-semibold text-foreground">
                What&apos;s in it
              </h4>
              <ul className="mt-4 space-y-3">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="rounded-2xl border border-border-soft bg-white/[0.02] p-4 leading-7 text-muted"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h4 className="font-display text-lg font-semibold text-foreground">
                Tech stack
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span key={tech} className="tag tag-accent">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a
                href={item.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-sm"
              >
                <FolderGit2 size={16} aria-hidden="true" />
                Repository
              </a>

              {item.liveUrl ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-sm"
                >
                  <Globe size={16} aria-hidden="true" />
                  Visit live site
                </a>
              ) : null}
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
