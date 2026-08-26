import { PartyPopper, Sparkles, Users, ShieldCheck } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Gallery } from '@/components/sections/Gallery';
import { FAQSection } from '@/components/sections/FAQSection';
import { Button } from '@/components/ui/Button';

export default function PetreceriPage() {
  return (
    <>
      <SEO
        title="Petreceri pentru copii"
        description="Tu aduci invitații, noi pregătim experiența. Petreceri tematice pentru copii, cu spațiu privat, animație și pachete complete la Arena Play."
        path="/petreceri-vr/"
      />
      <PageHero
        eyebrow="Petreceri pentru copii"
        title="PETRECERI PENTRU COPII"
        subtitle="Tu aduci invitații. Noi pregătim experiența."
        accent="petreceri"
        breadcrumbs={[{ label: 'Petreceri VR', href: '/petreceri-vr/' }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button to="/petreceri-vr/pachete/" accent="petreceri" size="lg" icon={<PartyPopper className="h-5 w-5" />} iconPosition="left">
            Rezervă petrecerea
          </Button>
          <Button to="/petreceri-vr/pachete/" variant="outline" accent="ink" size="lg" className="!border-white !text-white hover:!bg-white/10">
            Vezi pachete
          </Button>
        </div>
      </PageHero>

      <FeatureGrid
        title="Ce primești"
        accentClass="bg-petreceri text-white"
        features={[
          { icon: Sparkles, title: 'Spațiu privat', description: 'O zonă dedicată doar petrecerii voastre, decorată tematic.' },
          { icon: PartyPopper, title: 'Activități incluse', description: 'Acces la jocuri, Loc de joacă și animație pentru toți invitații.' },
          { icon: Users, title: 'Animator dedicat', description: 'Un animator profesionist se ocupă de distracția copiilor.' },
          { icon: ShieldCheck, title: 'Fără griji', description: 'Ne ocupăm de organizare — tu te bucuri de eveniment alături de copil.' },
        ]}
      />

      <HowItWorks
        accentClass="bg-petreceri"
        className="bg-white"
        steps={[
          { title: 'Alegi data', description: 'Trimiți o solicitare cu data dorită pentru petrecere.' },
          { title: 'Alegi pachetul', description: 'Selectezi pachetul potrivit numărului de copii și bugetului.' },
          { title: 'Confirmăm', description: 'Echipa noastră te contactează pentru a confirma toate detaliile.' },
        ]}
      />

      <Gallery category="petreceri" title="Galerie petreceri" />
      <FAQSection category="petreceri" title="Întrebări frecvente despre petreceri" />
    </>
  );
}
