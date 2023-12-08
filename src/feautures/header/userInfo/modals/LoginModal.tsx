import React, { FC, useState } from 'react';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import FacebookIcon from '@/shared/assets/icons/png/facebook.png';
import GoogleIcon from '@/shared/assets/icons/png/google.png';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PATH } from '@/shared/config';
import TextField from '@/shared/ui/inputs/textField';
import Image from 'next/image';
import { Button } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Modal } from '@/shared/ui/modal-windows';
import { ShowAndHideIcon } from '@/shared/ui/templates';
import { toast } from 'react-toastify';
import { $apiAccountsApi } from '@/shared/api';
import Cookies from 'js-cookie';
import { TActiveModalType } from '@/entities/modals';
import { useUser } from '@/entities/user';
import { useCartQuery } from '@/entities/cart';
import { User, UserTypeEnum } from '@/shared/api/gen';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onClickModal: (type: TActiveModalType) => void;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    username: yup
      .string()
      .email(t('active-modal.validation.email.invalid'))
      .required(t('active-modal.validation.email.required')),
  });

export const LoginModal: FC<LoginModalProps> = ({
  open,
  onClose,
  onClickModal,
}) => {
  const { postCart } = useCartQuery();
  const { t } = useTranslation();
  const router = useRouter();
  const setIsAuth = useUser((state) => state.setIsAuth);
  const logout = useUser((state) => state.logout);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const navigateToResetPasswordPage = () => router.push(PATH.resetPassword);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      const loginFetch = async () => {
        const { data } = await $apiAccountsApi.accountsAuthTokenCreate(values);
        setIsAuth(true);
        Cookies.set('access_token', (data as any)?.access);
        Cookies.set('refresh_token', (data as any)?.refresh);
      };

      await toast.promise(loginFetch(), {
        pending: 'Вход...',
        success: 'Вход успешно выполнен!',
        error: 'Неверный логин или пароль',
      });

      const { data } = await $apiAccountsApi.accountsUsersMeRead();
      const _data = data as unknown;
      const user = _data as User;

      if (user.type === UserTypeEnum.Seller) {
        logout();
        window.location.href = 'https://shopper.kg/auth/log-in';
        return;
      }

      await postCart();
      await onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10 flex flex-col gap-5">
        <div className="w-full flex justify-center">
          <LogoIcon />
        </div>

        <p className="text-[#000] text-[24px] font-semibold text-center">
          Добро пожаловать!
        </p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div className="w-full flex flex-col gap-3">
            <TextField
              value={formik.values.username}
              onChange={formik.handleChange}
              name="username"
              placeholder={'Адрес электронной почты или номер телефона'}
            />

            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={ShowAndHideIcon({
                show: showPassword,
                onHide: handlePasswordToggle,
                onShow: handlePasswordToggle,
              })}
              placeholder="Пароль"
            />

            <p
              className="text-[#b91c1c] text-[16px] font-semibold text-right cursor-pointer"
              onClick={navigateToResetPasswordPage}
            >
              Забыли пароль?
            </p>
          </div>

          <Button variant={BUTTON_STYLES.primaryCTA}>Войти</Button>
        </form>
        <div className="w-full flex flex-col gap-3">
          <div className="grid grid-cols-[1fr_221px_1fr] items-center gap-2">
            <div className="w-[95%] max-w-full h-[1px] border border-[#676767]" />

            <p className="text-[#676767] text-[16px] font-normal">
              Или войдите через соц. сети
            </p>

            <div className="w-[95%] max-w-full h-[1px] border border-[#676767]" />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-full flex items-center py-3 px-4 border border-[#676767] gap-2">
              <Image src={GoogleIcon} width={20} height={20} alt="google" />

              <p className="text-[#676767] text-[16px] font-normal">Google</p>
            </div>

            <div className="w-full flex items-center py-3 px-4 border border-[#676767] gap-2">
              <Image src={FacebookIcon} width={20} height={20} alt="facebook" />

              <p className="text-[#676767] text-[16px] font-normal">Facebook</p>
            </div>
          </div>
        </div>

        <p className="text-[#000] text-[24px] font-semibold text-center">
          Новый пользователь?
        </p>

        <Button
          variant={BUTTON_STYLES.withoutBackground}
          onClick={() => onClickModal('register')}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Modal>
  );
};
