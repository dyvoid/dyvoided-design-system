// drift.mjs — design-system drift detector.
// Scans canonical specimens (*.card.html), reference JSX (*.jsx), and the
// eval.html validation surface for patterns that drift from the token layer.
//
// Banned:
//   1. Unpinned or @latest lucide script tags
//   2. Inline oklch(from var(...)) — should use the *-muted-bg token
//   3. Zero-offset colored halo box-shadows (box-shadow:0 0 Npx 0 <color>)
//   4. font-size:Npx outside the documented avatar size-scale exception
//   5. Hardcoded hues (oklch()/hsl()/#rrggbb) outside tokens/*.css
//   6. Stale font <link> not matching the canonical Familjen/Hanken/JetBrains URL
//
// Run: node scripts/drift.mjs
// Exit code 1 if any findings.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const componentsDir = join(root, 'components');
const evalFile = join(root, 'eval.html');

const CANONICAL_FONT_URL = 'https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap';

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(card\.html|jsx)$/.test(entry)) acc.push(p);
  }
  return acc;
}

const targets = walk(componentsDir);
if (statSync(evalFile).isFile()) targets.push(evalFile);

const findings = [];

function add(file, line, col, rule, snippet) {
  findings.push({ file: relative(root, file).split(sep).join('/'), line, col, rule, snippet });
}

// Rule 1 — unpinned or @latest lucide
const LUCIDE_RE = /lucide@(latest|(?!\d))/g;

// Rule 2 — inline oklch(from var(...))
const INLINE_OKLCH_RE = /oklch\(\s*from\s+var/g;

// Rule 3 — zero-offset colored halo: box-shadow:0 0 Npx 0 <color>
const HALO_RE = /box-shadow:\s*0\s+0\s+\d+px\s+0\s+/g;

// Rule 4 — font-size:Npx
const FONT_PX_RE = /font-size:\s*(\d+)px/g;

// Rule 5 — hardcoded hues
const HUE_RE = /(?<![a-z-])(oklch|hsl|hwb|rgb)\(/g;
const HEX_RE = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

// Rule 6 — stale font link (only stylesheet links, not preconnect hints)
const FONT_LINK_RE = /<link[^>]*rel=["']stylesheet["'][^>]*href="(https:\/\/fonts\.googleapis\.com[^"]*)"/g;

function lineColFromIndex(text, idx) {
  const before = text.slice(0, idx);
  const line = before.split('\n').length;
  const lastNl = before.lastIndexOf('\n');
  const col = idx - lastNl; // 1-based
  return [line, col];
}

function snippetAround(text, idx, span = 60) {
  const start = Math.max(0, idx - 10);
  const end = Math.min(text.length, idx + span);
  return text.slice(start, end).replace(/\s+/g, ' ').trim();
}

for (const file of targets) {
  const text = readFileSync(file, 'utf8');

  // Rule 1
  for (const m of text.matchAll(LUCIDE_RE)) add(file, ...lineColFromIndex(text, m.index), 'lucide-unpinned', m[0]);

  // Rule 2
  for (const m of text.matchAll(INLINE_OKLCH_RE)) add(file, ...lineColFromIndex(text, m.index), 'inline-oklch-from-var', snippetAround(text, m.index));

  // Rule 3
  for (const m of text.matchAll(HALO_RE)) add(file, ...lineColFromIndex(text, m.index), 'halo-box-shadow', snippetAround(text, m.index));

  // Rule 4 — px font-size. Avatar size scale is the one documented exception;
  // the entire file is exempt since every px font-size there is a size-scale pair.
  if (/avatar\.card\.html$/.test(file)) continue;
  for (const m of text.matchAll(FONT_PX_RE)) add(file, ...lineColFromIndex(text, m.index), 'font-size-px', snippetAround(text, m.index));

  // Rule 5 — hardcoded hues (skip tokens dir, which is the source of truth)
  if (!file.includes(`${sep}tokens${sep}`)) {
    for (const m of text.matchAll(HUE_RE)) {
      // Allow oklch() only when it's the inline-from-var form (already flagged by Rule 2);
      // any other oklch/hsl/rgb literal is a hardcoded hue.
      const ctx = text.slice(m.index, m.index + 20);
      if (ctx.startsWith('oklch(from')) continue;
      add(file, ...lineColFromIndex(text, m.index), 'hardcoded-hue', snippetAround(text, m.index));
    }
    for (const m of text.matchAll(HEX_RE)) add(file, ...lineColFromIndex(text, m.index), 'hardcoded-hue', m[0]);
  }

  // Rule 6 — stale font link
  for (const m of text.matchAll(FONT_LINK_RE)) {
    if (m[1] !== CANONICAL_FONT_URL) add(file, ...lineColFromIndex(text, m.index), 'stale-font-link', m[1]);
  }
}

if (findings.length === 0) {
  console.log('drift: no findings.');
  process.exit(0);
}

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}

for (const [file, items] of byFile) {
  console.log(`\n${file}`);
  for (const f of items) console.log(`  ${f.line}:${f.col}  ${f.rule}  ${f.snippet}`);
}

console.log(`\ndrift: ${findings.length} finding(s) across ${byFile.size} file(s).`);
process.exit(1);
