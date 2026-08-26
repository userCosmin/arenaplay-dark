import type { NavItem } from '@/types';

export const mainNavigation: NavItem[] = [
  { label: 'Acasă', href: '/' },
  {
    label: 'Loc de joacă',
    href: '/loc-de-joaca/',
    dot: 'blue',
    children: [
      { label: 'Prezentare', href: '/loc-de-joaca/', description: 'Intră în joc' },
      { label: 'Activități', href: '/loc-de-joaca/activitati/', description: 'XR, VR, simulatoare și mai mult' },
      { label: 'Program & Tarife', href: '/loc-de-joaca/tarife-program/', description: 'Orar și prețuri' },
    ],
  },
  {
    label: 'Petreceri VR',
    href: '/petreceri-vr/',
    dot: 'pink',
    children: [
      { label: 'Prezentare', href: '/petreceri-vr/', description: 'Descoperă experiența de petrecere' },
      { label: 'Pachete & Rezervare', href: '/petreceri-vr/pachete/', description: 'Alege pachetul potrivit' },
    ],
  },
  {
    label: 'Arena VR mobilă',
    href: '/arena-vr-mobila/',
    dot: 'ring',
    children: [
      { label: 'Prezentare', href: '/arena-vr-mobila/', description: 'Aducem experiența la tine' },
      { label: 'Școli', href: '/arena-vr-mobila/scoli/', description: 'Activități educaționale itinerante' },
      { label: 'Evenimente & Festivaluri', href: '/arena-vr-mobila/evenimente/', description: 'Atracție interactivă' },
      { label: 'Petreceri Private', href: '/arena-vr-mobila/petreceri-private/', description: 'La locația ta' },
      { label: 'Solicită Ofertă', href: '/arena-vr-mobila/solicita-oferta/', description: 'Formular de solicitare' },
    ],
  },
  {
    label: 'Afterschool',
    href: '/afterschool/',
    dot: 'white',
    children: [
      { label: 'Prezentare', href: '/afterschool/', description: 'După școală începe următorul nivel' },
      { label: 'Program & Curriculum', href: '/afterschool/program/', description: 'Cum arată o zi la Afterschool' },
      { label: 'Înscrieri', href: '/afterschool/inscrieri/', description: 'Solicită un loc' },
    ],
  },
  { label: 'Despre noi', href: '/despre-noi/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'Acasă', href: '/' },
  { label: 'Loc de joacă', href: '/loc-de-joaca/' },
  { label: 'Petreceri VR', href: '/petreceri-vr/' },
  { label: 'Arena VR mobilă', href: '/arena-vr-mobila/' },
  { label: 'Afterschool', href: '/afterschool/' },
  { label: 'Despre noi', href: '/despre-noi/' },
  { label: 'Contact', href: '/contact/' },
  { label: 'Rezervă acum', href: '/rezerva/' },
];
