import type { PartyPackage } from '@/types';

/** Identical in both packages — only the price and group size differ. */
const commonIncludes = [
  'Acces exclusiv la toate echipamentele',
  'Spațiu privat rezervat',
  'Apă plată inclusă',
  '10% reducere la Pizza și Fast Food Antik',
];

export const partyPackages: PartyPackage[] = [
  {
    id: 'pachet-1',
    name: 'Pachetul 1',
    price: 100,
    priceUnit: 'lei / copil',
    duration: '3 ore',
    kids: 'Minim 6 copii',
    includes: commonIncludes,
  },
];

/**
 * Bookable start windows for parties. Each slot matches the 3-hour package
 * duration, so the label doubles as what the customer is committing to.
 */
export const partyTimeSlots = [
  { id: '11-30', label: '11:30 – 14:30' },
  { id: '15-00', label: '15:00 – 18:00' },
  { id: '18-30', label: '18:30 – 21:30' },
] as const;
