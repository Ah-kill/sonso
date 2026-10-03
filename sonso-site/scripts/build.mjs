// Local stand-in for `jekyll build`, for machines without Ruby.
// Supports only the Liquid used on this site: layouts, {% include file k="v" %},
// {{ page.x }}, {{ site.x }}, {{ include.x }}, {{ content }}, and the `| default: "..."` filter.
// Anything else throws, so the site stays buildable by real Jekyll in GitHub Actions.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');

function parseYaml(text) {
  const data = {};
  let listKey = null;
  for (const raw of text.split(/\r*\n/).map((l) => l.replace(/\r+$/, ''))) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const item = raw.match(/^\s+-\s+(.*)$/);
    if (item && listKey) { data[listKey].push(unquote(item[1])); continue; }
    const kv = raw.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) throw new Error(`Unsupported YAML line: ${raw}`);
    if (kv[2] === '') { listKey = kv[1]; data[kv[1]] = []; } else { listKey = null; data[kv[1]] = unquote(kv[2]); }
  }
  return data;
}
const unquote = (v) => v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

function splitFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  return m ? { data: parseYaml(m[1]), body: text.slice(m[0].length) } : null;
}

const site = parseYaml(fs.readFileSync(path.join(root, '_config.yml'), 'utf8'));
const excluded = new Set(site.exclude || []);

function lookup(ctx, expr) {
  return expr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), ctx) ?? '';
}

function render(src, ctx, file) {
  src = src.replace(/\{%-?\s*include\s+([\w./-]+)((?:\s+\w+=(?:"[^"]*"|'[^']*'))*)\s*-?%\}/g, (_, name, args) => {
    const params = {};
    for (const a of args.matchAll(/(\w+)=(?:"([^"]*)"|'([^']*)')/g)) params[a[1]] = a[2] ?? a[3];
    const inc = fs.readFileSync(path.join(root, '_includes', name), 'utf8');
    return render(inc, { ...ctx, include: params }, name);
  });
  const stray = src.match(/\{%.*?%\}/);
  if (stray) throw new Error(`${file}: unsupported Liquid tag ${stray[0]}`);
  return src.replace(/\{\{-?\s*([\w.]+)\s*(?:\|\s*default:\s*(?:"([^"]*)"|'([^']*)')\s*)?-?\}\}/g,
    (_, expr, d1, d2) => String(lookup(ctx, expr) || (d1 ?? d2 ?? '')))
    .replace(/\{\{.*?\}\}/g, (m) => { throw new Error(`${file}: unsupported Liquid output ${m}`); });
}

function walk(dir, rel = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${entry.name}` : entry.name;
    if (!rel && (excluded.has(entry.name) || entry.name.startsWith('_') || entry.name.startsWith('.'))) continue;
    if (entry.name.startsWith('.')) continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(abs, r); continue; }
    const dest = path.join(out, r);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const isText = /\.(html|xml|txt|css|js|svg|json)$/.test(entry.name);
    const fm = isText ? splitFrontMatter(fs.readFileSync(abs, 'utf8')) : null;
    if (!fm) { fs.copyFileSync(abs, dest); continue; }
    const page = { ...fm.data };
    let html = render(fm.body, { page, site }, r);
    let layoutName = page.layout;
    while (layoutName) {
      const layout = splitFrontMatter(fs.readFileSync(path.join(root, '_layouts', `${layoutName}.html`), 'utf8'))
        ?? { data: {}, body: fs.readFileSync(path.join(root, '_layouts', `${layoutName}.html`), 'utf8') };
      html = render(layout.body, { page, site, content: html }, `_layouts/${layoutName}`);
      layoutName = layout.data.layout;
    }
    fs.writeFileSync(dest, html);
  }
}

// Empty _site rather than deleting it, so a shell or server sitting in it doesn't block the build on Windows.
fs.mkdirSync(out, { recursive: true });
for (const entry of fs.readdirSync(out)) fs.rmSync(path.join(out, entry), { recursive: true, force: true });
walk(root);
console.log(`Built ${out}`);
