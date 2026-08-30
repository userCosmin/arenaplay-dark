import { useMemo, useState } from 'react';
import { Check, Users, User, GraduationCap, ShieldAlert } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/utils/structuredData';
import { PageHero } from '@/components/sections/PageHero';
import { heroVideos } from '@/data/videos';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { kidsGames, teenAdultGames } from '@/data/vrGames';
import type { VRGame } from '@/types';
import { cn } from '@/utils/cn';

function GameCard({ game }: { game: VRGame }) {
  return (
    <Card hover className={cn('flex flex-col', game.featured && 'ring-2 ring-playground')}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge accent="playground">{game.category}</Badge>
        <Badge accent="ink">{game.minAge}</Badge>
        {game.multiplayer && <Badge accent="ink">Multiplayer</Badge>}
      </div>

      <h3 className="font-heading text-xl font-bold text-ink-900">{game.name}</h3>
      <p className="mt-1 text-sm font-semibold text-playground">{game.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-600">{game.description}</p>

      <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          {game.multiplayer ? <Users className="h-4 w-4" aria-hidden="true" /> : <User className="h-4 w-4" aria-hidden="true" />}
          {game.players}
        </span>
      </div>

      <div className="mt-5 border-t border-ink-100 pt-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-500">Ce exersează copilul</p>
        <ul className="flex flex-col gap-2">
          {game.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2 text-sm text-ink-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-playground" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {game.schoolFit && (
        <p className="mt-4 flex items-start gap-2 rounded-2xl bg-playground/5 p-3 text-xs leading-relaxed text-ink-600">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-playground" aria-hidden="true" />
          <span>
            <strong className="font-semibold text-ink-800">La școală: </strong>
            {game.schoolFit}
          </span>
        </p>
      )}
    </Card>
  );
}

export default function PlaygroundJocuriPage() {
  const breadcrumbs = [
    { label: 'Loc de joacă', href: '/loc-de-joaca/' },
    { label: 'Jocuri VR', href: '/loc-de-joaca/jocuri/' },
  ];

  const categories = useMemo(
    () => ['Toate', ...Array.from(new Set(kidsGames.map((game) => game.category)))],
    []
  );
  const [activeCategory, setActiveCategory] = useState('Toate');

  const visibleGames =
    activeCategory === 'Toate' ? kidsGames : kidsGames.filter((game) => game.category === activeCategory);

  return (
    <>
      <SEO
        title="Jocuri VR pentru copii — catalog complet"
        description="Toate experiențele VR de la Arena Play Alba Iulia, cu vârsta recomandată și abilitățile pe care le dezvoltă fiecare: Journey XR, Beat Saber, Job Simulator, Among Us VR și altele."
        path="/loc-de-joaca/jocuri/"
      />
      <JsonLd data={breadcrumbSchema([{ label: 'Acasă', href: '/' }, ...breadcrumbs])} />

      <PageHero
        eyebrow="Catalog jocuri"
        title="JOCURILE NOASTRE VR"
        subtitle="Fiecare titlu este ales pentru ce învață copilul din el, nu doar pentru cât e de spectaculos."
        accent="playground"
        backgroundVideo={heroVideos.playground}
        breadcrumbs={breadcrumbs}
      />

      {/* Why it matters that these are played here rather than at home */}
      <Section className="bg-ink-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-display-md font-extrabold text-ink-900">
            De ce contează unde se joacă
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Aceleași jocuri, acasă, înseamnă un copil singur într-o cameră. La Arena Play înseamnă spațiu de mișcare
            delimitat, sesiuni de 20 de minute, maximum 6 persoane în arenă și un coleg lângă tine cu care vorbești
            direct, nu prin căști.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              title: 'Mișcare, nu statul pe scaun',
              text: 'Majoritatea titlurilor cer deplasare, brațe ridicate și genuflexiuni. Copiii transpiră.',
            },
            {
              title: 'Socializare reală',
              text: 'Jocurile în echipă se joacă în aceeași încăpere. Negocierea și râsul sunt față în față.',
            },
            {
              title: 'Doză controlată',
              text: 'O sesiune durează 20 de minute. Fără excesul care apare când casca stă în sufragerie.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white p-6 shadow-card">
              <h3 className="font-heading text-lg font-bold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white" id="jocuri-copii">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-heading text-display-md font-extrabold text-ink-900">Selecția pentru copii</h2>
          <p className="mt-4 text-lg text-ink-500">
            {kidsGames.length} experiențe verificate, potrivite de la 6 sau 10 ani în sus.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrează după categorie">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                activeCategory === category
                  ? 'bg-playground text-white'
                  : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </Section>

      {/* Deliberately separated, not mixed into the children's grid */}
      <Section className="bg-ink-50" id="jocuri-adolescenti">
        <div className="mb-8 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-ink-900/5 px-4 py-1.5 text-sm font-semibold text-ink-700">
            <ShieldAlert className="h-4 w-4" aria-hidden="true" />
            Doar pentru adolescenți și adulți
          </div>
          <h2 className="font-heading text-display-md font-extrabold text-ink-900">
            Titluri cu restricție de vârstă
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Aceste experiențe nu sunt incluse în petrecerile pentru copii și nu se rulează la programele de
            afterschool. Sunt disponibile la cerere, pentru grupuri care îndeplinesc vârsta minimă.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teenAdultGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-display-md font-extrabold text-ink-900">Vino să le încerci</h2>
          <p className="mt-4 text-lg text-ink-600">
            Weekendul se intră fără rezervare. În timpul săptămânii, arena se deschide cu rezervare, pentru acces
            exclusiv.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/loc-de-joaca/tarife-program/" accent="playground" size="lg">
              Program & Tarife
            </Button>
            <Button to="/petreceri-vr/pachete/" variant="outline" accent="petreceri" size="lg">
              Organizează o petrecere
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
