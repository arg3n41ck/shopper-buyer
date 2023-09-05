import React from 'react';
import SwiperCore from 'swiper';
import { SwiperSlide } from 'swiper/react';
import {
  SlideContainer,
  SliderHeaderContainer,
  SliderHeaderMainText,
  SliderHeaderDescriptionText,
  CarouselContainer,
  MobileStyleOfButton,
} from './styles';
import { ChevronRight } from 'react-feather';
import { Navigation, Pagination } from 'swiper/modules';
import { CustomButtonWithBackground } from '@/shared/ui/buttonWithoutBackground';
import { ProductCard } from '@/entities/product';
import { HorizontalCarousel } from '@/feautures/mainPage';
import 'swiper/css/bundle';
import { LaptopVersion, MobileVersion } from '@/shared/styles/styles';

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
    <CarouselContainer>
      {extraInfo && (
        <SliderHeaderContainer>
          <div>
            {extraInfo?.title && (
              <SliderHeaderMainText>{extraInfo.title}</SliderHeaderMainText>
            )}

            {extraInfo?.description && (
              <SliderHeaderDescriptionText>
                {extraInfo.description}
              </SliderHeaderDescriptionText>
            )}
          </div>

          {extraInfo?.buttonText && uniqueCarouselId !== 'looks-products' && (
            <LaptopVersion>
              <CustomButtonWithBackground onClick={extraInfo.onClick}>
                {extraInfo.buttonText}
                <ChevronRight />
              </CustomButtonWithBackground>
            </LaptopVersion>
          )}
        </SliderHeaderContainer>
      )}

      <SlideContainer className="mt-8">
        <HorizontalCarousel uniqueCarouselId={uniqueCarouselId}>
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))}
        </HorizontalCarousel>
      </SlideContainer>

      <MobileVersion>
        <MobileStyleOfButton>
          {extraInfo?.buttonText && (
            <CustomButtonWithBackground onClick={extraInfo.onClick}>
              {extraInfo.buttonText}
              <ChevronRight />
            </CustomButtonWithBackground>
          )}
        </MobileStyleOfButton>
      </MobileVersion>
    </CarouselContainer>
  );
};
