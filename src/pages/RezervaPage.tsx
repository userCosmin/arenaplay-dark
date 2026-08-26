import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { BookingSelector } from '@/components/sections/BookingSelector';

export default function RezervaPage() {
  return (
    <>
      <SEO
        title="Rezervă acum"
        description="Alege serviciul Arena Play pe care vrei să îl rezervi: Petrecere, Loc de joacă, Afterschool sau Arena VR mobilă."
        path="/rezerva/"
      />
      <PageHero
        eyebrow="Rezervă acum"
        title="REZERVĂ ACUM"
        subtitle="Alege serviciul și continuă în mai puțin de un minut."
        accent="petreceri"
        breadcrumbs={[{ label: 'Rezervă acum', href: '/rezerva/' }]}
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl">
          <BookingSelector />
        </div>
      </Section>
    </>
  );
}
