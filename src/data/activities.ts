import type { Activity } from '@/types';

/**
 * Everything on the floor is picked for a learning angle as well as a fun one,
 * so each description says what the child actually practises.
 *
 * Capacity note: a maximum of 6 people are in the arena at any one time.
 */
export const activities: Activity[] = [
  {
    id: 'vr-dinamic-journey',
    name: 'VR Dinamic — Journey',
    category: 'VR Dinamic',
    description:
      'Excursii în sistemul solar, în junglă și în savană. Copiii explorează și învață interactiv, ghidați prin fiecare mediu.',
    minAge: '6+',
    players: 'până la 6 jucători',
    duration: '20 min / sesiune',
    image: '/images/activities/vr.webp',
  },
  {
    id: 'vr-dinamic-lasertag',
    name: 'VR Dinamic — Lasertag',
    category: 'VR Dinamic',
    description:
      'Joc în echipă care îi ține în mișcare: copiii se coordonează, se ajută între ei și colaborează pentru a câștiga.',
    minAge: '7+',
    players: 'până la 6 jucători',
    duration: '20 min / sesiune',
    image: '/images/activities/xr.webp',
  },
  {
    id: 'vr-static-job-simulator',
    name: 'VR Static — Job Simulator',
    category: 'VR Static',
    description:
      'Jocuri recreativ-educative în care copiii experimentează meserii și rezolvă sarcini practice, pas cu pas.',
    minAge: '6+',
    players: '1-2 jucători',
    duration: '15 min / sesiune',
    image: '/images/activities/vr.webp',
  },
  {
    id: 'vr-static-beat-saber',
    name: 'VR Static — Beat Saber',
    category: 'VR Static',
    description:
      'Prin mișcare și dans pe ritm, copiii își dezvoltă coordonarea mână-picior și simțul ritmului.',
    minAge: '6+',
    players: '1 jucător',
    duration: '15 min / sesiune',
    image: '/images/activities/xr.webp',
  },
  {
    id: 'simulator-auto',
    name: 'Simulator Profesional Auto',
    category: 'Simulatoare',
    description:
      'Dezvoltă abilitățile necesare pentru obținerea permisului auto, într-un mediu sigur și controlat.',
    minAge: '7+',
    players: '1 jucător',
    duration: '10 min / sesiune',
    image: '/images/activities/simulator-auto.webp',
  },
  {
    id: 'simulator-zbor',
    name: 'Simulator Profesional de Zbor',
    category: 'Simulatoare',
    description:
      'Cabină de pilotaj realistă prin care se poate testa dacă există aptitudini pentru o carieră de pilot.',
    minAge: '8+',
    players: '1 jucător',
    duration: '10-15 min / sesiune',
    image: '/images/activities/simulator-zbor.webp',
  },
  {
    id: 'playstation',
    name: 'Zonă PlayStation',
    category: 'Gaming',
    description: 'Console de ultimă generație, canapele confortabile și o selecție variată de jocuri.',
    minAge: 'Toate vârstele',
    players: '1-4 jucători',
    duration: 'Acces liber',
    image: '/images/activities/playstation.webp',
  },
  {
    id: 'extra',
    name: 'Activități Extra',
    category: 'Bonus',
    description: 'Jocuri de societate, șah, zonă de creativitate și alte activități rotative.',
    minAge: 'Toate vârstele',
    players: 'Grup',
    duration: 'Acces liber',
    image: '/images/activities/extra.webp',
  },
];
