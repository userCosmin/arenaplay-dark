import { Section } from '@/components/ui/Section';
import { partners } from '@/data/partners';

export function PartnersSection() {
  return (
    <Section className="bg-ink-50">
      <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">Parteneri</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {partners.map((partner) => (
          <div key={partner.id} className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-card">
            <img src={partner.logo} alt={`Logo ${partner.name}`} width={96} height={96} loading="lazy" className="h-16 w-16 object-contain" />
            <div>
              <p className="font-heading font-bold text-ink-900">{partner.name}</p>
              <p className="mt-1 text-sm text-ink-500">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
