'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandMark, MoonIcon, SunIcon } from './icons';
import { CONTAINER_CLASS } from './ui-classes';

const THEME_STORAGE_KEY = 'portfolio-theme';
const SECTION_IDS = ['work', 'research', 'experience', 'credentials', 'contact'] as const;

const CONTROL_BUTTON_CLASS =
  'cursor-pointer items-center gap-[0.45rem] rounded-sm border border-border bg-surface px-3 py-[0.42rem] font-mono text-[0.8125rem] transition-[border-color,background-color] duration-[140ms] ease-in-out hover:border-border-strong hover:bg-surface-subtle';

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
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-[10px]">
      <div className={`${CONTAINER_CLASS} flex min-h-16 items-center justify-between gap-4`}>
        <a
          className="group inline-flex items-center gap-3 font-bold tracking-[-0.02em]"
          href="#hero-root"
        >
          <span
            className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-sm shadow-sm transition-[transform,box-shadow] duration-150 ease-in-out group-hover:-translate-y-px group-hover:shadow-md"
            aria-hidden="true"
          >
            <BrandMark />
          </span>
          <span>Lucas Maciel</span>
        </a>

        <div className="flex items-center gap-3">
          <nav
            id="nav-drawer"
            className={`flex items-center gap-2 max-[720px]:absolute max-[720px]:inset-x-0 max-[720px]:top-full max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:border-b max-[720px]:border-border max-[720px]:bg-bg max-[720px]:px-4 max-[720px]:pt-3 max-[720px]:pb-4 max-[720px]:shadow-md ${
              mobileMenuOpen ? 'max-[720px]:flex' : 'max-[720px]:hidden'
            }`}
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={`rounded-sm px-[0.65rem] py-[0.4rem] text-[0.9375rem] font-medium transition-[color,background-color] duration-[140ms] ease-in-out max-[720px]:px-3 max-[720px]:py-[0.6rem] ${
                  activeSection === item.id
                    ? 'bg-surface-subtle text-accent'
                    : 'text-text-muted hover:bg-surface-subtle hover:text-text'
                }`}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            id="theme-toggle"
            className={`inline-flex ${CONTROL_BUTTON_CLASS}`}
            type="button"
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            onClick={handleThemeToggle}
          >
            <MoonIcon />
            <SunIcon />
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          <button
            ref={menuButtonRef}
            id="menu-toggle"
            className={`hidden max-[720px]:inline-flex ${CONTROL_BUTTON_CLASS}`}
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
