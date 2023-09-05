import React from 'react';
import {
  SlideButton,
  SlideDescription,
  SliderTitle,
  SlideButtonBlock,
  CarouselInfoContainer,
  ShopsLogo,
} from './styles';
import { ArrowRight } from 'react-feather';

interface MainCarouselProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export const CarouselInfo: React.FC<MainCarouselProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <CarouselInfoContainer>
      <ShopsLogo src="./lacoste.png" />

      {title && <SliderTitle>{title}</SliderTitle>}
      {description && <SlideDescription>{description}</SlideDescription>}
      {buttonText && (
        <SlideButtonBlock>
          <SlideButton>{buttonText}</SlideButton>
          <ArrowRight />
        </SlideButtonBlock>
      )}
    </CarouselInfoContainer>
  );
};
