import { useEffect, useRef } from 'react';

interface CursorGlowProps {
  /** Glow color (any valid CSS color) — usually the page's accent color. */
  color: string;
  /** Diameter of the glow, in px. */
  size?: number;
  /** Peak opacity of the glow at its center (0–1). */
  opacity?: number;
  className?: string;
}

/**
 * Soft light that follows the cursor, tinted in the page's accent color —
 * no background texture, just a glow layered on top of whatever's already
 * there. On touch devices (no hover) or reduced-motion, it drifts gently on
 * its own instead of chasing a cursor that doesn't exist.
 *
 * Mouse tracking listens on `window` rather than a parent element: this
 * component is an absolutely positioned `pointer-events: none` layer, so it's
 * never an ancestor of whatever the cursor is actually hovering (page content
 * sits in a sibling element) — window-level listening sidesteps that.
 *
 * Usage: drop `<CursorGlow color="#FF2E93" />` as a child of a
 * `position: relative; overflow: hidden;` container — it fills that container.
 */
export function CursorGlow({ color, size = 560, opacity = 0.4, className = '' }: CursorGlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    let frame = 0;
    let idleId: number | undefined;
    let t = Math.random() * 100;

    const setPos = (x: number, y: number) => {
      root.style.setProperty('--gx', `${x}%`);
      root.style.setProperty('--gy', `${y}%`);
    };

    const startIdleDrift = () => {
      if (reduceMotion) {
        setPos(50, 35);
        return;
      }
      idleId = window.setInterval(() => {
        t += 0.012;
        setPos(50 + Math.sin(t) * 32, 35 + Math.cos(t * 0.8) * 22);
      }, 60);
    };

    const stopIdleDrift = () => {
      if (idleId !== undefined) {
        window.clearInterval(idleId);
        idleId = undefined;
      }
    };

    startIdleDrift();

    if (!canHover || reduceMotion) {
      return () => stopIdleDrift();
    }

    const handleMove = (e: PointerEvent) => {
      stopIdleDrift();
      cancelAnimationFrame(frame);
      const rect = root.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      frame = requestAnimationFrame(() => setPos(x, y));
    };

    window.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      stopIdleDrift();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', handleMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ ['--gx' as string]: '50%', ['--gy' as string]: '35%' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${size}px circle at var(--gx) var(--gy), color-mix(in srgb, ${color} 55%, transparent), transparent 70%)`,
          opacity,
        }}
      />
    </div>
  );
}
