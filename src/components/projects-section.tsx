'use client';

import { useState } from 'react';
import {
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryLabel,
  type ProjectCategoryId,
  type ProjectItem,
} from '@/data/profile';
import {
  BADGE_CLASS,
  CARD_META_CLASS,
  CARD_SUMMARY_CLASS,
  CARD_TITLE_CLASS,
  INTERACTIVE_CARD_CLASS,
  META_TEXT_CLASS,
  SECTION_CLASS,
  SECTION_HEADER_CLASS,
  SECTION_SUBTITLE_CLASS,
  SECTION_TITLE_CLASS,
  TAG_CLASS,
  TAG_LIST_CLASS,
} from './ui-classes';

interface ProjectsSectionProps {
  readonly projects: readonly ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>('all');
  const filteredProjects = filterProjects(projects, activeCategory);
  const count = filteredProjects.length;

  return (
    <section id="work" className={SECTION_CLASS} aria-labelledby="work-heading">
      <div className={SECTION_HEADER_CLASS}>
        <div>
          <h2 id="work-heading" className={SECTION_TITLE_CLASS}>
            Selected systems
          </h2>
          <p className={SECTION_SUBTITLE_CLASS}>
            Production AI platforms, telemetry pipelines, and research systems.
          </p>
        </div>
        <div
          id="work-filters"
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                className={`cursor-pointer rounded-full border px-[0.8rem] py-[0.42rem] text-sm font-semibold transition-[background-color,color,border-color] duration-[140ms] ease-in-out ${
                  isSelected
                    ? 'border-accent bg-accent text-white dark:text-[#08111e]'
                    : 'border-border bg-surface text-text-muted hover:border-border-strong hover:text-text'
                }`}
                data-category={category.id}
                aria-pressed={isSelected}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
      <p id="filter-status" className="sr-only" role="status" aria-live="polite">
        {`Showing ${count} ${count === 1 ? 'project' : 'projects'}.`}
      </p>
      <div id="projects-root">
        {count === 0 ? (
          <p className="rounded-md border border-dashed border-border-strong p-6 text-text-muted">
            No projects match this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className={INTERACTIVE_CARD_CLASS}
                data-category={project.category}
              >
                <div className={CARD_META_CLASS}>
                  <span className={BADGE_CLASS}>{getCategoryLabel(project.category)}</span>
                  <span className={META_TEXT_CLASS}>{project.role}</span>
                </div>
                <h3 className={CARD_TITLE_CLASS}>{project.title}</h3>
                <p className={CARD_SUMMARY_CLASS}>{project.summary}</p>
                <p className="mt-3 rounded-r-sm border-l-2 border-metric bg-metric-soft px-3 py-2 text-sm font-medium">
                  {project.impact}
                </p>
                <ul className={TAG_LIST_CLASS} aria-label="Technologies used">
                  {project.stack.map((item) => (
                    <li key={item} className={TAG_CLASS}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
