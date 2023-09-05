import React from 'react';
import { CarouselContainer } from './styles';
import { FadeEffectCarousel } from '@/feautures/mainPage';

interface CarouselProps {
  images: string[];
  title?: string;
  description?: string;
  buttonText?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  title,
  description,
  buttonText,
}) => {
  return (
    <CarouselContainer>
      <FadeEffectCarousel
        images={images}
        title={title}
        description={description}
        buttonText={buttonText}
      />
    </CarouselContainer>
  );
};
