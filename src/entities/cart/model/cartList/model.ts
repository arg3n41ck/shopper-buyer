import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import produce from 'immer';
import { Cart, CartItem } from '@/shared/api/gen';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { $apiOrdersApi } from '@/shared/api';

type TCartItem = Omit<CartItem, 'cart'>;

type TState = {
  cart: Cart;
};

export type TAction = {
  addProduct: (product: TCartItem, isAuth?: boolean) => void;
  deleteProduct: (id: number | undefined, isAuth?: boolean) => void;
  updateQuantityItem: (id: number, quantity: number, isAuth?: boolean) => void;
  resetState: () => void;
  setCart: (cart: Cart) => void;
};

const getTotal = (state: TState) => {
  const total =
    state.cart?.items?.reduce(
      (prev, current) =>
        prev + Number(current.total) * Number(current?.quantity || 1),
      0,
    ) || 0;

  state.cart.total = `${total?.toFixed(2)}`;
};

export const useCart = create<TState & TAction>()(
  devtools(
    persist(
      (set, get) => ({
        cart: { items: [], total: '0', id: 0, customer: 0 },
        addProduct: async (product, isAuth) => {
          const token = Cookies.get('access_token') || isAuth;

          if (token) {
            const findProduct = get()?.cart?.items?.find(
              (item) =>
                item?.product_variant?.id == product?.product_variant?.id,
            );
            if (findProduct) {
              await fetchWithErrorMessage(
                $apiOrdersApi.ordersCustomerCartItemsDelete(
                  findProduct.id as number,
                ),
              );
            } else {
              await fetchWithErrorMessage(
                $apiOrdersApi.ordersCustomerCartItemsCreate({
                  size: product.size as string,
                  product_variant: product?.product_variant?.id as number,
                  quantity: product.quantity,
                }),
              );
            }
          }
          set(
            produce((state: TState) => {
              const cartItem = state.cart?.items?.find(
                (item: CartItem) =>
                  item?.product_variant?.id == product?.product_variant?.id,
              );

              if (cartItem) {
                state.cart.items = state.cart?.items?.filter(
                  (item: CartItem) => item?.id != product?.id,
                );
                toast.success('Удалено из корзины!');
              } else {
                state.cart?.items?.push(product as CartItem);
                toast.success('Добавлено в корзину!');
              }

              getTotal(state);
            }),
          );
        },
        deleteProduct: async (id: number | undefined, isAuth) => {
          set(
            produce((state: TState) => {
              state.cart.items = state.cart?.items?.filter(
                (item: CartItem) => item?.id != id,
              );
              getTotal(state);
            }),
          );
          const token = Cookies.get('access_token') || isAuth;
          if (token && id) {
            await fetchWithErrorMessage(
              $apiOrdersApi.ordersCustomerCartItemsDelete(id as number),
            );
          }
        },

        updateQuantityItem: async (id, quantity) =>
          set(
            produce((state: TState) => {
              const cartItem = state.cart.items?.find(
                (item: CartItem) => item?.id == id,
              );
              const sizeQty = cartItem?.product_variant?.size_variants.find(
                (item) => item.size == cartItem?.size,
              );
              if (quantity > Number(sizeQty?.quantity)) return;
              if (cartItem) cartItem.quantity = quantity > 0 ? quantity : 1;

              getTotal(state);
            }),
          ),

        resetState: () =>
          set({
            cart: {
              items: [],
              total: '0',
              id: undefined,
              customer: 0,
            },
          }),
        setCart: (cart) => set({ cart }),
      }),
      { name: 'cart', storage: createJSONStorage(() => localStorage) },
    ),
  ),
);
