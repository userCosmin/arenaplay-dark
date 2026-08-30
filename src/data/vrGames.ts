import type { VRGame } from '@/types';

/**
 * The VR catalogue available at Arena Play.
 *
 * Each entry carries the skills a child actually practises while playing —
 * that is what parents and schools ask about, and it is the difference
 * between a games list and an argument for coming here.
 *
 * `audience` splits the catalogue: everything rated 13+ or 17+ is grouped
 * away from the children's selection rather than mixed into it.
 */
export const vrGames: VRGame[] = [
  {
    id: 'journey-xr',
    name: 'Journey XR',
    category: 'Educațional',
    audience: 'kids',
    minAge: '6+',
    players: '1-8 jucători',
    multiplayer: true,
    featured: true,
    tagline: 'Cinci lumi de explorat, de la sistemul solar la savană.',
    description:
      'Copiii călătoresc prin cinci lumi spectaculoase, întâlnesc animale exotice și rezolvă puzzle-uri folosind doar mâinile, fără telecomenzi. Un ghid virtual îi însoțește în fiecare lume, iar activitățile sunt gândite să fie rezolvate împreună.',
    benefits: [
      'Cunoștințe de astronomie, geografie și biologie, învățate prin explorare directă',
      'Rezolvare de probleme în pași succesivi, cu feedback imediat',
      'Colaborare: multe activități cer ca doi copii să lucreze simultan',
      'Motricitate fină prin hand tracking — mâna liberă, fără controller',
      'Vocabular nou, legat de mediile și animalele întâlnite',
    ],
    schoolFit: 'Se potrivește la științe, geografie și biologie, ca lecție de consolidare sau introducere de temă.',
  },
  {
    id: 'beat-saber',
    name: 'Beat Saber',
    category: 'Ritm & Mișcare',
    audience: 'kids',
    minAge: '10+',
    players: '1 jucător',
    multiplayer: true,
    featured: true,
    tagline: 'Ritm, reflexe și transpirație reală.',
    description:
      'Cuburile vin spre tine pe ritmul muzicii și trebuie tăiate cu sabia potrivită, în direcția potrivită. Simplu de înțeles în zece secunde, greu de stăpânit — de aceea copiii cer mereu încă o rundă.',
    benefits: [
      'Coordonare ochi-mână antrenată intens, cu creștere graduală a dificultății',
      'Activitate fizică reală: brațe, trunchi, genuflexiuni — nu joc stând pe scaun',
      'Lateralitate: fiecare mână are propria sarcină, simultan',
      'Simț ritmic și anticipare temporală',
      'Concentrare susținută pe durata întregii piese',
    ],
    schoolFit: 'Bun pentru educație fizică și pauze active; arată concret legătura dintre ritm și mișcare.',
  },
  {
    id: 'job-simulator',
    name: 'Job Simulator',
    category: 'Simulare & Meserii',
    audience: 'kids',
    minAge: '6+',
    players: '1 jucător',
    multiplayer: false,
    featured: true,
    tagline: 'Bucătar, mecanic, vânzător sau funcționar — pe rând.',
    description:
      'Roboții au preluat munca oamenilor, iar copilul retrăiește cum arătau meseriile. Poate găti, repara mașini sau lucra la birou, într-un registru exagerat și amuzant în care greșelile fac parte din distracție.',
    benefits: [
      'Explorare vocațională: patru meserii încercate din interior, nu descrise',
      'Secvențierea sarcinilor — ce trebuie făcut întâi ca să reușească următorul pas',
      'Joc de rol și asumarea unui rol adult',
      'Manipularea obiectelor cu ambele mâini, ca în viața reală',
      'Toleranță la greșeală: nimic nu se pierde, totul se poate relua',
    ],
    schoolFit: 'Punct de plecare pentru discuții despre meserii și orientare timpurie în carieră.',
  },
  {
    id: 'among-us-vr',
    name: 'Among Us VR',
    category: 'Social & Strategie',
    audience: 'kids',
    minAge: '10+',
    players: '4-10 jucători',
    multiplayer: true,
    featured: true,
    tagline: 'Cine spune adevărul și cine minte?',
    description:
      'Echipajul are sarcini de dus la capăt, dar unul dintre copii este impostorul. Discuțiile, acuzațiile și apărările se poartă cu vocea, față în față, ceea ce face jocul foarte diferit de varianta de pe telefon.',
    benefits: [
      'Argumentare orală: copilul trebuie să convingă un grup, cu dovezi',
      'Deducție logică pornind de la informații incomplete și contradictorii',
      'Înțelegerea perspectivei celuilalt — ce știe el, ce nu știe',
      'Negociere și gestionarea dezacordului fără conflict',
      'Colaborare într-un grup mare, cu roluri diferite',
    ],
    schoolFit: 'Excelent pentru dezvoltarea comunicării și a gândirii critice în grup.',
  },
  {
    id: 'hand-physics-lab',
    name: 'Hand Physics Lab',
    category: 'Educațional',
    audience: 'kids',
    minAge: '6+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Un laborator care se conduce cu degetele.',
    description:
      'Fără controllere: copilul folosește propriile mâini, urmărite în timp real, pentru a construi, împinge, echilibra și experimenta. Zeci de provocări mici, fiecare cu o soluție de descoperit.',
    benefits: [
      'Motricitate fină și control al degetelor, exersate deliberat',
      'Intuiție pentru fizică: greutate, echilibru, pârghie, cauză și efect',
      'Gândire logică prin încercare și ajustare',
      'Răbdare și perseverență în sarcini care nu reușesc din prima',
    ],
    schoolFit: 'Ilustrează concret noțiuni de fizică elementară — echilibru, forță, gravitație.',
  },
  {
    id: 'cubism',
    name: 'Cubism',
    category: 'Puzzle & Logică',
    audience: 'kids',
    minAge: '6+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Geometrie 3D pe care o ții efectiv în mână.',
    description:
      'Piese colorate care trebuie potrivite într-o formă dată. Curat, liniștit, fără cronometru și fără presiune — dificultatea crește lent, iar satisfacția rezolvării este imediată.',
    benefits: [
      'Raționament spațial și rotație mentală a formelor — abilitate direct legată de matematică',
      'Înțelegerea volumelor și a geometriei în trei dimensiuni',
      'Planificare: copilul învață să anticipeze unde va încăpea piesa următoare',
      'Concentrare calmă, utilă ca echilibru după jocurile dinamice',
    ],
    schoolFit: 'Sprijină direct geometria în spațiu și vizualizarea formelor tridimensionale.',
  },
  {
    id: 'elven-assassin',
    name: 'Elven Assassin',
    category: 'Acțiune & Cooperare',
    audience: 'kids',
    minAge: '10+',
    players: '1-4 jucători',
    multiplayer: true,
    tagline: 'Arc, săgeți și apărarea regatului, în echipă.',
    description:
      'Copilul devine arcaș și apără cetatea de valuri de inamici fantastici. Se poate juca împreună cu prietenii, împărțind pozițiile de apărare între ei.',
    benefits: [
      'Precizie și coordonare: fiecare săgeată cere ochire și dozarea tensiunii în arc',
      'Anticiparea traiectoriei — fizică intuitivă aplicată, nu teoretică',
      'Repartizarea rolurilor în echipă și acoperirea reciprocă',
      'Mișcare amplă a brațelor și a trunchiului',
    ],
    schoolFit: 'Util pentru lucrul în echipă și pentru înțelegerea traiectoriei unui proiectil.',
  },
  {
    id: 'vacation-simulator',
    name: 'Vacation Simulator',
    category: 'Simulare & Creativitate',
    audience: 'kids',
    minAge: '6+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Plajă, munte și tropice, fără să pleci din Alba Iulia.',
    description:
      'O vacanță de explorat în ritmul propriu: snorkeling, castele de nisip, fotografii amuzante cu roboți. Nu există sarcini obligatorii, doar lucruri de descoperit.',
    benefits: [
      'Joc liber și creativitate, fără obiectiv impus',
      'Explorare autonomă și luarea propriilor decizii',
      'Interacțiune socială simulată, într-un cadru fără miză',
      'Alternativă blândă pentru copiii mai timizi sau la prima experiență VR',
    ],
    schoolFit: 'Bun ca primă experiență VR, pentru acomodare fără presiune.',
  },
  {
    id: 'powerwash-simulator',
    name: 'PowerWash Simulator VR',
    category: 'Simulare & Relaxare',
    audience: 'kids',
    minAge: '6+',
    players: '1 jucător',
    multiplayer: true,
    tagline: 'Joacă cu apa, dar fără să uzi pe nimeni.',
    description:
      'Un jet de apă puternic și suprafețe de curățat: case, mașini, parcuri. Murdăria dispare vizibil sub jet, iar rezultatul se vede la fiecare mișcare.',
    benefits: [
      'Atenție la detaliu și lucru sistematic, suprafață cu suprafață',
      'Satisfacția sarcinii duse până la capăt, vizibilă în timp real',
      'Planificarea ordinii de lucru pentru a nu relua ce e deja curat',
      'Efect calmant — potrivit pentru copii agitați sau la final de sesiune',
    ],
    schoolFit: 'Exersează perseverența și metoda de lucru ordonată.',
  },
  {
    id: 'iron-man-vr',
    name: 'Iron Man VR',
    category: 'Acțiune & Super-eroi',
    audience: 'kids',
    minAge: '10+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Zbori cu propriile palme, ca în filme.',
    description:
      'Armura lui Tony Stark se conduce cu ambele mâini: direcția de zbor, viteza și blasterele depind de poziția reală a brațelor. Unul dintre cele mai spectaculoase titluri pentru un copil la prima experiență.',
    benefits: [
      'Orientare spațială în trei dimensiuni, inclusiv pe verticală',
      'Control motor fin: mâinile comandă simultan zborul și țintirea',
      'Reacție rapidă la stimuli care vin din direcții diferite',
      'Încredere în sine — senzația de reușită este imediată și puternică',
    ],
    schoolFit: 'Demonstrație de impact pentru prezentări și evenimente școlare.',
  },
  {
    id: 'star-wars-vader-immortal',
    name: 'Star Wars: Vader Immortal',
    category: 'Aventură narativă',
    audience: 'kids',
    minAge: '10+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Sabie laser, Forța și trei episoade de poveste.',
    description:
      'O aventură cu fir narativ, în care copilul învață să mânuiască sabia laser și parcurge trei episoade legate între ele. Antrenamentul cu sabia este partea preferată aproape de fiecare dată.',
    benefits: [
      'Urmărirea unei povești pe durată lungă, cu personaje și consecințe',
      'Coordonare și timing în duelurile cu sabia',
      'Imaginație și implicare într-o lume ficțională cunoscută',
    ],
    schoolFit: 'Poate deschide discuții despre structura poveștii și despre personaje.',
  },
  {
    id: 'arena-shooter',
    name: 'Arena Shooter',
    category: 'Acțiune & Mișcare',
    audience: 'kids',
    minAge: '10+',
    players: 'Multiplayer',
    multiplayer: true,
    tagline: 'Confruntare în echipă, în arena delimitată.',
    description:
      'Joc de arenă în care copiii se deplasează fizic prin spațiul de joc și colaborează pentru a câștiga. Se joacă în grup, cu roluri împărțite.',
    benefits: [
      'Deplasare fizică reală prin spațiul arenei',
      'Coordonare în echipă și comunicare rapidă',
      'Reflexe și conștientizarea poziției proprii în spațiu',
    ],
    schoolFit: 'Activitate de grup, potrivită pentru coeziunea clasei.',
  },
  {
    id: 'assassins-creed',
    name: "Assassin's Creed Nexus VR",
    category: 'Aventură & Explorare',
    audience: 'kids',
    minAge: '13+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Cățărare, echilibru și orașe istorice.',
    description:
      'Explorare în orașe reconstituite istoric, cu cățărare, sărituri și deplasare pe verticală. Necesită mișcare amplă și un bun simț al echilibrului.',
    benefits: [
      'Orientare spațială complexă, inclusiv pe verticală',
      'Contact cu perioade și arhitectură istorică reconstituită',
      'Planificarea traseului înainte de a acționa',
    ],
    schoolFit: 'Poate însoți lecții de istorie prin reconstituirile de epocă.',
  },

  /* --- Titluri pentru adolescenți și adulți --- */
  {
    id: 'red-matter-2',
    name: 'Red Matter 2',
    category: 'Puzzle & Sci-fi',
    audience: 'teen',
    minAge: '13+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Mister science-fiction pe planete îndepărtate.',
    description:
      'Explorare și puzzle-uri complexe într-un decor science-fiction atent construit. Ritm lent, cerebral, cu gadgeturi de manipulat și secrete de descoperit.',
    benefits: [
      'Rezolvare de probleme complexe, pe mai mulți pași',
      'Atenție la detalii și memorie de lucru',
      'Răbdare și metodă — puzzle-urile nu se rezolvă din reflex',
    ],
    schoolFit: 'Potrivit pentru elevi de gimnaziu și liceu, la activități de logică.',
  },
  {
    id: 'arizona-sunshine-2',
    name: 'Arizona Sunshine 2',
    category: 'Acțiune & Supraviețuire',
    audience: 'adult',
    minAge: '17+',
    players: '1-2 jucători',
    multiplayer: true,
    tagline: 'Supraviețuire în deșert. Doar pentru adulți.',
    description:
      'Joc de acțiune și supraviețuire cu tematică horror, jucabil și în cooperare. Conține violență și momente de tensiune ridicată.',
    benefits: [
      'Reacție rapidă sub presiune',
      'Gestionarea resurselor și a inventarului',
      'Cooperare în doi, în situații de tensiune',
    ],
    schoolFit: null,
  },
  {
    id: 'walking-dead-saints-sinners',
    name: 'The Walking Dead: Saints & Sinners',
    category: 'Acțiune & Supraviețuire',
    audience: 'adult',
    minAge: '17+',
    players: '1 jucător',
    multiplayer: false,
    tagline: 'Supraviețuire cu decizii dificile. Doar pentru adulți.',
    description:
      'Aventură de supraviețuire cu tematică horror, în care fiecare alegere are consecințe. Conține violență realistă și momente intense.',
    benefits: [
      'Decizii cu consecințe pe termen lung',
      'Gestionarea resurselor limitate',
      'Planificare tactică înainte de acțiune',
    ],
    schoolFit: null,
  },
];

export const kidsGames = vrGames.filter((game) => game.audience === 'kids');
export const teenAdultGames = vrGames.filter((game) => game.audience !== 'kids');
