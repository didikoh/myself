import { afterEach, expect, it, vi } from 'vitest';
import { render } from './entry-server';
import i18n, { initializeI18n } from './i18n';
import { projects, playgroundProjects } from './data/mockData';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

afterEach(() => vi.unstubAllGlobals());

it('prerenders deterministically without browser APIs and excludes project/playground data', async () => {
  vi.stubGlobal('window', undefined);
  vi.stubGlobal('document', undefined);
  vi.stubGlobal('navigator', undefined);
  const html = await render();
  expect(await render()).toBe(html);
  expect(html).toContain('Koh Wei Zhen');
  expect(html).toContain('Software developer experienced');
  for (const section of ['home', 'about', 'skills', 'experience', 'projects', 'playground', 'contact']) {
    expect(html).toContain(`id="${section}"`);
  }
  expect(html).not.toContain('portfolio.projects.');
  for (const [sectionId, entries] of [
    ['projects', projects.filter(project => project.id !== '')],
    ['playground', playgroundProjects],
  ] as const) {
    const section = html.match(new RegExp(`<section id="${sectionId}"[\\s\\S]*?</section>`))?.[0];
    expect(section).toBe(`<section id="${sectionId}"></section>`);
    for (const entry of entries) {
      for (const text of [entry.title, entry.description]) {
        const escaped = renderToStaticMarkup(createElement('span', null, text)).slice(6, -7);
        expect(section, `${sectionId}: ${entry.title}`).not.toContain(escaped);
      }
    }
  }
});

it('uses the build language for hydration even when the visitor prefers Chinese', async () => {
  const readStorage = vi.fn(() => 'zh');
  vi.stubGlobal('window', { localStorage: { getItem: readStorage } });
  vi.stubGlobal('navigator', { languages: ['zh-CN'], language: 'zh-CN' });
  const html = await render();
  await initializeI18n('en');
  expect(i18n.resolvedLanguage).toBe('en');
  expect(readStorage).not.toHaveBeenCalled();
  expect(html).toContain('View Projects');
});
