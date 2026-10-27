import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import enInteractive from './locales/en/interactive';
import zhInteractive from './locales/zh/interactive';
import enPortfolio from './locales/en/portfolio';
import zhPortfolio from './locales/zh/portfolio';
import { detectLanguage, persistLanguage } from './language';
import type { SupportedLanguage } from './language';

export const resources = {
  en: { translation: { ...enCommon, ...enInteractive, portfolio: enPortfolio } },
  zh: { translation: { ...zhCommon, ...zhInteractive, portfolio: zhPortfolio } },
};

const i18n = createInstance();

function updateDocumentLanguage(): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = i18n.resolvedLanguage === 'zh' ? 'zh-CN' : 'en';
  document.title = i18n.t('page.title');
  document.querySelector('meta[name="description"]')?.setAttribute('content', i18n.t('page.description'));
}

i18n.on('languageChanged', updateDocumentLanguage);

export async function initializeI18n(): Promise<void> {
  await i18n.use(initReactI18next).init({
    resources,
    lng: detectLanguage(),
    supportedLngs: ['en', 'zh'],
    fallbackLng: 'en',
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  updateDocumentLanguage();
}

export async function changeLanguage(language: SupportedLanguage): Promise<void> {
  persistLanguage(language);
  await i18n.changeLanguage(language);
}

export default i18n;
