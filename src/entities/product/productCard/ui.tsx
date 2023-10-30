import React from 'react';
import Image from 'next/image';
import { Heart } from 'react-feather';
import { Product } from '@/shared/api/gen';
import cn from 'classnames';

interface ProductCardProps {
  item: Product;
  imageSize?: { w?: number; h?: number };
  classNames?: { wrapper?: string; image?: string };
}

export const ProductCard = ({
  item,
  imageSize,
  classNames,
}: ProductCardProps) => {
  return (
    <div
      className={cn(
        'relative grid justify-center grid-gap-[4px] grid-rows-[1fr_auto]',
        classNames?.wrapper,
      )}
    >
      <div className="absolute right-[8px] top-[8px] cursor-pointer">
        <Heart fill="#B91C1C" color="#B91C1C" />
      </div>

      <div className="absolute top-[3px] left-[0] bg-[#B91C1C] py-[2px] px-[8px] text-[#fff] text-sm font-medium">
        -35%
      </div>

      <Image
        src={
          item?.variants?.[0]?.images?.[0]?.image ||
          'https://www.gamewallpapers.com/members/getphonewallpaper.php?lowquality=1&titel=Sekiro%3A+Shadows+Die+Twice&nummer=04&phoneResId=3502&wallpaperType=vertical&qhdbeschikbaar=1&wallpaper_id=7036'
        }
        className={cn('h-full object-contain self-center', classNames?.image)}
        width={imageSize?.w || 288}
        height={imageSize?.h || 360}
        alt={`Slide ${item?.variants?.[0]?.title}`}
        priority
      />

      <div className="flex self-end flex-col">
        <p className="text-gray-600 text-sm font-normal">{item.title}</p>

        <p className="text-black text-xl font-semibold">{item.title}</p>

        <p className="text-gray-700 text-base font-normal">
          {item.description}
        </p>

        <p className="mt-1 text-black text-base font-semibold">от 18000 сом</p>
      </div>
    </div>
  );
};
