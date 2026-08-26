import { Clock } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PlaygroundBookingForm } from '@/components/forms/PlaygroundBookingForm';
import { playgroundPricingWeekend, playgroundPricingWeekday, playgroundOffers } from '@/data/pricing';
import { siteConfig } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';
import { useEffect } from 'react';

export default function PlaygroundTarifeProgramPage() {
  const breadcrumbs = [
    { label: 'Loc de joacă', href: '/loc-de-joaca/' },
    { label: 'Program & Tarife', href: '/loc-de-joaca/tarife-program/' },
  ];

  useEffect(() => {
    trackEvent('view_pricing', { service: 'playground' });
    trackEvent('view_program', { service: 'playground' });
  }, []);

  return (
    <>
      <SEO
        title="Program & Tarife Loc de joacă"
        description="Programul complet al Locului de joacă Arena Play: weekend 30 lei/sesiune (20 min), 2+1 gratuit, sau acces exclusiv în timpul săptămânii cu rezervare."
        path="/loc-de-joaca/tarife-program/"
      />
      <PageHero
        eyebrow="Program & Tarife"
        title="Program, tarife și oferte"
        subtitle="Informația practică de care ai nevoie, fără să cauți în imagini promoționale."
        accent="playground"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white">
        <div className="mb-14 rounded-3xl bg-playground-navy p-8 sm:p-10">
          <div className="flex items-center gap-3 text-white">
            <Clock className="h-6 w-6 text-playground-light" aria-hidden="true" />
            <h2 className="font-heading text-2xl font-bold">Program</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {siteConfig.openingHours.playground.map((entry) => (
              <div key={entry.days} className="rounded-2xl bg-white/5 p-5">
                <p className="text-sm text-white/60">{entry.days}</p>
                <p className="font-heading text-xl font-bold text-white">{entry.hours}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-2 font-heading text-display-md font-extrabold text-ink-900">Tarife</h2>
        <p className="mb-6 text-ink-500">Weekend — acces liber, fără rezervare</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {playgroundPricingWeekend.map((item) => (
            <Card key={item.id} hover>
              <p className="font-semibold text-ink-900">{item.label}</p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-heading text-3xl font-extrabold text-playground">{item.price}</span>
                <span className="text-sm text-ink-500">{item.unit}</span>
              </p>
              {item.note && <p className="mt-2 text-sm text-ink-400">{item.note}</p>}
            </Card>
          ))}
        </div>

        <p className="mb-6 mt-10 text-ink-500">În timpul săptămânii — doar cu rezervare, acces exclusiv la toate echipamentele</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {playgroundPricingWeekday.map((item) => (
            <Card key={item.id} hover>
              <p className="font-semibold text-ink-900">{item.label}</p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-heading text-3xl font-extrabold text-playground">{item.price}</span>
                <span className="text-sm text-ink-500">{item.unit}</span>
              </p>
              {item.note && <p className="mt-2 text-sm text-ink-400">{item.note}</p>}
            </Card>
          ))}
        </div>

        <h2 className="mb-8 mt-16 font-heading text-display-md font-extrabold text-ink-900">Oferte active</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {playgroundOffers.map((offer) => (
            <Card key={offer.id} className="border-2 border-dashed border-playground/30">
              <Badge accent="playground" className="mb-3">
                Ofertă
              </Badge>
              <h3 className="font-heading text-lg font-bold text-ink-900">{offer.title}</h3>
              <p className="mt-2 text-ink-600">{offer.description}</p>
              {offer.conditions && <p className="mt-2 text-xs text-ink-400">{offer.conditions}</p>}
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50" id="rezervare">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 font-heading text-display-md font-extrabold text-ink-900">Rezervă Loc de joacă</h2>
          <p className="mb-8 text-ink-500">Completează formularul — echipa noastră confirmă rapid disponibilitatea.</p>
          <Card>
            <PlaygroundBookingForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
