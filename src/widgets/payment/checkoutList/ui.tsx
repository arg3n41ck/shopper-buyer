import React from 'react';
import ProductItemInBag from '@/feautures/header/shoppingBag/ProductItemInBag';
import { useCartQuery } from '@/entities/cart';
import { LoaderIcon } from '@/shared/ui/loaders';
import { useIsClient } from '@/shared/lib/hooks';

export const PaymentCheckoutList = () => {
  const { data, isFetching } = useCartQuery();
  const isClient = useIsClient();

  if (!isClient) return <></>;
  return (
    <div className="border-[#DBDBDB] border-[1px]">
      <div className="border-[#DBDBDB] border-b-[1px] flex items-center justify-between py-[12px] px-[20px] text-[16px]">
        <p>Итог заказа</p> <p className="text-right">5 товаров</p>
      </div>
      <div className="p-[20px] grid gap-[20px]">
        <LoaderIcon loading={isFetching} />
        {data?.items?.map((item) => (
          <ProductItemInBag key={item.id} item={item} canChange={false} />
        ))}
      </div>
      <div className="border-[#DBDBDB] border-t-[1px] p-[20px] grid gap-[8px] leading-tight">
        <div className="flex items-center justify-between text-[16px]">
          <p>Промежуточный итог</p>
          <p className="text-right">{data?.total} сом</p>
        </div>
        <div className="flex items-center justify-between text-[16px]">
          <p>Доставка</p> <p className="text-right">1 200 сом</p>
        </div>
        <div className="flex items-center justify-between text-[20px] font-[600]">
          <p>Итого</p>
          <p className="text-right">{Number(data?.total || 0) + 1200} сом</p>
        </div>
      </div>
    </div>
  );
};
