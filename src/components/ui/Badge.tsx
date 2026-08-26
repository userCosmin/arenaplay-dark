import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  accent?: 'brand' | 'petreceri' | 'playground' | 'afterschool' | 'arenamobila' | 'ink';
}

const accentClasses: Record<NonNullable<BadgeProps['accent']>, string> = {
  brand: 'bg-brand-100 text-brand-700',
  petreceri: 'bg-petreceri/10 text-petreceri-dark',
  playground: 'bg-playground/10 text-playground-dark',
  afterschool: 'bg-afterschool/10 text-afterschool-dark',
  arenamobila: 'bg-arenamobila/10 text-arenamobila-dark',
  ink: 'bg-ink-100 text-ink-700',
};

export function Badge({ children, className, accent = 'brand' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide',
        accentClasses[accent],
        className
      )}
    >
      {children}
    </span>
  );
}
