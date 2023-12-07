import { SUCCESS } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { LoaderIcon } from '@/shared/ui/loaders';
import { AuthLayout } from '@/widgets/layouts/authLayout';
import { useRouter } from 'next/router';
import { Check } from 'react-feather';

interface IEmailConfirmationProps {
  title: string;
  isLoading: boolean;
  btnPath?: string;
  btnTitle?: string;
}

export const AuthSuccessConfirmation = ({
  title,
  isLoading,
  btnPath = '/',
  btnTitle = 'На главную страницу',
}: IEmailConfirmationProps) => {
  const { push } = useRouter();
  return (
    <AuthLayout>
      <div className="mx-auto flex flex-col items-center justify-center">
        <p className="text-[24px] font-[500] text-black">{title}</p>
        <div className="relative my-[42px] flex h-[120px] w-[120px] items-center justify-center">
          <div className="absolute h-full w-full rounded-[50%] bg-[#4fd26c] opacity-[0.15]" />
          <div className="relative z-[1]">
            {isLoading ? (
              <LoaderIcon loading={isLoading} size={110} />
            ) : (
              <Check size={80} color={SUCCESS[500]} />
            )}
          </div>
        </div>

        <Button disabled={isLoading} onClick={() => push(btnPath)}>
          {btnTitle}
        </Button>
      </div>
    </AuthLayout>
  );
};
