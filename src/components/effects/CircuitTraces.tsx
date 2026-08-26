import { cn } from '@/utils/cn';

interface CircuitTracesProps {
  /** Stroke color of the traces. Defaults to a soft white, as painted on the venue walls. */
  color?: string;
  /** 0–1. The wall art is high-contrast; overlays behind text should sit lower. */
  opacity?: number;
  /** Animate the dashes travelling along the traces. */
  animated?: boolean;
  className?: string;
}

/**
 * Printed-circuit-board line art — the signature motif painted across the
 * Arena Play walls and taped onto the play-area floor.
 *
 * Right-angle and 45-degree runs terminating in solder pads, exactly as in
 * the venue. Purely decorative, so it is hidden from assistive tech.
 */
export function CircuitTraces({ color = '#FFFFFF', opacity = 0.14, animated = false, className }: CircuitTracesProps) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Upper-left bus heading right, stepping down */}
        <path d="M-20 90 H180 L230 140 H420 L470 90 H620" />
        <path d="M-20 150 H140 L200 210 H360" />

        {/* Central spine with branch drops */}
        <path d="M620 90 L680 150 H900 L960 90 H1220" />
        <path d="M760 150 V260 L810 310 H1080" />
        <path d="M480 300 H700 L760 360 H980 L1030 410 H1220" />

        {/* Lower-left cluster */}
        <path d="M-20 420 H120 L180 480 H340 L390 430 H560" />
        <path d="M120 480 V560" />
        <path d="M240 300 L300 240 H460" />

        {/* Right-edge verticals */}
        <path d="M1080 310 V200 L1140 140" />
        <path d="M980 360 V440 L1040 500 H1220" />

        {/* Short stubs, as on the wall */}
        <path d="M300 120 V60" />
        <path d="M880 470 V530" />
        <path d="M560 430 V500 H660" />
      </g>

      {/* Solder pads — filled discs and rings terminate the runs */}
      <g fill={color}>
        <circle cx="180" cy="90" r="7" />
        <circle cx="620" cy="90" r="7" />
        <circle cx="360" cy="210" r="7" />
        <circle cx="760" cy="150" r="7" />
        <circle cx="1080" cy="310" r="7" />
        <circle cx="120" cy="560" r="7" />
        <circle cx="660" cy="500" r="7" />
        <circle cx="460" cy="240" r="7" />
      </g>
      <g stroke={color} strokeWidth="2.5" fill="none">
        <circle cx="300" cy="60" r="9" />
        <circle cx="880" cy="530" r="9" />
        <circle cx="1140" cy="140" r="9" />
        <circle cx="560" cy="430" r="9" />
        <circle cx="340" cy="480" r="9" />
      </g>

      {/* Travelling pulses along the main bus, echoing the lit floor tape */}
      {animated && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="14 380">
          <path className="animate-trace-flow" d="M-20 90 H180 L230 140 H420 L470 90 H620 L680 150 H900 L960 90 H1220" />
          <path className="animate-trace-flow" style={{ animationDelay: '-6s' }} d="M480 300 H700 L760 360 H980 L1030 410 H1220" />
        </g>
      )}
    </svg>
  );
}
