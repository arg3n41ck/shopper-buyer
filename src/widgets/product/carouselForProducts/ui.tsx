import React from 'react';
import SwiperCore from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { ChevronRight } from 'react-feather';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductCard } from '@/entities/product';
import 'swiper/css/bundle';
import { Button } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import {HorizontalCarousel} from "@/shared/ui/carousels";

SwiperCore.use([Navigation, Pagination]);

interface ExtraInfo {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}

interface Product {
  name: string;
  description: string;
  image: string;
}

interface CarouselProductProps {
  products: Product[];
  uniqueCarouselId: string;
  extraInfo?: ExtraInfo;
}

export const CarouselProducts: React.FC<CarouselProductProps> = ({
  products,
  uniqueCarouselId,
  extraInfo = null,
}) => {
  return (
    <div className="flex flex-col gap-[40px]">
      {extraInfo && (
        <div className="w-full flex justify-between items-start">
          <div>
            {extraInfo.title && (
              <p className="text-black text-[32px] font-medium">
                {extraInfo.title}
              </p>
            )}

            {extraInfo.description && (
              <p className="text-gray-600 text-[16px] font-normal">
                {extraInfo.description}
              </p>
            )}
          </div>

          {extraInfo.buttonText && uniqueCarouselId !== 'looks-products' && (
            <div className="block md:hidden">
              <Button
                variant={BUTTON_STYLES.withoutBackground}
                onClick={extraInfo.onClick}
              >
                {extraInfo.buttonText}
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 relative">
        <HorizontalCarousel uniqueCarouselId={uniqueCarouselId}>
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </HorizontalCarousel>
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center">
          {extraInfo?.buttonText && (
            <Button
              variant={BUTTON_STYLES.withoutBackground}
              onClick={extraInfo.onClick}
            >
              {extraInfo.buttonText}
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
