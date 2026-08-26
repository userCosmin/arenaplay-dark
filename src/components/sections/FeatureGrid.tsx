import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { cn } from '@/utils/cn';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title: string;
  features: Feature[];
  accentClass?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ title, features, accentClass = 'bg-brand-500 text-white', className, columns = 3 }: FeatureGridProps) {
  const colsClass = columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3';

  return (
    <Section className={cn('bg-ink-50', className)}>
      <h2 className="mb-12 font-heading text-display-md font-extrabold text-ink-900">{title}</h2>
      <div className={cn('grid grid-cols-1 gap-6', colsClass)}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <span className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-2xl', accentClass)}>
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="font-heading text-lg font-bold text-ink-900">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
