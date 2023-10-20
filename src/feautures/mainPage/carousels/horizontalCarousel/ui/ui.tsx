import React, { ReactNode } from 'react';
import SwiperCore from 'swiper';
import { Swiper } from 'swiper/react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Navigation, Pagination } from 'swiper/modules';

SwiperCore.use([Navigation, Pagination]);

interface CarouselProductProps {
  children: ReactNode;
  uniqueCarouselId: string;
}

export const HorizontalCarousel: React.FC<CarouselProductProps> = ({
  children,
  uniqueCarouselId,
}) => {
  return (
    <>
      <Swiper
        spaceBetween={40}
        navigation={{
          prevEl: `.product-carousel-slider-prev-${uniqueCarouselId}`,
          nextEl: `.product-carousel-slider-next-${uniqueCarouselId}`,
        }}
        breakpoints={{
          578: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {children}
      </Swiper>

      <button
        className={`absolute top-1/2 left-[20px] -translate-y-1/2 flex items-center justify-center text-[18px] w-[72px] h-[72px] bg-[#171717] text-[#fff] border-none rounded-full cursor-pointer z-10 product-carousel-slider-prev-${uniqueCarouselId}`}
      >
        <ChevronLeft size={40} />
      </button>

      <button
        className={`absolute top-1/2 right-[20px] -translate-y-1/2 flex items-center justify-center text-[18px] w-[72px] h-[72px] bg-[#171717] text-[#fff] border-none rounded-full cursor-pointer z-10 product-carousel-slider-next-${uniqueCarouselId}`}
      >
        <ChevronRight size={40} />
      </button>
    </>
  );
};
