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
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <SectionReveal>
          <h2 className="section-title">Projects</h2>
          <p className="section-lead">
            Shipped frontends, a machine-learning notebook, and a few things I
            built to learn. Open any card for the full story.
          </p>
        </SectionReveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {projectItems.map((project, index) => (
            <SectionReveal key={project.title} delay={(index % 2) * 0.08} className="h-full">
              <article
                role="button"
                tabIndex={0}
                onClick={(event) => openProject(project, event.currentTarget)}
                onKeyDown={handleCardKeyDown(project)}
                aria-label={`View details for ${project.title}`}
                className="card-surface card-interactive flex h-full cursor-pointer flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                      {project.category}
                    </p>
                    <h3 className="mt-2.5 font-display text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="tag tag-accent shrink-0 uppercase tracking-[0.12em]">
                    {project.status}
                  </span>
                </div>

                <p className="mt-4 leading-7 text-muted">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                  {project.stack.length > 5 ? (
                    <span className="tag text-faint">+{project.stack.length - 5}</span>
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
              </article>
            </SectionReveal>
          ))}
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
        className={`absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          item ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close project details"
      />

      <aside
        className={`absolute inset-y-0 right-0 flex h-full w-full max-w-xl flex-col overflow-y-auto overscroll-contain border-l border-border bg-surface p-6 shadow-[-28px_0_80px_rgba(0,0,0,0.6)] transition-transform duration-300 sm:p-8 ${
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
                className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted transition hover:border-accent/50 hover:text-accent-strong"
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
                    className="rounded-2xl border border-border bg-white/[0.02] p-4 leading-7 text-muted"
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
