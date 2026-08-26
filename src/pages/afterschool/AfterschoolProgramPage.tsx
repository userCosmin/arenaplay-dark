import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { dailySchedule, afterschoolOptionals, curriculumPillars } from '@/data/curriculum';

export default function AfterschoolProgramPage() {
  const breadcrumbs = [
    { label: 'Afterschool', href: '/afterschool/' },
    { label: 'Program & Curriculum', href: '/afterschool/program/' },
  ];

  return (
    <>
      <SEO
        title="Program & Curriculum Afterschool"
        description="O zi tipică la Arena Play Afterschool: teme, engleză, programare, activități recreative. Curriculum, opționale și informații despre transport și masă."
        path="/afterschool/program/"
      />
      <PageHero
        eyebrow="Program & Curriculum"
        title="Cum arată o zi la Afterschool"
        subtitle="Program clar, pe intervale orare, ca să înțelegi rapid cum este organizat timpul copilului tău."
        accent="afterschool"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white">
        <h2 className="mb-8 font-heading text-display-md font-extrabold text-ink-900">Program zilnic</h2>
        <div className="mx-auto max-w-2xl divide-y divide-ink-100 rounded-3xl bg-afterschool-light/40 shadow-card">
          {dailySchedule.map((slot) => (
            <div key={slot.time} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:gap-6">
              <span className="w-40 shrink-0 font-heading font-bold text-afterschool-dark">{slot.time}</span>
              <span className="text-ink-700">{slot.activity}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-50">
        <h2 className="mb-8 font-heading text-display-md font-extrabold text-ink-900">Curriculum săptămânal</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {curriculumPillars.map((pillar) => (
            <Card key={pillar.id} hover>
              <h3 className="font-heading text-lg font-bold text-ink-900">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{pillar.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="mb-8 font-heading text-display-md font-extrabold text-ink-900">Opționale</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {afterschoolOptionals.map((opt) => (
            <Card key={opt.id}>
              <h3 className="font-heading font-bold text-ink-900">{opt.label}</h3>
              <p className="mt-2 text-sm text-ink-500">{opt.description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button to="/afterschool/inscrieri/" accent="afterschool" size="lg">
            Solicită înscriere
          </Button>
        </div>
      </Section>
    </>
  );
}
