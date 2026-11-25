import { PROJECT_CATEGORIES } from './data/profile.js';

const HTML_ESCAPE_MAP = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
});

const CATEGORY_MAP = new Map(PROJECT_CATEGORIES.map((category) => [category.id, category]));

const ICONS = Object.freeze({
  github:
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  copy:
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  arrowUpRight:
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>',
});

/**
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);
}

/**
 * @param {string} url
 * @returns {string}
 */
function sanitizeUrl(url) {
  const trimmed = String(url ?? '').trim();
  if (/^(https?:\/\/|mailto:|#|\/)/i.test(trimmed)) {
    return escapeHtml(trimmed);
  }
  return '#';
}

/**
 * @param {string} activeCategory
 * @returns {'all' | 'ai' | 'systems' | 'research'}
 */
export function normalizeCategory(activeCategory) {
  return CATEGORY_MAP.has(activeCategory) ? activeCategory : 'all';
}

/**
 * @param {import('./data/profile.js').ProfileData} profile
 * @returns {string}
 */
export function renderHero(profile) {
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);
  const mailHref = sanitizeUrl(`mailto:${profile.email}`);

  return `
    <div class="hero-layout">
      <div class="hero-copy">
        <p class="eyebrow">
          <span class="status-dot" aria-hidden="true"></span>
          <span>${escapeHtml(profile.location)}</span>
        </p>
        <h1 class="hero-title">${escapeHtml(profile.name)}</h1>
        <p class="hero-headline">${escapeHtml(profile.headline)}</p>
        <p class="hero-summary">${escapeHtml(profile.summary)}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#work">Selected systems</a>
          <a class="button button-secondary" href="${githubUrl}" target="_blank" rel="noopener noreferrer">
            ${ICONS.github}
            <span>GitHub</span>
            ${ICONS.arrowUpRight}
          </a>
          <a class="button button-secondary" href="${linkedinUrl}" target="_blank" rel="noopener noreferrer">
            ${ICONS.linkedin}
            <span>LinkedIn</span>
            ${ICONS.arrowUpRight}
          </a>
          <a class="button button-ghost" href="${mailHref}">
            ${ICONS.mail}
            <span>Email</span>
          </a>
        </div>
      </div>
      <aside class="hero-panel" aria-label="Current focus">
        <p class="panel-label">Focus areas</p>
        <dl class="focus-list">
          <div class="focus-item">
            <dt>Production AI</dt>
            <dd>Google ADK agents, Vertex AI, BigQuery pipelines, and FAISS semantic search.</dd>
          </div>
          <div class="focus-item">
            <dt>Systems &amp; Web</dt>
            <dd>Next.js, PostgreSQL, HTTP/2 proxy tuning, Java plugins, and telemetry spooling.</dd>
          </div>
          <div class="focus-item">
            <dt>MSc Research</dt>
            <dd>In-context learning with Tabular Foundation Models for algorithm selection.</dd>
          </div>
        </dl>
      </aside>
    </div>
  `.trim();
}

/**
 * @param {readonly import('./data/profile.js').MetricItem[]} metrics
 * @returns {string}
 */
export function renderMetrics(metrics) {
  const items = metrics
    .map(
      (metric) => `
      <div class="metric-card">
        <p class="metric-value">${escapeHtml(metric.value)}</p>
        <p class="metric-label">${escapeHtml(metric.label)}</p>
        <p class="metric-detail">${escapeHtml(metric.detail)}</p>
      </div>
    `
    )
    .join('');

  return `<div class="metrics-grid">${items}</div>`;
}

/**
 * @param {string} activeCategory
 * @returns {string}
 */
export function renderProjectFilters(activeCategory = 'all') {
  const current = normalizeCategory(activeCategory);
  return PROJECT_CATEGORIES.map((category) => {
    const isSelected = category.id === current;
    return `
      <button
        type="button"
        class="filter-button${isSelected ? ' is-active' : ''}"
        data-category="${escapeHtml(category.id)}"
        aria-pressed="${isSelected ? 'true' : 'false'}"
      >${escapeHtml(category.label)}</button>
    `.trim();
  }).join('');
}

/**
 * @param {readonly import('./data/profile.js').ProjectItem[]} projects
 * @param {string} activeCategory
 * @returns {string}
 */
