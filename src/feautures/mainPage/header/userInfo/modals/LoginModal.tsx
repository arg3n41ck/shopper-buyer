import React, { FC, useState } from 'react';
import Modal from '@/shared/ui/modal';
import {
  ForgotPasswordText,
  ModalInnerContainer,
  SubmitButton,
  LoginInfoContainer,
  TextInModal,
  LoginWithAnotherAction,
  LoginWithAnotherActionsContainer,
  LoginWithAnotherActionText,
  LoginWithAnotherActionIntroTextBlock,
  Line,
  LogoIconBlock,
} from './styles';
import LogoIcon from '@/assets/icons/svg/LogoIcon';
import TextField from '@/shared/ui/textField';
import ShowAndHideIcon from '@/components/passwordShowAndHideIcon';
import FacebookIcon from '@/assets/icons/png/facebook.png';
import GoogleIcon from '@/assets/icons/png/google.png';
import { ImageFromNext } from '@/shared/styles/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { PATH_AUTH } from '@/shared/routes/paths';
import { CustomButtonWithBackground } from '@/shared/ui/buttonWithoutBackground';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onClickModal: (type: string) => void;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup
      .string()
      .email(t('auth.validation.email.invalid'))
      .required(t('auth.validation.email.required')),
  });

export const LoginModal: FC<LoginModalProps> = ({
  open,
  onClose,
  onClickModal,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const navigateToResetPasswordPage = () =>
    router.push(PATH_AUTH.resetPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <ModalInnerContainer>
        <LogoIconBlock>
          <LogoIcon />
        </LogoIconBlock>

        <TextInModal>Добро пожаловать!</TextInModal>

        <LoginInfoContainer>
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
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

          <ForgotPasswordText onClick={navigateToResetPasswordPage}>
            Забыли пароль?
          </ForgotPasswordText>
        </LoginInfoContainer>

        <SubmitButton onClick={() => formik.handleSubmit()}>Войти</SubmitButton>

        <LoginInfoContainer>
          <LoginWithAnotherActionIntroTextBlock>
            <Line />

            <LoginWithAnotherActionText>
              Или войдите через соц. сети
            </LoginWithAnotherActionText>

            <Line />
          </LoginWithAnotherActionIntroTextBlock>

          <LoginWithAnotherActionsContainer>
            <LoginWithAnotherAction>
              <ImageFromNext
                src={GoogleIcon}
                width={20}
                height={20}
                alt="google"
              />

              <LoginWithAnotherActionText>Google</LoginWithAnotherActionText>
            </LoginWithAnotherAction>

            <LoginWithAnotherAction>
              <ImageFromNext
                src={FacebookIcon}
                width={20}
                height={20}
                alt="facebook"
              />

              <LoginWithAnotherActionText>Facebook</LoginWithAnotherActionText>
            </LoginWithAnotherAction>
          </LoginWithAnotherActionsContainer>
        </LoginInfoContainer>

        <TextInModal>Новый пользователь?</TextInModal>

        <CustomButtonWithBackground
          $width="100%"
          $padding="12px 0"
          onClick={() => onClickModal('register')}
        >
          Зарегистрироваться
        </CustomButtonWithBackground>
      </ModalInnerContainer>
    </Modal>
  );
};
