# Arena Play — Official Website (dark/neon variant)

Enterprise-grade, production-ready marketing site for **Arena Play**: Loc de joacă, Petreceri VR,
Arena VR mobilă și Afterschool. Built with React 19, TypeScript and Vite, and deployed
as a static site on Cloudflare Pages.

## Visual direction

The homepage is styled after the physical venue: black walls, cyan and magenta neon tube signage,
violet ambient light and printed-circuit-board wall art. The palette in `tailwind.config.ts`
(`neon.*`, `void.*`) was sampled directly from footage shot on location.

The homepage wraps its content in `.neon-page`, a scoped block in `src/index.css` that remaps the
handful of light surface/ink utilities used by the shared sections. Inner pages remain light and
are unaffected — nothing in that block applies outside `.neon-page`.

Neon-specific sections live in `src/components/sections/neon/`, and the circuit-trace wall art is
`src/components/effects/CircuitTraces.tsx`.

## Tech stack

- React 19 + TypeScript + Vite 6
- React Router 7 (client-side routing)
- Tailwind CSS 3 (design tokens in `tailwind.config.ts` — no hardcoded colors in components)
- Framer Motion (subtle, accessible animation)
- React Hook Form + Zod (validated forms, one schema per form in `src/utils/validation.ts`)
- Lucide Icons
- Swiper (testimonials & gallery carousels)
- React Helmet Async (per-page SEO metadata)
- TanStack React Query (provider wired up, ready for future data fetching)
- ESLint 9 (flat config) + Prettier (with `prettier-plugin-tailwindcss`)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build locally
npm run lint        # ESLint
npm run typecheck  # tsc --noEmit
npm run format      # Prettier write
```

The project builds and runs with the three commands above, with no manual setup required —
`.npmrc` sets `legacy-peer-deps=true` because `react-helmet-async`'s published peer range does
not yet list React 19 (it is otherwise fully compatible).

## ⚠️ Before going live

All business data is centralized as **placeholders** in **`src/config/site.config.ts`** — phone
number, WhatsApp number, email, address, Google Maps embed URL, social links and opening hours.
Update that single file and the entire site (header, footer, floating buttons, forms, JSON-LD
structured data, sitemap references) picks up the real values.

Other editable "CMS-ready" content lives in `src/data/*.ts`:

| File | Controls |
|---|---|
| `navigation.ts` | Header & footer menus |
| `services.ts` | The four homepage service cards |
| `packages.ts` | Party packages & pricing |
| `activities.ts` | Loc de joacă activities |
| `pricing.ts` | Loc de joacă tariffs & offers |
| `curriculum.ts` | Afterschool daily schedule & pillars |
| `testimonials.ts` | Homepage testimonials carousel |
| `faq.ts` | FAQ accordion (also powers FAQPage JSON-LD) |
| `gallery.ts` | Photo gallery entries |
| `partners.ts` | Partners section on Despre noi |

Placeholder photography lives under `public/images/` (generated gradients, not real photos) —
replace with real, compressed WebP images before launch. Also replace `public/icons/*.png` and
`public/images/brand/logo.png` with the real Arena Play logo assets.

## Project structure

```
src/
  components/
    ui/          Reusable primitives (Button, Card, Modal, Accordion, form fields, ...)
    layout/       Header, Footer, mobile menu/action bar, floating WhatsApp button, Layout
    sections/     Page sections shared across routes (Hero, ServiceCards, FAQSection, ...)
    forms/        One RHF+Zod form per service (Petreceri, Loc de joacă, Afterschool, Arena VR mobilă, Contact)
    seo/           <SEO> (Helmet) and <JsonLd> structured-data helpers
  pages/           One file per route, grouped by service folder
  data/            CMS-ready content (see table above)
  config/           site.config.ts — single source of truth for business/contact info
  context/          BookingModalContext (global "Rezervă" selector)
  hooks/            useScrolled, useLockBodyScroll, useIsHomePage
  services/         Mocked booking/contact API calls, ready to swap for a real backend
  utils/            cn, analytics, structuredData, validation (Zod schemas)
  types/            Shared TypeScript interfaces
public/
  robots.txt, sitemap.xml, manifest.json, llms.txt, llms-full.txt, humans.txt, ads.txt,
  .well-known/security.txt, _headers, _redirects (Cloudflare Pages)
```

## Routes

Homepage plus 17 routes, matching the approved site architecture exactly:

```
/
/petreceri-vr/            /petreceri-vr/pachete/
/loc-de-joaca/                /loc-de-joaca/activitati/       /loc-de-joaca/tarife-program/
/afterschool/                /afterschool/program/           /afterschool/inscrieri/
/arena-vr-mobila/                    /arena-vr-mobila/scoli/                /arena-vr-mobila/evenimente/
/arena-vr-mobila/petreceri-private/   /arena-vr-mobila/solicita-oferta/
/despre-noi/                  /contact/                       /rezerva/
```

Every route is code-split (`React.lazy`) and renders its own `<SEO>` (title, meta description,
canonical, Open Graph, Twitter Card) plus relevant JSON-LD (`LocalBusiness`, `Organization`,
`BreadcrumbList`, `FAQPage`).

## Forms & email delivery

Every form validates with Zod (`src/utils/validation.ts`) and includes a hidden honeypot field
(`src/components/ui/Honeypot.tsx`) — bots that fill it in are silently rejected both client-side
(Zod) and server-side (the Function below).

On submit, `src/services/bookingService.ts` calls `postLead()` (`src/services/api.ts`), which
POSTs to `/api/lead`. That endpoint is a Cloudflare Pages Function
(`functions/api/lead.ts`) that sends the notification email via [Resend](https://resend.com).

**To activate email sending:**
1. Create a free Resend account at resend.com and generate an API key.
2. In the Cloudflare Pages project settings → *Environment variables*, add:
   - `RESEND_API_KEY` — your Resend API key (required).
   - `LEAD_NOTIFICATION_EMAIL` — where lead notifications are sent (optional; currently defaults
     to `rusanadrian1973@gmail.com` as a temporary inbox — change this once `contact@arenaplay.ro`
     is ready to receive mail, e.g. once the domain is verified in Resend).
   - `RESEND_FROM_EMAIL` — sender address (optional; defaults to Resend's shared
     `onboarding@resend.dev`, which works without domain verification but is best swapped for a
     verified `@arenaplay.ro` address later).
3. Redeploy. No further code changes are needed.

For local testing with Wrangler, copy the same variables into a `.dev.vars` file (git-ignored)
in the project root and run `npx wrangler pages dev dist`.

## Analytics

`src/utils/analytics.ts` boots GA4, GTM, Meta (Facebook) Pixel and Microsoft Clarity only when
the corresponding environment variable is set, and exposes `trackEvent(...)` which fans out to
every connected provider. Conversion events already wired up:

`phone_click`, `whatsapp_click`, `email_click`, `map_click`, `reservation_form_submit`,
`playground_reservation_submit`, `afterschool_form_submit`, `arena_mobila_form_submit`
(segmented by `requestType`: școală / eveniment / privat), `contact_form_submit`,
`view_pricing`, `view_program`.

## Environment variables

Copy `.env.example` to `.env` and fill in the IDs you use. All are optional in development —
providers only initialize when their ID is present.

```
VITE_SITE_URL=https://www.arenaplay.ro
VITE_GA4_ID=
VITE_GTM_ID=
VITE_FB_PIXEL_ID=
VITE_CLARITY_ID=
VITE_API_BASE_URL=
```

The email-sending Function (`functions/api/lead.ts`) uses separate, server-only variables that
must be set directly in the Cloudflare Pages dashboard (never committed to `.env`): see
"Forms & email delivery" above for `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`,
`RESEND_FROM_EMAIL`.

## SEO & GEO (AI answer engines)

Every route is registered in three places that must stay in sync when adding a page:
`src/App.tsx` (route), the matching page's `<SEO path="...">` prop, and `public/sitemap.xml`.

Because this is a client-rendered SPA, `npm run build` automatically runs
`scripts/prerender.mjs` as a `postbuild` step. For every route it writes a
`dist/<route>/index.html` that already contains the real title, meta description,
canonical URL, Open Graph/Twitter tags, JSON-LD (LocalBusiness/BreadcrumbList/FAQPage)
and real semantic HTML (H1, headings, paragraphs) — not just the empty SPA shell.
This matters because most AI/LLM crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot —
the crawlers relevant to GEO) fetch raw HTML and do not execute JavaScript, so without
this step they would see nothing. The full interactive React app still loads and takes
over instantly for real visitors; the prerendered markup only matters for that first
paint and for non-JS crawlers. If you change a page's copy, update the matching entry
in `scripts/prerender.mjs` too.

`public/llms.txt` and `public/llms-full.txt` give AI agents a structured summary of
every page and are kept in sync with the same URLs.

## Deployment — Cloudflare Pages

This is a static SPA (no Node server, no Express). Two ways to deploy:

**Git integration (recommended):**
1. Push this repository to GitHub.
2. In Cloudflare Pages, create a project connected to the repo.
3. Build command: `npm run build` — Build output directory: `dist`.
4. Add the `VITE_*` environment variables from `.env.example`, plus `RESEND_API_KEY`
   (and optionally `LEAD_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL`) for email delivery,
   in the Pages project settings.
5. `public/_redirects` (SPA fallback to `index.html`) and `public/_headers` (caching + security
   headers) are picked up automatically from the build output.

**Wrangler CLI:**
```bash
npm run build
npx wrangler pages deploy dist --project-name=arena-play
```

`wrangler.toml` is included for CLI-based deployments and local `wrangler pages dev` testing.

## Accessibility & performance

- Semantic HTML, visible focus states, `aria-*` on interactive icon-only controls, skip-friendly
  landmark structure (`<header>`, `<main id="main-content">`, `<footer>`).
- Respects `prefers-reduced-motion`.
- Route-level code splitting, manual vendor chunking (`vite.config.ts`), lazy-loaded images.
- Tailwind design tokens (colors, spacing, radii, shadows) centralized in `tailwind.config.ts` —
  no hardcoded hex values or inline styles in components.

## License

MIT — see [LICENSE](./LICENSE).
