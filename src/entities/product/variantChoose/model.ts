import { create } from 'zustand';
import { createJSONStorage, devtools } from 'zustand/middleware';
import produce from 'immer';
import { ProductVariant, SizeVariant } from '@/shared/api/gen';

type TState = {
  currentVariant: ProductVariant | null;
  currentSize: SizeVariant | null;
  sizes: SizeVariant[];
};

type TAction = {
  setVariant: (variant: ProductVariant | null) => void;
  setCurrentSize: (size: SizeVariant | null) => void;
  setSizes: (variants: ProductVariant[]) => void;
};

export const useProductVariant = create<TState & TAction>()(
  devtools(
    (set) => ({
      currentVariant: null,
      currentSize: null,
      sizes: [],

      setVariant: (variant) =>
        set(
          produce((state) => {
            state.currentVariant = variant;
          }),
        ),

      setCurrentSize: (size) =>
        set(
          produce((state) => {
            state.currentSize = size;
          }),
        ),

      setSizes: (variants) =>
        set(
          produce((state) => {
            let sizes: SizeVariant[] = [];
            variants.map((item) => {
              sizes = [...sizes, ...item.size_variants];
            });

            state.sizes = sizes.filter(
              (item, index, self) => self.indexOf(item) === index,
            );
          }),
        ),
    }),
    { name: 'cart', storage: createJSONStorage(() => localStorage) },
  ),
);
