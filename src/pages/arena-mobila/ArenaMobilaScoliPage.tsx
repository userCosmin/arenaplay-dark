import { GraduationCap, Users, MapPinned } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function ArenaMobilaScoliPage() {
  const breadcrumbs = [
    { label: 'Arena VR mobilă', href: '/arena-vr-mobila/' },
    { label: 'Școli', href: '/arena-vr-mobila/scoli/' },
  ];

  return (
    <>
      <SEO
        title="Arena VR mobilă pentru Școli & Educație"
        description="Activități tematice, evenimente școlare și demonstrații XR aduse direct la școala ta. Organizare pe grupe și necesar logistic explicat clar."
        path="/arena-vr-mobila/scoli/"
      />
      <PageHero
        eyebrow="Școli & Educație"
        title="Arena VR mobilă pentru școli"
        subtitle="Activități educaționale itinerante, adaptate contextului școlar."
        accent="arenamobila"
        breadcrumbs={breadcrumbs}
      >
        <Button to="/arena-vr-mobila/solicita-oferta/" accent="arenamobila" size="lg">
          Solicită o activitate
        </Button>
      </PageHero>

      <FeatureGrid
        title="Exemple de utilizare"
        accentClass="bg-arenamobila text-white"
        features={[
          { icon: GraduationCap, title: 'Activități tematice', description: 'Sesiuni adaptate curriculumului sau unei teme educaționale specifice.' },
          { icon: Users, title: 'Evenimente școlare', description: 'Zile tematice, serbări sau evenimente de final de an, cu activități interactive.' },
          { icon: MapPinned, title: 'Demonstrații XR', description: 'Sesiuni demonstrative de realitate extinsă pentru grupuri de elevi.' },
        ]}
      />

      <Section className="bg-white">
        <h2 className="mb-6 font-heading text-display-md font-extrabold text-ink-900">Organizare pe grupe</h2>
        <p className="max-w-2xl text-ink-600">
          Activitățile se organizează pe grupe, în funcție de spațiul disponibil și numărul de elevi. Înainte de solicitarea de
          ofertă, discutăm împreună necesarul de spațiu, timpul alocat și logistica de acces, pentru o desfășurare fără
          probleme.
        </p>
        <div className="mt-8">
          <Button to="/arena-vr-mobila/solicita-oferta/" accent="arenamobila" size="lg">
            Solicită detalii pentru școală
          </Button>
        </div>
      </Section>
    </>
  );
}
