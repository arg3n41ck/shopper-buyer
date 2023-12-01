import React from 'react';
import { ProductCard } from '@/feautures/product';
import { Button } from '@/shared/ui/buttons';
import { LoaderIcon } from '@/shared/ui/loaders';
import { useInfiniteQuery } from '@tanstack/react-query';
import { $apiElasticApi } from '@/shared/api';
import { pageToOffset } from '@/shared/lib/helpers';
import { PaginationProgressBar } from '@/shared/ui/templates';
import { Product } from '@/shared/api/gen';

export const ProductList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['elasticProductsList'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await $apiElasticApi.elasticProductsList(
        16,
        pageToOffset(pageParam, 16),
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage?.next ? lastPageParam + 1 : undefined,
  });

  const productsInView = React.useMemo(() => {
    return data?.pages.reduce(
      (prev, value) => prev + value?.results?.length,
      0,
    );
  }, [data]);

  return (
    <div>
      <div className="mt-[20px] grid grid-cols-4 gap-x-[40px] gap-y-[60px] xl:grid-cols-3 md:grid-cols-2">
        {data?.pages.map(
          (page) =>
            page?.results?.map((product) => (
              <ProductCard
                imageSize={{ h: 220, w: 220 }}
                classNames={{
                  wrapper: 'max-w-[220px]',
                  image: 'max-h-[220px]',
                }}
                item={product as unknown as Product}
                key={product.slug}
              />
            )),
        )}
      </div>
      <div className="mt-[67px]">
        <PaginationProgressBar
          count={data?.pages?.[0]?.count || 0}
          current={productsInView || 0}
        />

        <Button
          className="max-w-[233px] mt-[40px] mx-auto"
          onClick={() => fetchNextPage()}
          variant="WithoutBackgroundButton"
          disabled={!hasNextPage || isFetching}
        >
          Показать еще
          <LoaderIcon loading={isFetching} />
        </Button>
      </div>
    </div>
  );
};
