import { mkdirSync, writeFileSync } from 'fs';
import { generateLuxuryRose } from './builders/luxuryRose.js';
import { generateAfrocentricBold } from './builders/afrocentricBold.js';
import { generateUrbanNeon } from './builders/urbanNeon.js';
import { generateClassicElegant } from './builders/classicElegant.js';
import { generateOrganicNatural } from './builders/organicNatural.js';

// Map slugs to their unique design generators
const SLUG_DESIGNS = {
  'red-rose-hair-and-beauty-salons': generateLuxuryRose,
  'afrokink-hair-beauty-salon': generateAfrocentricBold,
  'x-faktor-salon': generateUrbanNeon,
  'chris-hair-salon': generateClassicElegant,
  'kinky-curly-natural-hair-salon': generateOrganicNatural,
};

// Fallback rotation by category
const CATEGORY_DESIGNS = {
  'salons':       generateLuxuryRose,
  'barbers':      generateUrbanNeon,
  'boutiques':    generateClassicElegant,
  'bakeries':     generateOrganicNatural,
  'cake makers':  generateOrganicNatural,
  'auto repair':  generateUrbanNeon,
  'plumbers':     generateUrbanNeon,
  'electricians': generateUrbanNeon,
  'gyms':         generateAfrocentricBold,
  'guest houses': generateClassicElegant,
  'photographers':generateAfrocentricBold,
  'caterers':     generateOrganicNatural,
  'tailors':      generateClassicElegant,
  'car washes':   generateUrbanNeon,
  'tutoring centers': generateClassicElegant,
};

function getGenerator(slug, category) {
  if (SLUG_DESIGNS[slug]) return SLUG_DESIGNS[slug];
  return CATEGORY_DESIGNS[category] || generateLuxuryRose;
}

export function buildDemo(lead) {
  const slug = lead.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const generator = getGenerator(slug, lead.category);
  const html = generator(lead);

  const dir = `./demos/${slug}`;
  mkdirSync(dir, { recursive: true });

  const demoPath = `${dir}/index.html`;
  writeFileSync(demoPath, html);

  return { slug, demoPath };
}
