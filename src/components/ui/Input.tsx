import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, hasError, ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors',
        'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
        hasError ? 'border-red-400' : 'border-ink-200',
        className
      )}
      {...rest}
    />
  );
});
Input.displayName = 'Input';
