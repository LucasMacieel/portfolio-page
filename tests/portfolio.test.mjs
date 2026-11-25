import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PROFILE, PROJECT_CATEGORIES } from '../src/data/profile.js';
import {
  escapeHtml,
  renderPortfolio,
  renderProjects,
} from '../src/render.js';

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

function countProjectCards(html) {
  return (html.match(/class="card project-card"/g) ?? []).length;
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

describe('Portfolio renderer', () => {
  it('escapes HTML special characters and rejects unsafe URLs', () => {
    const escaped = escapeHtml(`<script>alert("xss")</script> & 'quote'`);
    assert.equal(
      escaped,
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;quote&#39;'
    );

    const maliciousProfile = {
      ...PROFILE,
      name: '<img src=x onerror=alert(1)>',
      links: {
        github: 'javascript:alert(1)',
        linkedin: 'https://www.linkedin.com/in/lucas-macieel',
      },
    };
    const html = renderPortfolio(maliciousProfile);
    assert.ok(!html.includes('<img src=x'));
    assert.ok(!html.includes('javascript:alert(1)'));
    assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  });

  it('filters projects by category using PROJECT_CATEGORIES and falls back on unknown categories', () => {
    assert.equal(countProjectCards(renderProjects(PROFILE.projects, 'all')), 6);

    const aiHtml = renderProjects(PROFILE.projects, 'ai');
    assert.equal(countProjectCards(aiHtml), 3);
    assert.ok(aiHtml.includes('Enterprise AI Agent'));
    assert.ok(aiHtml.includes('Jira AI Summarization &amp; Smart Digests'));
    assert.ok(aiHtml.includes('Semantic Test-Case Recommender'));
    assert.ok(!aiHtml.includes('Goji.AI Enterprise Platform'));

    const systemsHtml = renderProjects(PROFILE.projects, 'systems');
    assert.equal(countProjectCards(systemsHtml), 2);
    assert.ok(systemsHtml.includes('Antigravity Telemetry Plugin'));
    assert.ok(systemsHtml.includes('Goji.AI Enterprise Platform'));
    assert.ok(!systemsHtml.includes('Enterprise AI Agent'));

    const researchHtml = renderProjects(PROFILE.projects, 'research');
    assert.equal(countProjectCards(researchHtml), 1);
    assert.ok(researchHtml.includes('In-Context Learning for Per-Instance Algorithm Selection'));

    assert.equal(countProjectCards(renderProjects(PROFILE.projects, 'unknown')), 6);
  });

  it('renders every major section, metric, publication, role, and credential cleanly', () => {
    const html = renderPortfolio(PROFILE);

    for (const expected of [
      'Lucas Maciel',
      'Recife, PE, Brazil',
      '~93%',
      '84.3k+',
      '27.5k+',
      'CISTI 2026',
      'ENIAC 2026',
      'A Memetic Algorithm for User Fairness in Recommender Systems',
      'Driver Drowsiness Detection Using Computer Vision with Adaptive Methods on Android',
      'Projeto CIn/Motorola',
      'Outlier',
      'IT POWER SOFTWARE',
      'MSc in Computer Science',
      'B.Eng. in Computer Engineering',
      'Destaque do Ano (2x)',
      'EF SET English Certificate (C2 Proficient)',
      'lucasmacieelsousa@gmail.com',
    ]) {
      assert.ok(html.includes(expected), `rendered output missing "${expected}"`);
    }

    assert.ok(!html.includes('99907'), 'rendered output must not expose phone number');
  });

  it('keeps static HTML shell free of forbidden dashes and AI slop vocabulary', () => {
    const indexHtml = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
    for (const pattern of FORBIDDEN_SLOP) {
      if (typeof pattern === 'string') {
        assert.ok(!indexHtml.includes(pattern), `forbidden character "${pattern}" in index.html`);
      } else {
        assert.ok(!pattern.test(indexHtml), `forbidden word ${pattern} in index.html`);
      }
    }
  });
});
