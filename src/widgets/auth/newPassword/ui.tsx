import React, { FC, useState } from 'react';
import { AuthLayout } from '@/widgets/layouts/authLayout';
// import { AuthClient } from '@/shared/apis/authClient';
// import { TypeResetPassword } from '@/shared/lib/types/authTypes';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Clock, X } from 'react-feather';
import { Trans, useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { PATH } from '@/shared/config';
import TextField from '@/shared/ui/inputs/textField';
import { passwordLengthCheck } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/buttons';
import { LoaderIcon } from '@/shared/ui/loaders';
import { ShowAndHideIcon } from '@/shared/ui/templates';
import { ERROR, SUCCESS } from '@/shared/lib/consts/styles';

interface FormValues {
  new_password: string;
  re_password: string;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    new_password: yup
      .string()
      .required(
        t('active-modal.validation.password.newPassword.requiredNewPassword'),
      )
      .min(8, t('active-modal.validation.password.minLength')),
    re_password: yup
      .string()
      .required(t('active-modal.validation.password.newPassword.repeat'))
      .oneOf(
        [yup.ref('new_password')],
        t('active-modal.validation.password.newPassword.doNotMatch'),
      ),
  });

const initialValues: FormValues = {
  new_password: '',
  re_password: '',
};

// const authClient = new AuthClient();

export const NewPasswordPage: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // const token = (router.query.token as string) || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<{
    new_password: boolean;
    re_password: boolean;
  }>({
    new_password: false,
    re_password: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit: async () => {
      setIsLoading(true);
      // const body: TypeResetPassword = {
      //   token,
      //   new_password,
      // };

      try {
        // await authClient.resetPassword(body);
        setIsLoading(false);
        await router.push({
          pathname: PATH.authSuccess,
          query: {
            title: t('active-modal.resetPassword.successChangePassword'),
            path: PATH.authRoot,
          },
        });
      } catch (error) {
        setIsLoading(false);
        // console.log(error);
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
          <Trans i18nKey={'active-modal.resetPassword.headTextNewPassword'} />
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mx-auto w-full flex flex-col gap-5">
            <TextField
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              errorMessage={
                formik.touched.new_password ? formik.errors.new_password : ''
              }
              value={formik.values.new_password}
              onChange={formik.handleChange}
              name="new_password"
              type={showPassword.new_password ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword.new_password,
                onHide: () => handleShowPassword('new_password'),
                onShow: () => handleShowPassword('new_password'),
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
              passwordLengthCheck({ password: formik.values.new_password })
                ? SUCCESS[700]
                : ERROR[500]
            }]`}
            >
              {passwordLengthCheck({ password: formik.values.new_password }) ? (
                <Clock size={18} />
              ) : (
                <X size={18} />
              )}
              <p>Ваш пароль должен содержать мин. 8 букв</p>
            </div>
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
