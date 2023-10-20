import React from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import { CarouselInfo } from '@/entities/mainPage';
import { ChevronLeft, ChevronRight } from 'react-feather';

SwiperCore.use([Navigation, Pagination, EffectFade]);

interface FadeEffectCarouselProps {
  images: string[];
  title?: string;
  description?: string;
  buttonText?: string;
}

const renderCustomBullet = (index: number, className: string) => {
  return `<span key=${index} class="!w-[80px] !h-[4px] !bg-[#171717] !rounded-none
  ${className} 
  "></span>`;
};

export const FadeEffectCarousel: React.FC<FadeEffectCarouselProps> = ({
  images,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="w-full h-[584px] relative overflow-hidden">
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
          renderBullet: renderCustomBullet,
        }}
        loop
        speed={500}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-[584px] object-cover"
              src={image}
              alt={`Slide ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="absolute top-1/2 left-[20px] -translate-y-1/2 flex items-center justify-center text-[18px] w-[72px] h-[72px] bg-[#171717] text-[#fff] border-none rounded-full cursor-pointer z-10 swiper-prev">
        <ChevronLeft size={40} />
      </button>

      <button className="absolute top-1/2 right-[20px] -translate-y-1/2 flex items-center justify-center text-[18px] w-[72px] h-[72px] bg-[#171717] text-[#fff] border-none rounded-full cursor-pointer z-10 swiper-next">
        <ChevronRight size={40} />
      </button>

      <div className="!w-max !bottom-[15%] !left-[12%] md:!bottom-[10px] md:!left-[10px] swiper-pagination" />
    </div>
  );
};
