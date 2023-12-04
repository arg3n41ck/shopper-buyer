import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import { AlertCircle, Check } from 'react-feather';
import * as yup from 'yup';
import { Modal } from '@/shared/ui/modal-windows';
import TextField from '@/shared/ui/inputs/textField';
import {
  identifyContactType,
  passwordLengthCheck,
  getErrorMessage,
} from '@/shared/lib/helpers';
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
import { $apiAccountsApi } from '@/shared/api';
import { CustomerPreferencesEnum } from '@/shared/api/gen';
import { toast } from 'react-toastify';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

interface Preference {
  id: number;
  title: string;
  value: CustomerPreferencesEnum;
  img: string;
}

const clothes: Preference[] = [
  { id: 1, title: 'Женская мода', value: 'FEMALE', img: '/party.png' },
  { id: 2, title: 'Мужская мода', value: 'MALE', img: '/party.png' },
  { id: 3, title: 'Детская мода', value: 'BABY', img: '/party.png' },
];

const validationSchema = () =>
  yup.object({
    email: yup.string().required('Заполните поле'),
    password: yup
      .string()
      .min(8, 'Пароль должен содержать как минимум 8 символов')
      .test(
        '',
        'Заполните поле',
        (value) => !!(value || ' ').replace(/\s/g, ''),
      )
      .required('Заполните поле пароля корректно'),
    re_password: yup
      .string()
      .oneOf([yup.ref('password')], 'Пароли не совпадают')
      .required('Заполните поле'),
    customer: yup.object({
      date_of_birth: yup.string().required('Заполните поле'),
    }),
  });

export const RegisterModal: FC<RegisterModalProps> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    re_password: boolean;
  }>({
    password: false,
    re_password: false,
  });

  const handlePasswordToggle = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      re_password: '',
      customer: {
        date_of_birth: '',
        preferences: [] as CustomerPreferencesEnum[],
      },
    },
    validationSchema: validationSchema(),
    onSubmit: async ({ email, ...other }, formikHelpers) => {
      try {
        const contact = identifyContactType(email);
        if (contact == 'unknown') {
          formikHelpers.setFieldError('email', 'Заполните поле корректно');
          return;
        }

        await toast.promise(
          $apiAccountsApi.accountsUsersCreateCustomerCreate({
            [contact]: email,
            ...other,
          }),
          {
            pending: 'Загрузка...',
            success: 'Профиль успешно создан! Авторизуйтесь что-бы войти',
          },
        );
        onClose();
      } catch (e: any) {
        toast.error(getErrorMessage(e));
      }
    },
  });

  const handleCheckboxChange = (preferenceValue: CustomerPreferencesEnum) => {
    const isChecked =
      formik.values.customer.preferences.includes(preferenceValue);
    const currentPreferences = formik.values.customer.preferences;

    const updatedPreferences = isChecked
      ? currentPreferences.filter((value) => value !== preferenceValue)
      : [...currentPreferences, preferenceValue];

    formik.setFieldValue('customer.preferences', updatedPreferences);
  };

  const handleSelectAllCheckbox = () => {
    const isChecked =
      formik.values.customer.preferences.length === clothes.length;
    const allPreferences = clothes.map((preference) => preference.value);

    formik.setFieldValue(
      'customer.preferences',
      isChecked ? [] : allPreferences,
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={formik.handleSubmit} className="p-10 flex flex-col gap-5">
        <p className="text-[#000] text-[24px] font-semibold text-center">
          Новый пользователь
        </p>

        <div className="w-full flex flex-col gap-3">
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder={'Адрес электронной почты или номер телефона'}
            name="email"
            errorMessage={formik.errors.email}
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

          <TextField
            value={formik.values.re_password}
            onChange={formik.handleChange}
            errorMessage={formik.errors.re_password}
            name="re_password"
            type={showPassword.password ? 'text' : 'password'}
            endAdornment={ShowAndHideIcon({
              show: showPassword.password,
              onHide: () => handlePasswordToggle('password'),
              onShow: () => handlePasswordToggle('password'),
            })}
            placeholder="Повторите пароль"
          />

          <TextField
            label="Укажите дату своего рождения"
            name="customer.date_of_birth"
            onChange={formik.handleChange}
            value={formik.values.customer.date_of_birth}
            errorMessage={formik.errors.customer?.date_of_birth}
            type="date"
          />
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
          checked={formik.values.customer.preferences.length === clothes.length}
          onChange={handleSelectAllCheckbox}
        />

        <div className="w-full flex justify-between gap-4">
          {clothes.map((preference) => (
            <div
              key={preference.id}
              className={`max-w-[134px] w-full h-full relative border-[2px] ${
                formik.values.customer.preferences.includes(preference.value)
                  ? 'border-[#171717]'
                  : 'border-transparent'
              }`}
            >
              <div className="absolute top-[10px] left-[10px]">
                <Checkbox
                  checked={formik.values.customer.preferences.includes(
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

        <Button type="submit" variant={BUTTON_STYLES.primaryCta}>
          Зарегистрироваться
        </Button>
      </form>
    </Modal>
  );
};
