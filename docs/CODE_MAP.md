# Project code map

## Frontend application

- `frontend/src/main.tsx` hydrates prerendered roots in English and uses `createRoot` in development; `frontend/src/App.tsx` composes `Navbar`, `Home`, `About`, `Skills`, `Experience`, `Projects`, `Playground`, `Contact`, and `Chatbot`, then applies the visitor's language preference after mounting.
- `frontend/src/data/mockData.ts` exports English portfolio content and stable media/URL/technology metadata; interfaces live in `frontend/src/types/index.ts`. `backend/tests/portfolioAlignment.test.ts` also imports these named exports.
- `frontend/src/components/Navbar/Navbar.tsx` implements anchor scrolling and the mobile menu. The localized name is a native button without hover animation; clicking closes the mobile menu and smoothly scrolls to `top: 0`. `nav.backToTop` supplies its localized accessible label. Its CSS module defines desktop/mobile navigation.
- `frontend/src/App.css` defines shared button/link focus styles: pointer focus has no outline; keyboard `:focus-visible` uses the neutral `--color-accent`. Navbar buttons use these shared styles.
- `frontend/src/components/Skills/Skills.tsx` groups `timelineSkills` through `categoryBySkill`; classification depends on original English skill identifiers.
- `frontend/src/components/Projects/Projects.tsx` handles featured ordering, per-project carousels, expansion, image gallery and video popups. Video buttons derive from `projects[].links` in `frontend/src/data/mockData.ts`; project `3` (Exsim Causewayz JBCC) has only a website link after removing its oversized `0930.mp4`. The removed `2D SideScroller game.mp4` has no reference in frontend source.
- `frontend/src/components/Contact/Contact.tsx` owns form state and contact submission.
- `frontend/src/components/Chatbot/Chatbot.tsx` owns conversation state and sends requests to the Node chat backend. `chatStream.ts` consumes streaming responses; chat history is posted separately to the PHP API.
- `frontend/src/components/Hero/Hero.tsx` is a legacy component and is not imported by `App.tsx`.

## Internationalization

- `frontend/src/i18n/index.ts` exports `initializeI18n(language?)`, `changeLanguage`, and `resources`. `main.tsx` waits for initialization before mounting React. Language changes synchronize document language, title, description and Open Graph text/locale.
- `frontend/src/i18n/language.ts`: `resolveLanguage` gives saved `en`/`zh` priority, otherwise maps the browser's first preferred `zh-*` language to Simplified Chinese and falls back to English. `detectLanguage` reads `portfolio-language`; `persistLanguage` saves manual choices only, with storage exceptions handled.
- `frontend/src/i18n/locales/{en,zh}/common.ts` contains navigation and main section UI; `interactive.ts` contains projects, playground, contact and chatbot UI; `portfolio.ts` contains personal/about content and project/work/playground records. English portfolio resources derive from `mockData.ts`.
- `common.ts` key `identity.name` supplies the localized Navbar name (`KOH WEI ZHEN` / `许伟振`). `Home` keeps the original English name and adds this Chinese name on a separate line only when `resolvedLanguage` is `zh`; its `chineseName` style lives in `Home.module.css`.
- `frontend/src/data/usePortfolioData.ts`: `usePortfolioData` derives translated content with English fallbacks and stable project/work IDs. Components retain original metadata and technology identifiers; `Skills` translates display labels after classifying original skills.
- `Navbar` calls `changeLanguage(nextLanguage)` through one always-visible `中文 / EN` button: the whole pill toggles to the other language, highlights the current language, and labels the next action for assistive technology. `Chatbot` uses optional `Message.translationKey`/`translationPrefix` for local messages; existing user/model text and active requests remain intact when language changes. Backend request payloads contain only message roles/content.
- `frontend/src/i18n/language.test.ts` tests default detection, manual selection, storage failures and document metadata; `resources.test.ts` checks resource parity, interpolation, section rendering and portfolio data preservation.
- `docs/I18N_PLAN.md` records the inspected files, language rules, frontend-only scope and verification results. AI response language/retrieval remains controlled by the existing backend.

## Frontend prerendering and deployment

- `.github/workflows/deploy-frontend.yml` runs on `main` pushes touching `frontend/**`, `api/**`, or the workflow, and manual dispatch. It installs/builds the frontend, packages `frontend/dist` plus `api`, generates `api/config.php` from the `DB_PASSWORD` secret, then deploys with `rsync -az --delete` and checks `/api/health`. It does not deploy `backend` or protect server-only files from deletion.
- The deployment workflow has no media download step or rsync exclusions; server-only media absent from the CI package can be deleted. Remaining project MP4 assets are included directly in Git for CI checkout. `api/.gitignore` excludes `/config.php`, which CI regenerates explicitly.
- `frontend/src/entry-server.tsx` exports `render`, initializing English and rendering the same `App`/`StrictMode` tree as the client with `renderToString`. `entry-server.test.ts` checks deterministic rendering without browser APIs and the explicit hydration language.
- `App` uses `useSyncExternalStore` to render empty `projects`/`playground` section anchors on the server and first hydration pass, then mounts the existing interactive components on the client. Their collection data is intentionally excluded from initial SEO HTML; JavaScript-capable crawlers may still index client-rendered content.
- `frontend/scripts/prerender.mjs` runs after the client build in `npm run build`, bundles the SSR entry in a temporary directory, verifies section anchors, project/playground data exclusion, portfolio text and SEO metadata, and injects HTML with `data-prerendered="en"` into `dist/index.html`. Temporary SSR output is removed in `finally`.
- `frontend/src/index.css` overrides inline motion opacity/transforms while the root has `data-prerendered="en"`, keeping static content visible while scripts load or fail. `App` removes this marker after hydration to restore normal motion behavior.
- `frontend/index.html` defines canonical/Open Graph metadata for the production URL verified in `.github/workflows/deploy-frontend.yml`. Its `noscript` style reveals motion entrance states without changing client animations.
- `Chatbot` initializes its conversation ID in an effect or send handler, avoiding browser storage and UUID creation during server rendering.
- `docs/FRONTEND_SSG.md` documents the static Apache deployment, hydration/language sequence and rules for future browser-only/3D imports. `frontend/vite.config.ts` retains the existing `/portfolio/` base.
