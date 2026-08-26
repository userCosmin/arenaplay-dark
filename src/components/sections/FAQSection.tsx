import { Section } from '@/components/ui/Section';
import { Accordion } from '@/components/ui/Accordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { faqSchema } from '@/utils/structuredData';
import { faqItems } from '@/data/faq';
import type { ServiceSlug } from '@/types';

interface FAQSectionProps {
  category?: ServiceSlug | 'general';
  title?: string;
}

export function FAQSection({ category, title = 'Întrebări frecvente' }: FAQSectionProps) {
  const items = category ? faqItems.filter((item) => item.category === category || item.category === 'general') : faqItems;

  if (items.length === 0) return null;

  return (
    <Section className="bg-white">
      <JsonLd data={faqSchema(items)} />
      <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">{title}</h2>
      <Accordion items={items.map((i) => ({ id: i.id, question: i.question, answer: i.answer }))} className="mx-auto max-w-3xl" />
    </Section>
  );
}
