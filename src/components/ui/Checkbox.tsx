import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  hasError?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, hasError, id, ...rest }, ref) => {
  return (
    <label htmlFor={id} className={cn('flex cursor-pointer items-start gap-3 text-sm text-ink-600', className)}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={cn(
          'mt-0.5 h-5 w-5 shrink-0 rounded border-ink-300 text-brand-500 focus:ring-2 focus:ring-brand-200',
          hasError && 'border-red-400'
        )}
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
