'use client';

import { useEffect, useRef, useState } from 'react';
import { MoonIcon, SunIcon } from './icons';

const THEME_STORAGE_KEY = 'portfolio-theme';
const SECTION_IDS = ['work', 'research', 'experience', 'credentials', 'contact'] as const;

const NAV_ITEMS = [
  { id: 'work', label: 'Systems' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

type Theme = 'light' | 'dark';

function resolveClientTheme(): Theme {
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

export function SiteHeader() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initial = resolveClientTheme();
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
    }
  };

  const isDark = theme === 'dark';

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#hero-root">
          <span className="brand-mark" aria-hidden="true">
            LM
          </span>
          <span>Lucas Maciel</span>
        </a>

        <div className="header-controls">
          <nav
            id="nav-drawer"
            className={mobileMenuOpen ? 'site-nav is-open' : 'site-nav'}
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={activeSection === item.id ? 'nav-link is-active' : 'nav-link'}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            id="theme-toggle"
            className="theme-toggle"
            type="button"
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={handleThemeToggle}
          >
            <MoonIcon />
            <SunIcon />
            <span className="theme-label">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <button
            ref={menuButtonRef}
            id="menu-toggle"
            className="menu-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-drawer"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}
