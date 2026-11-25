'use client';

import { useState } from 'react';
import {
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryLabel,
  type ProjectCategoryId,
  type ProjectItem,
} from '@/data/profile';

interface ProjectsSectionProps {
  readonly projects: readonly ProjectItem[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategoryId>('all');
  const filteredProjects = filterProjects(projects, activeCategory);
  const count = filteredProjects.length;

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="section-header">
        <div>
          <h2 id="work-heading" className="section-title">
            Selected systems
          </h2>
          <p className="section-subtitle">
            Production AI platforms, telemetry pipelines, and research systems.
          </p>
        </div>
        <div
          id="work-filters"
          className="filter-bar"
          role="group"
          aria-label="Filter projects by category"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = category.id === activeCategory;
            return (
              <button
                key={category.id}
                type="button"
                className={isSelected ? 'filter-button is-active' : 'filter-button'}
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
          <p className="empty-state">No projects match this category.</p>
        ) : (
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="card project-card"
                data-category={project.category}
              >
                <div className="card-meta">
                  <span className="badge">{getCategoryLabel(project.category)}</span>
                  <span className="meta-text">{project.role}</span>
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-summary">{project.summary}</p>
                <p className="card-impact">{project.impact}</p>
                <ul className="tag-list" aria-label="Technologies used">
                  {project.stack.map((item) => (
                    <li key={item} className="tag">
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
