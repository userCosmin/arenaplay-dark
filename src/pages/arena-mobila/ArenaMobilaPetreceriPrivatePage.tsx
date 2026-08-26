import { Home, MapPin, ShieldQuestion } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function ArenaMobilaPetreceriPrivatePage() {
  const breadcrumbs = [
    { label: 'Arena VR mobilă', href: '/arena-vr-mobila/' },
    { label: 'Petreceri Private', href: '/arena-vr-mobila/petreceri-private/' },
  ];

  return (
    <>
      <SEO
        title="Arena VR mobilă — Petreceri & Evenimente Private"
        description="Poate Arena Play să vină la locația ta? Da — află condițiile de bază pentru petreceri și evenimente private cu Arena VR mobilă."
        path="/arena-vr-mobila/petreceri-private/"
      />
      <PageHero
        eyebrow="Petreceri & Evenimente Private"
        title="Poate Arena Play să vină la locația mea?"
        subtitle="Da — după verificarea condițiilor logistice, aducem experiența direct la tine."
        accent="arenamobila"
        breadcrumbs={breadcrumbs}
      >
        <Button to="/arena-vr-mobila/solicita-oferta/" accent="arenamobila" size="lg">
          Solicită Arena VR mobilă la locația ta
        </Button>
      </PageHero>

      <Section className="bg-white">
        <div className="mx-auto max-w-2xl rounded-3xl bg-arenamobila/10 p-6 text-center">
          <p className="font-semibold text-arenamobila-dark">
            Separăm clar petrecerile organizate la sediul Arena Play de experiența mobilă la locația clientului — dacă preferi
            sediul nostru, vezi și{' '}
            <a href="/petreceri-vr/" className="underline">
              pagina de Petreceri
            </a>
            .
          </p>
        </div>
      </Section>

      <FeatureGrid
        title="Ce colectăm înainte de ofertă"
        accentClass="bg-arenamobila text-white"
        features={[
          { icon: Home, title: 'Adresă & spațiu', description: 'Adresa locației și tipul spațiului disponibil (interior/exterior).' },
          { icon: MapPin, title: 'Acces & durată', description: 'Condiții de acces pentru echipamente și durata estimată a evenimentului.' },
          { icon: ShieldQuestion, title: 'Participanți', description: 'Numărul estimativ de participanți, pentru a recomanda formatul potrivit.' },
        ]}
      />

      <Section className="bg-ink-50">
        <p className="mx-auto max-w-2xl text-center text-ink-600">
          Nu promitem instalarea în orice spațiu — confirmarea se face după verificarea condițiilor logistice. Pentru această
          categorie de solicitări, folosim preț personalizat, nu o listă fixă de pachete.
        </p>
      </Section>
    </>
  );
}
