import React, { FC, useState } from 'react';
import { AuthLayout } from '@/widgets/layouts/authLayout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Check, X } from 'react-feather';
import { Trans, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import TextField from '@/shared/ui/inputs/textField';
import { getErrorMessage, passwordLengthCheck } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/buttons';
import { LoaderIcon } from '@/shared/ui/loaders';
import { ShowAndHideIcon } from '@/shared/ui/templates';
import { ERROR, SUCCESS } from '@/shared/lib/consts/styles';
import { $apiAccountsApi } from '@/shared/api';
import { toast } from 'react-toastify';
import { PATH } from '@/shared/config';

interface FormValues {
  password: string;
  re_password: string;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    password: yup
      .string()
      .required(t('auth.validation.password.newPassword.requiredNewPassword'))
      .min(8, t('auth.validation.password.minLength')),
    re_password: yup
      .string()
      .required(t('auth.validation.password.newPassword.repeat'))
      .oneOf(
        [yup.ref('password')],
        t('auth.validation.password.newPassword.doNotMatch'),
      ),
  });

const initialValues: FormValues = {
  password: '',
  re_password: '',
};

export const NewPasswordPage: FC = () => {
  const { query, push } = useRouter();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    re_password: boolean;
  }>({
    password: false,
    re_password: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit: async ({ password, re_password }) => {
      setIsLoading(true);

      if (query?.uid && query?.['token']) {
        try {
          await $apiAccountsApi.accountsUsersResetPasswordConfirm({
            password,
            re_password,
            uid: String(query.uid),
            token: String(query['token']),
          });
          toast.success('');
          setIsLoading(false);
          push(PATH.newPasswordSuccess);
        } catch (error) {
          setIsLoading(false);
          toast.error(getErrorMessage(error));
        }
      }
    },
  });

  const handleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <AuthLayout>
      <div className="max-w-[436px] w-full mx-auto flex flex-col gap-5">
        <p className="font-semibold text-[32px] text-[#000] mb-5 text-center">
          <Trans i18nKey={'auth.resetPassword.headTextNewPassword'} />
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mx-auto w-full flex flex-col gap-5">
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              errorMessage={
                formik.touched.password ? formik.errors.password : ''
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type={showPassword.password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.password,
                onHide: () => handleShowPassword('password'),
                onShow: () => handleShowPassword('password'),
              })}
              placeholder={'Новый пароль'}
            />

            <TextField
              error={
                formik.touched.re_password && Boolean(formik.errors.re_password)
              }
              errorMessage={
                formik.touched.re_password ? formik.errors.re_password : ''
              }
              value={formik.values.re_password}
              onChange={formik.handleChange}
              name="re_password"
              type={showPassword.re_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.re_password,
                onHide: () => handleShowPassword('re_password'),
                onShow: () => handleShowPassword('re_password'),
              })}
              placeholder={'Повторите пароль'}
            />

            <div
              className={`
            flex items-center gap-[5px] text-[${
              passwordLengthCheck({ password: formik.values.password })
                ? SUCCESS[700]
                : ERROR[500]
            }]`}
            >
              {passwordLengthCheck({ password: formik.values.password }) ? (
                <Check size={18} />
              ) : (
                <X size={18} />
              )}
              <p>Ваш пароль должен содержать мин. 8 букв</p>
            </div>
          </div>

          <div className="mt-5 mb-[62px] w-full flex justify-center">
            <Button type="submit" disabled={isLoading}>
              <div className="flex items-center gap-[10px]">
                <Trans i18nKey={'auth.resetPassword.submit'} />{' '}
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
