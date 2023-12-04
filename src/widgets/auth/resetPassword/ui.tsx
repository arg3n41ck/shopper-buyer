import React, { FC, useEffect, useState } from 'react';
import { AuthLayout } from '@/widgets/layouts/authLayout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Clock } from 'react-feather';
import { Trans, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import TextField from '@/shared/ui/inputs/textField';
import Checkbox from '@/shared/ui/inputs/checkbox';
import { Button } from '@/shared/ui/buttons';
import { LoaderIcon } from '@/shared/ui/loaders';

interface ResetPasswordProps {}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup.string().email(t('active-modal.validation.email.invalid')),
  });

export const ResetPasswordPage: FC<ResetPasswordProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const email = (router.query?.email as string) || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedSMS, setCheckedSMS] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const handleChangeSMS = () => setCheckedSMS((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      email: email || '',
      phoneNumber: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      // const email = values.email;
      setIsLoading(true);

      if (values.phoneNumber) {
        setTimeLeft(180);
        setSmsSent(true);
      }

      try {
        // console.log(values);
        // const { user_exists } =
        //   await authClient.checkUserByEmailForResetPassword({ email });
        setIsLoading(false);
        // if (user_exists)
        //   return router.push({
        //     pathname: PATH_AUTH.newPassword,
        //     query: { email },
        //   });
      } catch (error) {
        setIsLoading(false);
        // console.log(error);
      }
    },
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <AuthLayout>
      <div className="max-w-[436px] w-full mx-auto flex flex-col gap-5">
        <form onSubmit={formik.handleSubmit}>
          <p className="font-semibold text-[32px] text-[#000] mb-5 text-center">
            Восстановление пароля
          </p>
          <div className="relative mx-auto w-full flex flex-col gap-5">
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              value={
                checkedSMS ? formik.values.phoneNumber : formik.values.email
              }
              onChange={formik.handleChange}
              name={checkedSMS ? 'phoneNumber' : 'email'}
              placeholder={
                checkedSMS ? t('+996') : t('Адрес электронной почты ')
              }
            />

            {timeLeft !== 0 && (
              <div className="flex items-center gap-[6px] text-[#676767] absolute right-[-80px] top-[10px]">
                <Clock size={24} />

                <p>{formatTime(timeLeft)}</p>
              </div>
            )}
            {smsSent ? (
              <p className="text-[#b91c1c] text-[16px] font-semibold text-right">
                Отправить код еще раз
              </p>
            ) : (
              <Checkbox
                label={'Отправить SMS'}
                checked={checkedSMS}
                onChange={() => handleChangeSMS()}
              />
            )}
          </div>
          <div className="mt-5 mb-[62px] w-full flex justify-center">
            <Button type="submit" disabled={isLoading}>
              <div className="flex items-center gap-[10px]">
                <Trans i18nKey={'active-modal.resetPassword.submit'} />{' '}
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
