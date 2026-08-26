import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';

/** Floating WhatsApp button, hidden on mobile where the action bar already offers it. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
      className="fixed bottom-6 right-6 z-40 hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lift transition-transform hover:scale-110 animate-pulse-soft"
      aria-label="Contactează-ne pe WhatsApp"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
