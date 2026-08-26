import { Home } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Pagina nu a fost găsită" description="Pagina căutată nu există sau a fost mutată." path="/404" noindex />
      <Section className="flex min-h-[70vh] flex-col items-center justify-center bg-white text-center">
        <p className="font-heading text-8xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900">Pagina nu a fost găsită</h1>
        <p className="mt-2 max-w-md text-ink-500">Ne pare rău, pagina pe care o cauți nu există sau a fost mutată.</p>
        <Button to="/" size="lg" className="mt-8" icon={<Home className="h-4 w-4" />} iconPosition="left">
          Înapoi acasă
        </Button>
      </Section>
    </>
  );
}
