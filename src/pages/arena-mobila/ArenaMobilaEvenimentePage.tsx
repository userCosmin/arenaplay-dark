import { Music, Building2, Sparkles, Users } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ArenaMobilaEvenimentePage() {
  const breadcrumbs = [
    { label: 'Arena VR mobilă', href: '/arena-vr-mobila/' },
    { label: 'Evenimente & Festivaluri', href: '/arena-vr-mobila/evenimente/' },
  ];

  return (
    <>
      <SEO
        title="Arena VR mobilă — Evenimente & Festivaluri"
        description="Arena VR mobilă ca atracție interactivă la festivaluri, evenimente locale, evenimente de companie și activări de brand."
        path="/arena-vr-mobila/evenimente/"
      />
      <PageHero
        eyebrow="Evenimente & Festivaluri"
        title="O atracție interactivă pentru evenimentul tău"
        subtitle="Experiență Arena Play, adusă la evenimente cu flux mare de public."
        accent="arenamobila"
        breadcrumbs={breadcrumbs}
      >
        <Button to="/arena-vr-mobila/solicita-oferta/" accent="arenamobila" size="lg">
          Solicită ofertă pentru eveniment
        </Button>
      </PageHero>

      <FeatureGrid
        title="Segmente potrivite"
        accentClass="bg-arenamobila text-white"
        columns={4}
        features={[
          { icon: Music, title: 'Festivaluri', description: 'Atracție interactivă pentru festivaluri de familie și evenimente publice.' },
          { icon: Users, title: 'Evenimente locale', description: 'Activări în comunitate, târguri și zile ale orașului.' },
          { icon: Building2, title: 'Evenimente de companie', description: 'Team building și evenimente corporate cu activități memorabile.' },
          { icon: Sparkles, title: 'Activări de brand', description: 'Experiențe interactive pentru campanii și lansări de brand.' },
        ]}
      />

      <Section className="bg-ink-50">
        <Card className="mx-auto max-w-2xl">
          <h2 className="font-heading text-xl font-bold text-ink-900">Ce ne trebuie pentru ofertare</h2>
          <p className="mt-3 text-ink-600">
            Pentru o ofertă corectă, avem nevoie de cel puțin: locația, data, durata estimată și numărul estimativ de
            participanți. Restul detaliilor le stabilim împreună.
          </p>
        </Card>
      </Section>
    </>
  );
}
