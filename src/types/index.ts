export type ServiceSlug = 'petreceri' | 'playground' | 'afterschool' | 'arena-mobila';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

/** Small color indicator dot shown next to a top-level nav item. */
export type NavDot = 'blue' | 'pink' | 'ring' | 'white';

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  dot?: NavDot;
}

export interface ServiceSummary {
  slug: ServiceSlug;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  href: string;
  ctaLabel: string;
  accent: 'petreceri' | 'playground' | 'afterschool' | 'arenamobila';
  icon: string;
  image: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  duration: string;
  kids: string;
  featured?: boolean;
  includes: string[];
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  description: string;
  minAge?: string;
  players?: string;
  duration?: string;
  image: string;
}

export interface PriceItem {
  id: string;
  label: string;
  price: number;
  unit: string;
  note?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  validUntil?: string;
  conditions?: string;
}

export interface CurriculumPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DaySchedule {
  time: string;
  activity: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  service: ServiceSlug;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: ServiceSlug | 'general';
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: ServiceSlug | 'general';
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  url?: string;
}

export interface BreadcrumbEntry {
  label: string;
  href: string;
}
