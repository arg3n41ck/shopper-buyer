import { useUser } from './model';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { $apiAccountsApi } from '@/shared/api';
import { User } from '@/shared/api/gen';

export const useUserQuery = (): UseQueryResult<User> => {
  const isAuth = useUser((state) => state.isAuth);
  const token = Cookies.get('refresh_token');

  return useQuery({
    queryKey: ['accountsUsersMeRead', isAuth],
    queryFn: async () => {
      if (!token && !isAuth) return;
      const response = await $apiAccountsApi.accountsUsersMeRead();
      return response?.data;
    },
    enabled: isAuth,
    refetchOnMount: true,
  });
};
