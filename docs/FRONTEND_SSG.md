# Frontend static prerendering

Run `npm run build` in `frontend/`. TypeScript and the normal Vite client build
run first. `scripts/prerender.mjs` then uses Vite's SSR build and React's
`renderToString` to insert the full initial application into `dist/index.html`.
The script verifies portfolio text, all seven section anchors, exclusion of
project/playground collection data, and SEO metadata before
writing the result. Its temporary server bundle is removed, including on failure.
No new packages or runtime server are required.

Projects and Playground are intentionally client-rendered. `App` uses
`useSyncExternalStore` with a false server snapshot and true client snapshot:
the server and first hydration pass emit only their empty section anchors,
then the existing interactive components mount on the client. Their titles,
descriptions, images and links are absent from initial HTML. This does not
guarantee exclusion from search indexes: crawlers that execute JavaScript can
still discover the content. Other portfolio sections remain prerendered.

`src/main.tsx` hydrates the generated root in English, matching the build's
language and component state. `App` applies saved/browser language preferences
in an effect after hydration; manual language selection still persists as before.
Development continues to use `createRoot` and normal language detection.
Initial animation styles match on the server and client. `src/index.css` makes
content visible while the root has `data-prerendered="en"`, including when scripts
are delayed or fail. `App` removes that marker after hydration so normal motion
behavior resumes. A `noscript` style also keeps motion content visible when
JavaScript is disabled.

Browser APIs belong in effects or event handlers. Chat conversation IDs are
initialized after mounting rather than during rendering. The current application
does not import a WebGL/3D runtime. For future browser-only libraries, dynamically
import and initialize them in an effect, with cleanup; render the same static
placeholder on the server and first client render. Avoid module-level imports
of libraries that require `window`, `document` or a graphics context at import time.

Upload the contents of `dist/` to the existing Apache `/portfolio/` directory.
Apache serves the generated HTML, CSS and JavaScript directly; Node is only
needed on the build machine. Existing API endpoints retain their own hosting
requirements. No SPA rewrite or Node SSR process is needed for this single page.

The canonical, Open Graph URL and image in `frontend/index.html` use
`https://kooteefamily.com/portfolio/`, matching `.github/workflows/deploy-frontend.yml`.
Update these absolute URLs if the production location changes, and update
`vite.config.ts`'s `base` if the deployment subdirectory changes. English title
and description in the HTML should stay aligned with `src/i18n/locales/en/common.ts`;
language switching also updates title, description and Open Graph text/locale.

Verification: `npm run build` checks the actual emitted HTML. `npm test` covers
server rendering without browser globals, deterministic output, explicit hydration
language and existing translations/streaming behavior. A browser check can
additionally verify hydration warnings, language preferences, animation and
interaction behavior against `npm run preview`.
