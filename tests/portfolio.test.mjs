import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PROFILE, PROJECT_CATEGORIES } from '../src/data/profile.js';

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
