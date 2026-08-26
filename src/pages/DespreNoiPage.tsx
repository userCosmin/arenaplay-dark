import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Gallery } from '@/components/sections/Gallery';
import { PartnersSection } from '@/components/sections/PartnersSection';

export default function DespreNoiPage() {
  return (
    <>
      <SEO
        title="Despre noi"
        description="Arena Play combină entertainment-ul cu educația într-un singur loc. Află conceptul, partenerii și povestea brandului Arena Play."
        path="/despre-noi/"
      />
      <PageHero
        eyebrow="Despre noi"
        title="Distracție și educație, sub același acoperiș"
        subtitle="Arena Play este locul unde copiii se joacă, învață și cresc — iar părinții au liniște."
        accent="playground"
        breadcrumbs={[{ label: 'Despre noi', href: '/despre-noi/' }]}
      />

      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-700">
          <p>
            Arena Play s-a născut din dorința de a oferi copiilor un spațiu unde distracția și educația nu se exclud, ci se
            completează. Combinăm tehnologie modernă — XR, VR, simulatoare — cu activități educaționale structurate, într-un
            mediu sigur și prietenos.
          </p>
          <p className="mt-4">
            Astăzi, Arena Play înseamnă patru experiențe complementare: petreceri memorabile, un loc de joacă plin de
            tehnologie, un program afterschool de calitate și o Arena VR mobilă care aduce toată experiența direct la tine,
            oriunde ai avea nevoie.
          </p>
        </div>
      </Section>

      <PartnersSection />
      <Gallery title="Galerie locație & echipă" />
    </>
  );
}
