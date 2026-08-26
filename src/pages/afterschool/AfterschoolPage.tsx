import { BookOpen, Languages, Code2, Palette } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Gallery } from '@/components/sections/Gallery';
import { FAQSection } from '@/components/sections/FAQSection';

const pillarIcons = { BookOpen, Languages, Code2, Palette };

export default function AfterschoolPage() {
  return (
    <>
      <SEO
        title="Arena Play Afterschool — Clasele I–IV"
        description="Program Afterschool pentru clasele I–IV, luni-vineri 12:00–18:00: teme, engleză, programare și activități recreative, într-un mediu luminos și sigur."
        path="/afterschool/"
      />
      <PageHero
        eyebrow="Afterschool"
        title="ARENA PLAY AFTERSCHOOL"
        subtitle="După școală începe următorul nivel."
        accent="afterschool"
        breadcrumbs={[{ label: 'Afterschool', href: '/afterschool/' }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button to="/afterschool/inscrieri/" accent="afterschool" size="lg">
            Solicită informații
          </Button>
          <Button to="/afterschool/program/" variant="outline" accent="afterschool" size="lg">
            Vezi programul
          </Button>
        </div>
      </PageHero>

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl rounded-3xl bg-afterschool-light p-8 text-center">
          <p className="font-heading text-2xl font-bold text-afterschool-dark">Clasele I–IV</p>
          <p className="mt-2 text-lg text-ink-700">Program zilnic 12:00 – 18:00, luni – vineri</p>
          <p className="mt-4 text-sm font-semibold text-afterschool-dark">Tarife — detalii la cerere</p>
        </div>
      </Section>

      <FeatureGrid
        title="Patru piloni ai programului"
        accentClass="bg-afterschool text-white"
        columns={4}
        features={[
          { icon: pillarIcons.BookOpen, title: 'Teme & Organizare', description: 'Timp dedicat, supravegheat, pentru teme și organizare.' },
          { icon: pillarIcons.Languages, title: 'Engleză', description: 'Sesiuni săptămânale de engleză conversațională.' },
          { icon: pillarIcons.Code2, title: 'Programare', description: 'Gândire computațională prin joc și proiecte.' },
          { icon: pillarIcons.Palette, title: 'Activități recreative', description: 'Joc liber, sport ușor și activități creative.' },
        ]}
      />

      <Gallery category="afterschool" title="Galerie Afterschool" />
      <FAQSection category="afterschool" title="Întrebări frecvente despre Afterschool" />
    </>
  );
}
