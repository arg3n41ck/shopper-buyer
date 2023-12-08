import React from 'react';
import { useRouter } from 'next/router';
import { useProductVariant } from '@/entities/product';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import Image from 'next/image';
import cn from 'classnames';
import { Heart, ShoppingBag } from 'react-feather';
import { Button } from '@/shared/ui/buttons';
import { SizeChoose } from '@/feautures/product';
import { Product, ProductVariant } from '@/shared/api/gen';
import { useCart, useCartQuery } from '@/entities/cart';
import { useUser } from '@/entities/user';
import { useFavouriteActions } from '@/entities/favourites';

export const ProductVariantChoose = () => {
  const { query } = useRouter();
  const isAuth = useUser((state) => state.isAuth);
  const [currentVariant, setVariant, currentSize] = useProductVariant(
    (state) => [state.currentVariant, state.setVariant, state.currentSize],
  );
  const addToCart = useCart((state) => state.addProduct);
  const { refetch, isFetching } = useCartQuery();

  const { data } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
      );
      return data;
    },
  });

  const { favouriteToggle, isFavourite, favouritesQuery } = useFavouriteActions(
    data as Product,
  );

  React.useEffect(() => {
    setVariant(data?.variants?.[0] || null);
  }, [data]);

  const currentPrice = data?.discount
    ? Number(currentSize?.price) -
      ((data?.discount || 0) / 100) * Number(currentSize?.price)
    : currentSize?.price;

  const handleAddToCart = async () => {
    addToCart(
      {
        product_variant: currentVariant as ProductVariant,
        total: currentPrice as unknown as string,
        quantity: 1,
        size: currentSize?.size as string,
        id: currentVariant?.id,
      },
      isAuth,
    );

    await refetch();
  };

  return (
    <div className="grid gap-[24px] md:gap-[16px] items-start content-start">
      {/*title*/}
      <div className="grid gap-[4px] font-jost leading-tight">
        <h2 className="font-[500] text-[32px] md:text-[20px]">{data?.title}</h2>
        <p className="text-[16px] text-gray">брюки с разрезами</p>
      </div>

      {/*price*/}
      <div className="font-jost flex gap-[8px] items-center">
        {!!data?.discount && !!currentSize?.price && (
          <p className="text-neutral-900 text-[16px] font-[500] line-through">
            {currentSize?.price}
            сом
          </p>
        )}
        <p className="text-[24px] text-red font-[500]">
          {currentSize?.price
            ? currentPrice
            : `от ${currentVariant?.price_min} до ${currentVariant?.price_max}`}{' '}
          сом
        </p>
        {data?.discount ? (
          <p className="px-[8px] py-[2px] text-white bg-red">
            -{data.discount}%
          </p>
        ) : null}
      </div>

      {/*variants*/}
      <div>
        <p className="flex gap-[8px] font-jost text-[16px]">
          Цвет: <span className="font-[600]">Черный</span>
        </p>

        <div className="grid gap-[12px] grid-cols-[repeat(auto-fit,minmax(63px,85px))] grid-rows-[repeat(auto-fit,85px)] mt-[12px]">
          {data?.variants?.map((item) => (
            <Image
              key={`variant ${item.id}`}
              className={cn(
                'cursor-pointer border-[1px] max-h-[85px] h-full object-contain hover:shadow-md transition-all',
                { ['border-black']: currentVariant?.id == item.id },
              )}
              onClick={() => setVariant(item)}
              src={item.images?.[0].image || ''}
              width={85}
              height={85}
              alt={data.title}
            />
          ))}
        </div>
      </div>

      {/*sizes*/}
      <SizeChoose />

      {/*actions*/}
      <div className="grid gap-[12px]">
        <Button
          onClick={handleAddToCart}
          disabled={!(currentSize && currentSize.quantity && !isFetching)}
          className="gap-[8px]"
          variant="PrimaryCTAButton"
        >
          <ShoppingBag /> В корзину
        </Button>
        <Button
          onClick={() => favouriteToggle.mutate()}
          disabled={favouriteToggle.isPending || favouritesQuery.isFetching}
          className="gap-[8px]"
          variant="WithoutBackgroundButton"
        >
          <Heart
            fill={isFavourite ? '#B91C1C' : 'none'}
            color={isFavourite ? '#B91C1C' : '#676767'}
          />{' '}
          В Избранное
        </Button>
      </div>
    </div>
  );
};
