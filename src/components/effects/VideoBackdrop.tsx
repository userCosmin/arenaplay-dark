import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

interface VideoBackdropProps {
  /** Absolute URL to a muted, loopable MP4 (H.264/AAC). */
  src: string;
  /**
   * Darkening applied over the footage. Hero copy sits on top, so this is
   * what keeps text legible against a moving image.
   */
  overlayClassName?: string;
  className?: string;
}

/** Browsers that ship the Network Information API expose this on navigator. */
interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Decorative full-bleed video backdrop.
 *
 * Playback is kept cheap so it never competes with the page:
 * - decoding stops whenever the hero scrolls away or the tab is hidden
 * - the clip fades in only once it can actually play, so there is no black
 *   flash or stutter on first paint — whatever sits behind shows until then
 * - it is skipped entirely for reduced-motion users and on metered or slow
 *   connections, where a background video is pure cost
 *
 * Always muted: hero video with sound is blocked by autoplay policies anyway.
 */
export function VideoBackdrop({ src, overlayClassName = 'bg-ink-950/55', className }: VideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide once whether playing video here is appropriate at all.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

    setEnabled(true);
  }, []);

  // Only decode while actually on screen and in a visible tab.
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;

    let onScreen = false;

    const sync = () => {
      if (onScreen && !document.hidden) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 }
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none',
          ready ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className={cn('absolute inset-0', overlayClassName)} />
    </div>
  );
}
