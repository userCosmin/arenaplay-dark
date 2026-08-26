import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FormStatusProps {
  status: 'success' | 'error';
  message: string;
  className?: string;
}

export function FormStatus({ status, message, className }: FormStatusProps) {
  const isSuccess = status === 'success';
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-3 rounded-2xl p-4 text-sm font-medium',
        isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800',
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  );
}
