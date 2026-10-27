# Project code map

## Frontend application

- `frontend/src/main.tsx` mounts the React application; `frontend/src/App.tsx` composes `Navbar`, `Home`, `About`, `Skills`, `Experience`, `Projects`, `Playground`, `Contact`, and `Chatbot`.
- `frontend/src/data/mockData.ts` exports English portfolio content and stable media/URL/technology metadata; interfaces live in `frontend/src/types/index.ts`. `backend/tests/portfolioAlignment.test.ts` also imports these named exports.
- `frontend/src/components/Navbar/Navbar.tsx` implements anchor scrolling and the mobile menu. Its CSS module defines desktop/mobile navigation.
- `frontend/src/App.css` defines shared button/link focus styles: pointer focus has no outline; keyboard `:focus-visible` uses the neutral `--color-accent`. Navbar buttons use these shared styles.
- `frontend/src/components/Skills/Skills.tsx` groups `timelineSkills` through `categoryBySkill`; classification depends on original English skill identifiers.
- `frontend/src/components/Projects/Projects.tsx` handles featured ordering, per-project carousels, expansion, image gallery and video popups.
- `frontend/src/components/Contact/Contact.tsx` owns form state and contact submission.
- `frontend/src/components/Chatbot/Chatbot.tsx` owns conversation state and sends requests to the Node chat backend. `chatStream.ts` consumes streaming responses; chat history is posted separately to the PHP API.
- `frontend/src/components/Hero/Hero.tsx` is a legacy component and is not imported by `App.tsx`.

## Internationalization

- `frontend/src/i18n/index.ts` exports `initializeI18n`, `changeLanguage`, and `resources`. `main.tsx` waits for initialization before mounting React. Language changes synchronize document language, title and description.
- `frontend/src/i18n/language.ts`: `resolveLanguage` gives saved `en`/`zh` priority, otherwise maps the browser's first preferred `zh-*` language to Simplified Chinese and falls back to English. `detectLanguage` reads `portfolio-language`; `persistLanguage` saves manual choices only, with storage exceptions handled.
- `frontend/src/i18n/locales/{en,zh}/common.ts` contains navigation and main section UI; `interactive.ts` contains projects, playground, contact and chatbot UI; `portfolio.ts` contains personal/about content and project/work/playground records. English portfolio resources derive from `mockData.ts`.
- `common.ts` key `identity.name` supplies the localized Navbar name (`KOH WEI ZHEN` / `许伟振`). `Home` keeps the original English name and adds this Chinese name on a separate line only when `resolvedLanguage` is `zh`; its `chineseName` style lives in `Home.module.css`.
- `frontend/src/data/usePortfolioData.ts`: `usePortfolioData` derives translated content with English fallbacks and stable project/work IDs. Components retain original metadata and technology identifiers; `Skills` translates display labels after classifying original skills.
- `Navbar` calls `changeLanguage` through always-visible `中文 / EN` buttons. `Chatbot` uses optional `Message.translationKey`/`translationPrefix` for local messages; existing user/model text and active requests remain intact when language changes. Backend request payloads contain only message roles/content.
- `frontend/src/i18n/language.test.ts` tests default detection, manual selection, storage failures and document metadata; `resources.test.ts` checks resource parity, interpolation, section rendering and portfolio data preservation.
- `docs/I18N_PLAN.md` records the inspected files, language rules, frontend-only scope and verification results. AI response language/retrieval remains controlled by the existing backend.
