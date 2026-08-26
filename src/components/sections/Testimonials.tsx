import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/testimonials';
import 'swiper/css';
import 'swiper/css/pagination';

export function Testimonials() {
  return (
    <Section className="bg-ink-950">
      <h2 className="mb-10 text-center font-heading text-display-md font-extrabold text-white">Ce spun părinții</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id} className="h-auto">
            <figure className="flex h-full flex-col rounded-3xl bg-white/5 p-6 sm:p-7 backdrop-blur">
              <div className="mb-3 flex gap-1" aria-hidden="true">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm sm:text-base leading-relaxed text-white/90">“{t.quote}”</blockquote>
              <figcaption className="mt-5">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-white/50">{t.role}</p>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
