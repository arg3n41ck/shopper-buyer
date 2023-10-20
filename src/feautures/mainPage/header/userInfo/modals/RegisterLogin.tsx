import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { AlertCircle, Check } from 'react-feather';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Modal } from '@/shared/ui/modals';
import TextField from '@/shared/ui/inputs/textField';
import { passwordLengthCheck } from '@/shared/lib/helpers';
import Checkbox from '@/shared/ui/inputs/checkbox';
import Image from 'next/image';
import { Button } from '@/shared/ui/buttons';
import {
  BUTTON_STYLES,
  ERROR,
  NEUTRAL,
  SUCCESS,
} from '@/shared/lib/consts/styles';
import { ShowAndHideIcon } from '@/shared/ui/templates';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

interface Preference {
  id: number;
  title: string;
  value: string;
  img: string;
}

const clothes: Preference[] = [
  { id: 1, title: 'Женская мода', value: 'women', img: '/party.png' },
  { id: 2, title: 'Мужская мода', value: 'men', img: '/party.png' },
  { id: 3, title: 'Детская мода', value: 'children', img: '/party.png' },
];

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    email: yup
      .string()
      .email(t('auth.validation.email.invalid'))
      .required(t('auth.validation.email.required')),
  });

export const RegisterModal: FC<RegisterModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    repeat_password: boolean;
  }>({
    password: false,
    repeat_password: false,
  });

  const handlePasswordToggle = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeat_password: '',
      preferred_clothing: [] as string[],
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

  const handleCheckboxChange = (preferenceValue: string) => {
    const isChecked =
      formik.values.preferred_clothing.includes(preferenceValue);
    const currentPreferences = formik.values.preferred_clothing;

    const updatedPreferences = isChecked
      ? currentPreferences.filter((value) => value !== preferenceValue)
      : [...currentPreferences, preferenceValue];

    formik.setFieldValue('preferred_clothing', updatedPreferences);
  };

  const handleSelectAllCheckbox = () => {
    const isChecked =
      formik.values.preferred_clothing.length === clothes.length;
    const allPreferences = clothes.map((preference) => preference.value);

    formik.setFieldValue('preferred_clothing', isChecked ? [] : allPreferences);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10 flex flex-col gap-5">
        <p className="text-[#000] text-[24px] font-semibold text-center">
          Новый пользователь
        </p>

        <div className="w-full flex flex-col gap-3">
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder={'Адрес электронной почты или номер телефона'}
            name="email"
          />

          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            type={showPassword.password ? 'text' : 'password'}
            endAdornment={ShowAndHideIcon({
              show: showPassword.password,
              onHide: () => handlePasswordToggle('password'),
              onShow: () => handlePasswordToggle('password'),
            })}
            placeholder="Пароль"
          />

          <div
            className={`
  flex items-center gap-[5px] text-[${
    passwordLengthCheck({ password: formik.values.password })
      ? SUCCESS[700]
      : NEUTRAL[500]
  }]`}
          >
            {passwordLengthCheck({ password: formik.values.password }) ? (
              <Check size={16} />
            ) : (
              <AlertCircle size={16} />
            )}

            <p className={`text-[${ERROR[700]}]`}>
              Ваш пароль должен содержать мин. 8 букв
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <p className="text-[#000] text-[20px] font-semibold md:text-[16px] sm:text-[12px]">
              Укажите ваши предпочтения
            </p>

            <p className="text-[#676767] text-[16px] font-normal sm:text-[12px]">
              (Не обязательно)
            </p>
          </div>

          <p className="text-[#676767] text-[16px] font-normal sm:text-[12px]">
            Мы используем эту информацию чтобы предоставлять более
            персонализированные рекомендации
          </p>
        </div>

        <Checkbox
          label={'Выбрать все'}
          checked={formik.values.preferred_clothing.length === clothes.length}
          onChange={handleSelectAllCheckbox}
        />

        <div className="w-full flex justify-between gap-4">
          {clothes.map((preference) => (
            <div
              key={preference.id}
              className={`max-w-[134px] w-full h-full relative border-[2px] ${
                formik.values.preferred_clothing.includes(preference.value)
                  ? 'border-[#171717]'
                  : 'border-transparent'
              }`}
            >
              <div className="absolute top-[10px] left-[10px]">
                <Checkbox
                  checked={formik.values.preferred_clothing.includes(
                    preference.value,
                  )}
                  onChange={() => handleCheckboxChange(preference.value)}
                />
              </div>

              <Image
                src={preference.img}
                width={134}
                height={137}
                alt={preference.title}
                layout=""
                className="h-[137px]"
              />

              <p className="text-[#fff] text-[14px] font-semibold absolute left-[10px] bottom-[10px]">
                {preference.title}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant={BUTTON_STYLES.primaryCta}
          onClick={() => formik.handleSubmit()}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Modal>
  );
};
