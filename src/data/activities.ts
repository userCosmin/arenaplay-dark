import type { Activity } from '@/types';

/**
 * Everything on the floor is picked for a learning angle as well as a fun one,
 * so each description says what the child actually practises.
 *
 * Capacity note: a maximum of 6 people are in the arena at any one time.
 */
export const activities: Activity[] = [
  {
    id: 'zona-xr',
    name: 'Zona XR',
    category: 'XR',
    description:
      'Excursii virtuale și jocuri în echipă care îi țin în mișcare: copiii explorează, se coordonează și colaborează pentru a câștiga.',
    minAge: '6+',
    players: '1-6 jucători',
    duration: '20 min / sesiune',
    image: '/images/activities/xr.webp',
  },
  {
    id: 'zona-vr',
    name: 'Zona VR',
    category: 'VR',
    description:
      'Jocuri recreativ-educative, așezat: de la simulare de meserii la mișcare pe ritm, potrivite pentru toți copiii.',
    minAge: '6+',
    players: '1-2 jucători',
    duration: '20 min / sesiune',
    image: '/images/activities/vr.webp',
  },
  {
    id: 'simulator-auto',
    name: 'Sim Auto',
    category: 'Simulatoare',
    description:
      'Dezvoltă abilitățile necesare pentru obținerea permisului auto, într-un mediu sigur și controlat.',
    minAge: '7+',
    players: '1-2 jucători',
    duration: '20 min / sesiune',
    image: '/images/activities/simulator-auto.webp',
  },
  {
    id: 'simulator-zbor',
    name: 'Sim Zbor',
    category: 'Simulatoare',
    description:
      'Cabină de pilotaj realistă prin care se poate testa dacă există aptitudini pentru o carieră de pilot.',
    minAge: '8+',
    players: '1 jucător',
    duration: '20 min / sesiune',
    image: '/images/activities/simulator-zbor.webp',
  },
  {
    id: 'gaming',
    name: 'Zonă Gaming',
    category: 'Gaming',
    description: 'Console de ultimă generație și o selecție variată de jocuri.',
    minAge: 'Toate vârstele',
    players: '1-6 jucători',
    duration: '20 minute',
    image: '/images/activities/playstation.webp',
  },
];
