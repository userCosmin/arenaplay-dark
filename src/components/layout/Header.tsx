import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useScrolled } from '@/hooks/useScrolled';
import { useIsHomePage } from '@/hooks/useIsHomePage';
import { mainNavigation } from '@/data/navigation';
import { Logo } from './Logo';
import { DesktopNavDropdown } from './DesktopNavDropdown';
import { MobileMenu } from './MobileMenu';
import { Button } from '@/components/ui/Button';
import { useBookingModal } from '@/context/BookingModalContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(40);
  const isHome = useIsHomePage();
  const { openBookingModal } = useBookingModal();

  // Transparent-over-hero only applies on the homepage before scrolling.
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          transparent ? 'bg-transparent py-5' : 'bg-white/95 backdrop-blur-md shadow-soft py-3'
        )}
      >
        <div className="container-arena flex items-center justify-between">
          <Logo dark={transparent} />

          <nav className="hidden lg:flex items-center gap-8" aria-label="Meniu principal">
            {mainNavigation.map((item) => (
              <DesktopNavDropdown key={item.href} item={item} isScrolledStyle={!transparent} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              accent="brand"
              size="sm"
              className="hidden sm:inline-flex font-display"
              onClick={openBookingModal}
            >
              Rezervă
            </Button>
            <button
              type="button"
              className={cn(
                'lg:hidden rounded-full p-2.5 transition-colors',
                transparent ? 'text-white hover:bg-white/10' : 'text-ink-900 hover:bg-ink-100'
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Deschide meniul"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
