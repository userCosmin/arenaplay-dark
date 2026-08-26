import { siteConfig } from '@/config/site.config';

/**
 * Central analytics/tracking layer.
 *
 * Loads GA4, GTM, Meta (Facebook) Pixel and Microsoft Clarity only when the
 * corresponding IDs are configured via environment variables, and only once.
 * All conversion events funnel through `trackEvent`, which fans out to every
 * connected provider so a single call updates GA4, GTM's dataLayer and the
 * Meta Pixel consistently.
 */

type FbqFunction = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FbqFunction;
    clarity?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'map_click'
  | 'reservation_form_submit'
  | 'afterschool_form_submit'
  | 'arena_mobila_form_submit'
  | 'playground_reservation_submit'
  | 'contact_form_submit'
  | 'view_pricing'
  | 'view_program';

let initialized = false;

function injectScript(src: string, attrs: Record<string, string> = {}): void {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

/** Boots every analytics provider that has a configured ID. Call once from App root. */
export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  const { ga4Id, gtmId, fbPixelId, clarityId } = siteConfig.analytics;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) { window.dataLayer?.push(args); };

  if (gtmId) {
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
  }

  if (ga4Id) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
    window.gtag('js', new Date());
    window.gtag('config', ga4Id, { send_page_view: true });
  }

  if (fbPixelId) {
    window.fbq = window.fbq ?? function fbq(...args: unknown[]) { (window.fbq!.queue = window.fbq!.queue ?? []).push(args); };
    injectScript('https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', fbPixelId);
    window.fbq('track', 'PageView');
  }

  if (clarityId) {
    injectScript(`https://www.clarity.ms/tag/${clarityId}`);
  }
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'page_view', { page_path: path });
  window.fbq?.('track', 'PageView');
  window.dataLayer?.push({ event: 'page_view', page_path: path });
}

/** Fires a named conversion event to every connected analytics provider. */
export function trackEvent(event: ConversionEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', event, params);
  window.dataLayer?.push({ event, ...params });

  const metaEventMap: Partial<Record<ConversionEvent, string>> = {
    reservation_form_submit: 'Lead',
    afterschool_form_submit: 'Lead',
    arena_mobila_form_submit: 'Lead',
    playground_reservation_submit: 'Lead',
    contact_form_submit: 'Contact',
    phone_click: 'Contact',
    whatsapp_click: 'Contact',
  };
  const metaEvent = metaEventMap[event];
  if (metaEvent) {
    window.fbq?.('track', metaEvent, params);
  }

  window.clarity?.('event', event);
}
