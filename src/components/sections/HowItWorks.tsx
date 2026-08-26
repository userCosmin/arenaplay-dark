import { Section } from '@/components/ui/Section';
import { cn } from '@/utils/cn';

export interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  steps: Step[];
  accentClass?: string;
  className?: string;
  /** 'dark' is for use over dark/colored backgrounds. */
  variant?: 'light' | 'dark';
}

/** Numbered steps, each in its own white card — matches the FeatureGrid look used elsewhere. */
export function HowItWorks({
  title = 'Cum funcționează',
  steps,
  accentClass = 'bg-brand-500',
  className,
  variant = 'light',
}: HowItWorksProps) {
  const isDark = variant === 'dark';

  return (
    <Section className={className ?? 'bg-ink-50'}>
      <h2 className={cn('mb-12 font-heading text-display-md font-extrabold', isDark ? 'text-white' : 'text-ink-900')}>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className={cn('rounded-3xl p-6 sm:p-7 shadow-card', isDark ? 'bg-white/5' : 'bg-white')}>
            <span
              className={cn(
                'mb-4 flex h-11 w-11 items-center justify-center rounded-full font-heading text-lg font-bold text-white',
                accentClass
              )}
            >
              {index + 1}
            </span>
            <h3 className={cn('font-heading text-lg font-bold', isDark ? 'text-white' : 'text-ink-900')}>{step.title}</h3>
            <p className={cn('mt-2', isDark ? 'text-white/70' : 'text-ink-500')}>{step.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
