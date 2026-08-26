/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_GA4_ID: string;
  readonly VITE_GTM_ID: string;
  readonly VITE_FB_PIXEL_ID: string;
  readonly VITE_CLARITY_ID: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
