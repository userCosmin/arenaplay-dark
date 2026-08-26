import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { BreadcrumbEntry } from '@/types';
import { cn } from '@/utils/cn';
import { CursorGlow } from '@/components/effects/CursorGlow';

type Accent = 'petreceri' | 'playground' | 'afterschool' | 'arenamobila';

const accentGradients: Record<Accent, string> = {
  petreceri: 'from-petreceri via-petreceri-dark to-ink-950',
  playground: 'from-playground via-playground-navy to-ink-950',
  afterschool: 'from-afterschool-light via-white to-ink-50',
  arenamobila: 'from-arenamobila via-arenamobila-dark to-ink-950',
};

const lightText: Accent[] = ['afterschool'];

const accentHex: Record<Accent, string> = {
  petreceri: '#FF2E93',
  playground: '#0057FF',
  afterschool: '#2CA0FF',
  arenamobila: '#00C2B2',
};

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  accent: Accent;
  breadcrumbs: BreadcrumbEntry[];
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, subtitle, accent, breadcrumbs, children }: PageHeroProps) {
  const isLight = lightText.includes(accent);

  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-br pb-16 pt-32 sm:pb-20 sm:pt-40', accentGradients[accent])}>
      <CursorGlow color={accentHex[accent]} />
      <Container className="relative z-10">
        <Breadcrumbs
          items={breadcrumbs}
          className={cn('mb-6', isLight ? 'text-ink-500 [&_a]:hover:text-ink-900' : 'text-white/70 [&_a]:text-white/70 [&_a]:hover:text-white [&_svg]:text-white/70 [&_span]:text-white')}
        />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {eyebrow && (
            <span
              className={cn(
                'mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur',
                isLight ? 'bg-ink-900/5 text-ink-700' : 'bg-white/10 text-white'
              )}
            >
              {eyebrow}
            </span>
          )}
          <h1 className={cn('max-w-3xl text-balance font-display text-display-lg font-extrabold', isLight ? 'text-ink-900' : 'text-white')}>
            {title}
          </h1>
          <p className={cn('mt-5 max-w-xl font-heading text-balance text-lg font-medium', isLight ? 'text-ink-600' : 'text-white/85')}>{subtitle}</p>
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </Container>
    </section>
  );
}
