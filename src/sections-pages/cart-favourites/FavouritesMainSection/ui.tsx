import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/entities/user';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';

export const FavouritesMainSection = () => {
  const { push } = useRouter();
  const isAuth = useUser((state) => state.isAuth);

  React.useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token && !isAuth) push('/');
  }, [isAuth]);

  const { data } = useQuery({
    queryKey: ['productsCustomerFavouritesList'],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
  });

  return (
    <div className="main-container">
      <div className="mt-[32px]">
        <h1>Избранное</h1>
        <p>{data?.count || 0} товара</p>
      </div>

      <div>
        {/*{data?.results?.map((item) => (*/}
        {/*  <ProductCard item={item} key={item.id} />*/}
        {/*))}*/}
      </div>
    </div>
  );
};
