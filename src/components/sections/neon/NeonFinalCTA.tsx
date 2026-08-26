import { PartyPopper, Gamepad2, GraduationCap, Truck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CircuitTraces } from '@/components/effects/CircuitTraces';

const ctas = [
  {
    label: 'Rezervă Loc de joacă',
    href: '/loc-de-joaca/tarife-program/',
    icon: Gamepad2,
    className: '!bg-neon-cyan !text-void shadow-neon-cyan hover:!bg-white',
  },
  {
    label: 'Rezervă petrecere',
    href: '/petreceri-vr/pachete/',
    icon: PartyPopper,
    className: '!bg-neon-magenta !text-white shadow-neon-magenta hover:!brightness-110',
  },
  {
    label: 'Solicită Arena VR mobilă',
    href: '/arena-vr-mobila/solicita-oferta/',
    icon: Truck,
    className:
      '!border-2 !border-neon-violet !bg-transparent !text-neon-violet-soft hover:!bg-neon-violet/15',
  },
  {
    label: 'Solicită informații Afterschool',
    href: '/afterschool/inscrieri/',
    icon: GraduationCap,
    className:
      '!border-2 !border-white !bg-transparent !text-white hover:!bg-white hover:!text-void',
  },
];

/** Closing CTA on the darkest background — the neon signs do the work. */
export function NeonFinalCTA() {
  return (
    <Section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,68,229,0.22),transparent_60%)]"
        aria-hidden="true"
      />
      <CircuitTraces color="#FFFFFF" opacity={0.08} animated />

      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-display-md font-extrabold text-white">
            Gata să <span className="neon-text-magenta">începem</span>?
          </h2>
          <p className="mt-4 text-lg text-white/65">
            Alege traseul potrivit familiei tale — durează mai puțin de un minut.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {ctas.map((cta) => (
            <Button
              key={cta.href}
              to={cta.href}
              size="lg"
              icon={<cta.icon className="h-5 w-5" />}
              iconPosition="left"
              fullWidth
              className={cta.className}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </Section>
  );
}
