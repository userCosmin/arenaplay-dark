import { Check, Star } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/utils/structuredData';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { partyPackages } from '@/data/packages';
import { PartyBookingForm } from '@/components/forms/PartyBookingForm';
import { cn } from '@/utils/cn';

export default function PetreceriPachetePage() {
  const breadcrumbs = [
    { label: 'Petreceri VR', href: '/petreceri-vr/' },
    { label: 'Pachete & Rezervare', href: '/petreceri-vr/pachete/' },
  ];

  return (
    <>
      <SEO
        title="Pachete Petreceri & Rezervare"
        description="Pachetul de petrecere Arena Play — 80 lei/copil, minim 10 copii, acces exclusiv la toate echipamentele — și rezervă direct online."
        path="/petreceri-vr/pachete/"
      />
      <JsonLd data={breadcrumbSchema([{ label: 'Acasă', href: '/' }, ...breadcrumbs])} />
      <PageHero
        eyebrow="Pachete & Rezervare"
        title="Alege pachetul potrivit"
        subtitle="Un singur pachet, simplu și transparent — fără variante ascunse."
        accent="petreceri"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white" id="pachete">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-6">
          {partyPackages.map((pkg) => (
            <Card
              key={pkg.id}
              hover
              className={cn('flex flex-col', pkg.featured && 'ring-2 ring-petreceri')}
            >
              {pkg.featured && (
                <Badge accent="petreceri" className="mb-4 w-fit">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" /> Cel mai popular
                </Badge>
              )}
              <h2 className="font-heading text-2xl font-bold text-ink-900">{pkg.name}</h2>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-heading text-4xl font-extrabold text-ink-900">{pkg.price}</span>
                <span className="text-sm text-ink-500">{pkg.priceUnit}</span>
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {pkg.duration} · {pkg.kids}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-petreceri" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#formular-rezervare"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-petreceri px-6 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Alege pachetul
              </a>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50" id="formular-rezervare">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-2 font-heading text-display-md font-extrabold text-ink-900">Formular de rezervare</h2>
          <p className="mb-8 text-ink-500">
            Completează formularul de mai jos — rezervarea se confirmă ulterior de către echipa noastră, telefonic sau prin WhatsApp.
          </p>
          <Card>
            <PartyBookingForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
