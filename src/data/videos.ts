import type { GalleryVideo } from '@/types';

const CDN = 'https://pub-4e7e1030054b4b2cbda4aa2312ae0024.r2.dev';

/**
 * Footage shot on location, served from Cloudflare R2.
 *
 * Labels double as the accessible name for each clip, so keep them
 * descriptive rather than decorative.
 */
/** Decorative hero footage for the Petreceri VR pages. Muted, looped. */
export const petreceriHeroVideo = `${CDN}/aniversare-arena-play-2-web.mp4`;

export const galleryVideos: GalleryVideo[] = [
  { id: 'v2', src: `${CDN}/arenaplay-video-2.mp4`, label: 'Sesiune VR în arena principală' },
  { id: 'v12', src: `${CDN}/arenaplay-video-12.mp4`, label: 'Joc în echipă cu căști VR' },
  { id: 'v17', src: `${CDN}/arenaplay-video-17.mp4`, label: 'Copii în timpul unei sesiuni de joc' },
  { id: 'v1', src: `${CDN}/arenaplay-video-1.mp4`, label: 'Zona de joacă Arena Play' },
  { id: 'v13', src: `${CDN}/arenaplay-video-13.mp4`, label: 'Momente din timpul unei petreceri' },
  { id: 'v5', src: `${CDN}/arenaplay-video-5.mp4`, label: 'Experiență VR la Arena Play' },
];
