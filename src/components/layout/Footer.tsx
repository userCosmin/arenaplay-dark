import { Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Youtube, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Logo } from './Logo';
import { footerQuickLinks } from '@/data/navigation';
import { siteConfig, telUrl, whatsappUrl, mailUrl } from '@/config/site.config';
import { trackEvent } from '@/utils/analytics';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 pb-24 pt-16 text-ink-300 sm:pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark className="mb-4" />
            <p className="max-w-xs text-sm leading-relaxed text-ink-400">{siteConfig.brand.description}</p>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arena Play pe Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-500"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arena Play pe Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-500"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arena Play pe YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-brand-500"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Linkuri rapide</h3>
            <ul className="flex flex-col gap-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={siteConfig.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('map_click', { source: 'footer' })}
                  className="hover:text-white"
                >
                  {siteConfig.address.full}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={telUrl()} onClick={() => trackEvent('phone_click', { source: 'footer' })} className="hover:text-white">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'footer' })}
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                <a href={mailUrl()} onClick={() => trackEvent('email_click', { source: 'footer' })} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wide text-white">Program</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {siteConfig.openingHours.playground.map((entry) => (
                <li key={entry.days} className="flex justify-between gap-4">
                  <span>{entry.days}</span>
                  <span className="text-white">{entry.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 overflow-hidden rounded-2xl">
              <iframe
                title="Locație Arena Play pe Google Maps"
                src={siteConfig.address.googleMapsEmbedSrc}
                width="100%"
                height="140"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500">
            Conform legislației privind protecția consumatorilor, aveți dreptul de a depune o
            plângere sau de a solicita soluționarea online a unui eventual litigiu:
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.legal.odrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              aria-label="Platforma europeană de soluționare online a litigiilor (ODR) - se deschide într-o filă nouă"
            >
              <Scale className="h-4 w-4 text-brand-400" aria-hidden="true" />
              SOL — Soluționarea online a litigiilor
            </a>
            <a
              href={siteConfig.legal.anpcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              aria-label="Autoritatea Națională pentru Protecția Consumatorilor (ANPC) - se deschide într-o filă nouă"
            >
              <ShieldCheck className="h-4 w-4 text-brand-400" aria-hidden="true" />
              ANPC
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>
            © {year} {siteConfig.brand.legalName}. Toate drepturile rezervate.
          </p>
          <div className="flex gap-4">
            <Link to="/contact/" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
