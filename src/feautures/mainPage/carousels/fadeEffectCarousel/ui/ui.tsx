import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import {
  SlideContainer,
  SlideImage,
  CustomPrevButton,
  CustomNextButton,
  CustomPagination,
} from './styles';
import { CarouselInfo } from '@/entities/mainPage';
import { ChevronLeft, ChevronRight } from 'react-feather';

SwiperCore.use([Navigation, Pagination, EffectFade]);

interface FadeEffectCarouselProps {
  images: string[];
  title?: string;
  description?: string;
  buttonText?: string;
}

export const FadeEffectCarousel: React.FC<FadeEffectCarouselProps> = ({
  images,
  title,
  description,
  buttonText,
}) => {
  return (
    <SlideContainer>
      <CarouselInfo
        title={title}
        description={description}
        buttonText={buttonText}
      />

      <Swiper
        effect="fade"
        navigation={{
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
        }}
        loop
        speed={500}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <SlideImage src={image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <CustomPrevButton className="swiper-prev">
        <ChevronLeft size={40} />
      </CustomPrevButton>

      <CustomNextButton className="swiper-next">
        <ChevronRight size={40} />
      </CustomNextButton>

      <CustomPagination className="swiper-pagination" />
    </SlideContainer>
  );
};
