import type { CurriculumPillar, DaySchedule } from '@/types';

export const curriculumPillars: CurriculumPillar[] = [
  {
    id: 'teme',
    title: 'Teme & Organizare',
    description: 'Timp dedicat, supravegheat, pentru rezolvarea temelor și organizarea materialelor pentru a doua zi.',
    icon: 'BookOpen',
  },
  {
    id: 'engleza',
    title: 'Engleză',
    description: 'Sesiuni săptămânale de engleză conversațională, adaptate nivelului fiecărui copil.',
    icon: 'Languages',
  },
  {
    id: 'programare',
    title: 'Programare',
    description: 'Introducere în gândirea computațională și programare vizuală, prin joc și proiecte.',
    icon: 'Code2',
  },
  {
    id: 'recreativ',
    title: 'Activități Recreative',
    description: 'Joc liber, sport ușor, activități creative și socializare într-un mediu sigur.',
    icon: 'Palette',
  },
];

export const dailySchedule: DaySchedule[] = [
  { time: '12:00 – 12:30', activity: 'Sosire, gustare și relaxare după școală' },
  { time: '12:30 – 13:30', activity: 'Teme și organizare, cu sprijin individual' },
  { time: '13:30 – 14:15', activity: 'Curs săptămânal: Engleză sau Programare (alternativ)' },
  { time: '14:15 – 15:30', activity: 'Activități recreative și joc liber' },
  { time: '15:30 – 18:00', activity: 'Timp liber supravegheat, program flexibil de preluare' },
];

export const afterschoolOptionals = [
  { id: 'sah', label: 'Șah', description: 'Curs opțional, o dată pe săptămână.' },
  { id: 'transport', label: 'Transport / Preluare', description: 'Disponibil opțional din anumite școli partenere — se confirmă la înscriere.' },
  { id: 'masa', label: 'Masă de prânz', description: 'Opțiune separată, contra cost, cu meniu adaptat copiilor.' },
];
