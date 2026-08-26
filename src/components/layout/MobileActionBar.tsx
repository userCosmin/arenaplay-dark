import { Phone, MessageCircle, CalendarCheck } from 'lucide-react';
import { siteConfig, telUrl, whatsappUrl } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';
import { useBookingModal } from '@/context/BookingModalContext';

/** Fixed bottom action bar for mobile: SUNĂ | WHATSAPP | REZERVĂ. */
export function MobileActionBar() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex sm:hidden border-t border-ink-100 bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(20,23,42,0.08)]">
      <a
        href={telUrl()}
        onClick={() => trackEvent('phone_click', { source: 'mobile_action_bar' })}
        className="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-ink-700"
        aria-label={`Sună la ${siteConfig.contact.phoneDisplay}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span className="text-[11px] font-semibold">Sună</span>
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { source: 'mobile_action_bar' })}
        className="flex flex-1 flex-col items-center gap-0.5 border-x border-ink-100 py-2.5 text-green-600"
        aria-label="Scrie pe WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="text-[11px] font-semibold">WhatsApp</span>
      </a>
      <button
        type="button"
        onClick={openBookingModal}
        className="flex flex-1 flex-col items-center gap-0.5 bg-brand-500 py-2.5 text-white"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        <span className="text-[11px] font-display font-semibold">Rezervă</span>
      </button>
    </div>
  );
}
