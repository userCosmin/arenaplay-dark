import type { PriceItem, Offer } from '@/types';

/** Weekend (Sâmbătă–Duminică 13:30–21:30) — acces public, fără rezervare. */
export const playgroundPricingWeekend: PriceItem[] = [
  {
    id: 'bilet-sesiune',
    label: 'Bilet acces',
    price: 30,
    unit: 'lei / sesiune',
    note: 'O sesiune de joc durează 20 de minute',
  },
];

/** Luni–Vineri — doar cu rezervare, acces exclusiv la toate echipamentele. */
export const playgroundPricingWeekday: PriceItem[] = [
  {
    id: 'petrecere-privat',
    label: 'Petrecere — acces exclusiv',
    price: 80,
    unit: 'lei / copil',
    note: 'Minim 10 copii · 3 ore',
  },
  {
    id: 'loc-de-joaca-privat',
    label: 'Loc de joacă — acces privat',
    price: 100,
    unit: 'lei / copil',
    note: 'Minim 4 copii · 2 ore · acces exclusiv la toate echipamentele',
  },
];

export const playgroundOffers: Offer[] = [
  {
    id: '2-plus-1',
    title: '2 bilete cumpărate, al 3-lea gratuit',
    description: 'La achiziționarea a minimum 2 bilete de acces (sesiune de 20 de minute), al treilea bilet este gratuit.',
    conditions: 'Valabil sâmbătă și duminică, 13:30–21:30, la achiziția pe loc.',
  },
];
