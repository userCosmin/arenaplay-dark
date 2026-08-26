import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface LogoProps {
  /** Kept for API compatibility with callers rendering the logo over dark backgrounds. */
  dark?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'h-8 sm:h-9',
  md: 'h-9 sm:h-10',
  lg: 'h-11 sm:h-14',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <Link to="/" className={cn('flex items-center', className)} aria-label="Arena Play - acasă">
      <img
        src="/images/brand/logo.webp"
        alt="Arena Play"
        width={700}
        height={415}
        className={cn('w-auto', sizeClasses[size])}
      />
    </Link>
  );
}
