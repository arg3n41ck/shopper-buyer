import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/entities/user';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { ProductCard } from '@/feautures/product';
import { Product } from '@/shared/api/gen';

export const FavouritesMainSection = () => {
  const { push, asPath } = useRouter();
  const isAuth = useUser((state) => state.isAuth);

  React.useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token && !isAuth) push('/');
  }, [isAuth]);

  const { data } = useQuery({
    queryKey: ['productsCustomerFavouritesList', asPath],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
  });

  return (
    <div className="main-container">
      <div className="my-[32px] text-center grid justify-center font-jost">
        <h1 className="text-[28px] font-[500] text-center">Избранное</h1>
        <p className="text-[16px]">{data?.count || 0} товара</p>
      </div>

      <div className="grid justify-items-center grid-cols-5 2xl:grid-cols-4 gap-x-[40px] md:gap-x-[16px] md:gap-y-[20px] gap-y-[60px] xl:grid-cols-3 md:grid-cols-2">
        {data?.results?.map((item) => (
          <ProductCard item={item.product as Product} key={item.id} />
        ))}
      </div>
    </div>
  );
};
