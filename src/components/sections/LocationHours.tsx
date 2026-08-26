import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { siteConfig, telUrl, whatsappUrl } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';

export function LocationHours() {
  return (
    <Section className="bg-ink-50">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-heading text-display-md font-extrabold text-ink-900">Locație &amp; Program</h2>
          <p className="mt-4 max-w-md text-ink-500">Te așteptăm în locația noastră sau venim noi la tine, prin Arena VR mobilă.</p>

          <div className="mt-8 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink-900">Adresă</p>
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('map_click', { source: 'homepage_location' })}
                  className="text-ink-500 hover:text-brand-600"
                >
                  {siteConfig.address.full}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-ink-900">Program Loc de joacă</p>
                {siteConfig.openingHours.playground.map((entry) => (
                  <p key={entry.days} className="text-ink-500">
                    {entry.days}: <span className="font-medium text-ink-800">{entry.hours}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={telUrl()} variant="outline" accent="ink" icon={<Phone className="h-4 w-4" />} onClick={() => trackEvent('phone_click', { source: 'homepage_location' })}>
              {siteConfig.contact.phoneDisplay}
            </Button>
            <Button
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              accent="brand"
              icon={<MessageCircle className="h-4 w-4" />}
              onClick={() => trackEvent('whatsapp_click', { source: 'homepage_location' })}
            >
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-card">
          <iframe
            title="Locație Arena Play pe Google Maps"
            src={siteConfig.address.googleMapsEmbedSrc}
            width="100%"
            height="380"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
