import React, { FC, useState } from 'react';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { LoaderIcon } from '@/shared/ui/loaders';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { $apiAccountsApi } from '@/shared/api';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { Modal } from '@/shared/ui/modal-windows';
import { ShowAndHideIcon } from '@/shared/ui/templates';
import { Button } from '@/shared/ui/buttons';
import { InputMask } from '@/shared/ui/inputs/input-mask';
import TextField from '@/shared/ui/inputs/textField';
import { useProfileQuery } from '@/sections-pages/profile';

interface IFormValues {
  password: string;
  phone_number: string;
  repeat_phone_number: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    password: yup.string().required(t('Обязательное поле')),
    phone_number: yup.string().required(t('Обязательное поле')),
    repeat_phone_number: yup
      .string()
      .required(t('Повтори номер телефона'))
      .oneOf([yup.ref('phone_number')], t('Не совпадаете')),
  });

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProfilePhoneNumberModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { refetch } = useProfileQuery();

  const formik = useFormik<IFormValues>({
    initialValues: {
      password: '',
      phone_number: '',
      repeat_phone_number: '',
    },
    validationSchema: validationSchema(t),
    onSubmit: async (
      { password, phone_number, repeat_phone_number },
      { resetForm },
    ) => {
      setIsLoading(true);
      await fetchWithErrorMessage(
        $apiAccountsApi.accountsUsersChangePhoneNumberRequest({
          current_password: password,
          phone_number,
          re_phone_number: repeat_phone_number,
        }),
      );
      setIsLoading(false);
      onClose();
      refetch();
      resetForm();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[42px] py-[46px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">
            Измените ваш номер телефона
          </p>

          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить ваш номер телефона в любое время чтобы хранить
            ваш Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <InputMask
                value={formik.values.phone_number}
                name="phone_number"
                onChange={formik.handleChange}
                placeholder={`Номер телефона`}
                label="Номер телефона"
                error={
                  formik.touched.phone_number &&
                  Boolean(formik.errors.phone_number)
                }
                errorMessage={
                  formik.touched.phone_number && formik.errors.phone_number
                    ? formik.errors.phone_number
                    : ''
                }
              />

              <InputMask
                placeholder={t('Подтвердите номер телефона')}
                error={
                  formik.touched.repeat_phone_number &&
                  Boolean(formik.errors.repeat_phone_number)
                }
                errorMessage={
                  formik.touched.repeat_phone_number &&
                  formik.errors.repeat_phone_number
                    ? formik.errors.repeat_phone_number
                    : ''
                }
                value={formik.values.repeat_phone_number}
                onChange={formik.handleChange}
                name="repeat_phone_number"
              />

              <TextField
                placeholder={t('Пароль')}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                errorMessage={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ''
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={ShowAndHideIcon({
                  show: showPassword,
                  onHide: () => setShowPassword(false),
                  onShow: () => setShowPassword(true),
                })}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant={BUTTON_STYLES.primaryCta}>
              <div className="flex items-center gap-[10px]">
                Сохранить
                <LoaderIcon loading={isLoading} size={24} />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
