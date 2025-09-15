#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const outPath = path.join(process.cwd(), 'public', 'dummy-feed.json');

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function choice(arr) { return arr[randInt(0, arr.length - 1)]; }
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const startupNames = [
  'CortexML', 'BridgeWorks', 'NovaKit', 'Quantly', 'FinOpsy',
  'DevFlow', 'DataForge', 'ZenLedger', 'OpenDash', 'PromptGraph',
];

const nStartups = randInt(9, 10);
const picked = startupNames.slice(0, nStartups);

const startups = picked.map((name, idx) => {
  const slug = slugify(name);
  return {
    id: `s${idx + 1}`,
    name,
    slug,
    website_url: `https://${slug}.example.com`,
  };
});

// Biased sampling weights per startup for variability
const weights = startups.map(() => Math.random() * 2 + 0.5);

const verbs = ['Shipped', 'Built', 'Polished', 'Fixed', 'Tweaked', 'Refactored', 'Explored', 'Drafted'];
const nouns = ['onboarding', 'API', 'dashboard', 'pricing', 'migration', 'auth', 'webhooks', 'docs', 'feed', 'CI'];
const extras = ['performance +20%', 'DX win', 'less code', 'safer defaults', 'early access', 'beta'];

const authors = [
  { id: 'u1', handle: 'anas', name: 'Muhammad Anas' },
  { id: 'u2', handle: 'devcat', name: 'Dev Cat' },
  { id: 'u3', handle: 'quantkid', name: 'Quant Kid' },
];

const now = Date.now();
const monthMs = 30 * 24 * 60 * 60 * 1000;

const N = randInt(50, 60);
const counters = Object.fromEntries(startups.map(s => [s.id, 0]));

const items = [];
for (let i = 0; i < N; i++) {
  // Pick a startup by weight
  let sIdx = 0;
  const totalW = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * totalW;
  for (let j = 0; j < weights.length; j++) { r -= weights[j]; if (r <= 0) { sIdx = j; break; } }
  const s = startups[sIdx];
  counters[s.id]++;

  const author = choice(authors);
  const created_at = new Date(now - Math.random() * monthMs).toISOString();
  const title = `${choice(verbs)} ${choice(nouns)} — ${choice(extras)}`;
  const mdBits = [
    `**${choice(['Nice', 'Solid', 'Clean'])}** pass on _${choice(nouns)}_.`,
    `Added 
\n- ${choice(['tests', 'docs', 'lint'])}
\n- ${choice(['retry', 'caching', 'metrics'])}`,
    `Example: \`curl -X POST /v1/${choice(['events','users','jobs'])}\`.
\n
See [changelog](https://example.com).`,
  ];
  const content = mdBits.join('\n\n');

  items.push({
    id: `i${i + 1}`,
    title,
    content,
    issue_number: counters[s.id],
    created_at,
    startup_name: s.name,
    startup_slug: s.slug,
    startup_website_url: s.website_url,
    author_id: author.id,
    author_handle: author.handle,
    author_name: author.name,
    is_following: Math.random() < 0.25,
    upvotes: randInt(0, 120),
  });
}

items.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));

const data = { items };
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log(`Wrote ${items.length} items for ${startups.length} startups to ${outPath}`);