export function renderProjects(projects, activeCategory = 'all') {
  const current = normalizeCategory(activeCategory);
  const filtered =
    current === 'all'
      ? projects
      : projects.filter((project) => project.category === current);

  if (filtered.length === 0) {
    return '<p class="empty-state">No projects match this category.</p>';
  }

  const cards = filtered
    .map((project) => {
      const categoryLabel = CATEGORY_MAP.get(project.category)?.label ?? project.category;
      const tags = project.stack
        .map((item) => `<li class="tag">${escapeHtml(item)}</li>`)
        .join('');

      return `
        <article class="card project-card" data-category="${escapeHtml(project.category)}">
          <div class="card-meta">
            <span class="badge">${escapeHtml(categoryLabel)}</span>
            <span class="meta-text">${escapeHtml(project.role)}</span>
          </div>
          <h3 class="card-title">${escapeHtml(project.title)}</h3>
          <p class="card-summary">${escapeHtml(project.summary)}</p>
          <p class="card-impact">${escapeHtml(project.impact)}</p>
          <ul class="tag-list" aria-label="Technologies used">${tags}</ul>
        </article>
      `.trim();
    })
    .join('');

  return `<div class="project-grid">${cards}</div>`;
}

/**
 * @param {readonly import('./data/profile.js').ResearchItem[]} research
 * @returns {string}
 */
export function renderResearch(research) {
  const cards = research
    .map(
      (item) => `
      <article class="card research-card">
        <div class="card-meta">
          <span class="badge badge-accent">${escapeHtml(item.venue)}</span>
          <span class="meta-text">${escapeHtml(item.status)} · ${escapeHtml(item.year)}</span>
        </div>
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <p class="research-area">${escapeHtml(item.type)} · ${escapeHtml(item.area)}</p>
        <p class="card-summary">${escapeHtml(item.summary)}</p>
      </article>
    `
    )
    .join('');

  return `<div class="research-grid">${cards}</div>`;
}

/**
 * @param {readonly import('./data/profile.js').ExperienceItem[]} experience
 * @returns {string}
 */
export function renderExperience(experience) {
  const entries = experience
    .map((role) => {
      const meta = role.location
        ? `${escapeHtml(role.period)} · ${escapeHtml(role.location)}`
        : escapeHtml(role.period);
      const bullets = role.highlights
        .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
        .join('');

      return `
        <article class="timeline-item">
          <div class="timeline-header">
            <div>
              <h3 class="timeline-role">${escapeHtml(role.role)}</h3>
              <p class="timeline-company">${escapeHtml(role.company)}</p>
            </div>
            <p class="timeline-period">${meta}</p>
          </div>
          <ul class="timeline-list">${bullets}</ul>
        </article>
      `.trim();
    })
    .join('');

  return `<div class="timeline">${entries}</div>`;
}

/**
 * @param {import('./data/profile.js').ProfileData} profile
 * @returns {string}
 */
export function renderEducationAndCredentials(profile) {
  const educationItems = profile.education
    .map(
      (edu) => `
      <li class="credential-row">
        <div>
          <p class="credential-primary">${escapeHtml(edu.degree)}</p>
          <p class="credential-secondary">${escapeHtml(edu.institution)}</p>
        </div>
        <span class="credential-period">${escapeHtml(edu.period)}</span>
      </li>
    `
    )
    .join('');

  const stackGroups = profile.stack
    .map(
      (group) => `
      <div class="stack-group">
        <h4 class="stack-label">${escapeHtml(group.label)}</h4>
        <ul class="tag-list">${group.items
          .map((item) => `<li class="tag">${escapeHtml(item)}</li>`)
          .join('')}</ul>
      </div>
    `
    )
    .join('');

  const languageItems = profile.languages
    .map(
      (lang) => `
      <li class="credential-row">
        <span class="credential-primary">${escapeHtml(lang.name)}</span>
        <span class="credential-secondary">${escapeHtml(lang.level)}</span>
      </li>
    `
    )
    .join('');

  const honorItems = profile.honors
    .map((honor) => `<li class="plain-item">${escapeHtml(honor)}</li>`)
    .join('');

  const certificationItems = profile.certifications
    .map((cert) => `<li class="plain-item">${escapeHtml(cert)}</li>`)
    .join('');

  return `
    <div class="credentials-grid">
      <section class="card credential-card" aria-labelledby="stack-heading">
        <h3 id="stack-heading" class="card-title">Technical stack</h3>
        <div class="stack-groups">${stackGroups}</div>
      </section>
      <div class="credentials-column">
        <section class="card credential-card" aria-labelledby="education-heading">
          <h3 id="education-heading" class="card-title">Education</h3>
          <ul class="credential-list">${educationItems}</ul>
        </section>
        <section class="card credential-card" aria-labelledby="languages-honors-heading">
          <h3 id="languages-honors-heading" class="card-title">Languages and honors</h3>
          <ul class="credential-list">${languageItems}</ul>
          <h4 class="sub-heading">Honors</h4>
          <ul class="plain-list">${honorItems}</ul>
        </section>
        <section class="card credential-card" aria-labelledby="certifications-heading">
          <h3 id="certifications-heading" class="card-title">Certifications</h3>
          <ul class="plain-list">${certificationItems}</ul>
        </section>
      </div>
    </div>
  `.trim();
}

