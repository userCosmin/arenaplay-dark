import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { mainNavigation } from '@/data/navigation';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Logo } from './Logo';
import { NavDotIndicator } from './NavDotIndicator';
import { Button } from '@/components/ui/Button';
import { siteConfig, telUrl, whatsappUrl } from '@/config/site.config';
import { useBookingModal } from '@/context/BookingModalContext';
import { trackEvent } from '@/utils/analytics';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedHref, setExpandedHref] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { openBookingModal } = useBookingModal();
  useLockBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 h-full w-[86%] max-w-sm overflow-y-auto bg-white shadow-lift"
          >
            <div className="flex items-center justify-between border-b border-ink-100 p-5">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Închide meniul" className="rounded-full p-2 hover:bg-ink-100">
                <X className="h-6 w-6 text-ink-900" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col p-5" aria-label="Meniu mobil">
              {mainNavigation.map((item) => {
                const isExpanded = expandedHref === item.href;
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <div key={item.href} className="border-b border-ink-100 py-1">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className={cn('flex items-center gap-2 py-3 font-display text-base font-semibold', isActive ? 'text-brand-500' : 'text-ink-900')}
                      >
                        {item.dot && <NavDotIndicator dot={item.dot} />}
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => setExpandedHref(isExpanded ? null : item.href)}
                          aria-label={`Extinde ${item.label}`}
                          className="p-3"
                        >
                          <ChevronDown className={cn('h-4 w-4 text-ink-500 transition-transform', isExpanded && 'rotate-180')} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.children && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={onClose}
                              className="block py-2.5 font-display text-sm text-ink-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3 p-5">
              <Button
                variant="primary"
                fullWidth
                className="font-display"
                onClick={() => {
                  onClose();
                  openBookingModal();
                }}
              >
                Rezervă acum
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  accent="ink"
                  fullWidth
                  href={telUrl()}
                  icon={<Phone className="h-4 w-4" />}
                  onClick={() => trackEvent('phone_click', { source: 'mobile_menu' })}
                >
                  Sună
                </Button>
                <Button
                  variant="outline"
                  accent="ink"
                  fullWidth
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<MessageCircle className="h-4 w-4" />}
                  onClick={() => trackEvent('whatsapp_click', { source: 'mobile_menu' })}
                >
                  WhatsApp
                </Button>
              </div>
              <p className="text-center text-xs text-ink-400">{siteConfig.contact.phoneDisplay}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
