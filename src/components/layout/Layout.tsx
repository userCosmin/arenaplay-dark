import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileActionBar } from './MobileActionBar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { ScrollToTop } from './ScrollToTop';
import { GlobalBookingModal } from './GlobalBookingModal';
import { BookingModalProvider } from '@/context/BookingModalContext';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <BookingModalProvider>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="min-h-screen pb-16 sm:pb-0">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
      <GlobalBookingModal />
    </BookingModalProvider>
  );
}
