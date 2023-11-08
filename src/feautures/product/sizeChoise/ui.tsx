import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { useProductVariant } from '@/entities/product';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { SizeVariant } from '@/shared/api/gen';
import { Info } from 'react-feather';

export const SizeChoose = () => {
  const { query } = useRouter();
  const [sizes, setSizes, currentVariant, currentSize, setCurrentSize] =
    useProductVariant((state) => [
      state.sizes,
      state.setSizes,
      state.currentVariant,
      state.currentSize,
      state.setCurrentSize,
    ]);

  const { data } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
      );
      return data;
    },
  });

  React.useEffect(() => {
    setSizes(data?.variants || []);
  }, [data]);

  React.useEffect(() => {
    setCurrentSize(null);
  }, [currentVariant]);

  const isSizeAllowed = (size: SizeVariant) => {
    if (size.quantity == 0) return false;
    return currentVariant?.size_variants.find((item) => item == size);
  };

  return (
    <div className="grid gap-[8px]">
      <p className="text-end text-[16px] font-[500] font-jost">
        Таблица размеров
      </p>
      <div className="grid gap-[1px] grid-cols-[repeat(auto-fit,minmax(109px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(80px,1fr))]">
        {sizes?.map((item) => (
          <div
            key={item.size}
            onClick={() => isSizeAllowed(item) && setCurrentSize(item)}
            className={cn(
              `relative text-center shadow-[0_0_0_1px_black] overflow-hidden 
               hover:bg-neutral-300 transition-all cursor-pointer bg-transparent`,
              {
                ['text-white !bg-black']: item.size == currentSize?.size,
                ['!cursor-not-allowed hover:!bg-transparent']:
                  !isSizeAllowed(item),
              },
            )}
          >
            <p className="px-[15px] py-[11px]">{item.size}</p>
            <div
              className={cn(
                `block absolute h-[1px] w-[200px] top-[50%] left-[50%]
               translate-x-[-50%] translate-y-[-50%] bg-black rotate-[-22deg]`,
                {
                  ['!hidden']: isSizeAllowed(item),
                },
              )}
            />
          </div>
        ))}
      </div>

      {currentSize?.quantity && (
        <p className="flex items-center gap-[8px] text-red font-jost text-[12px] md:text-gray">
          <Info className="md:hidden" />В наличии {currentSize?.quantity} ед.
        </p>
      )}
    </div>
  );
};
