import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import {
  PROFILE,
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryLabel,
  normalizeCategory,
  sanitizeUrl,
} from '../src/data/profile.ts';

const FORBIDDEN_SLOP = [
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

function collectStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

function listTsxFiles(dirUrl) {
  return readdirSync(dirUrl)
    .filter((name) => name.endsWith('.tsx'))
    .map((name) => new URL(name, dirUrl));
}

describe('PROFILE data model', () => {
  it('contains grounded identity and omits mobile phone for privacy', () => {
    assert.equal(PROFILE.name, 'Lucas Maciel');
    assert.equal(PROFILE.location, 'Recife, PE, Brazil');
    assert.equal(PROFILE.email, 'lucasmacieelsousa@gmail.com');
    assert.equal(PROFILE.links.github, 'https://github.com/LucasMacieel');
    assert.equal(PROFILE.links.linkedin, 'https://www.linkedin.com/in/lucas-macieel');

    const allText = collectStrings(PROFILE).join(' ');
    assert.ok(!allText.includes('99907'), 'must not expose phone number');
  });

  it('defines the 4 key metrics and 6 categorized projects', () => {
    assert.equal(PROFILE.metrics.length, 4);
    assert.deepEqual(
      PROFILE.metrics.map((m) => m.value),
      ['~93%', '84.3k+', '27.5k+', '2']
    );

    const categoryIds = new Set(PROJECT_CATEGORIES.map((c) => c.id));
    assert.deepEqual([...categoryIds], ['all', 'ai', 'systems', 'research']);

    assert.equal(PROFILE.projects.length, 6);
    for (const project of PROFILE.projects) {
      assert.ok(project.category !== 'all' && categoryIds.has(project.category));
      assert.ok(project.stack.length > 0);
    }
  });

  it('includes publications, 4 chronological experience roles, education, stack, languages, honors, and certifications', () => {
    assert.equal(PROFILE.research.length, 3);
    assert.equal(PROFILE.experience.length, 4);
    assert.deepEqual(
      PROFILE.experience.map((e) => e.role),
      ['Full-Stack Engineer', 'AI Training Specialist', 'QA Intern', 'RPA Intern']
    );
    assert.equal(PROFILE.education.length, 2);
    assert.equal(PROFILE.stack.length, 3);
    assert.equal(PROFILE.languages.length, 3);
    assert.deepEqual(PROFILE.honors, ['Destaque do Ano (2x)']);
    assert.equal(PROFILE.certifications.length, 5);
  });

  it('keeps all profile copy free of dashes and AI slop vocabulary', () => {
    const strings = collectStrings([PROFILE, PROJECT_CATEGORIES]);
    for (const text of strings) {
      for (const pattern of FORBIDDEN_SLOP) {
        if (typeof pattern === 'string') {
          assert.ok(!text.includes(pattern), `forbidden character "${pattern}" in "${text}"`);
        } else {
          assert.ok(!pattern.test(text), `forbidden word ${pattern} in "${text}"`);
        }
      }
      assert.ok(!/\s-\s/.test(text), `hyphen used as dash in "${text}"`);
    }
  });
});

describe('Portfolio helpers', () => {
  it('sanitizes URLs to allow only safe protocols and relative routes', () => {
    assert.equal(sanitizeUrl('https://github.com/LucasMacieel'), 'https://github.com/LucasMacieel');
    assert.equal(sanitizeUrl('http://example.com'), 'http://example.com');
    assert.equal(sanitizeUrl('mailto:lucasmacieelsousa@gmail.com'), 'mailto:lucasmacieelsousa@gmail.com');
    assert.equal(sanitizeUrl('#work'), '#work');
    assert.equal(sanitizeUrl('/'), '/');
    assert.equal(sanitizeUrl('/projects'), '/projects');

    assert.equal(sanitizeUrl('javascript:alert(1)'), '#');
    assert.equal(sanitizeUrl('data:text/html,<script>alert(1)</script>'), '#');
    assert.equal(sanitizeUrl('//evil.example.com'), '#');
    assert.equal(sanitizeUrl(''), '#');
  });

  it('normalizes categories and falls back to all for unknown values', () => {
    assert.equal(normalizeCategory('all'), 'all');
    assert.equal(normalizeCategory('ai'), 'ai');
    assert.equal(normalizeCategory('systems'), 'systems');
    assert.equal(normalizeCategory('research'), 'research');
    assert.equal(normalizeCategory('unknown'), 'all');
    assert.equal(normalizeCategory(''), 'all');
  });

  it('filters projects across all categories and unknown fallback', () => {
    assert.equal(filterProjects(PROFILE.projects, 'all').length, 6);

    const aiProjects = filterProjects(PROFILE.projects, 'ai');
    assert.deepEqual(
      aiProjects.map((p) => p.title),
      [
        'Enterprise AI Agent',
        'Jira AI Summarization & Smart Digests',
        'Semantic Test-Case Recommender',
      ]
    );

    const systemsProjects = filterProjects(PROFILE.projects, 'systems');
    assert.deepEqual(
      systemsProjects.map((p) => p.title),
      ['Antigravity Telemetry Plugin', 'Goji.AI Enterprise Platform']
    );

    const researchProjects = filterProjects(PROFILE.projects, 'research');
    assert.deepEqual(
      researchProjects.map((p) => p.title),
      ['In-Context Learning for Per-Instance Algorithm Selection']
    );

    assert.equal(filterProjects(PROFILE.projects, 'unknown').length, 6);
    assert.equal(getCategoryLabel('ai'), 'AI & Agents');
    assert.equal(getCategoryLabel('systems'), 'Systems & Web');
    assert.equal(getCategoryLabel('research'), 'Research');
  });
});

describe('App Router TSX components', () => {
  it('keeps all TSX files in src/app and src/components free of forbidden dashes and AI slop vocabulary', () => {
    const files = [
      ...listTsxFiles(new URL('../src/app/', import.meta.url)),
      ...listTsxFiles(new URL('../src/components/', import.meta.url)),
    ];
    assert.ok(files.length > 0);

    for (const fileUrl of files) {
      const content = readFileSync(fileUrl, 'utf8');
      for (const pattern of FORBIDDEN_SLOP) {
        if (typeof pattern === 'string') {
          assert.ok(
            !content.includes(pattern),
            `forbidden character "${pattern}" in ${fileUrl.pathname}`
          );
        } else {
          assert.ok(!pattern.test(content), `forbidden word ${pattern} in ${fileUrl.pathname}`);
        }
      }
      assert.ok(!/\s-\s/.test(content), `hyphen used as dash in ${fileUrl.pathname}`);
    }
  });
});
