import { PROFILE } from './data/profile.js';
import {
  normalizeCategory,
  renderContact,
  renderEducationAndCredentials,
  renderExperience,
  renderHero,
  renderMetrics,
  renderProjectFilters,
  renderProjects,
  renderResearch,
} from './render.js';

const THEME_STORAGE_KEY = 'portfolio-theme';

const state = {
  activeCategory: 'all',
  theme: 'light',
  mobileMenuOpen: false,
};

function resolveInitialTheme() {
  const current = document.documentElement.dataset.theme;
  if (current === 'dark' || current === 'light') {
    return current;
  }
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme, persist = false) {
  state.theme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = state.theme;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch {
    }
  }
  const toggleButton = document.getElementById('theme-toggle');
  if (!toggleButton) return;
  const isDark = state.theme === 'dark';
  toggleButton.setAttribute('aria-pressed', String(isDark));
  toggleButton.setAttribute(
    'aria-label',
    isDark ? 'Switch to light theme' : 'Switch to dark theme'
  );
  const label = toggleButton.querySelector('.theme-label');
  if (label) {
    label.textContent = isDark ? 'Light' : 'Dark';
  }
}

function setMobileMenu(open) {
  state.mobileMenuOpen = Boolean(open);
  const menuButton = document.getElementById('menu-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  if (menuButton) {
    menuButton.setAttribute('aria-expanded', String(state.mobileMenuOpen));
  }
  if (navDrawer) {
    navDrawer.classList.toggle('is-open', state.mobileMenuOpen);
  }
}

function updateProjectsView(category) {
  state.activeCategory = normalizeCategory(category);
  const projectsRoot = document.getElementById('projects-root');
  const filtersRoot = document.getElementById('work-filters');
  const filterStatus = document.getElementById('filter-status');

  if (projectsRoot) {
    projectsRoot.innerHTML = renderProjects(PROFILE.projects, state.activeCategory);
  }
  if (filtersRoot) {
    filtersRoot.innerHTML = renderProjectFilters(state.activeCategory);
  }
  if (filterStatus) {
    const count =
      state.activeCategory === 'all'
        ? PROFILE.projects.length
        : PROFILE.projects.filter((project) => project.category === state.activeCategory).length;
    filterStatus.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}.`;
  }
}

async function copyEmail(email, button) {
  const statusEl = document.getElementById('copy-status');
  const labelEl = button.querySelector('.copy-label');
  let copied = false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
    } catch {
      copied = false;
    }
  }

  if (!copied) {
    const helper = document.createElement('textarea');
    helper.value = email;
    helper.setAttribute('readonly', '');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    copied = document.execCommand('copy');
    document.body.removeChild(helper);
  }

  if (copied) {
    if (labelEl) labelEl.textContent = 'Copied';
    if (statusEl) statusEl.textContent = `${email} copied to clipboard.`;
    window.setTimeout(() => {
      if (labelEl) labelEl.textContent = 'Copy email';
    }, 2000);
  } else if (statusEl) {
    statusEl.textContent = `Unable to copy automatically. Email is ${email}.`;
  }
}

function initScrollSpy() {
  const sectionIds = ['work', 'research', 'experience', 'credentials', 'contact'];
  const navLinks = new Map();

  for (const link of document.querySelectorAll('.nav-link[href^="#"]')) {
    const id = link.getAttribute('href')?.slice(1);
    if (id && sectionIds.includes(id)) {
      navLinks.set(id, link);
    }
  }

  if (!('IntersectionObserver' in window) || navLinks.size === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const [id, link] of navLinks) {
          link.classList.toggle('is-active', id === entry.target.id);
        }
      }
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
  );

  for (const id of sectionIds) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

function mount() {
  const mounts = [
    ['hero-root', renderHero(PROFILE)],
    ['metrics-root', renderMetrics(PROFILE.metrics)],
    ['work-filters', renderProjectFilters(state.activeCategory)],
    ['projects-root', renderProjects(PROFILE.projects, state.activeCategory)],
    ['research-root', renderResearch(PROFILE.research)],
    ['experience-root', renderExperience(PROFILE.experience)],
    ['credentials-root', renderEducationAndCredentials(PROFILE)],
    ['contact-root', renderContact(PROFILE)],
  ];

  for (const [id, html] of mounts) {
    const node = document.getElementById(id);
    if (node) {
      node.innerHTML = html;
    }
  }

  applyTheme(resolveInitialTheme(), false);

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark', true);
  });

  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    setMobileMenu(!state.mobileMenuOpen);
  });

  document.getElementById('nav-drawer')?.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setMobileMenu(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && state.mobileMenuOpen) {
      setMobileMenu(false);
      document.getElementById('menu-toggle')?.focus();
    }
  });

  document.getElementById('work-filters')?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('button[data-category]') : null;
    if (!button) return;
    updateProjectsView(button.dataset.category ?? 'all');
  });

  document.getElementById('contact-root')?.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('button[data-copy-email]') : null;
    if (!button) return;
    copyEmail(button.dataset.copyEmail ?? PROFILE.email, button);
  });

  initScrollSpy();
}

mount();
