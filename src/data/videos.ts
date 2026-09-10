import type { GalleryVideo } from '@/types';

const CDN = 'https://pub-4e7e1030054b4b2cbda4aa2312ae0024.r2.dev';

/** Decorative hero footage. All muted and looped — see VideoBackdrop. */
export const heroVideos = {
  home: `${CDN}/arenaplay-1.mp4`,
  petreceri: `${CDN}/aniversare-arena-play-2-web.mp4`,
  afterschool: `${CDN}/arenaplay-afterschool.mp4`,
  playground: `${CDN}/aniversare-arena-play-6.mp4`,
} as const;

/**
 * The reel clips, defined once. Played without sound, so labels carry the
 * meaning — they are the accessible name and the visible caption.
 */
const clips: Record<string, GalleryVideo> = {
  'aniversare-6': { id: 'aniversare-6', src: `${CDN}/aniversare-arena-play-6.mp4`, label: 'Aniversare la Arena Play' },
  'aniversare-2': { id: 'aniversare-2', src: `${CDN}/aniversare-arena-play-2-web.mp4`, label: 'Petrecere cu prietenii' },
  'video-1': { id: 'video-1', src: `${CDN}/arenaplay-video-1.mp4`, label: 'Zona de joacă Arena Play' },
  'video-2': { id: 'video-2', src: `${CDN}/arenaplay-video-2.mp4`, label: 'Sesiune VR în arena principală' },
  'video-5': { id: 'video-5', src: `${CDN}/arenaplay-video-5.mp4`, label: 'Experiență VR la Arena Play' },
  'video-6': { id: 'video-6', src: `${CDN}/arenaplay-video-6.mp4`, label: 'Copii în timpul unei sesiuni de joc' },
};

/** Throws at module load if an id is misspelled, rather than silently dropping a clip. */
function order(...ids: string[]): GalleryVideo[] {
  return ids.map((id) => {
    const clip = clips[id];
    if (!clip) throw new Error(`Unknown gallery clip: ${id}`);
    return clip;
  });
}

/**
 * The same six clips, deliberately sequenced differently per page so a
 * visitor moving between them does not meet the identical reel each time.
 */
export const galleryVideos = order('aniversare-6', 'aniversare-2', 'video-1', 'video-2', 'video-5', 'video-6');

export const playgroundGalleryVideos = order('video-2', 'video-6', 'aniversare-6', 'video-5', 'video-1', 'aniversare-2');

export const petreceriGalleryVideos = order('aniversare-2', 'video-5', 'video-2', 'aniversare-6', 'video-6', 'video-1');

export const despreNoiGalleryVideos = order('aniversare-6', 'video-1', 'video-5', 'aniversare-2', 'video-6', 'video-2');
