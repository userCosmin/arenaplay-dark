import type { PartyPackage } from '@/types';

export const partyPackages: PartyPackage[] = [
  {
    id: 'petrecere',
    name: 'Pachet Petrecere',
    price: 80,
    priceUnit: 'lei / copil',
    duration: '3 ore',
    kids: 'minim 10 copii',
    featured: true,
    includes: [
      'Acces exclusiv la toate echipamentele',
      'Spațiu privat rezervat',
      'Animator dedicat pentru toată durata petrecerii',
      'Decor tematic',
    ],
  },
];
