import { siteConfig } from '@/config/site.config';
import type { BreadcrumbEntry, FAQItem } from '@/types';

const { brand, url, contact, address, social, openingHours } = siteConfig;

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url.production}/#localbusiness`,
    name: brand.name,
    legalName: brand.legalName,
    description: brand.description,
    url: url.production,
    telephone: contact.phoneE164,
    email: contact.email,
    image: `${url.production}/images/og/arena-play-og.webp`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: address.geo.latitude,
      longitude: address.geo.longitude,
    },
    openingHoursSpecification: openingHours.structuredData.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.dayOfWeek,
      opens: entry.opens,
      closes: entry.closes,
    })),
    sameAs: [social.facebook, social.instagram, social.tiktok, social.youtube].filter(Boolean),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    url: url.production,
    logo: `${url.production}/images/brand/logo.png`,
    foundingDate: brand.foundingYear,
    sameAs: [social.facebook, social.instagram, social.tiktok, social.youtube].filter(Boolean),
  };
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.label,
      item: `${url.production}${entry.href}`,
    })),
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

interface EventSchemaInput {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  locationName: string;
}

export function eventSchema(input: EventSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    endDate: input.endDate ?? input.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: input.locationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.locality,
        addressCountry: address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: brand.name,
      url: url.production,
    },
  };
}
