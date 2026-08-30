import type { GalleryVideo } from '@/types';

const CDN = 'https://pub-4e7e1030054b4b2cbda4aa2312ae0024.r2.dev';

/** Decorative hero footage. All muted and looped — see VideoBackdrop. */
export const heroVideos = {
  home: `${CDN}/arenaplay-1.mp4`,
  petreceri: `${CDN}/aniversare-arena-play-2-web.mp4`,
  afterschool: `${CDN}/arenaplay-afterschool.mp4`,
} as const;

/**
 * "Momente Arena Play" reel. Played without sound, so labels carry the
 * meaning — they are the accessible name and the visible caption.
 */
export const galleryVideos: GalleryVideo[] = [
  { id: 'aniversare-6', src: `${CDN}/aniversare-arena-play-6.mp4`, label: 'Aniversare la Arena Play' },
  { id: 'aniversare-2', src: `${CDN}/aniversare-arena-play-2-web.mp4`, label: 'Petrecere cu prietenii' },
  { id: 'video-1', src: `${CDN}/arenaplay-video-1.mp4`, label: 'Zona de joacă Arena Play' },
  { id: 'video-2', src: `${CDN}/arenaplay-video-2.mp4`, label: 'Sesiune VR în arena principală' },
  { id: 'video-3', src: `${CDN}/arenaplay-video-3.mp4`, label: 'Joc în echipă cu căști VR' },
  { id: 'video-5', src: `${CDN}/arenaplay-video-5.mp4`, label: 'Experiență VR la Arena Play' },
  { id: 'video-6', src: `${CDN}/arenaplay-video-6.mp4`, label: 'Copii în timpul unei sesiuni de joc' },
];
