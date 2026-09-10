#!/usr/bin/env node
/**
 * Build-time static prerenderer.
 *
 * This project is a client-rendered React SPA. Modern search engines (Google, Bing)
 * execute JavaScript and can index it fine, but most AI/LLM crawlers used for GEO
 * (GPTBot, ClaudeBot, PerplexityBot, CCBot, etc.) fetch raw HTML WITHOUT running JS.
 * Without this step, every route would serve the same empty `<div id="root"></div>`
 * shell, so AI answer engines and non-JS crawlers would see no real content at all.
 *
 * This script runs after `vite build` (see package.json "postbuild") and, for every
 * route, writes a self-contained `dist/<route>/index.html` that already contains:
 *   - the correct <title>, meta description, canonical URL, Open Graph/Twitter tags
 *   - JSON-LD (LocalBusiness / BreadcrumbList / FAQPage where relevant)
 *   - real semantic HTML (H1, headings, paragraphs, FAQ text) inside #root
 *   - the same hashed <script>/<link> tags Vite generated, so the full interactive
 *     React app still hydrates on top for real visitors (it fully replaces this
 *     content the instant JS runs — this HTML only matters for the pre-JS instant
 *     and for crawlers that never run JS at all).
 *
 * IMPORTANT: keep the copy below in sync with the source of truth in src/data/*.ts
 * and src/config/site.config.ts if that content changes.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const siteUrl = 'https://www.arenaplay.ro';

const site = {
  name: 'Arena Play',
  legalName: 'Arena Play SRL',
  phone: '+40737105105',
  phoneDisplay: '0737 105 105',
  email: 'contact@arenaplay.ro',
  address: {
    streetAddress: 'Str. Tudor Vladimirescu nr. 50A',
    locality: 'Alba Iulia',
    region: 'Alba',
    postalCode: '510167',
    country: 'RO',
  },
  geo: { latitude: 46.0697, longitude: 23.5701 },
  social: ['https://www.facebook.com/arenaplay.albaiulia', 'https://www.instagram.com/arenaplayclubalbaiulia/'],
};

function esc(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLdScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    legalName: site.legalName,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    sameAs: site.social,
  };
}

function breadcrumbSchema(entries) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Acasă', href: '/' }, ...entries].map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.label,
      item: `${siteUrl}${e.href}`,
    })),
  };
}

function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

function breadcrumbHtml(entries) {
  const all = [{ label: 'Acasă', href: '/' }, ...entries];
  const items = all
    .map((e, i) => (i === all.length - 1 ? `<span aria-current="page">${esc(e.label)}</span>` : `<a href="${e.href}">${esc(e.label)}</a>`))
    .join(' &rsaquo; ');
  return `<nav aria-label="breadcrumb">${items}</nav>`;
}

function section(h2, html) {
  return `<section><h2>${esc(h2)}</h2>${html}</section>`;
}

function faqHtml(items) {
  return `<dl>${items.map((i) => `<dt>${esc(i.q)}</dt><dd>${esc(i.a)}</dd>`).join('')}</dl>`;
}

function linkList(items) {
  return `<ul>${items.map((i) => `<li><a href="${i.href}">${esc(i.label)}</a>${i.desc ? ' — ' + esc(i.desc) : ''}</li>`).join('')}</ul>`;
}

// ---------------------------------------------------------------------------
// Route content — mirrors the copy actually rendered by each React page.
// ---------------------------------------------------------------------------

const generalFaq = [
  { q: 'Cu cât timp înainte trebuie să rezerv o petrecere?', a: 'Recomandăm rezervarea cu minimum 2 săptămâni înainte, mai ales pentru weekenduri, deoarece locurile sunt limitate.' },
  { q: 'Rezervarea online este confirmată automat?', a: 'Nu. După completarea formularului, echipa noastră te contactează telefonic sau prin WhatsApp pentru a confirma disponibilitatea și detaliile.' },
  { q: 'Pot vizita locația înainte de a rezerva?', a: 'Da, te așteptăm oricând în programul de funcționare sau poți programa o vizită prin telefon sau WhatsApp.' },
];

const routes = [
  {
    path: '/',
    title: 'Arena Play — Petreceri, Loc de joacă, Afterschool & Arena VR mobilă',
    description: 'Distracție, experiențe și educație într-un singur loc: petreceri pentru copii, loc de joacă cu XR/VR, afterschool și Arena VR mobilă adusă la tine.',
    jsonLd: [localBusinessSchema(), faqSchema(generalFaq)],
    body: `
      <h1>JOACĂ. DISTRACȚIE. EDUCAȚIE.</h1>
      <p>Loc de joacă • Petreceri VR • Arena VR mobilă • Afterschool</p>
      <p>Arena Play este locul unde distracția întâlnește educația: petreceri pentru copii, loc de joacă cu tehnologie XR/VR, afterschool și Arena VR mobilă — experiența Arena Play adusă la tine.</p>
      <p>Echipamente VR &amp; XR de ultimă generație · Maximum 6 persoane simultan în arenă · O sesiune de joc durează 20 de minute · 4 servicii sub același acoperiș.</p>
      ${section('Alege experiența Arena Play', linkList([
        { href: '/loc-de-joaca/', label: 'Loc de joacă Arena Play', desc: 'Intră în joc.' },
        { href: '/petreceri-vr/', label: 'Petreceri VR', desc: 'Tu aduci invitații. Noi pregătim experiența.' },
        { href: '/arena-vr-mobila/', label: 'Arena VR mobilă', desc: 'Noi aducem experiența la tine.' },
        { href: '/afterschool/', label: 'Arena Play Afterschool', desc: 'După școală începe următorul nivel.' },
      ]))}
      ${section('Locație & Program', `<p>${esc(site.address.streetAddress)}, ${esc(site.address.locality)}, ${esc(site.address.postalCode)}, România</p><p>Telefon: ${esc(site.phoneDisplay)}</p><p>Sâmbătă – Duminică: 13:30 – 21:30 · Luni – Vineri: doar cu rezervare</p>`)}
      ${section('Întrebări frecvente', faqHtml(generalFaq))}
    `,
  },
  {
    path: '/petreceri-vr/',
    title: 'Petreceri pentru copii | Arena Play',
    description: 'Tu aduci invitații, noi pregătim experiența. Petreceri tematice pentru copii, cu spațiu privat, animație și pachete complete la Arena Play.',
    breadcrumb: [{ label: 'Petreceri VR', href: '/petreceri-vr/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Petreceri VR', href: '/petreceri-vr/' }]), faqSchema(generalFaq)],
    body: `
      <h1>PETRECERI PENTRU COPII</h1>
      <p>Tu aduci invitații. Noi pregătim experiența.</p>
      ${section('Ce primești', linkList([
        { href: '#', label: 'Spațiu privat', desc: 'O zonă dedicată doar petrecerii voastre, decorată tematic.' },
        { href: '#', label: 'Activități incluse', desc: 'Acces la jocuri, Loc de joacă și animație pentru toți invitații.' },
        { href: '#', label: 'Animator dedicat', desc: 'Un animator profesionist se ocupă de distracția copiilor.' },
        { href: '#', label: 'Fără griji', desc: 'Ne ocupăm de organizare — tu te bucuri de eveniment alături de copil.' },
      ]))}
      ${section('Cum funcționează', linkList([
        { href: '#', label: '1. Alegi data', desc: 'Trimiți o solicitare cu data dorită pentru petrecere.' },
        { href: '#', label: '2. Alegi pachetul', desc: 'Selectezi pachetul potrivit numărului de copii și bugetului.' },
        { href: '#', label: '3. Confirmăm', desc: 'Echipa noastră te contactează pentru a confirma toate detaliile.' },
      ]))}
      ${section('Pachete', linkList([{ href: '/petreceri-vr/pachete/', label: 'Vezi pachete și rezervă', desc: 'Basic, Plus și Premium — preț, durată și ce este inclus' }]))}
    `,
  },
  {
    path: '/petreceri-vr/pachete/',
    title: 'Pachete Petreceri & Rezervare | Arena Play',
    description: 'Pachet petrecere Arena Play: 100 lei/copil, minim 6 copii, 3 ore, acces exclusiv la toate echipamentele. Rezervă direct online.',
    breadcrumb: [{ label: 'Petreceri VR', href: '/petreceri-vr/' }, { label: 'Pachete & Rezervare', href: '/petreceri-vr/pachete/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Petreceri VR', href: '/petreceri-vr/' }, { label: 'Pachete & Rezervare', href: '/petreceri-vr/pachete/' }])],
    body: `
      <h1>Alege pachetul potrivit</h1>
      <p>Un singur pachet, fără complicații — 100 lei/copil, minim 6 copii.</p>
      ${section('Pachet disponibil', `
        <article><h3>Pachetul 1 — 100 lei / copil</h3><p>3 ore, minim 6 copii. Include: acces exclusiv la toate echipamentele, spațiu privat rezervat, apă plată inclusă, 10% reducere la Pizza și Fast Food Antik.</p></article>
      `)}
      ${section('Ore de începere disponibile', `
        <ul><li>11:30 – 14:30</li><li>15:00 – 18:00</li><li>18:30 – 21:30</li></ul>
      `)}
    `,
  },
  {
    path: '/loc-de-joaca/',
    title: 'Loc de joacă Arena Play | Arena Play',
    description: 'XR, VR, simulatoare auto și de zbor, PlayStation și multe altele. Descoperă Locul de joacă Arena Play — program, tarife și rezervare.',
    breadcrumb: [{ label: 'Loc de joacă', href: '/loc-de-joaca/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Loc de joacă', href: '/loc-de-joaca/' }])],
    body: `
      <h1>LOC DE JOACĂ ARENA PLAY</h1>
      <p>Intră în joc.</p>
      ${section('8 activități, un singur loc', linkList([
        { href: '/loc-de-joaca/activitati/#vr-dinamic-journey', label: 'VR Dinamic — Journey', desc: 'Excursii în sistemul solar, junglă și savană; copiii învață interactiv.' },
        { href: '/loc-de-joaca/activitati/#vr-dinamic-lasertag', label: 'VR Dinamic — Lasertag', desc: 'Joc în echipă: copiii fac mișcare, se ajută și colaborează.' },
        { href: '/loc-de-joaca/activitati/#vr-static-job-simulator', label: 'VR Static — Job Simulator', desc: 'Jocuri recreativ-educative în care copiii experimentează meserii.' },
        { href: '/loc-de-joaca/activitati/#vr-static-beat-saber', label: 'VR Static — Beat Saber', desc: 'Coordonare mână-picior prin mișcare și dans pe ritm.' },
        { href: '/loc-de-joaca/activitati/#simulator-auto', label: 'Simulator Profesional Auto', desc: 'Dezvoltă abilitățile necesare pentru obținerea permisului auto.' },
        { href: '/loc-de-joaca/activitati/#simulator-zbor', label: 'Simulator Profesional de Zbor', desc: 'Testează aptitudinile pentru o carieră de pilot.' },
        { href: '/loc-de-joaca/activitati/#playstation', label: 'Zonă PlayStation', desc: 'Console de ultimă generație și o selecție variată de jocuri.' },
        { href: '/loc-de-joaca/activitati/#extra', label: 'Activități Extra', desc: 'Jocuri de societate, șah, zonă de creativitate.' },
      ]))}
      ${section('Program', `<p>Sâmbătă – Duminică: 13:30 – 21:30 (fără rezervare) · Luni – Vineri: doar cu rezervare</p>`)}
      ${section('Program & Tarife', linkList([{ href: '/loc-de-joaca/tarife-program/', label: 'Vezi programul complet și tarifele' }]))}
    `,
  },
  {
    path: '/loc-de-joaca/activitati/',
    title: 'Activități Loc de joacă — VR Dinamic, VR Static, Simulatoare | Arena Play',
    description: 'Toate activitățile din Locul de joacă Arena Play: VR Dinamic (Journey, Lasertag), VR Static (Job Simulator, Beat Saber), simulator auto și de zbor, PlayStation.',
    breadcrumb: [{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Activități', href: '/loc-de-joaca/activitati/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Activități', href: '/loc-de-joaca/activitati/' }])],
    body: `
      <h1>Activitățile Locului de joacă</h1>
      <p>Fiecare activitate este aleasă atât pentru distracție, cât și pentru ce exersează copilul. În arenă au acces maximum 6 persoane simultan.</p>
      ${section('Detalii activități', `
        <article id="vr-dinamic-journey"><h3>VR Dinamic — Journey</h3><p>Excursii în sistemul solar, în junglă și în savană. Copiii explorează și învață interactiv, ghidați prin fiecare mediu. Vârstă: 6+. Până la 6 jucători. Durată: 20 min/sesiune.</p></article>
        <article id="vr-dinamic-lasertag"><h3>VR Dinamic — Lasertag</h3><p>Joc în echipă care îi ține în mișcare: copiii se coordonează, se ajută între ei și colaborează pentru a câștiga. Vârstă: 7+. Până la 6 jucători. Durată: 20 min/sesiune.</p></article>
        <article id="vr-static-job-simulator"><h3>VR Static — Job Simulator</h3><p>Jocuri recreativ-educative în care copiii experimentează meserii și rezolvă sarcini practice, pas cu pas. Vârstă: 6+. Jucători: 1-2. Durată: 15 min/sesiune.</p></article>
        <article id="vr-static-beat-saber"><h3>VR Static — Beat Saber</h3><p>Prin mișcare și dans pe ritm, copiii își dezvoltă coordonarea mână-picior și simțul ritmului. Vârstă: 6+. Durată: 15 min/sesiune.</p></article>
        <article id="simulator-auto"><h3>Simulator Profesional Auto</h3><p>Dezvoltă abilitățile necesare pentru obținerea permisului auto, într-un mediu sigur și controlat. Vârstă: 7+. Durată: 10 min/sesiune.</p></article>
        <article id="simulator-zbor"><h3>Simulator Profesional de Zbor</h3><p>Cabină de pilotaj realistă prin care se poate testa dacă există aptitudini pentru o carieră de pilot. Vârstă: 8+. Durată: 10-15 min/sesiune.</p></article>
        <article id="playstation"><h3>Zonă PlayStation</h3><p>Console de ultimă generație, canapele confortabile și o selecție variată de jocuri. Acces liber, 1-4 jucători.</p></article>
        <article id="extra"><h3>Activități Extra</h3><p>Jocuri de societate, șah, zonă de creativitate și alte activități rotative. Acces liber.</p></article>
      `)}
    `,
  },
  {
    path: '/loc-de-joaca/jocuri/',
    title: 'Jocuri VR pentru copii — catalog complet | Arena Play',
    description: 'Toate experiențele VR de la Arena Play Alba Iulia, cu vârsta recomandată și abilitățile pe care le dezvoltă fiecare: Journey XR, Beat Saber, Job Simulator, Among Us VR și altele.',
    breadcrumb: [{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Jocuri VR', href: '/loc-de-joaca/jocuri/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Jocuri VR', href: '/loc-de-joaca/jocuri/' }])],
    body: `
      <h1>JOCURILE NOASTRE VR</h1>
      <p>Fiecare titlu este ales pentru ce învață copilul din el, nu doar pentru cât e de spectaculos. În arenă au acces maximum 6 persoane simultan, iar o sesiune de joc durează 20 de minute.</p>
      ${section('De ce contează unde se joacă', `<p>Aceleași jocuri, acasă, înseamnă un copil singur într-o cameră. La Arena Play înseamnă spațiu de mișcare delimitat, sesiuni de 20 de minute, maximum 6 persoane în arenă și un coleg lângă tine cu care vorbești direct.</p>`)}
      ${section('Selecția pentru copii', `
        <article id="journey-xr"><h3>Journey XR (6+)</h3><p>Copiii călătoresc prin cinci lumi spectaculoase, întâlnesc animale exotice și rezolvă puzzle-uri folosind doar mâinile, fără telecomenzi. Un ghid virtual îi însoțește în fiecare lume, iar activitățile sunt gândite să fie rezolvate împreună.</p><p>Categorie: Educațional. Jucători: 1-8 jucători.</p><p>Ce exersează copilul:</p><ul><li>Cunoștințe de astronomie, geografie și biologie, învățate prin explorare directă</li><li>Rezolvare de probleme în pași succesivi, cu feedback imediat</li><li>Colaborare: multe activități cer ca doi copii să lucreze simultan</li><li>Motricitate fină prin hand tracking — mâna liberă, fără controller</li><li>Vocabular nou, legat de mediile și animalele întâlnite</li></ul></article>
        <article id="beat-saber"><h3>Beat Saber (10+)</h3><p>Cuburile vin spre tine pe ritmul muzicii și trebuie tăiate cu sabia potrivită, în direcția potrivită. Simplu de înțeles în zece secunde, greu de stăpânit — de aceea copiii cer mereu încă o rundă.</p><p>Categorie: Ritm &amp; Mișcare. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Coordonare ochi-mână antrenată intens, cu creștere graduală a dificultății</li><li>Activitate fizică reală: brațe, trunchi, genuflexiuni — nu joc stând pe scaun</li><li>Lateralitate: fiecare mână are propria sarcină, simultan</li><li>Simț ritmic și anticipare temporală</li><li>Concentrare susținută pe durata întregii piese</li></ul></article>
        <article id="job-simulator"><h3>Job Simulator (6+)</h3><p>Roboții au preluat munca oamenilor, iar copilul retrăiește cum arătau meseriile. Poate găti, repara mașini sau lucra la birou, într-un registru exagerat și amuzant în care greșelile fac parte din distracție.</p><p>Categorie: Simulare &amp; Meserii. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Explorare vocațională: patru meserii încercate din interior, nu descrise</li><li>Secvențierea sarcinilor — ce trebuie făcut întâi ca să reușească următorul pas</li><li>Joc de rol și asumarea unui rol adult</li><li>Manipularea obiectelor cu ambele mâini, ca în viața reală</li><li>Toleranță la greșeală: nimic nu se pierde, totul se poate relua</li></ul></article>
        <article id="among-us-vr"><h3>Among Us VR (10+)</h3><p>Echipajul are sarcini de dus la capăt, dar unul dintre copii este impostorul. Discuțiile, acuzațiile și apărările se poartă cu vocea, față în față, ceea ce face jocul foarte diferit de varianta de pe telefon.</p><p>Categorie: Social &amp; Strategie. Jucători: 4-10 jucători.</p><p>Ce exersează copilul:</p><ul><li>Argumentare orală: copilul trebuie să convingă un grup, cu dovezi</li><li>Deducție logică pornind de la informații incomplete și contradictorii</li><li>Înțelegerea perspectivei celuilalt — ce știe el, ce nu știe</li><li>Negociere și gestionarea dezacordului fără conflict</li><li>Colaborare într-un grup mare, cu roluri diferite</li></ul></article>
        <article id="hand-physics-lab"><h3>Hand Physics Lab (6+)</h3><p>Fără controllere: copilul folosește propriile mâini, urmărite în timp real, pentru a construi, împinge, echilibra și experimenta. Zeci de provocări mici, fiecare cu o soluție de descoperit.</p><p>Categorie: Educațional. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Motricitate fină și control al degetelor, exersate deliberat</li><li>Intuiție pentru fizică: greutate, echilibru, pârghie, cauză și efect</li><li>Gândire logică prin încercare și ajustare</li><li>Răbdare și perseverență în sarcini care nu reușesc din prima</li></ul></article>
        <article id="cubism"><h3>Cubism (6+)</h3><p>Piese colorate care trebuie potrivite într-o formă dată. Curat, liniștit, fără cronometru și fără presiune — dificultatea crește lent, iar satisfacția rezolvării este imediată.</p><p>Categorie: Puzzle &amp; Logică. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Raționament spațial și rotație mentală a formelor — abilitate direct legată de matematică</li><li>Înțelegerea volumelor și a geometriei în trei dimensiuni</li><li>Planificare: copilul învață să anticipeze unde va încăpea piesa următoare</li><li>Concentrare calmă, utilă ca echilibru după jocurile dinamice</li></ul></article>
        <article id="elven-assassin"><h3>Elven Assassin (10+)</h3><p>Copilul devine arcaș și apără cetatea de valuri de inamici fantastici. Se poate juca împreună cu prietenii, împărțind pozițiile de apărare între ei.</p><p>Categorie: Acțiune &amp; Cooperare. Jucători: 1-4 jucători.</p><p>Ce exersează copilul:</p><ul><li>Precizie și coordonare: fiecare săgeată cere ochire și dozarea tensiunii în arc</li><li>Anticiparea traiectoriei — fizică intuitivă aplicată, nu teoretică</li><li>Repartizarea rolurilor în echipă și acoperirea reciprocă</li><li>Mișcare amplă a brațelor și a trunchiului</li></ul></article>
        <article id="vacation-simulator"><h3>Vacation Simulator (6+)</h3><p>O vacanță de explorat în ritmul propriu: snorkeling, castele de nisip, fotografii amuzante cu roboți. Nu există sarcini obligatorii, doar lucruri de descoperit.</p><p>Categorie: Simulare &amp; Creativitate. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Joc liber și creativitate, fără obiectiv impus</li><li>Explorare autonomă și luarea propriilor decizii</li><li>Interacțiune socială simulată, într-un cadru fără miză</li><li>Alternativă blândă pentru copiii mai timizi sau la prima experiență VR</li></ul></article>
        <article id="powerwash-simulator"><h3>PowerWash Simulator VR (6+)</h3><p>Un jet de apă puternic și suprafețe de curățat: case, mașini, parcuri. Murdăria dispare vizibil sub jet, iar rezultatul se vede la fiecare mișcare.</p><p>Categorie: Simulare &amp; Relaxare. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Atenție la detaliu și lucru sistematic, suprafață cu suprafață</li><li>Satisfacția sarcinii duse până la capăt, vizibilă în timp real</li><li>Planificarea ordinii de lucru pentru a nu relua ce e deja curat</li><li>Efect calmant — potrivit pentru copii agitați sau la final de sesiune</li></ul></article>
        <article id="iron-man-vr"><h3>Iron Man VR (10+)</h3><p>Armura lui Tony Stark se conduce cu ambele mâini: direcția de zbor, viteza și blasterele depind de poziția reală a brațelor. Unul dintre cele mai spectaculoase titluri pentru un copil la prima experiență.</p><p>Categorie: Acțiune &amp; Super-eroi. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Orientare spațială în trei dimensiuni, inclusiv pe verticală</li><li>Control motor fin: mâinile comandă simultan zborul și țintirea</li><li>Reacție rapidă la stimuli care vin din direcții diferite</li><li>Încredere în sine — senzația de reușită este imediată și puternică</li></ul></article>
        <article id="star-wars-vader-immortal"><h3>Star Wars: Vader Immortal (10+)</h3><p>O aventură cu fir narativ, în care copilul învață să mânuiască sabia laser și parcurge trei episoade legate între ele. Antrenamentul cu sabia este partea preferată aproape de fiecare dată.</p><p>Categorie: Aventură narativă. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Urmărirea unei povești pe durată lungă, cu personaje și consecințe</li><li>Coordonare și timing în duelurile cu sabia</li><li>Imaginație și implicare într-o lume ficțională cunoscută</li></ul></article>
        <article id="arena-shooter"><h3>Arena Shooter (10+)</h3><p>Joc de arenă în care copiii se deplasează fizic prin spațiul de joc și colaborează pentru a câștiga. Se joacă în grup, cu roluri împărțite.</p><p>Categorie: Acțiune &amp; Mișcare. Jucători: Multiplayer.</p><p>Ce exersează copilul:</p><ul><li>Deplasare fizică reală prin spațiul arenei</li><li>Coordonare în echipă și comunicare rapidă</li><li>Reflexe și conștientizarea poziției proprii în spațiu</li></ul></article>
        <article id="assassins-creed"><h3>Assassin's Creed Nexus VR (13+)</h3><p>Explorare în orașe reconstituite istoric, cu cățărare, sărituri și deplasare pe verticală. Necesită mișcare amplă și un bun simț al echilibrului.</p><p>Categorie: Aventură &amp; Explorare. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Orientare spațială complexă, inclusiv pe verticală</li><li>Contact cu perioade și arhitectură istorică reconstituită</li><li>Planificarea traseului înainte de a acționa</li></ul></article>
      `)}
      ${section('Titluri cu restricție de vârstă (doar adolescenți și adulți)', `
        <p>Aceste experiențe nu sunt incluse în petrecerile pentru copii și nu se rulează la programele de afterschool. Sunt disponibile la cerere, pentru grupuri care îndeplinesc vârsta minimă.</p>
        <article id="red-matter-2"><h3>Red Matter 2 (13+)</h3><p>Explorare și puzzle-uri complexe într-un decor science-fiction atent construit. Ritm lent, cerebral, cu gadgeturi de manipulat și secrete de descoperit.</p><p>Categorie: Puzzle &amp; Sci-fi. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Rezolvare de probleme complexe, pe mai mulți pași</li><li>Atenție la detalii și memorie de lucru</li><li>Răbdare și metodă — puzzle-urile nu se rezolvă din reflex</li></ul></article>
        <article id="arizona-sunshine-2"><h3>Arizona Sunshine 2 (17+)</h3><p>Joc de acțiune și supraviețuire cu tematică horror, jucabil și în cooperare. Conține violență și momente de tensiune ridicată.</p><p>Categorie: Acțiune &amp; Supraviețuire. Jucători: 1-2 jucători.</p><p>Ce exersează copilul:</p><ul><li>Reacție rapidă sub presiune</li><li>Gestionarea resurselor și a inventarului</li><li>Cooperare în doi, în situații de tensiune</li></ul></article>
        <article id="walking-dead-saints-sinners"><h3>The Walking Dead: Saints &amp; Sinners (17+)</h3><p>Aventură de supraviețuire cu tematică horror, în care fiecare alegere are consecințe. Conține violență realistă și momente intense.</p><p>Categorie: Acțiune &amp; Supraviețuire. Jucători: 1 jucător.</p><p>Ce exersează copilul:</p><ul><li>Decizii cu consecințe pe termen lung</li><li>Gestionarea resurselor limitate</li><li>Planificare tactică înainte de acțiune</li></ul></article>
      `)}
    `,
  },
  {
    path: '/loc-de-joaca/tarife-program/',
    title: 'Program & Tarife Loc de joacă | Arena Play',
    description: 'Programul complet al Locului de joacă Arena Play: weekend 30 lei/sesiune (20 min), 2+1 gratuit, sau acces exclusiv în timpul săptămânii cu rezervare.',
    breadcrumb: [{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Program & Tarife', href: '/loc-de-joaca/tarife-program/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Loc de joacă', href: '/loc-de-joaca/' }, { label: 'Program & Tarife', href: '/loc-de-joaca/tarife-program/' }])],
    body: `
      <h1>Program, tarife și oferte</h1>
      ${section('Program', `<p>Sâmbătă – Duminică: 13:30 – 21:30 · Luni – Vineri: doar cu rezervare</p>`)}
      ${section('Tarife — Weekend (acces liber, fără rezervare)', `
        <ul>
          <li>Bilet acces — 30 lei / sesiune (o sesiune de joc durează 20 de minute)</li>
        </ul>
      `)}
      ${section('Tarife — În timpul săptămânii (doar cu rezervare, acces exclusiv la toate echipamentele)', `
        <ul>
          <li>Petrecere — Pachetul 1 — 100 lei / copil (minim 6 copii, 3 ore, acces exclusiv la toate echipamentele)</li>
          <li>Loc de joacă — acces privat — 100 lei / copil (minim 6 copii, 3 ore, acces exclusiv la toate echipamentele)</li>
        </ul>
      `)}
      ${section('Oferte active', `
        <p><strong>2 bilete cumpărate, al 3-lea gratuit:</strong> la achiziționarea a minimum 2 bilete de acces, al treilea bilet este gratuit. Valabil sâmbătă și duminică, 13:30–21:30, la achiziția pe loc.</p>
      `)}
    `,
  },
  {
    path: '/afterschool/',
    title: 'Arena Play Afterschool — Clasele I–IV | Arena Play',
    description: 'Program Afterschool pentru clasele I–IV, luni-vineri 12:00–18:00: teme, engleză, programare și activități recreative, într-un mediu luminos și sigur.',
    breadcrumb: [{ label: 'Afterschool', href: '/afterschool/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Afterschool', href: '/afterschool/' }])],
    body: `
      <h1>ARENA PLAY AFTERSCHOOL</h1>
      <p>După școală începe următorul nivel.</p>
      <p>Clasele I–IV. Program zilnic 12:00 – 18:00, luni – vineri. Tarife — detalii la cerere.</p>
      ${section('Patru piloni ai programului', linkList([
        { href: '#', label: 'Teme & Organizare', desc: 'Timp dedicat, supravegheat, pentru teme și organizare.' },
        { href: '#', label: 'Engleză', desc: 'Sesiuni săptămânale de engleză conversațională.' },
        { href: '#', label: 'Programare', desc: 'Gândire computațională prin joc și proiecte.' },
        { href: '#', label: 'Activități recreative', desc: 'Joc liber, sport ușor și activități creative.' },
      ]))}
    `,
  },
  {
    path: '/afterschool/program/',
    title: 'Program & Curriculum Afterschool | Arena Play',
    description: 'O zi tipică la Arena Play Afterschool: teme, engleză, programare, activități recreative. Curriculum, opționale și informații despre transport și masă.',
    breadcrumb: [{ label: 'Afterschool', href: '/afterschool/' }, { label: 'Program & Curriculum', href: '/afterschool/program/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Afterschool', href: '/afterschool/' }, { label: 'Program & Curriculum', href: '/afterschool/program/' }])],
    body: `
      <h1>Cum arată o zi la Afterschool</h1>
      ${section('Program zilnic', `
        <ul>
          <li>12:00 – 12:30: Sosire, gustare și relaxare după școală</li>
          <li>12:30 – 13:30: Teme și organizare, cu sprijin individual</li>
          <li>13:30 – 14:15: Curs săptămânal: Engleză sau Programare (alternativ)</li>
          <li>14:15 – 15:30: Activități recreative și joc liber</li>
          <li>15:30 – 18:00: Timp liber supravegheat, program flexibil de preluare</li>
        </ul>
      `)}
      ${section('Opționale', `<p>Șah (curs opțional săptămânal), Transport/Preluare (opțional, din anumite școli partenere), Masă de prânz (opțiune separată, contra cost).</p>`)}
    `,
  },
  {
    path: '/afterschool/inscrieri/',
    title: 'Înscrieri Afterschool | Arena Play',
    description: 'Solicită un loc la Arena Play Afterschool. Completează formularul de înscriere — te contactăm pentru vizită și confirmarea disponibilității.',
    breadcrumb: [{ label: 'Afterschool', href: '/afterschool/' }, { label: 'Înscrieri', href: '/afterschool/inscrieri/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Afterschool', href: '/afterschool/' }, { label: 'Înscrieri', href: '/afterschool/inscrieri/' }])],
    body: `
      <h1>Solicită un loc la Afterschool</h1>
      <p>Locurile sunt limitate pe grupă de vârstă — completează formularul și te contactăm rapid.</p>
      ${section('Ce trebuie să știi', `
        <ul>
          <li>Program luni–vineri, 12:00–18:00, pentru clasele I–IV.</li>
          <li>Teme supravegheate, engleză și programare incluse.</li>
          <li>Locuri limitate pe grupă — recomandăm înscrierea din timp.</li>
          <li>După trimiterea formularului: contact, vizită, confirmare disponibilitate.</li>
        </ul>
      `)}
    `,
  },
  {
    path: '/arena-vr-mobila/',
    title: 'Arena VR mobilă — Aducem experiența la tine | Arena Play',
    description: 'Arena VR mobilă se deplasează la școli, evenimente, festivaluri și petreceri private. Solicită o ofertă personalizată pentru locația ta.',
    breadcrumb: [{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }])],
    body: `
      <h1>ARENA VR MOBILĂ</h1>
      <p>Noi aducem experiența la tine.</p>
      ${section('Cele trei trasee', linkList([
        { href: '/arena-vr-mobila/scoli/', label: 'Școli', desc: 'Activități educaționale itinerante, demonstrații XR și evenimente școlare tematice.' },
        { href: '/arena-vr-mobila/evenimente/', label: 'Evenimente & Festivaluri', desc: 'Atracție interactivă pentru evenimente cu flux mare de public.' },
        { href: '/arena-vr-mobila/petreceri-private/', label: 'Petreceri Private', desc: 'Aducem experiența Arena Play direct la locația ta.' },
      ]))}
      ${section('Cum funcționează', `<p>Solicitare → Configurare → Transport & instalare → Coordonare.</p>`)}
      ${section('Solicită ofertă', linkList([{ href: '/arena-vr-mobila/solicita-oferta/', label: 'Solicită Arena VR mobilă' }]))}
    `,
  },
  {
    path: '/arena-vr-mobila/scoli/',
    title: 'Arena VR mobilă pentru Școli & Educație | Arena Play',
    description: 'Activități tematice, evenimente școlare și demonstrații XR aduse direct la școala ta. Organizare pe grupe și necesar logistic explicat clar.',
    breadcrumb: [{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Școli', href: '/arena-vr-mobila/scoli/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Școli', href: '/arena-vr-mobila/scoli/' }])],
    body: `
      <h1>Arena VR mobilă pentru școli</h1>
      <p>Activități educaționale itinerante, adaptate contextului școlar.</p>
      ${section('Exemple de utilizare', linkList([
        { href: '#', label: 'Activități tematice', desc: 'Sesiuni adaptate curriculumului sau unei teme educaționale specifice.' },
        { href: '#', label: 'Evenimente școlare', desc: 'Zile tematice, serbări sau evenimente de final de an.' },
        { href: '#', label: 'Demonstrații XR', desc: 'Sesiuni demonstrative de realitate extinsă pentru grupuri de elevi.' },
      ]))}
    `,
  },
  {
    path: '/arena-vr-mobila/evenimente/',
    title: 'Arena VR mobilă — Evenimente & Festivaluri | Arena Play',
    description: 'Arena VR mobilă ca atracție interactivă la festivaluri, evenimente locale, evenimente de companie și activări de brand.',
    breadcrumb: [{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Evenimente & Festivaluri', href: '/arena-vr-mobila/evenimente/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Evenimente & Festivaluri', href: '/arena-vr-mobila/evenimente/' }])],
    body: `
      <h1>O atracție interactivă pentru evenimentul tău</h1>
      ${section('Segmente potrivite', linkList([
        { href: '#', label: 'Festivaluri', desc: 'Atracție interactivă pentru festivaluri de familie și evenimente publice.' },
        { href: '#', label: 'Evenimente locale', desc: 'Activări în comunitate, târguri și zile ale orașului.' },
        { href: '#', label: 'Evenimente de companie', desc: 'Team building și evenimente corporate.' },
        { href: '#', label: 'Activări de brand', desc: 'Experiențe interactive pentru campanii și lansări de brand.' },
      ]))}
    `,
  },
  {
    path: '/arena-vr-mobila/petreceri-private/',
    title: 'Arena VR mobilă — Petreceri & Evenimente Private | Arena Play',
    description: 'Poate Arena Play să vină la locația ta? Da — află condițiile de bază pentru petreceri și evenimente private cu Arena VR mobilă.',
    breadcrumb: [{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Petreceri Private', href: '/arena-vr-mobila/petreceri-private/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Petreceri Private', href: '/arena-vr-mobila/petreceri-private/' }])],
    body: `
      <h1>Poate Arena Play să vină la locația mea?</h1>
      <p>Da — după verificarea condițiilor logistice, aducem experiența direct la tine.</p>
      ${section('Ce colectăm înainte de ofertă', linkList([
        { href: '#', label: 'Adresă & spațiu', desc: 'Adresa locației și tipul spațiului disponibil.' },
        { href: '#', label: 'Acces & durată', desc: 'Condiții de acces pentru echipamente și durata estimată.' },
        { href: '#', label: 'Participanți', desc: 'Numărul estimativ de participanți.' },
      ]))}
    `,
  },
  {
    path: '/arena-vr-mobila/solicita-oferta/',
    title: 'Solicită Ofertă Arena VR mobilă | Arena Play',
    description: 'Completează formularul pentru a solicita o ofertă Arena VR mobilă — pentru școală, eveniment sau petrecere privată.',
    breadcrumb: [{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Solicită Ofertă', href: '/arena-vr-mobila/solicita-oferta/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Arena VR mobilă', href: '/arena-vr-mobila/' }, { label: 'Solicită Ofertă', href: '/arena-vr-mobila/solicita-oferta/' }])],
    body: `
      <h1>Spune-ne despre evenimentul tău</h1>
      <p>Formular rapid — suficient pentru a califica cererea, fără informații inutile. Alege tipul solicitării: școală, eveniment sau petrecere privată.</p>
    `,
  },
  {
    path: '/despre-noi/',
    title: 'Despre noi | Arena Play',
    description: 'Arena Play combină entertainment-ul cu educația într-un singur loc. Află conceptul, partenerii și povestea brandului Arena Play.',
    breadcrumb: [{ label: 'Despre noi', href: '/despre-noi/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Despre noi', href: '/despre-noi/' }])],
    body: `
      <h1>Distracție și educație, sub același acoperiș</h1>
      <p>Arena Play este locul unde copiii se joacă, învață și cresc — iar părinții au liniște.</p>
      <p>Arena Play s-a născut din dorința de a oferi copiilor un spațiu unde distracția și educația nu se exclud, ci se completează. Combinăm tehnologie modernă — XR, VR, simulatoare — cu activități educaționale structurate, într-un mediu sigur și prietenos.</p>
      <p>Astăzi, Arena Play înseamnă patru experiențe complementare: petreceri memorabile, un loc de joacă plin de tehnologie, un program afterschool de calitate și o Arena VR mobilă care aduce toată experiența direct la tine.</p>
    `,
  },
  {
    path: '/contact/',
    title: 'Contact | Arena Play',
    description: 'Contactează Arena Play: adresă, telefon, WhatsApp, program de funcționare, hartă și formular de contact rapid.',
    breadcrumb: [{ label: 'Contact', href: '/contact/' }],
    jsonLd: [localBusinessSchema(), breadcrumbSchema([{ label: 'Contact', href: '/contact/' }])],
    body: `
      <h1>Hai să vorbim</h1>
      <p>Adresă, telefon, WhatsApp și program — totul într-un singur loc.</p>
      ${section('Adresă', `<p>${esc(site.address.streetAddress)}, ${esc(site.address.locality)}, ${esc(site.address.postalCode)}, România</p>`)}
      ${section('Program', `<p>Sâmbătă – Duminică: 13:30 – 21:30 · Luni – Vineri: doar cu rezervare</p><p>Afterschool: Luni – Vineri, 12:00 – 18:00</p>`)}
      ${section('Telefon & WhatsApp', `<p>${esc(site.phoneDisplay)}</p>`)}
      ${section('E-mail', `<p>${esc(site.email)}</p>`)}
    `,
  },
  {
    path: '/rezerva/',
    title: 'Rezervă acum | Arena Play',
    description: 'Alege serviciul Arena Play pe care vrei să îl rezervi: Petrecere, Loc de joacă, Afterschool sau Arena VR mobilă.',
    breadcrumb: [{ label: 'Rezervă acum', href: '/rezerva/' }],
    jsonLd: [breadcrumbSchema([{ label: 'Rezervă acum', href: '/rezerva/' }])],
    body: `
      <h1>REZERVĂ ACUM</h1>
      <p>Alege serviciul și continuă în mai puțin de un minut.</p>
      ${linkList([
        { href: '/petreceri-vr/pachete/', label: 'Petrecere', desc: 'Rezervă o petrecere de aniversare pentru copilul tău.' },
        { href: '/loc-de-joaca/tarife-program/', label: 'Loc de joacă', desc: 'Rezervă acces sau un interval orar la Locul de joacă.' },
        { href: '/afterschool/inscrieri/', label: 'Afterschool', desc: 'Solicită informații și înscrie copilul la Afterschool.' },
        { href: '/arena-vr-mobila/solicita-oferta/', label: 'Arena VR mobilă', desc: 'Solicită o ofertă pentru școală, eveniment sau petrecere privată.' },
      ])}
    `,
  },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
  const canonical = `${siteUrl}${route.path}`;
  const headExtra = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:site_name" content="Arena Play" />`,
    `<meta property="og:locale" content="ro_RO" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    ...(route.jsonLd ?? []).map(jsonLdScript),
  ].join('\n    ');

  const breadcrumb = route.breadcrumb ? breadcrumbHtml(route.breadcrumb) : '';
  const bodyHtml = `${breadcrumb}${route.body}`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`);
  html = html.replace(/<meta\s+name="description"[^>]*content="[^"]*"[^>]*\/>/s, `<meta name="description" content="${esc(route.description)}" />`);
  html = html.replace('</head>', `    ${headExtra}\n  </head>`);
  html = html.replace('<div id="root" class="prerender-hidden"></div>', `<div id="root" class="prerender-hidden">${bodyHtml}</div>`);

  const outDir = route.path === '/' ? distDir : join(distDir, route.path.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html, 'utf-8');
}

console.log(`Prerendered ${routes.length} routes with real content + JSON-LD for non-JS crawlers.`);
