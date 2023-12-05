import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import { CustomerAddress } from '@/shared/api/gen';
import Cookies from 'js-cookie';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { $apiCustomersApi } from '@/shared/api';

type TAddressItem = Omit<CustomerAddress, 'customer'>;

type TState = {
  addresses: CustomerAddress[] | [];
};

export type TAction = {
  changeAddress: (address: TAddressItem) => void;
  deleteAddress: (id: number | undefined) => void;
  resetState: () => void;
  setAddresses: (cart: CustomerAddress[]) => void;
};

export const useAddresses = create<TState & TAction>()(
  devtools((set) => ({
    addresses: [],
    changeAddress: async (address) => {
      const token = Cookies.get('access_token');
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
    },

    deleteAddress: async (id: number | undefined) => {
      set(
        produce((state: TState) => {
          state.addresses = state.addresses?.filter(
            (item: CustomerAddress) => item?.id != id,
          );
        }),
      );

      const token = Cookies.get('access_token');
      if (token && id) {
        await fetchWithErrorMessage(
          $apiCustomersApi.customersAddressesDelete(id as number),
        );
      }
    },
    resetState: () =>
      set({
        addresses: [],
      }),
    setAddresses: (addresses) => set({ addresses }),
  })),
);
