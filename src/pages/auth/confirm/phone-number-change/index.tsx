import { $apiAccountsApi } from '@/shared/api';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { AuthSuccessConfirmation } from '@/widgets/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ChangeEmailConfirm = () => {
  const { query } = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      if (query?.token && query?.uid) {
        await fetchWithErrorMessage(
          $apiAccountsApi.accountsUsersChangePhoneNumberConfirm({
            token: String(query.token),
            uid: String(query.uid),
          }),
        );
      }
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, [query]);

  return (
    <AuthSuccessConfirmation
      title={
        mutation.isPending
          ? 'Идет обновление номера телефона!'
          : 'Номер телефона успешно обновлен!'
      }
      isLoading={mutation.isPending}
    />
  );
};

export default ChangeEmailConfirm;
