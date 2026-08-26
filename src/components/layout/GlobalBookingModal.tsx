import { Modal } from '@/components/ui/Modal';
import { BookingSelector } from '@/components/sections/BookingSelector';
import { useBookingModal } from '@/context/BookingModalContext';

export function GlobalBookingModal() {
  const { isOpen, closeBookingModal } = useBookingModal();

  return (
    <Modal isOpen={isOpen} onClose={closeBookingModal} title="Rezervă acum">
      <p className="mb-5 text-sm text-ink-500">Alege serviciul și continuă în mai puțin de un minut.</p>
      <BookingSelector onNavigate={closeBookingModal} />
    </Modal>
  );
}
