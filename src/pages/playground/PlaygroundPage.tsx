import { Gamepad2, Clock, Tag, ListChecks } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Gallery } from '@/components/sections/Gallery';
import { FAQSection } from '@/components/sections/FAQSection';
import { activities } from '@/data/activities';
import { siteConfig } from '@/config/site.config';

export default function PlaygroundPage() {
  return (
    <>
      <SEO
        title="Loc de joacă Arena Play"
        description="XR, VR, simulatoare auto și de zbor, PlayStation și multe altele. Descoperă Locul de joacă Arena Play — program, tarife și rezervare."
        path="/loc-de-joaca/"
      />
      <PageHero
        eyebrow="Loc de joacă"
        title="LOC DE JOACĂ ARENA PLAY"
        subtitle="Intră în joc."
        accent="playground"
        breadcrumbs={[{ label: 'Loc de joacă', href: '/loc-de-joaca/' }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button to="/loc-de-joaca/tarife-program/" accent="playground" size="lg" icon={<Gamepad2 className="h-5 w-5" />} iconPosition="left">
            Rezervă Loc de joacă
          </Button>
          <Button to="/loc-de-joaca/activitati/" variant="outline" accent="ink" size="lg" className="!border-white !text-white hover:!bg-white/10">
            Vezi activitățile
          </Button>
        </div>
      </PageHero>

      <Section className="bg-white">
        <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">6 activități, un singur loc</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <a
              key={activity.id}
              href={`/loc-de-joaca/activitati/#${activity.id}`}
              className="group rounded-3xl bg-ink-50 p-6 transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-playground">{activity.category}</span>
              <h3 className="mt-1 font-heading text-lg font-bold text-ink-900">{activity.name}</h3>
              <p className="mt-2 text-sm text-ink-500">{activity.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-playground">Vezi detalii →</span>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-playground-navy">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-playground-light" aria-hidden="true" />
            <div>
              <h3 className="font-heading font-bold text-white">Program</h3>
              {siteConfig.openingHours.playground.map((entry) => (
                <p key={entry.days} className="text-sm text-white/70">
                  {entry.days}: {entry.hours}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Tag className="mt-1 h-6 w-6 shrink-0 text-playground-light" aria-hidden="true" />
            <div>
              <h3 className="font-heading font-bold text-white">Tarife &amp; oferte</h3>
              <p className="text-sm text-white/70">Prețuri clare, actualizate constant — fără surprize.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ListChecks className="mt-1 h-6 w-6 shrink-0 text-playground-light" aria-hidden="true" />
            <div>
              <h3 className="font-heading font-bold text-white">Rezervare simplă</h3>
              <p className="text-sm text-white/70">Rezervi în câteva secunde, confirmăm rapid disponibilitatea.</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button to="/loc-de-joaca/tarife-program/" accent="playground" size="lg">
            Rezervă Loc de joacă
          </Button>
        </div>
      </Section>

      <Gallery category="playground" title="Galerie Loc de joacă" />
      <FAQSection category="playground" title="Întrebări frecvente despre Locul de joacă" />
    </>
  );
}
