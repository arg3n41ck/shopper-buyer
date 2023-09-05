import React, { ReactNode } from 'react';
import SwiperCore from 'swiper';
import { Swiper } from 'swiper/react';
import { CustomPrevButton, CustomNextButton } from './styles';
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

      <CustomPrevButton
        className={`product-carousel-slider-prev-${uniqueCarouselId}`}
      >
        <ChevronLeft size={40} />
      </CustomPrevButton>

      <CustomNextButton
        className={`product-carousel-slider-next-${uniqueCarouselId}`}
      >
        <ChevronRight size={40} />
      </CustomNextButton>
    </>
  );
};
