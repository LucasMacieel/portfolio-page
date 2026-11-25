import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { CopyEmailButton } from '@/components/copy-email-button';
import { ProjectsSection } from '@/components/projects-section';
import { SiteHeader } from '@/components/site-header';
import {
  PROFILE,
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryLabel,
  normalizeCategory,
  sanitizeUrl,
} from '@/data/profile';

const FORBIDDEN_SLOP: ReadonlyArray<string | RegExp> = [
  '—',
  '–',
  /\bdelve\b/i,
  /\bshowcase\b/i,
  /\bleverage\b/i,
  /\butilize\b/i,
  /\bvibrant\b/i,
  /\bpassionate\b/i,
  /\bcutting-edge\b/i,
  /\bpivotal\b/i,
  /\blandscape\b/i,
  /\bunderscore\b/i,
  /\btestament\b/i,
  /\bfoster\b/i,
  /\benhance\b/i,
  /\bcrucial\b/i,
  /\badditionally\b/i,
];

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

function listTsxFiles(dirPath: string): string[] {
  return readdirSync(dirPath)
    .filter((name) => name.endsWith('.tsx'))
    .map((name) => path.join(dirPath, name));
}

function expectNoSlop(text: string, label: string): void {
  for (const pattern of FORBIDDEN_SLOP) {
    if (typeof pattern === 'string') {
      expect(text.includes(pattern)).toBe(false);
    } else {
      expect(pattern.test(text)).toBe(false);
    }
  }
  expect(/\s-\s/.test(text)).toBe(false);
  expect(label.length).toBeGreaterThan(0);
}

