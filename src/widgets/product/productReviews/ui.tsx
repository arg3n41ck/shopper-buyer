import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { ProductReviewCard, ProductReviewCreate } from '@/feautures/reviews';
import { pageToOffset } from '@/shared/lib/helpers';
import { DefaultPagination } from '@/shared/ui/pagination';
import { LoaderIcon } from '@/shared/ui/loaders';

interface IProductReviewsProps {
  productSlug?: string;
}

export const ProductReviews = ({ productSlug }: IProductReviewsProps) => {
  const { query } = useRouter();
  const [page, setPage] = React.useState(1);

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['productsCustomerReviewsList', productSlug || query?.slug, page],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerReviewsList(
        productSlug || (query?.slug as string),
        10,
        pageToOffset(page, 10),
      );
      return data;
    },
  });

  return (
    <div className="grid gap-[20px]">
      <ProductReviewCreate
        refetchReviews={async () => {
          await refetch();
          setPage(1);
        }}
      />

      <LoaderIcon loading={isLoading} />

      <div className="grid gap-[1px]">
        {reviews?.results?.map((review) => (
          <ProductReviewCard key={review.id} review={review} />
        ))}
      </div>
      <DefaultPagination
        onChange={setPage}
        count={reviews?.count || 0}
        currentPage={page}
      />
    </div>
  );
};
