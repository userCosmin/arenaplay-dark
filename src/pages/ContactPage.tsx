import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema } from '@/utils/structuredData';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig, telUrl, whatsappUrl, mailUrl } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contactează Arena Play: adresă, telefon, WhatsApp, program de funcționare, hartă și formular de contact rapid."
        path="/contact/"
      />
      <JsonLd data={localBusinessSchema()} />
      <PageHero
        eyebrow="Contact"
        title="Hai să vorbim"
        subtitle="Adresă, telefon, WhatsApp și program — totul într-un singur loc."
        accent="playground"
        breadcrumbs={[{ label: 'Contact', href: '/contact/' }]}
      />

      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Card className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <h2 className="font-heading font-bold text-ink-900">Adresă</h2>
                <p className="mt-1 text-ink-600">{siteConfig.address.full}</p>
                <Button
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="mt-2 !px-0 text-brand-600"
                  onClick={() => trackEvent('map_click', { source: 'contact_page' })}
                >
                  Deschide harta
                </Button>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <h2 className="font-heading font-bold text-ink-900">Program</h2>
                {siteConfig.openingHours.playground.map((entry) => (
                  <p key={entry.days} className="mt-1 text-ink-600">
                    {entry.days}: <span className="font-semibold text-ink-900">{entry.hours}</span>
                  </p>
                ))}
                <p className="mt-2 text-sm text-ink-400">Afterschool: Luni–Vineri, {siteConfig.openingHours.afterschool[0].hours}</p>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <h2 className="font-heading font-bold text-ink-900">Telefon & WhatsApp</h2>
                <a href={telUrl()} onClick={() => trackEvent('phone_click', { source: 'contact_page' })} className="mt-1 block text-ink-600 hover:text-brand-600">
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                  className="mt-1 flex items-center gap-1.5 text-green-600 hover:text-green-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Scrie pe WhatsApp
                </a>
              </div>
            </Card>

            <Card className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <h2 className="font-heading font-bold text-ink-900">E-mail</h2>
                <a href={mailUrl()} onClick={() => trackEvent('email_click', { source: 'contact_page' })} className="mt-1 block text-ink-600 hover:text-brand-600">
                  {siteConfig.contact.email}
                </a>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <iframe
                title="Locație Arena Play pe Google Maps"
                src={siteConfig.address.googleMapsEmbedSrc}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Card>
              <h2 className="mb-5 font-heading text-xl font-bold text-ink-900">Trimite-ne un mesaj</h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
