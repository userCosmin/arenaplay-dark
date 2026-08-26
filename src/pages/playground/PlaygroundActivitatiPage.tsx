import { SEO } from '@/components/seo/SEO';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { activities } from '@/data/activities';

export default function PlaygroundActivitatiPage() {
  const breadcrumbs = [
    { label: 'Loc de joacă', href: '/loc-de-joaca/' },
    { label: 'Activități', href: '/loc-de-joaca/activitati/' },
  ];

  return (
    <>
      <SEO
        title="Activități Loc de joacă — XR, VR, Simulatoare, PlayStation"
        description="Descoperă toate activitățile din Locul de joacă Arena Play: zonă XR, VR, simulator auto, simulator de zbor, PlayStation și activități extra."
        path="/loc-de-joaca/activitati/"
      />
      <PageHero
        eyebrow="Activități"
        title="Activitățile Locului de joacă"
        subtitle="De la XR și VR la simulatoare de curse și zbor — fiecare zonă are propriul ei nivel de adrenalină."
        accent="playground"
        breadcrumbs={breadcrumbs}
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.id} id={activity.id} hover className="scroll-mt-28">
              <Badge accent="playground" className="mb-4">
                {activity.category}
              </Badge>
              <h2 className="font-heading text-xl font-bold text-ink-900">{activity.name}</h2>
              <p className="mt-2 text-ink-600">{activity.description}</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-ink-100 pt-4 text-sm">
                <div>
                  <dt className="text-ink-400">Vârstă</dt>
                  <dd className="font-semibold text-ink-800">{activity.minAge}</dd>
                </div>
                <div>
                  <dt className="text-ink-400">Jucători</dt>
                  <dd className="font-semibold text-ink-800">{activity.players}</dd>
                </div>
                <div>
                  <dt className="text-ink-400">Durată</dt>
                  <dd className="font-semibold text-ink-800">{activity.duration}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/loc-de-joaca/tarife-program/" accent="playground" size="lg">
            Vezi program &amp; tarife
          </Button>
        </div>
      </Section>
    </>
  );
}
