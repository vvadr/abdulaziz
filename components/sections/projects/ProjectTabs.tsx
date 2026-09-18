"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projectTypes, rankedProjects, type ProjectType } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

type TabId = "all" | ProjectType;

const tabs: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  ...projectTypes.filter((type) => rankedProjects.some((p) => p.type === type.id)),
];

/** Type tabs over the ranked project grid. Follows the WAI-ARIA tabs pattern:
 *  arrow keys / Home / End move between tabs and activate them. */
export function ProjectTabs() {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible =
    activeTab === "all"
      ? rankedProjects
      : rankedProjects.filter((project) => project.type === activeTab);
  const scope = activeTab === "all" ? "all projects" : tabs.find((t) => t.id === activeTab)!.label;
  const countFor = (id: TabId) =>
    id === "all" ? rankedProjects.length : rankedProjects.filter((p) => p.type === id).length;

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActiveTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mt-12">
      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div
          role="tablist"
          aria-label="Project type"
          className="glass mx-auto flex w-max gap-1 rounded-full p-1"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 font-display text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected ? "text-background" : "text-muted hover:text-foreground"
                }`}
              >
                {selected ? (
                  <motion.span
                    layoutId={`${baseId}-tab-pill`}
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34 }
                    }
                  />
                ) : null}
                <span className="relative">
                  {tab.label}
                  <span
                    className={`ml-1.5 tabular-nums ${selected ? "opacity-70" : "opacity-60"}`}
                  >
                    {countFor(tab.id)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-muted">
        Ranked strongest first{activeTab === "all" ? "" : ` within ${scope}`}.
      </p>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${activeTab}`}
        className="mt-10 grid gap-8 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.div
              key={project.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} position={index + 1} scope={scope} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
