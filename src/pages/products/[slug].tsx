import React from 'react';
import { MainLayout } from '@/widgets/layouts';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { useRouter } from 'next/router';
import { ProductDetailSection } from '@/sections-pages/products-detail';
import Head from 'next/head';
import { Product } from '@/shared/api/gen';
import { RecentlyViewed } from '@/widgets/product';

const ProductDetail = () => {
  const { query } = useRouter();
  const { data } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: () => null as unknown as Product,
  });

  return (
    <div>
      <Head>
        <title>{data?.title}</title>
      </Head>

      <MainLayout>
        <div>
          <ProductDetailSection />

          <div className="main-container mt-[80px] md:mt-[28px]">
            <RecentlyViewed />
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
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

export default ProductDetail;
