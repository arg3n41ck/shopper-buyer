import React from 'react';
import Image from 'next/image';
import { Heart } from 'react-feather';
import cn from 'classnames';
import Link from 'next/link';
import { Product } from '@/shared/api/gen';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';

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
  const { data } = useQuery({
    queryKey: ['productsCustomerFavouritesList'],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
  });

  const [isFavourite, setIsFavourite] = React.useState(
    !!data?.results?.find((product) => item?.id == product.product),
  );

  const handleFavourite = async () => {
    if (isFavourite) {
      await $apiProductsApi.productsCustomerFavouritesCreate({
        product: item.id as number,
      });

      setIsFavourite(true);
    } else {
      // await $apiProductsApi.
    }
  };

  return (
    <Link
      href={`/products/${item.slug}`}
      className={cn(
        'relative grid justify-center grid-gap-[4px] grid-rows-[1fr_auto]',
        classNames?.wrapper,
      )}
    >
      <div
        onClick={handleFavourite}
        className="absolute right-[8px] top-[8px] cursor-pointer"
      >
        <Heart fill="#B91C1C" color={isFavourite ? '#B91C1C' : ''} />
      </div>

      {item?.discount ? (
        <div className="absolute top-[3px] left-[0] bg-[#B91C1C] py-[2px] px-[8px] text-[#fff] text-sm font-medium">
          -{item.discount}%
        </div>
      ) : null}

      <Image
        src={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          item?.variants?.[0]?.images?.[0].image ||
          'https://w7.pngwing.com/pngs/365/575/png-transparent-hoodie-t-shirt-tracksuit-sweater-clothing-hoodie-white-hoodie-tracksuit.png'
        }
        className={cn('h-full object-contain self-center', classNames?.image)}
        width={imageSize?.w || 288}
        height={imageSize?.h || 360}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        alt={`Slide ${item?.variants?.[0]?.title}`}
        priority
      />

      <div className="flex self-end flex-col">
        {/*<p className="text-gray-600 text-sm font-normal">{item.title}</p>*/}

        <p className="text-black text-xl font-semibold">
          {item.title.length > 30
            ? item.title.slice(0, 30) + '...'
            : item.title}
        </p>

        {/*<p className="text-gray-700 text-base font-normal">*/}
        {/*  {item.description}*/}
        {/*</p>*/}

        <div className="flex items-center gap-[4px] font-mazzard mt-1">
          <p
            className={cn('text-neutral-900 text-[16px] font-[500]', {
              ['line-through !text-[14px]']: item?.discounted_price,
            })}
          >
            от {item.price_from} сом
          </p>

          {item?.discounted_price && (
            <p className="text-red text-[16px] font-[500]">
              {item.price_from} сом
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
