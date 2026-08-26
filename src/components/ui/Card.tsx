import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-white shadow-card p-6 sm:p-8',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
