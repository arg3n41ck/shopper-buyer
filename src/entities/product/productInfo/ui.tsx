import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { useRouter } from 'next/router';

export const ProductInfo = () => {
  const { query } = useRouter();
  const { data: product } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
      );
      return data;
    },
  });

  return (
    <div className="grid gap-[20px] font-jost leading-tight">
      <div className="grid gap-[4px]">
        <h3 className="font-[600] text-[20px] text-black">{product?.title}</h3>
        <p className="text-gray text-[16px]">{product?.category?.title}</p>
      </div>

      <p className="text-black text-[16px]">{product?.description}</p>

      <div className="grid gap-[12px]">
        <div className="grid gap-[4px]">
          <h4 className="uppercase text-[16px] font-[600]">Состав</h4>
          <p className="text-[16px] text-gray">
            Перерабатываемый Полиэстер 55%, Шерсть 41%, Спандекс/Эластан 4
          </p>
        </div>
        <div className="grid gap-[4px]">
          <h4 className="uppercase text-[16px] font-[600]">
            Рекомендации по уходу
          </h4>
          <p className="text-[16px] text-gray">{product?.recommendation}</p>
        </div>
        <div className="grid gap-[4px]">
          <h4 className="uppercase text-[16px] font-[600]">Артикулы товара</h4>
          <p className="text-[16px] text-gray">Артикул: {product?.sku}</p>
          <p className="text-[16px] text-gray">
            Артикул бренда: {product?.shop?.id}
          </p>
        </div>
      </div>
    </div>
  );
};
