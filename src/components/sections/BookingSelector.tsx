import { PartyPopper, Gamepad2, GraduationCap, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

interface SelectorOption {
  slug: string;
  label: string;
  description: string;
  href: string;
  icon: typeof PartyPopper;
  accentBg: string;
  accentText: string;
}

const options: SelectorOption[] = [
  {
    slug: 'playground',
    label: 'Loc de joacă',
    description: 'Rezervă acces sau un interval orar la Locul de joacă.',
    href: '/loc-de-joaca/tarife-program/',
    icon: Gamepad2,
    accentBg: 'bg-playground/10',
    accentText: 'text-playground-dark',
  },
  {
    slug: 'petreceri',
    label: 'Petrecere',
    description: 'Rezervă o petrecere de aniversare pentru copilul tău.',
    href: '/petreceri-vr/pachete/',
    icon: PartyPopper,
    accentBg: 'bg-petreceri/10',
    accentText: 'text-petreceri-dark',
  },
  {
    slug: 'arena-mobila',
    label: 'Arena VR mobilă',
    description: 'Solicită o ofertă pentru școală, eveniment sau petrecere privată.',
    href: '/arena-vr-mobila/solicita-oferta/',
    icon: Truck,
    accentBg: 'bg-arenamobila/10',
    accentText: 'text-arenamobila-dark',
  },
  {
    slug: 'afterschool',
    label: 'Afterschool',
    description: 'Solicită informații și înscrie copilul la Afterschool.',
    href: '/afterschool/inscrieri/',
    icon: GraduationCap,
    accentBg: 'bg-afterschool/10',
    accentText: 'text-afterschool-dark',
  },
];

interface BookingSelectorProps {
  onNavigate?: () => void;
  className?: string;
}

/** The four-option "Rezervă acum" selector — used both as a modal and as the standalone /rezerva/ page. */
export function BookingSelector({ onNavigate, className }: BookingSelectorProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 gap-4', className)}>
      {options.map((option) => {
        const Icon = option.icon;
        return (
          <Link
            key={option.slug}
            to={option.href}
            onClick={onNavigate}
            className="group flex flex-col gap-3 rounded-2xl border border-ink-100 p-5 transition-all hover:border-transparent hover:shadow-lift"
          >
            <span className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', option.accentBg, option.accentText)}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-heading text-lg font-bold text-ink-900">{option.label}</span>
            <span className="text-sm text-ink-500">{option.description}</span>
            <span className={cn('mt-1 flex items-center gap-1 text-sm font-semibold', option.accentText)}>
              Continuă <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
