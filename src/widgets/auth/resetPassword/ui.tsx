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
import { InputMask } from '@/shared/ui/inputs/input-mask';
import { $apiAccountsApi } from '@/shared/api';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/shared/lib/helpers';

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
  const [byPhoneNumber, setByPhoneNumber] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      field: email || '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async ({ field }) => {
      setIsLoading(true);

      try {
        setIsLoading(false);
        if (byPhoneNumber) {
          await $apiAccountsApi.accountsUsersResetPasswordRequestPhoneNumber({
            phone_number: field,
          });
          setTimeLeft(180);
          setSmsSent(true);
        } else {
          await $apiAccountsApi.accountsUsersResetPasswordRequestEmail({
            email: field,
          });
          toast.success('Письмо для сброса пароля успешно отправлено!');
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(getErrorMessage(error));
      }
    },
  });

  const handleToggleFeild = () => {
    formik.setValues({ field: '' });
    setByPhoneNumber((prev) => !prev);
  };

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

  const Field = byPhoneNumber ? InputMask : TextField;

  return (
    <AuthLayout>
      <div className="max-w-[436px] w-full mx-auto flex flex-col gap-5">
        <form onSubmit={formik.handleSubmit}>
          <p className="font-semibold text-[32px] text-[#000] mb-5 text-center">
            Восстановление пароля
          </p>
          <div className="relative mx-auto w-full flex flex-col gap-5">
            <Field
              error={formik.touched.field && Boolean(formik.errors.field)}
              errorMessage={formik.touched.field && formik.errors.field}
              value={formik.values.field}
              onChange={formik.handleChange}
              name={'field'}
              placeholder={
                byPhoneNumber ? t('+996') : t('Адрес электронной почты ')
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
                label={'Используя номер телефона'}
                checked={byPhoneNumber}
                onChange={() => handleToggleFeild()}
              />
            )}
          </div>
          <div className="mt-5 mb-[62px] w-full flex justify-center">
            <Button type="submit" disabled={isLoading}>
              <div className="flex items-center gap-[10px]">
                <Trans i18nKey={'auth.logIn.submit'} />{' '}
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
