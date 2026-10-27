import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Keep temporary SSR modules near node_modules so external packages resolve.
const temporaryOutput = await mkdtemp(join(root, 'node_modules', '.prerender-'));

try {
  await build({
    root,
    publicDir: false,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: temporaryOutput,
      emptyOutDir: true,
    },
  });

  const { render, projects, playgroundProjects } = await import(pathToFileURL(join(temporaryOutput, 'entry-server.js')).href);
  const markup = await render();
  const indexPath = join(root, 'dist', 'index.html');
  const template = await readFile(indexPath, 'utf8');
  const placeholder = '<div id="root"></div>';
  assert(template.includes(placeholder), 'Missing prerender root placeholder');
  for (const section of ['home', 'about', 'skills', 'experience', 'projects', 'playground', 'contact']) {
    assert(markup.includes(`id="${section}"`), `Missing prerendered section: ${section}`);
  }
  assert(markup.includes('Koh Wei Zhen'), 'Missing portfolio identity');
  assert(markup.includes('Software developer experienced'), 'Missing portfolio description');
  for (const [sectionId, entries] of [
    ['projects', projects.filter(project => project.id !== '')],
    ['playground', playgroundProjects],
  ]) {
    const section = markup.match(new RegExp(`<section id="${sectionId}"[\\s\\S]*?</section>`))?.[0];
    assert(section, `Missing ${sectionId} anchor placeholder`);
    assert(!section.includes('<h3'), `${sectionId} cards must render only on the client`);
    for (const entry of entries) {
      for (const field of ['title', 'description']) {
        const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
        const escaped = entry[field].replace(/[&<>"']/g, character => entities[character]);
        assert(!section.includes(escaped), `${sectionId} ${entry.id} ${field} must be excluded from prerendering`);
      }
    }
  }
  assert(template.includes('rel="canonical"'), 'Missing canonical metadata');
  assert(template.includes('property="og:description"'), 'Missing Open Graph metadata');
  // A callback preserves literal dollar sequences in rendered portfolio text.
  const html = template.replace(placeholder, () => `<div id="root" data-prerendered="en">${markup}</div>`);
  await writeFile(indexPath, html);
  console.log(`Prerender verified: portfolio content and SEO metadata; project/playground data excluded (${Buffer.byteLength(html)} bytes).`);
} finally {
  // Only remove the unique directory created above, outside the deployable dist.
  assert(dirname(temporaryOutput) === join(root, 'node_modules'));
  await rm(temporaryOutput, { recursive: true, force: true });
}
