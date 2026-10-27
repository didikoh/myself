// Public files are served beneath Vite's base, without a `public/` segment.
export const getPublicAssetUrl = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
