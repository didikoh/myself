import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializeI18n } from './i18n'

const root = document.getElementById('root')!
const prerendered = root.dataset.prerendered === 'en'

// Hydration must start with the same language used at build time.
void initializeI18n(prerendered ? 'en' : undefined).then(() => {
  const app = (
    <StrictMode>
      <App />
    </StrictMode>
  )
  if (prerendered) {
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
})
