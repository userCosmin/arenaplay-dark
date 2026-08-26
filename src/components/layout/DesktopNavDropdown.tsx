import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { NavItem } from '@/types';
import { NavDotIndicator } from './NavDotIndicator';

interface DesktopNavDropdownProps {
  item: NavItem;
  isScrolledStyle: boolean;
}

export function DesktopNavDropdown({ item, isScrolledStyle }: DesktopNavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(item.href) && item.href !== '/';

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-1.5 font-display text-sm font-semibold transition-colors',
          isActive ? 'text-brand-500' : isScrolledStyle ? 'text-ink-700 hover:text-brand-500' : 'text-white hover:text-brand-200'
        )}
      >
        {item.dot && <NavDotIndicator dot={item.dot} />}
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-1.5 font-display text-sm font-semibold transition-colors',
          isActive ? 'text-brand-500' : isScrolledStyle ? 'text-ink-700 hover:text-brand-500' : 'text-white hover:text-brand-200'
        )}
        aria-expanded={open}
      >
        {item.dot && <NavDotIndicator dot={item.dot} />}
        {item.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-lift"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block rounded-xl px-4 py-3 transition-colors hover:bg-ink-50"
              >
                <span className="block font-display font-semibold text-ink-900">{child.label}</span>
                {child.description && <span className="block text-sm text-ink-500">{child.description}</span>}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