describe('PROFILE data model', () => {
  it('contains grounded identity and omits mobile phone for privacy', () => {
    expect(PROFILE.name).toBe('Lucas Maciel');
    expect(PROFILE.location).toBe('Recife, PE, Brazil');
    expect(PROFILE.email).toBe('lucasmacieelsousa@gmail.com');
    expect(PROFILE.links.github).toBe('https://github.com/LucasMacieel');
    expect(PROFILE.links.linkedin).toBe('https://www.linkedin.com/in/lucas-macieel');

    const allText = collectStrings(PROFILE).join(' ');
    expect(allText).not.toContain('99907');
  });

  it('defines the 4 key metrics and 6 categorized projects', () => {
    expect(PROFILE.metrics).toHaveLength(4);
    expect(PROFILE.metrics.map((m) => m.value)).toEqual(['~93%', '84.3k+', '27.5k+', '2']);

    const categoryIds = new Set(PROJECT_CATEGORIES.map((c) => c.id));
    expect([...categoryIds]).toEqual(['all', 'ai', 'systems', 'research']);

    expect(PROFILE.projects).toHaveLength(6);
    for (const project of PROFILE.projects) {
      expect(project.category).not.toBe('all');
      expect(categoryIds.has(project.category)).toBe(true);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('includes publications, 4 chronological experience roles, education, stack, languages, honors, and certifications', () => {
    expect(PROFILE.research).toHaveLength(3);
    expect(PROFILE.experience).toHaveLength(4);
    expect(PROFILE.experience.map((e) => e.role)).toEqual([
      'Full-Stack Engineer',
      'AI Training Specialist',
      'QA Intern',
      'RPA Intern',
    ]);
    expect(PROFILE.education).toHaveLength(2);
    expect(PROFILE.stack).toHaveLength(3);
    expect(PROFILE.languages).toHaveLength(3);
    expect(PROFILE.honors).toEqual(['Destaque do Ano (2x)']);
    expect(PROFILE.certifications).toHaveLength(5);
  });

  it('keeps all profile copy free of dashes and AI slop vocabulary', () => {
    const strings = collectStrings([PROFILE, PROJECT_CATEGORIES]);
    for (const text of strings) {
      expectNoSlop(text, 'profile');
    }
  });
});

describe('Portfolio helpers', () => {
  it('sanitizes URLs to allow only safe protocols and relative routes', () => {
    expect(sanitizeUrl('https://github.com/LucasMacieel')).toBe('https://github.com/LucasMacieel');
    expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
    expect(sanitizeUrl('mailto:lucasmacieelsousa@gmail.com')).toBe(
      'mailto:lucasmacieelsousa@gmail.com'
    );
    expect(sanitizeUrl('#work')).toBe('#work');
    expect(sanitizeUrl('/')).toBe('/');
    expect(sanitizeUrl('/projects')).toBe('/projects');

    expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
    expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBe('#');
    expect(sanitizeUrl('//evil.example.com')).toBe('#');
    expect(sanitizeUrl('')).toBe('#');
  });

  it('normalizes categories and falls back to all for unknown values', () => {
    expect(normalizeCategory('all')).toBe('all');
    expect(normalizeCategory('ai')).toBe('ai');
    expect(normalizeCategory('systems')).toBe('systems');
    expect(normalizeCategory('research')).toBe('research');
    expect(normalizeCategory('unknown')).toBe('all');
    expect(normalizeCategory('')).toBe('all');
  });

  it('filters projects across all categories and unknown fallback', () => {
    expect(filterProjects(PROFILE.projects, 'all')).toHaveLength(6);

    const aiProjects = filterProjects(PROFILE.projects, 'ai');
    expect(aiProjects.map((p) => p.title)).toEqual([
      'Enterprise AI Agent',
      'Jira AI Summarization & Smart Digests',
      'Semantic Test-Case Recommender',
    ]);

    const systemsProjects = filterProjects(PROFILE.projects, 'systems');
    expect(systemsProjects.map((p) => p.title)).toEqual([
      'Antigravity Telemetry Plugin',
      'Goji.AI Enterprise Platform',
    ]);

    const researchProjects = filterProjects(PROFILE.projects, 'research');
    expect(researchProjects.map((p) => p.title)).toEqual([
      'In-Context Learning for Per-Instance Algorithm Selection',
    ]);

    expect(filterProjects(PROFILE.projects, 'unknown')).toHaveLength(6);
    expect(getCategoryLabel('ai')).toBe('AI & Agents');
    expect(getCategoryLabel('systems')).toBe('Systems & Web');
    expect(getCategoryLabel('research')).toBe('Research');
  });
});

describe('App Router TSX components', () => {
  it('keeps all TSX files in src/app and src/components free of forbidden dashes and AI slop vocabulary', () => {
    const files = [
      ...listTsxFiles(path.join(process.cwd(), 'src', 'app')),
      ...listTsxFiles(path.join(process.cwd(), 'src', 'components')),
    ];
    expect(files.length).toBeGreaterThan(0);

    for (const filePath of files) {
      const content = readFileSync(filePath, 'utf8');
      expectNoSlop(content, filePath);
    }
  });
});

describe('Portfolio UI behavior', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders all portfolio sections on HomePage', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: PROFILE.name })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Selected systems' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Research and publications' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Education and credentials' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Contact' })).toBeInTheDocument();
  });

  it('filters projects by category and updates live status', () => {
    render(<ProjectsSection projects={PROFILE.projects} />);

    expect(screen.getByRole('status')).toHaveTextContent('Showing 6 projects.');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'AI & Agents' }));
    expect(screen.getByRole('button', { name: 'AI & Agents' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('status')).toHaveTextContent('Showing 3 projects.');
    expect(screen.getByText('Enterprise AI Agent')).toBeInTheDocument();
    expect(screen.queryByText('Goji.AI Enterprise Platform')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Research' }));
    expect(screen.getByRole('status')).toHaveTextContent('Showing 1 project.');

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByRole('status')).toHaveTextContent('Showing 6 projects.');
  });

  it('copies email to clipboard and announces status', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    render(<CopyEmailButton email={PROFILE.email} />);

    const button = screen.getByRole('button', { name: 'Copy email' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(PROFILE.email);
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent(`${PROFILE.email} copied to clipboard.`);
    });
  });

  it('toggles theme and mobile navigation menu in SiteHeader', () => {
    render(<SiteHeader />);

    const themeButton = screen.getByRole('button', { name: 'Switch to dark theme' });
    expect(themeButton).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(themeButton);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });
});
