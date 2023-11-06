import React from 'react';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { motion } from 'framer-motion';

interface ICarouselUnderlineProps {
  classNames?: {
    wrapper?: string;
    swiperSlide?: string;
  };
  config?: SwiperProps;
  items: { key: string; slide: React.ReactNode }[] | undefined;
}
export const CarouselUnderline = ({
  items,
  classNames,
  config,
}: ICarouselUnderlineProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(1);

  return (
    <div className={classNames?.wrapper}>
      <Swiper
        {...config}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(slide) => {
          setCurrentSlide(slide.activeIndex + 1);
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide className={classNames?.swiperSlide} key={index}>
            {item.slide}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-[12px] relative transition-all w-full h-[2px] bg-[#17171726]">
        <motion.div
          style={{ width: `${100 / (items?.length || 0)}%` }}
          animate={{
            left: `${(100 / (items?.length || 0)) * (currentSlide - 1)}%`,
          }}
          className={`absolute h-full bg-black`}
        ></motion.div>
      </div>
    </div>
  );
};
