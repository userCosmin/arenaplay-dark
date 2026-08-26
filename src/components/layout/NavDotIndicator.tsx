import { cn } from '@/utils/cn';
import type { NavDot } from '@/types';

interface NavDotIndicatorProps {
  dot: NavDot;
  className?: string;
}

/**
 * Small color indicator dot shown next to specific top-level nav items
 * (desktop dropdown + mobile menu), per the requested per-service colors.
 */
export function NavDotIndicator({ dot, className }: NavDotIndicatorProps) {
  if (dot === 'ring') {
    return (
      <span
        className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-black ring-2 ring-white', className)}
        aria-hidden="true"
      />
    );
  }

  const fill: Record<Exclude<NavDot, 'ring'>, string> = {
    blue: 'bg-playground',
    pink: 'bg-petreceri',
    white: 'bg-white border border-ink-300',
  };

  return <span className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', fill[dot], className)} aria-hidden="true" />;
}
