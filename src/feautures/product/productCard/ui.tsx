import React from 'react';
import Image from 'next/image';
import { Heart } from 'react-feather';
import cn from 'classnames';
import { Product } from '@/shared/api/gen';
import { useMutation, useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { useRouter } from 'next/router';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { useUser } from '@/entities/user';
import { useActiveModal } from '@/entities/modals';

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
  const { asPath, push } = useRouter();
  const isAuth = useUser((state) => state.isAuth);
  const setModalActive = useActiveModal((state) => state.setModalActive);

  const handleProductRedirect = async () =>
    await push(`/products/${item.slug}`);

  const { data, refetch } = useQuery({
    queryKey: ['productsCustomerFavouritesList', asPath],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
    enabled: isAuth,
  });

  const [isFavourite, setIsFavourite] = React.useState<undefined | number>(
    data?.results?.find(({ product }) => item?.id == product?.id)?.id,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!isAuth) setModalActive('login');
      else if (!isFavourite) {
        await fetchWithErrorMessage(
          $apiProductsApi
            .productsCustomerFavouritesCreate({
              product: item.id as number,
            })
            .then(({ data }) => setIsFavourite(data.id as number)),
        );
      } else {
        await fetchWithErrorMessage(
          $apiProductsApi.productsCustomerFavouritesDelete(isFavourite),
        );
        setIsFavourite(undefined);
      }

      await refetch();
    },
  });

  return (
    <div
      className={cn(
        'relative grid items-start content-start gap-[16px]',
        classNames?.wrapper,
      )}
    >
      <button
        onClick={() => mutate()}
        className={cn('absolute right-[8px] top-[8px] cursor-pointer z-[1]', {
          ['cursor-wait']: isPending,
        })}
        disabled={isPending}
      >
        <Heart
          fill={isFavourite ? '#B91C1C' : 'white'}
          color={isFavourite ? '#B91C1C' : '#676767'}
        />
      </button>

      {item?.discount ? (
        <div className="absolute top-[3px] left-[0] bg-[#B91C1C] py-[2px] px-[8px] text-[#fff] text-sm font-medium">
          -{item.discount}%
        </div>
      ) : null}

      <Image
        onClick={handleProductRedirect}
        src={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          item?.variants?.[0]?.images?.[0].image ||
          'https://w7.pngwing.com/pngs/365/575/png-transparent-hoodie-t-shirt-tracksuit-sweater-clothing-hoodie-white-hoodie-tracksuit.png'
        }
        className={cn(
          'h-[220px] md:h-[200px] cursor-pointer object-contain object-center',
          classNames?.image,
        )}
        width={imageSize?.w || 288}
        height={imageSize?.h || 360}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        alt={`Slide ${item?.variants?.[0]?.title}`}
        priority
      />

      <div
        onClick={handleProductRedirect}
        className="flex flex-col cursor-pointer"
      >
        {/*<p className="text-gray-600 text-sm font-normal">{item.title}</p>*/}

        <p className="text-black text-[20px] md:text-[16px] font-mazzard font-semibold">
          {item.title.length > 40
            ? item.title.slice(0, 40) + '...'
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
    </div>
  );
};