/**
 * @param {import('./data/profile.js').ProfileData} profile
 * @returns {string}
 */
export function renderContact(profile) {
  const mailHref = sanitizeUrl(`mailto:${profile.email}`);
  const githubUrl = sanitizeUrl(profile.links.github);
  const linkedinUrl = sanitizeUrl(profile.links.linkedin);

  return `
    <div class="contact-card">
      <div class="contact-copy">
        <h2 class="section-title">Contact</h2>
        <p class="contact-text">
          Open to Machine Learning Engineering, Applied AI, and Full-Stack Systems discussions.
        </p>
      </div>
      <div class="contact-actions">
        <a class="button button-primary" href="${mailHref}">
          ${ICONS.mail}
          <span>${escapeHtml(profile.email)}</span>
        </a>
        <button
          type="button"
          class="button button-secondary"
          data-copy-email="${escapeHtml(profile.email)}"
        >
          ${ICONS.copy}
          <span class="copy-label">Copy email</span>
        </button>
        <a class="button button-ghost" href="${githubUrl}" target="_blank" rel="noopener noreferrer">
          ${ICONS.github}
          <span>GitHub</span>
          ${ICONS.arrowUpRight}
        </a>
        <a class="button button-ghost" href="${linkedinUrl}" target="_blank" rel="noopener noreferrer">
          ${ICONS.linkedin}
          <span>LinkedIn</span>
          ${ICONS.arrowUpRight}
        </a>
      </div>
      <p id="copy-status" class="sr-only" role="status" aria-live="polite"></p>
    </div>
  `.trim();
}

/**
 * @param {import('./data/profile.js').ProfileData} profile
 * @param {string} activeCategory
 * @returns {string}
 */
export function renderPortfolio(profile, activeCategory = 'all') {
  const current = normalizeCategory(activeCategory);
  return `
    <section id="hero" class="section hero-section">${renderHero(profile)}</section>
    <section id="metrics" class="section metrics-section" aria-label="Key metrics">${renderMetrics(profile.metrics)}</section>
    <section id="work" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Selected systems</h2>
          <p class="section-subtitle">Production AI platforms, telemetry pipelines, and research systems.</p>
        </div>
        <div class="filter-bar" role="group" aria-label="Filter projects by category">
          ${renderProjectFilters(current)}
        </div>
      </div>
      ${renderProjects(profile.projects, current)}
    </section>
    <section id="research" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Research and publications</h2>
          <p class="section-subtitle">MSc research and peer-reviewed publications in 2026.</p>
        </div>
      </div>
      ${renderResearch(profile.research)}
    </section>
    <section id="experience" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Experience</h2>
          <p class="section-subtitle">Industry engineering across AI platforms, QA automation, and RPA.</p>
        </div>
      </div>
      ${renderExperience(profile.experience)}
    </section>
    <section id="credentials" class="section">
      <div class="section-header">
        <div>
          <h2 class="section-title">Education and credentials</h2>
          <p class="section-subtitle">Academic degrees, technical stack, languages, honors, and certifications.</p>
        </div>
      </div>
      ${renderEducationAndCredentials(profile)}
    </section>
    <section id="contact" class="section contact-section">${renderContact(profile)}</section>
  `.trim();
}
