import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createInstance } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import { resources } from './index';
import { usePortfolioData } from '../data/usePortfolioData';
import * as original from '../data/mockData';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Playground from '../components/Playground/Playground';
import Contact from '../components/Contact/Contact';
import Navbar from '../components/Navbar/Navbar';

function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  if (value === null || typeof value !== 'object') return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, entry]) =>
    Object.entries(flatten(entry, prefix ? `${prefix}.${key}` : key)),
  ));
}

async function instanceFor(language: 'en' | 'zh') {
  const instance = createInstance();
  await instance.init({ lng: language, fallbackLng: 'en', resources, interpolation: { escapeValue: false } });
  return instance;
}

describe('translation resources', () => {
  it('covers identical nonempty keys and interpolation values in both languages', () => {
    const english = flatten(resources.en.translation);
    const chinese = flatten(resources.zh.translation);
    expect(Object.keys(chinese).sort()).toEqual(Object.keys(english).sort());
    for (const [key, value] of Object.entries(english)) {
      expect(chinese[key].trim(), key).not.toBe('');
      const placeholders = (text: string) => [...text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)].map((match) => match[1]).sort();
      expect(placeholders(chinese[key]), key).toEqual(placeholders(value));
    }
  });

  it.each(['en', 'zh'] as const)('%s resolves interpolation and plural forms', async (language) => {
    const instance = await instanceFor(language);
    expect(instance.t('skills.count', { count: 1 })).toBe(language === 'en' ? '1 skill' : '1 项技能');
    expect(instance.t('skills.count', { count: 4 })).toBe(language === 'en' ? '4 skills' : '4 项技能');
    expect(instance.t('projects.projectImage', { title: 'React', index: 2 })).toBe(language === 'en' ? 'React - Image 2' : 'React - 第 2 张图片');
  });

  it.each(['en', 'zh'] as const)('%s renders all displayed sections with translated content', async (language) => {
    const instance = await instanceFor(language);
    const html = renderToStaticMarkup(createElement(I18nextProvider, { i18n: instance },
      ...[Navbar, Home, About, Skills, Experience, Projects, Playground, Contact].map((Component, index) => createElement(Component, { key: index })),
    ));
    const expected = language === 'zh'
      ? ['查看项目', '关于我', '我的技能成长历程', '工作经历', '我的项目', '创意实验室', '给我留言', '游戏开发者与 Web 开发者', '2024 年 9 月']
      : ['View Projects', 'About Me', 'My Skills Journey', 'Work Experience', 'My Projects', 'Playground', 'Send me a message', original.personalInfo.title, 'September 2024'];
    for (const text of expected) {
      const escaped = renderToStaticMarkup(createElement('span', null, text)).slice(6, -7);
      expect(html.includes(escaped), text).toBe(true);
    }
    expect(html).not.toMatch(/\{\{|portfolio\.projects|skills\.categories/);
    expect(html).toContain(`aria-label="${language === 'zh' ? '切换到中文' : 'Switch to Chinese'}" aria-pressed="${language === 'zh'}"`);
    expect(html).toContain(`aria-label="${language === 'zh' ? '切换到英文' : 'Switch to English'}" aria-pressed="${language === 'en'}"`);
  });

  it('translates every portfolio entry while preserving metadata and the English source', async () => {
    const instance = await instanceFor('zh');
    let displayed: ReturnType<typeof usePortfolioData> | undefined;
    function Probe() { displayed = usePortfolioData(); return null; }
    renderToStaticMarkup(createElement(I18nextProvider, { i18n: instance }, createElement(Probe)));
    if (!displayed) throw new Error('Portfolio was not rendered');

    expect(displayed.personalInfo.name).toBe(original.personalInfo.name);
    expect(displayed.personalInfo.description).toMatch(/[\u4e00-\u9fff]/);
    for (const [index, project] of displayed.projects.entries()) {
      expect(project.id).toBe(original.projects[index].id);
      expect(project.description).toMatch(/[\u4e00-\u9fff]/);
      expect(project.images).toEqual(original.projects[index].images);
      expect(project.links).toEqual(original.projects[index].links);
      expect(project.technologies).toEqual(original.projects[index].technologies);
    }
    for (const [index, experience] of displayed.workExperiences.entries()) {
      expect(experience.company).toBe(original.workExperiences[index].company);
      expect(experience.responsibilities).toHaveLength(original.workExperiences[index].responsibilities.length);
      for (const responsibility of experience.responsibilities) expect(responsibility).toMatch(/[\u4e00-\u9fff]/);
    }
    expect(displayed.playgroundProjects[0].description).toMatch(/[\u4e00-\u9fff]/);

    await instance.changeLanguage('en');
    renderToStaticMarkup(createElement(I18nextProvider, { i18n: instance }, createElement(Probe)));
    expect(displayed).toEqual({
      personalInfo: original.personalInfo, aboutInfo: original.aboutInfo, projects: original.projects,
      workExperiences: original.workExperiences, playgroundProjects: original.playgroundProjects,
    });
  });
});
