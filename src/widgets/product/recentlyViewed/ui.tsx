import React from 'react';
import { useRecentlyViewedProducts } from '@/widgets/product/recentlyViewed/model';
import { ProductCard } from '@/entities/product';
import useIsClient from '@/shared/lib/hooks/useIsClient';

export const RecentlyViewed = () => {
  const products = useRecentlyViewedProducts((state) => state.products);
  const isClient = useIsClient();
  if (!isClient) return <></>;

  return (
    <div className="grid gap-[40px] md:gap-[24px]">
      <h5 className="font-jost text-[32px] font-[500] md:text-[20px] text-black">
        Вы смотрели
      </h5>
      <div className="flex max-w-full overflow-x-auto hideScrollBar gap-[40px] md:gap-[16px]">
        {products.map((item) => (
          <ProductCard
            classNames={{
              image: '!h-[288px] md:!h-[260px]',
              wrapper: '!w-[288px] md:!w-[200px]',
            }}
            key={`RecentlyViewed ${item.slug}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
