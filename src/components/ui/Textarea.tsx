import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, hasError, ...rest }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        'w-full rounded-xl border bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors resize-y',
        'focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
        hasError ? 'border-red-400' : 'border-ink-200',
        className
      )}
      {...rest}
    />
  );
});
Textarea.displayName = 'Textarea';
