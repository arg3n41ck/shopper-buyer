import React, { FC } from 'react';
import Image from 'next/image';
import { Heart } from 'react-feather';

interface ProductCardProps {
  item: any;
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <div className="relative grid justify-center grid-gap-[4px]">
      <div className="absolute right-[3px] top-[3px] cursor-pointer">
        <Heart fill={true && '#B91C1C'} color={true && '#B91C1C'} />
      </div>

      <div className="absolute top-[3px] left-[0] bg-[#B91C1C] py-[2px] px-[8px] text-[#fff] text-sm font-medium">
        -35%
      </div>

      <Image
        src={item.image}
        width={288}
        height={360}
        alt={`Slide ${item.name}`}
        priority
      />

      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-normal">{item.name}</p>

        <p className="text-black text-xl font-semibold">{item.name}</p>

        <p className="text-gray-700 text-base font-normal">
          {item.description}
        </p>

        <p className="mt-1 text-black text-base font-semibold">от 18000 сом</p>
      </div>
    </div>
  );
};
