import { CheckCircle2 } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { AfterschoolEnrollForm } from '@/components/forms/AfterschoolEnrollForm';

const summaryPoints = [
  'Program luni–vineri, 12:00–18:00, pentru clasele I–IV.',
  'Teme supravegheate, engleză și programare incluse.',
  'Locuri limitate pe grupă — recomandăm înscrierea din timp.',
  'După trimiterea formularului: contact, vizită, confirmare disponibilitate.',
];

export default function AfterschoolInscrieriPage() {
  const breadcrumbs = [
    { label: 'Afterschool', href: '/afterschool/' },
    { label: 'Înscrieri', href: '/afterschool/inscrieri/' },
  ];

  return (
    <>
      <SEO
        title="Înscrieri Afterschool"
        description="Solicită un loc la Arena Play Afterschool. Completează formularul de înscriere — te contactăm pentru vizită și confirmarea disponibilității."
        path="/afterschool/inscrieri/"
      />
      <PageHero
        eyebrow="Înscrieri"
        title="Solicită un loc la Afterschool"
        subtitle="Locurile sunt limitate pe grupă de vârstă — completează formularul și te contactăm rapid."
        accent="afterschool"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-heading text-2xl font-bold text-ink-900">Ce trebuie să știi</h2>
            <ul className="flex flex-col gap-4">
              {summaryPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-afterschool-dark" aria-hidden="true" />
                  <span className="text-ink-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card>
            <AfterschoolEnrollForm />
          </Card>
        </div>
      </Section>
    </>
  );
}
