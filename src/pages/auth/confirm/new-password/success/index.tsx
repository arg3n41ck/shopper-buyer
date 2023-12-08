import { AuthSuccessConfirmation } from '@/widgets/auth';

const SuccesResetPassword = () => {
  return (
    <AuthSuccessConfirmation
      title={'Адрес электронной почты успешно обновлен!'}
      isLoading={false}
    />
  );
};

export default SuccesResetPassword;
