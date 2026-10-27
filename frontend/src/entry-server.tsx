import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { initializeI18n } from './i18n';

// Let the build verify these collections are excluded from the initial HTML.
export { projects, playgroundProjects } from './data/mockData';

// Node is needed only during the build; the deployed output is static HTML.
export async function render(): Promise<string> {
  await initializeI18n('en');
  return renderToString(<StrictMode><App /></StrictMode>);
}
