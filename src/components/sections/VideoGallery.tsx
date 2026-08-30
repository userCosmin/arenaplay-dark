import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Section } from '@/components/ui/Section';
import { galleryVideos } from '@/data/videos';
import type { GalleryVideo } from '@/types';
import 'swiper/css';
import 'swiper/css/navigation';

interface VideoGalleryProps {
  title?: string;
  /** Defaults to the homepage sequence; pages pass their own ordering. */
  videos?: GalleryVideo[];
}

/**
 * Silent video reel of footage shot at the venue.
 *
 * Playback is deliberately conservative: nothing downloads beyond metadata
 * until a clip scrolls into view, and clips pause the moment they leave.
 * Across seven files that is the difference between a few hundred KB and
 * tens of MB on first paint.
 *
 * The clips have no sound by design, so there is no audio control — muted
 * is also what lets them autoplay at all under browser policy.
 */
export function VideoGallery({ title = 'Galerie', videos = galleryVideos }: VideoGalleryProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  // Play only what is actually on screen.
  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Autoplay can still be refused; ignore the rejection rather than
            // surfacing an unhandled promise.
            void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    const current = videoRefs.current.filter(Boolean) as HTMLVideoElement[];
    current.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [reducedMotion, videos]);

  return (
    <Section className="bg-white">
      <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">{title}</h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.3 } }}
        navigation
        grabCursor
        touchEventsTarget="container"
        style={
          {
            '--swiper-navigation-color': '#ffffff',
            '--swiper-navigation-size': '26px',
          } as CSSProperties
        }
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                aria-label={video.label}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                controls={reducedMotion}
                // The video would otherwise swallow the drag gesture before
                // Swiper ever sees it, leaving the carousel stuck.
                className={`h-full w-full object-cover ${reducedMotion ? '' : 'pointer-events-none'}`}
              />

              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
                {video.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
