/**
 * ============================================================================
 * ARENA PLAY — CENTRAL SITE CONFIGURATION
 * ============================================================================
 * This is the SINGLE SOURCE OF TRUTH for business/contact information used
 * across SEO metadata, structured data (JSON-LD), header/footer, floating
 * contact buttons, and forms.
 *
 * ⚠️ PLACEHOLDER DATA: Every value below is a realistic placeholder so the
 * project builds and runs immediately. Replace with real business data
 * before going live — search the codebase for other config in /src/data
 * for prices, hours, packages, etc. Nothing else needs to change; every
 * component reads from here.
 * ============================================================================
 */

export const siteConfig = {
  brand: {
    name: 'Arena Play',
    legalName: 'Arena Play SRL',
    tagline: 'Distracție. Experiențe. Educație.',
    description:
      'Arena Play este locul unde distracția întâlnește educația: petreceri pentru copii, loc de joacă cu tehnologie XR/VR, afterschool și Arena VR mobilă — experiența Arena Play adusă la tine.',
    foundingYear: '2021',
  },

  url: {
    production: 'https://www.arenaplay.ro',
    domain: 'arenaplay.ro',
  },

  contact: {
    phoneDisplay: '0737 105 105',
    phoneE164: '+40737105105',
    whatsappNumber: '40737105105',
    whatsappDefaultMessage: 'Bună! Aș vrea informații despre Arena Play.',
    email: 'contact@arenaplay.ro',
    reservationsEmail: 'rezervari@arenaplay.ro',
  },

  address: {
    streetAddress: 'Str. Tudor Vladimirescu nr. 50A',
    locality: 'Alba Iulia',
    region: 'Alba',
    postalCode: '510167',
    country: 'RO',
    countryName: 'România',
    full: 'Str. Tudor Vladimirescu nr. 50A, Alba Iulia, 510167, România',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Str.+Tudor+Vladimirescu+50A%2C+Alba+Iulia%2C+510167%2C+Rom%C3%A2nia',
    googleMapsEmbedSrc:
      'https://www.google.com/maps?q=Str.+Tudor+Vladimirescu+50A%2C+Alba+Iulia%2C+510167%2C+Rom%C3%A2nia&output=embed',
    // Approximate Alba Iulia city-centre coordinates — refine with the exact
    // pin once the location is verified on Google Maps.
    geo: {
      latitude: 46.0697,
      longitude: 23.5701,
    },
  },

  social: {
    facebook: 'https://www.facebook.com/arenaplay.albaiulia',
    instagram: 'https://www.instagram.com/arenaplayclubalbaiulia/',
    // No confirmed TikTok account yet — leave empty until one exists (kept out of JSON-LD automatically).
    tiktok: '',
    // No dedicated channel yet — links to a single video for now.
    youtube: 'https://www.youtube.com/watch?v=GFfsPwgtXfo',
  },

  /** Mandatory Romanian consumer-protection links (OUG 34/2014 + Regulation (EU) 524/2013). */
  legal: {
    anpcUrl: 'https://anpc.ro/',
    odrUrl: 'https://ec.europa.eu/consumers/odr',
  },

  openingHours: {
    playground: [
      { days: 'Sâmbătă – Duminică', hours: '13:30 – 21:30' },
      { days: 'Luni – Vineri', hours: 'Doar cu rezervare' },
    ],
    afterschool: [{ days: 'Luni – Vineri', hours: '12:00 – 18:00' }],
    structuredData: [
      { dayOfWeek: ['Saturday', 'Sunday'], opens: '13:30', closes: '21:30' },
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '12:00', closes: '18:00' },
    ],
  },

  analytics: {
    ga4Id: import.meta.env.VITE_GA4_ID ?? '',
    gtmId: import.meta.env.VITE_GTM_ID ?? '',
    fbPixelId: import.meta.env.VITE_FB_PIXEL_ID ?? '',
    clarityId: import.meta.env.VITE_CLARITY_ID ?? '',
  },

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function whatsappUrl(message?: string): string {
  const text = encodeURIComponent(message ?? siteConfig.contact.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}

export function telUrl(): string {
  return `tel:${siteConfig.contact.phoneE164}`;
}

export function mailUrl(subject?: string): string {
  return subject
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${siteConfig.contact.email}`;
}
