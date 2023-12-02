import React from 'react';
import { MainLayout } from '@/widgets/layouts';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { pageToOffset } from '@/shared/lib/helpers/';
import { GetServerSideProps } from 'next';
import { ProductListSection } from '@/sections-pages/products';

const Products = () => {
  return (
    <MainLayout>
      <ProductListSection />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['productsCustomerProductsList'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await $apiProductsApi.productsCustomerProductsList(
        16,
        pageToOffset(pageParam, 16),
      );
      return data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Products;
