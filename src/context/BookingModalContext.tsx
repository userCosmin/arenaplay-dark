import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface BookingModalContextValue {
  isOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<BookingModalContextValue>(
    () => ({
      isOpen,
      openBookingModal: () => setIsOpen(true),
      closeBookingModal: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBookingModal(): BookingModalContextValue {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error('useBookingModal must be used within BookingModalProvider');
  return ctx;
}
