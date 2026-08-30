import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CircuitTraces } from '@/components/effects/CircuitTraces';
import { CursorGlow } from '@/components/effects/CursorGlow';
import { VideoBackdrop } from '@/components/effects/VideoBackdrop';
import { heroVideos } from '@/data/videos';

/**
 * Neon-variant hero: black wall, cyan tube signage, magenta accent and the
 * circuit-trace wall art — a direct translation of the venue's main room.
 */
export function NeonHero() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-void pb-16 pt-28 sm:min-h-[78vh] sm:pb-20">
      {/* Footage sits underneath, so the neon washes below still tint it */}
      <VideoBackdrop src={heroVideos.home} overlayClassName="bg-void/70" />

      {/* Ambient neon wash: violet from the left strips, cyan from the ARENA sign */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen bg-[radial-gradient(circle_at_15%_25%,rgba(139,68,229,0.32),transparent_50%),radial-gradient(circle_at_82%_18%,rgba(0,217,245,0.26),transparent_48%),radial-gradient(circle_at_65%_88%,rgba(241,63,208,0.24),transparent_52%)]"
        aria-hidden="true"
      />

      {/* Wall art */}
      <CircuitTraces color="#FFFFFF" opacity={0.16} animated className="hidden sm:block" />

      {/* Vertical neon strips, as flanking the entrance */}
      <div
        className="absolute left-[6%] top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-violet to-transparent opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute left-[9%] top-0 h-full w-px bg-gradient-to-b from-transparent via-neon-magenta to-transparent opacity-40"
        aria-hidden="true"
      />
      <div
        className="absolute right-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-neon-cyan to-transparent opacity-60 lg:block"
        aria-hidden="true"
      />

      {/* Glossy floor reflection */}
      <div className="floor-sheen absolute inset-x-0 bottom-0 h-1/3" aria-hidden="true" />

      <CursorGlow color="#00D9F5" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-1.5 text-sm font-semibold text-neon-cyan backdrop-blur">
            <Zap className="h-4 w-4" aria-hidden="true" />
            Join the game
          </span>

          <h1 className="font-display text-display-xl font-extrabold leading-[1.02]">
            <span className="neon-text-cyan animate-neon-pulse block">JOACĂ.</span>
            <span className="neon-text-magenta block">DISTRACȚIE.</span>
            <span className="block text-white">EDUCAȚIE.</span>
          </h1>

          <p className="mt-5 text-balance font-heading text-lg font-medium text-white/80 sm:text-xl">
            Loc de joacă <span aria-hidden="true">•</span> Petreceri VR{' '}
            <span aria-hidden="true">•</span> Arena VR mobilă <span aria-hidden="true">•</span>{' '}
            Afterschool
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              to="/rezerva/"
              className="!bg-neon-cyan !text-void shadow-neon-cyan hover:!bg-white"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Alege serviciul
            </Button>
            <Button
              size="lg"
              variant="outline"
              to="/contact/"
              className="!border-neon-magenta !text-neon-magenta hover:!bg-neon-magenta/10"
            >
              Contact
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
