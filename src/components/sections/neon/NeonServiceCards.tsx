import { motion } from 'framer-motion';
import { PartyPopper, Gamepad2, GraduationCap, Truck, ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CircuitTraces } from '@/components/effects/CircuitTraces';
import { services } from '@/data/services';
import { cn } from '@/utils/cn';

const iconMap = { PartyPopper, Gamepad2, GraduationCap, Truck };

/** Each service gets its own neon tube colour, mirroring the venue signage. */
const neonSkin: Record<
  string,
  { border: string; glow: string; icon: string; label: string; hoverRing: string }
> = {
  playground: {
    border: 'border-neon-cyan/35',
    glow: 'hover:shadow-neon-cyan',
    icon: 'bg-neon-cyan/15 text-neon-cyan ring-1 ring-neon-cyan/50',
    label: 'text-neon-cyan',
    hoverRing: 'hover:border-neon-cyan',
  },
  petreceri: {
    border: 'border-neon-magenta/35',
    glow: 'hover:shadow-neon-magenta',
    icon: 'bg-neon-magenta/15 text-neon-magenta ring-1 ring-neon-magenta/50',
    label: 'text-neon-magenta',
    hoverRing: 'hover:border-neon-magenta',
  },
  arenamobila: {
    border: 'border-neon-violet/35',
    glow: 'hover:shadow-neon-violet',
    icon: 'bg-neon-violet/15 text-neon-violet-soft ring-1 ring-neon-violet/50',
    label: 'text-neon-violet-soft',
    hoverRing: 'hover:border-neon-violet',
  },
  afterschool: {
    border: 'border-white/45',
    glow: 'hover:shadow-lift',
    icon: 'bg-white/10 text-white ring-1 ring-white/60',
    label: 'text-white',
    hoverRing: 'hover:border-white',
  },
};

/** Dark, neon-lit version of the four primary service cards. */
export function NeonServiceCards() {
  return (
    <Section id="servicii" className="relative overflow-hidden">
      <CircuitTraces color="#FFFFFF" opacity={0.07} />

      <div className="relative z-10">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-heading text-display-md font-extrabold text-white">
            Alege experiența <span className="neon-text-cyan">Arena Play</span>
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Patru trasee clare, pentru fiecare nevoie a familiei tale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            const skin = neonSkin[service.accent];
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  'group flex flex-col rounded-3xl border bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5',
                  skin.border,
                  skin.glow,
                  skin.hoverRing
                )}
              >
                <span
                  className={cn(
                    'mb-5 flex h-12 w-12 items-center justify-center rounded-2xl',
                    skin.icon
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={cn('font-heading text-xl font-bold', skin.label)}>
                  {service.shortLabel}
                </h3>
                <p className="mt-1 text-sm font-semibold text-white/50">{service.tagline}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
                <Button
                  to={service.href}
                  variant="ghost"
                  size="sm"
                  className="mt-5 justify-start !px-0 !text-white hover:!bg-transparent hover:!text-neon-cyan"
                  icon={
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  }
                >
                  Detalii
                </Button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
