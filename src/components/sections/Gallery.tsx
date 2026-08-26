import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Section } from '@/components/ui/Section';
import { galleryImages } from '@/data/gallery';
import type { ServiceSlug } from '@/types';
import 'swiper/css';

interface GalleryProps {
  category?: ServiceSlug;
  title?: string;
}

export function Gallery({ category, title = 'Galerie' }: GalleryProps) {
  const images = category ? galleryImages.filter((img) => img.category === category) : galleryImages;

  return (
    <Section className="bg-white">
      <h2 className="mb-10 font-heading text-display-md font-extrabold text-ink-900">{title}</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.15}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.3 } }}
        className="!overflow-visible"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-ink-100">
              <img src={image.src} alt={image.alt} loading="lazy" width={640} height={480} className="h-full w-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
