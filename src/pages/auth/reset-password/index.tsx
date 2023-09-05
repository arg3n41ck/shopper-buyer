import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TextField from '@/shared/ui/textField';
import { Trans, useTranslation } from 'react-i18next';
import Button from '@/shared/ui/button';
import { ButtonCont, ButtonInfoCont, HeadingText } from '../styles';
import * as yup from 'yup';
import { PATH_AUTH } from '@/shared/routes/paths';
import { AuthClient } from '@/shared/apis/authClient';
import { TypeCheckUserByEmail } from '@/shared/lib/types/authTypes';
import LoaderIcon from '@/shared/ui/loader';
import { useRouter } from 'next/router';
import AuthLayout from '@/components/Layouts/AuthLayout/AuthLayout';
import {
  ResendSMSText,
  ResetPasswordContainer,
  TextFieldContainer,
  TimerContainer,
} from './styles';
import Checkbox from '@/shared/ui/checkbox';
import { Clock } from 'react-feather';

interface ResetPasswordProps {}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup.string().email(t('auth.validation.email.invalid')),
  });

const authClient = new AuthClient();

const ResetPassword: FC<ResetPasswordProps> = () => {
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
      const email = values.email;
      setIsLoading(true);

      if (values.phoneNumber) {
        setTimeLeft(180);
        setSmsSent(true);
      }

      try {
        console.log(values);
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
        console.log(error);
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
      <ResetPasswordContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingText>
            {/* <Trans i18nKey={'auth.resetPassword.headText'} /> */}
            Восстановление пароля
          </HeadingText>
          <TextFieldContainer>
            <TextField
              // error={formik.touched.email && Boolean(formik.errors.email)}
              // errorMessage={
              //   formik.touched.email && formik.errors.email
              //     ? formik.errors.email
              //     : ''
              // }
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
              <TimerContainer>
                <Clock size={24} />

                <p>{formatTime(timeLeft)}</p>
              </TimerContainer>
            )}
            {smsSent ? (
              <ResendSMSText>Отправить код еще раз</ResendSMSText>
            ) : (
              <Checkbox
                label={'Отправить SMS'}
                checked={checkedSMS}
                onChange={() => handleChangeSMS()}
              />
            )}
          </TextFieldContainer>
          <ButtonCont>
            <Button type="submit" disabled={isLoading}>
              <ButtonInfoCont>
                <Trans i18nKey={'auth.resetPassword.submit'} />{' '}
                <LoaderIcon loading={isLoading} size={24} />
              </ButtonInfoCont>
            </Button>
          </ButtonCont>
        </form>
      </ResetPasswordContainer>
    </AuthLayout>
  );
};

export default ResetPassword;
