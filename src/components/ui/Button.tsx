import { forwardRef } from 'react';
import type { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonAccent = 'brand' | 'petreceri' | 'playground' | 'afterschool' | 'arenamobila' | 'ink';

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none select-none';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

const accentSolid: Record<ButtonAccent, string> = {
  brand: 'bg-brand-500 hover:bg-brand-600 text-white shadow-glow',
  petreceri: 'bg-petreceri hover:bg-petreceri-dark text-white',
  playground: 'bg-playground hover:bg-playground-dark text-white',
  afterschool: 'bg-afterschool hover:bg-afterschool-dark text-white',
  arenamobila: 'bg-arenamobila hover:bg-arenamobila-dark text-white',
  ink: 'bg-ink-900 hover:bg-ink-800 text-white',
};

const accentOutline: Record<ButtonAccent, string> = {
  brand: 'border-2 border-brand-500 text-brand-600 hover:bg-brand-50',
  petreceri: 'border-2 border-petreceri text-petreceri-dark hover:bg-petreceri/10',
  playground: 'border-2 border-playground text-playground hover:bg-playground/10',
  afterschool: 'border-2 border-afterschool text-afterschool-dark hover:bg-afterschool/10',
  arenamobila: 'border-2 border-arenamobila text-arenamobila-dark hover:bg-arenamobila/10',
  ink: 'border-2 border-ink-900 text-ink-900 hover:bg-ink-100',
};

function getVariantClasses(variant: ButtonVariant, accent: ButtonAccent): string {
  switch (variant) {
    case 'primary':
      return cn(accentSolid[accent], 'hover:-translate-y-0.5 active:translate-y-0');
    case 'secondary':
      return 'bg-ink-100 hover:bg-ink-200 text-ink-900';
    case 'outline':
      return accentOutline[accent];
    case 'ghost':
      return 'text-ink-700 hover:bg-ink-100';
    case 'white':
      return 'bg-white hover:bg-ink-50 text-ink-900 shadow-card';
    default:
      return '';
  }
}

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  accent?: ButtonAccent;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
  /** Internal route (renders a React Router Link) */
  to?: string;
  /** External / non-router URL (renders an anchor) */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      accent = 'brand',
      icon,
      iconPosition = 'right',
      fullWidth = false,
      className,
      children,
      to,
      href,
      target,
      rel,
      onClick,
      type = 'button',
      disabled,
      ...aria
    },
    ref
  ) => {
    const classes = cn(baseClasses, sizeClasses[size], getVariantClasses(variant, accent), fullWidth && 'w-full', className);

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </>
    );

    if (to) {
      return (
        <Link to={to} className={classes} onClick={onClick} ref={ref as React.Ref<HTMLAnchorElement>} {...aria}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a href={href} className={classes} target={target} rel={rel} onClick={onClick} ref={ref as React.Ref<HTMLAnchorElement>} {...aria}>
          {content}
        </a>
      );
    }

    return (
      <button
        type={type}
        className={classes}
        onClick={onClick}
        disabled={disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...aria}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
