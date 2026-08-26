import { motion } from 'framer-motion';
import { Headset, Users, Clock, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema, organizationSchema } from '@/utils/structuredData';
import { CircuitTraces } from '@/components/effects/CircuitTraces';
import { NeonHero } from '@/components/sections/neon/NeonHero';
import { NeonServiceCards } from '@/components/sections/neon/NeonServiceCards';
import { NeonFinalCTA } from '@/components/sections/neon/NeonFinalCTA';
import { WhatAreYouLookingFor } from '@/components/sections/WhatAreYouLookingFor';
import { Testimonials } from '@/components/sections/Testimonials';
import { Gallery } from '@/components/sections/Gallery';
import { LocationHours } from '@/components/sections/LocationHours';
import { FAQSection } from '@/components/sections/FAQSection';

const stats = [
  {
    icon: Headset,
    value: 'VR & XR',
    label: 'Echipamente de ultimă generație',
    tone: 'text-neon-cyan',
  },
  {
    icon: Users,
    value: 'Până la 10',
    label: 'Jucători simultan în arenă',
    tone: 'text-neon-magenta',
  },
  {
    icon: Clock,
    value: '20 min',
    label: 'Durata unei sesiuni de joc',
    tone: 'text-neon-violet-soft',
  },
  { icon: Sparkles, value: '4 servicii', label: 'Sub același acoperiș', tone: 'text-white' },
];

/**
 * Homepage, styled after the physical Arena Play venue: black walls, cyan
 * and magenta neon tubes, violet ambient light and printed-circuit wall art.
 *
 * The whole page sits on one continuous dark surface; the shared content
 * sections are re-skinned to dark by the .neon-page rules in index.css.
 */
export default function HomePage() {
  return (
    <>
      <SEO
        title="Arena Play — Petreceri, Loc de joacă, Afterschool & Arena VR mobilă"
        description="Distracție, experiențe și educație într-un singur loc: petreceri pentru copii, loc de joacă cu XR/VR, afterschool și Arena VR mobilă adusă la tine."
        path="/"
      />
      <JsonLd data={[localBusinessSchema(), organizationSchema()]} />

      {/*
        One continuous surface for the whole page: the void base plus the same
        cyan wash that sits above "Alege experiența". Sections below are
        transparent so this shows through, and .neon-page remaps the shared
        light sections to dark. See index.css.
      */}
      <div className="neon-page relative bg-void-800">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,217,245,0.12),transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <NeonHero />

          {/* Neon stat band — bridges the hero into the service grid */}
          <section className="relative overflow-hidden border-y border-white/10 py-10">
            <CircuitTraces color="#FFFFFF" opacity={0.06} />
            <div className="container-arena relative z-10">
              <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="text-center"
                  >
                    <stat.icon className={`mx-auto mb-3 h-6 w-6 ${stat.tone}`} aria-hidden="true" />
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span
                        className={`block font-display text-2xl font-extrabold sm:text-3xl ${stat.tone}`}
                      >
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-xs text-white/55 sm:text-sm">
                        {stat.label}
                      </span>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </section>

          <NeonServiceCards />

          {/* Shared sections, re-skinned to dark by the .neon-page rules */}
          <WhatAreYouLookingFor />
          <Testimonials />
          <Gallery title="Momente Arena Play" />
          <LocationHours />
          <FAQSection />

          <NeonFinalCTA />
        </div>
      </div>
    </>
  );
}
