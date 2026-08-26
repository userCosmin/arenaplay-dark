import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { ArenaMobilaRequestForm } from '@/components/forms/ArenaMobilaRequestForm';

export default function ArenaMobilaSolicitaOfertaPage() {
  const breadcrumbs = [
    { label: 'Arena VR mobilă', href: '/arena-vr-mobila/' },
    { label: 'Solicită Ofertă', href: '/arena-vr-mobila/solicita-oferta/' },
  ];

  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('tip');
  const defaultType = (['scoala', 'eveniment', 'privat'] as const).find((t) => t === typeParam);

  return (
    <>
      <SEO
        title="Solicită Ofertă Arena VR mobilă"
        description="Completează formularul pentru a solicita o ofertă Arena VR mobilă — pentru școală, eveniment sau petrecere privată."
        path="/arena-vr-mobila/solicita-oferta/"
      />
      <PageHero
        eyebrow="Solicită Ofertă"
        title="Spune-ne despre evenimentul tău"
        subtitle="Formular rapid — suficient pentru a califica cererea, fără informații inutile."
        accent="arenamobila"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl">
          <Card>
            <ArenaMobilaRequestForm defaultType={defaultType} />
          </Card>
        </div>
      </Section>
    </>
  );
}
