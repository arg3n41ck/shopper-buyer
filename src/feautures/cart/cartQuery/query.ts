import { useQuery } from '@tanstack/react-query';
import { $apiOrdersApi } from '@/shared/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useCart } from '@/entities/cart';
import { useUser } from '@/entities/user';
import { CartItem } from '@/shared/api/gen';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/shared/lib/helpers';

const createCartItems = async (items: CartItem[] | undefined) => {
  if (!items?.length) return;
  for (const item of items) {
    try {
      await $apiOrdersApi.ordersCustomerCartItemsCreate({
        size: item.size,
        product_variant: item?.product_variant?.id as number,
        quantity: item.quantity,
      });
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  }
};

export const useCartQuery = () => {
  const { asPath } = useRouter();
  const token = Cookies.get('refresh_token');
  const [cartState, setCart] = useCart((state) => [state.cart, state.setCart]);
  const isAuth = useUser((state) => state.isAuth);

  const cart = useQuery({
    queryKey: ['ordersCustomerCartsList', asPath, isAuth],
    queryFn: async () => {
      if (!token || !isAuth) return;
      const { data } = await $apiOrdersApi.ordersCustomerCartsList(1);
      setCart(data.results[0]);
      return data.results[0];
    },
    enabled: !!token || isAuth,
  });

  const postCart = async () => {
    if (Cookies.get('refresh_token') || isAuth)
      await createCartItems(cartState.items);
  };

  return { ...cart, postCart };
};
