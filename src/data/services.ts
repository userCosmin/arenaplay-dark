import type { ServiceSummary } from '@/types';

export const services: ServiceSummary[] = [
  {
    slug: 'playground',
    name: 'Loc de joacă Arena Play',
    shortLabel: 'Loc de joacă',
    tagline: 'Intră în joc.',
    description:
      'XR, VR, simulatoare auto și de zbor, PlayStation și multe alte activități pentru toate vârstele.',
    href: '/loc-de-joaca/',
    ctaLabel: 'Rezervă Loc de joacă',
    accent: 'playground',
    icon: 'Gamepad2',
    image: '/images/services/playground.webp',
  },
  {
    slug: 'petreceri',
    name: 'Petreceri VR',
    shortLabel: 'Petreceri VR',
    tagline: 'Tu aduci invitații. Noi pregătim experiența.',
    description:
      'Spațiu privat, activități, animație și pachete complete pentru ziua perfectă a copilului tău.',
    href: '/petreceri-vr/',
    ctaLabel: 'Rezervă petrecerea',
    accent: 'petreceri',
    icon: 'PartyPopper',
    image: '/images/services/petreceri.webp',
  },
  {
    slug: 'arena-mobila',
    name: 'Arena VR mobilă',
    shortLabel: 'Arena VR mobilă',
    tagline: 'Noi aducem experiența la tine.',
    description:
      'Pentru școli, evenimente, festivaluri și petreceri private — Arena Play se deplasează la locația ta.',
    href: '/arena-vr-mobila/',
    ctaLabel: 'Solicită Arena VR mobilă',
    accent: 'arenamobila',
    icon: 'Truck',
    image: '/images/services/arena-mobila.webp',
  },
  {
    slug: 'afterschool',
    name: 'Arena Play Afterschool',
    shortLabel: 'Afterschool',
    tagline: 'După școală începe următorul nivel.',
    description:
      'Program complet pentru clasele I–IV: teme, engleză, programare și activități recreative.',
    href: '/afterschool/',
    ctaLabel: 'Solicită informații',
    accent: 'afterschool',
    icon: 'GraduationCap',
    image: '/images/services/afterschool.webp',
  },
];

export function getServiceBySlug(slug: string): ServiceSummary | undefined {
  return services.find((s) => s.slug === slug);
}
