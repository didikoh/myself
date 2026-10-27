import { afterEach, describe, expect, it, vi } from 'vitest';
import { detectLanguage, languageStorageKey, persistLanguage, resolveLanguage } from './language';
import i18n, { changeLanguage, initializeI18n } from './index';

afterEach(() => { vi.unstubAllGlobals(); });

describe('default language', () => {
  it.each(['zh', 'zh-CN', 'zh-TW', 'zh-HK', 'zh-SG', 'zh-Hant', 'ZH-cn'])('%s defaults to Chinese', (locale) => {
    expect(resolveLanguage(locale)).toBe('zh');
  });

  it.each(['en', 'en-US', 'en-GB', 'de-DE', 'ja-JP', '', null, undefined])('%s defaults to English', (locale) => {
    expect(resolveLanguage(locale)).toBe('en');
  });

  it('prioritizes an explicit saved choice and ignores invalid saved values', () => {
    expect(resolveLanguage('zh-CN', 'en')).toBe('en');
    expect(resolveLanguage('en-US', 'zh')).toBe('zh');
    expect(resolveLanguage('zh-TW', 'invalid')).toBe('zh');
  });

  it('uses the first browser preference, then navigator.language when the list is empty', () => {
    vi.stubGlobal('window', { localStorage: { getItem: () => null } });
    vi.stubGlobal('navigator', { languages: ['zh-TW', 'en-US'], language: 'en-US' });
    expect(detectLanguage()).toBe('zh');
    vi.stubGlobal('navigator', { languages: [], language: 'zh-CN' });
    expect(detectLanguage()).toBe('zh');
    vi.stubGlobal('navigator', { languages: ['ja-JP', 'zh-CN'], language: 'ja-JP' });
    expect(detectLanguage()).toBe('en');
  });

  it('still detects and switches when storage is blocked', () => {
    vi.stubGlobal('window', { get localStorage() { throw new Error('blocked'); } });
    vi.stubGlobal('navigator', { language: 'zh-CN' });
    expect(detectLanguage()).toBe('zh');
    expect(() => persistLanguage('en')).not.toThrow();
  });

  it('falls back safely when browser globals are unavailable', () => {
    vi.stubGlobal('window', undefined);
    vi.stubGlobal('navigator', undefined);
    expect(detectLanguage()).toBe('en');
  });

  it('initializes Chinese before rendering, updates metadata on switch and persists only manual choices', async () => {
    const storage = new Map<string, string>();
    const setItem = vi.fn((key: string, value: string) => { storage.set(key, value); });
    const description = { setAttribute: vi.fn() };
    const ogTitle = { setAttribute: vi.fn() };
    const ogDescription = { setAttribute: vi.fn() };
    const ogLocale = { setAttribute: vi.fn() };
    const metadata: Record<string, typeof description> = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': ogTitle,
      'meta[property="og:description"]': ogDescription,
      'meta[property="og:locale"]': ogLocale,
    };
    const documentStub = { documentElement: { lang: '' }, title: '', querySelector: (selector: string) => metadata[selector] };
    vi.stubGlobal('window', { localStorage: { getItem: (key: string) => storage.get(key) ?? null, setItem } });
    vi.stubGlobal('navigator', { languages: ['zh-CN'], language: 'zh-CN' });
    vi.stubGlobal('document', documentStub);

    await initializeI18n();
    expect(i18n.resolvedLanguage).toBe('zh');
    expect(documentStub.documentElement.lang).toBe('zh-CN');
    expect(documentStub.title).toContain('个人作品集');
    expect(ogTitle.setAttribute).toHaveBeenLastCalledWith('content', i18n.t('page.title'));
    expect(ogLocale.setAttribute).toHaveBeenLastCalledWith('content', 'zh_CN');
    expect(setItem).not.toHaveBeenCalled();

    await changeLanguage('en');
    expect(documentStub.documentElement.lang).toBe('en');
    expect(documentStub.title).toBe('Portfolio - KOH WEI ZHEN');
    expect(description.setAttribute).toHaveBeenLastCalledWith('content', i18n.t('page.description'));
    expect(ogDescription.setAttribute).toHaveBeenLastCalledWith('content', i18n.t('page.description'));
    expect(ogLocale.setAttribute).toHaveBeenLastCalledWith('content', 'en_US');
    expect(setItem).toHaveBeenCalledWith(languageStorageKey, 'en');
    expect(detectLanguage()).toBe('en');
  });
});
