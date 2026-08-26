import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { galleryVideos } from '@/data/videos';
import 'swiper/css';

interface VideoGalleryProps {
  title?: string;
}

/**
 * Video reel of footage shot at the venue.
 *
 * Playback is deliberately conservative: nothing downloads beyond metadata
 * until a clip scrolls into view, and clips pause the moment they leave.
 * With six files on the page that is the difference between a few hundred KB
 * and tens of MB on first paint.
 *
 * Autoplay requires the video to be muted and inline — browsers block it
 * otherwise — so sound is opt-in via the per-clip toggle.
 */
export function VideoGallery({ title = 'Galerie' }: VideoGalleryProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);
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
  }, [reducedMotion]);

  /** Only one clip may carry sound at a time. */
  const toggleSound = (id: string, index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (unmutedId === id) {
      video.muted = true;
      setUnmutedId(null);
      return;
    }

    videoRefs.current.forEach((other) => {
      if (other) other.muted = true;
    });
    video.muted = false;
    void video.play().catch(() => undefined);
    setUnmutedId(id);
  };

  return (
    <Section className="bg-white">
      <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">{title}</h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={1.15}
        breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.3 } }}
        grabCursor
      >
        {galleryVideos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
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
                controls={reducedMotion}
                className="h-full w-full object-cover"
              />

              {!reducedMotion && (
                <button
                  type="button"
                  onClick={() => toggleSound(video.id, index)}
                  aria-label={unmutedId === video.id ? `Oprește sunetul: ${video.label}` : `Pornește sunetul: ${video.label}`}
                  className="absolute bottom-3 right-3 rounded-full bg-black/55 p-2.5 text-white backdrop-blur transition hover:bg-black/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {unmutedId === video.id ? (
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <VolumeX className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              )}

              <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pr-14 text-sm font-medium text-white">
                {video.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
