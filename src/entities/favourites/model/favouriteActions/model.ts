import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import React from 'react';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { useUser } from '@/entities/user';
import { useActiveModal } from '@/entities/modals';
import { Product } from '@/shared/api/gen';

export const useFavouriteActions = (item: Product) => {
  const { asPath } = useRouter();
  const isAuth = useUser((state) => state.isAuth);
  const setModalActive = useActiveModal((state) => state.setModalActive);

  const favouritesQuery = useQuery({
    queryKey: ['productsCustomerFavouritesList', asPath],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
    enabled: isAuth,
  });

  const [isFavourite, setIsFavourite] = React.useState<undefined | number>();

  React.useEffect(() => {
    setIsFavourite(
      favouritesQuery.data?.results?.find(
        ({ product }) => item?.id == product?.id,
      )?.id,
    );
  }, [favouritesQuery.data]);

  const toggleMutate = useMutation({
    mutationFn: async () => {
      if (!item) return;
      if (!isAuth) setModalActive('login');
      else if (!isFavourite) {
        await fetchWithErrorMessage(
          $apiProductsApi
            .productsCustomerFavouritesCreate({
              product: item.id as number,
            })
            .then(({ data }) => setIsFavourite(data.id as number)),
        );
      } else {
        await fetchWithErrorMessage(
          $apiProductsApi.productsCustomerFavouritesDelete(isFavourite),
        );
        setIsFavourite(undefined);
      }

      await favouritesQuery.refetch();
    },
  });

  return { favouriteToggle: toggleMutate, isFavourite, favouritesQuery };
};
