import React, { FC, useState } from 'react';
import Modal from '@/shared/ui/modal';
import {
  ModalInnerContainer,
  SubmitButton,
  LoginInfoContainer,
  TextInModal,
  SelectYourPreferencesText,
  SelectYourPreferencesExtraInfoText,
  SelectYourPreferencesBlock,
  SelectYourPreferencesInfoTextsContainer,
  SelectYourPreferencesInfoImagesContainer,
  PreferenceBlock,
  PreferenceBlockInnerText,
  PreferenceBlockImage,
  PreferenceBlockCheckbox,
} from './styles';
import TextField from '@/shared/ui/textField';
import ShowAndHideIcon from '@/components/PasswordShowAndHideIcon';
import { PasswordHandlerCont } from '@/pages/auth/styles';
import { passwordLengthCheck } from '@/shared/utils/password';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Check } from 'react-feather';
import Checkbox from '@/shared/ui/checkbox';

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
      <ModalInnerContainer>
        <TextInModal>Новый пользователь</TextInModal>

        <LoginInfoContainer>
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

          <PasswordHandlerCont
            $error={passwordLengthCheck({
              password: formik.values.password,
            })}
          >
            {passwordLengthCheck({ password: formik.values.password }) ? (
              <Check size={16} />
            ) : (
              <AlertCircle size={16} />
            )}

            <p>Ваш пароль должен содержать мин. 8 букв</p>
          </PasswordHandlerCont>

          {/* <TextField
            value={formik.values.repeat_password}
            onChange={formik.handleChange}
            name="repeat_password"
            type={showPassword.repeat_password ? 'text' : 'password'}
            endAdornment={ShowAndHideIcon({
              show: showPassword.repeat_password,
              onHide: () => handlePasswordToggle('repeat_password'),
              onShow: () => handlePasswordToggle('repeat_password'),
            })}
            placeholder="Повторите пароль"
          /> */}
        </LoginInfoContainer>

        <SelectYourPreferencesInfoTextsContainer>
          <SelectYourPreferencesBlock>
            <SelectYourPreferencesText>
              Укажите ваши предпочтения
            </SelectYourPreferencesText>

            <SelectYourPreferencesExtraInfoText>
              (Не обязательно)
            </SelectYourPreferencesExtraInfoText>
          </SelectYourPreferencesBlock>

          <SelectYourPreferencesExtraInfoText>
            Мы используем эту информацию чтобы предоставлять более
            персонализированные рекомендации
          </SelectYourPreferencesExtraInfoText>
        </SelectYourPreferencesInfoTextsContainer>

        <Checkbox
          label={'Выбрать все'}
          checked={formik.values.preferred_clothing.length === clothes.length}
          onChange={handleSelectAllCheckbox}
        />

        <SelectYourPreferencesInfoImagesContainer>
          {clothes.map((preference) => (
            <PreferenceBlock
              key={preference.id}
              $active={formik.values.preferred_clothing.includes(
                preference.value
              )}
            >
              <PreferenceBlockCheckbox>
                <Checkbox
                  checked={formik.values.preferred_clothing.includes(
                    preference.value
                  )}
                  onChange={() => handleCheckboxChange(preference.value)}
                />
              </PreferenceBlockCheckbox>

              <PreferenceBlockImage
                src={preference.img}
                width={134}
                height={137}
                alt={preference.title}
                layout=""
              />

              <PreferenceBlockInnerText>
                {preference.title}
              </PreferenceBlockInnerText>
            </PreferenceBlock>
          ))}
        </SelectYourPreferencesInfoImagesContainer>

        <SubmitButton onClick={() => formik.handleSubmit()}>
          Зарегистрироваться
        </SubmitButton>
      </ModalInnerContainer>
    </Modal>
  );
};
