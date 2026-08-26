import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, hasError, children, ...rest }, ref) => {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-ink-900 transition-colors',
          'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
          hasError ? 'border-red-400' : 'border-ink-200',
          className
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
    </div>
  );
});
Select.displayName = 'Select';
