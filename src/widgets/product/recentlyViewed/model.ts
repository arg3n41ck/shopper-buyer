import { create } from 'zustand';
import { createJSONStorage, persist, devtools } from 'zustand/middleware';
import produce from 'immer';
import { Product } from '@/shared/api/gen';

type TState = {
  products: Product[];
};

type TAction = {
  addProduct: (product: Product) => void;
};

export const useRecentlyViewedProducts = create<TState & TAction>()(
  devtools(
    persist(
      (set) => ({
        products: [],
        addProduct: (product) =>
          set(
            produce((state: TState) => {
              const findProduct = state.products.find(
                (item) => product.id == item.id,
              );
              // add if item is new
              if (!findProduct) {
                // remove old item
                state.products.length > 5 && state.products.shift();
                state.products.unshift(product);
              }
            }),
          ),
      }),
      {
        name: 'recentlyViewedProducts-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);
