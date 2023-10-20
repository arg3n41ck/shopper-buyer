import React from 'react';
import { ArrowRight } from 'react-feather';
import Image from 'next/image';

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
    <div className="w-1/2 md:w-full h-full md:h-[43%] absolute md:bottom-0 md:p-[10px] z-[2] flex flex-col justify-center pl-[12%] bg-opacity-70 bg-[#fff]">
      <Image
        src="/lacoste.png"
        alt="Shops Logo"
        width={132}
        height={64}
        className="w-[132px] h-[64px] object-contain md:w-[58px] md:h-[28px]"
      />

      {title && (
        <h2 className="text-[40px] font-semibold text-[#000] mt-[32px] md:mt-5 md:text-[20px]">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[20px] font-normal text-[#676767] mt-[12px] md:mt-0 md:text-[16px]">
          {description}
        </p>
      )}
      {buttonText && (
        <div className="flex items-center gap-[5px] cursor-pointer mt-[32px] md:mt-0">
          <button className="text-[20px] font-semibold text-[#000]">
            {buttonText}
          </button>
          <ArrowRight size={24} />
        </div>
      )}
    </div>
  );
};
