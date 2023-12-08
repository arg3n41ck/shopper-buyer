import { useUser } from '@/entities/user';
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { $apiCustomersApi } from '@/shared/api';
import { CustomerAddress } from '@/shared/api/gen';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { useMemo } from 'react';

type TAddressItem = Omit<CustomerAddress, 'customer'>;

export type TState = {
  mainAddress: CustomerAddress | null;
};

export type TActions = {
  changeAddress: UseMutationResult<void, Error, TAddressItem, unknown>;
  deleteAddress: UseMutationResult<void, Error, number, unknown>;
};

export const useAddressesQuery = (): UseQueryResult<CustomerAddress[] | null> &
  TState &
  TActions => {
  const isAuth = useUser((state) => state.isAuth);
  const token = Cookies.get('refresh_token');

  const addressesQuery = useQuery({
    queryKey: ['customersAddressesList', isAuth],
    queryFn: async () => {
      if (!token && !isAuth) return null;
      const response = await $apiCustomersApi.customersAddressesList();
      return response.data?.results || null;
    },
    enabled: isAuth,
  });

  const mainAddress = useMemo(() => {
    return addressesQuery?.data?.find(({ is_main }) => is_main) || null;
  }, [addressesQuery.data]);

  const changeAddress = useMutation({
    mutationFn: async (address: TAddressItem) => {
      if (token) {
        if (address?.id) {
          const { id, ...body } = address;
          await fetchWithErrorMessage(
            $apiCustomersApi.customersAddressesPartialUpdate(
              id,
              body as CustomerAddress,
            ),
          );
        } else {
          await fetchWithErrorMessage(
            $apiCustomersApi.customersAddressesCreate(address),
          );
        }
      }
      await addressesQuery.refetch();
    },
  });

  const deleteAddress = useMutation({
    mutationFn: async (id: number) => {
      if (token) {
        await fetchWithErrorMessage(
          $apiCustomersApi.customersAddressesDelete(id),
        );
      }
      await addressesQuery.refetch();
    },
  });

  return { ...addressesQuery, changeAddress, deleteAddress, mainAddress };
};
