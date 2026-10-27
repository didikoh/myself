export type SupportedLanguage = 'en' | 'zh';

export const languageStorageKey = 'portfolio-language';

export function resolveLanguage(
  preferredLanguage?: string | null,
  savedLanguage?: string | null,
): SupportedLanguage {
  if (savedLanguage === 'en' || savedLanguage === 'zh') return savedLanguage;
  return preferredLanguage?.toLowerCase().split(/[-_]/)[0] === 'zh' ? 'zh' : 'en';
}

export function detectLanguage(): SupportedLanguage {
  let savedLanguage: string | null = null;
  try {
    savedLanguage = window.localStorage.getItem(languageStorageKey);
  } catch {
    // A manual selection still works when browser storage is unavailable.
  }

  const preferredLanguage = typeof navigator === 'undefined'
    ? undefined
    : navigator.languages?.[0] || navigator.language;
  return resolveLanguage(preferredLanguage, savedLanguage);
}

export function persistLanguage(language: SupportedLanguage): void {
  try {
    window.localStorage.setItem(languageStorageKey, language);
  } catch {
    // Keep the selection in memory for this visit when storage is blocked.
  }
}
