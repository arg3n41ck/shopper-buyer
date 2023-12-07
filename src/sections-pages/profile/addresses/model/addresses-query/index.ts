import { useUser } from '@/entities/user';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { $apiCustomersApi } from '@/shared/api';
import { useAddresses } from '@/sections-pages/profile';

export const useAddressesQuery = () => {
  const isAuth = useUser((state) => state.isAuth);
  const token = Cookies.get('refresh_token');
  const [setAddresses] = useAddresses((state) => [state.setAddresses]);

  return useQuery({
    queryKey: ['customersAddressesList', isAuth],
    queryFn: async () => {
      if (!token && !isAuth) return;
      const { data } = await $apiCustomersApi.customersAddressesList();
      setAddresses(data.results);
    },
    enabled: !isAuth,
  });
};
