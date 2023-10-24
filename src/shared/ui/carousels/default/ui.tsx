import React from 'react';
import { FadeEffectCarousel } from "@/shared/ui/carousels";

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
    <div className="relative overflow-x-hidden">
      <FadeEffectCarousel
        images={images}
        title={title}
        description={description}
        buttonText={buttonText}
      />
    </div>
  );
};
