import React, { FC, useEffect, useMemo, useState } from 'react';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { LoaderIcon } from '@/shared/ui/loaders';
import TextField from '@/shared/ui/inputs/textField';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { $apiAccountsApi } from '@/shared/api';
import { fetchWithErrorMessage } from '@/shared/lib/helpers';
import { Modal } from '@/shared/ui/modal-windows';
import { Button } from '@/shared/ui/buttons';
import { User } from '@/shared/api/gen';
import { useUserQuery } from '@/entities/user';

interface IFormValues {
  first_name: string;
  last_name: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const validationSchema = (t: (key: string) => string) =>
  yup.object({
    first_name: yup.string().required(t('Обязательно брат')),
    last_name: yup.string().required(t('Обязательно брат')),
  });

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ProfileFullNameModal: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { data: profile, refetch } = useUserQuery();

  const initialValues = useMemo(() => {
    return {
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
    };
  }, [profile]);

  const formik = useFormik<IFormValues>({
    initialValues,
    validationSchema: validationSchema(t),
    onSubmit: async ({ first_name, last_name }, { resetForm }) => {
      setIsLoading(true);
      try {
        await fetchWithErrorMessage(
          $apiAccountsApi.accountsUsersMePartialUpdate({
            first_name,
            last_name,
          } as User),
        );
        setIsLoading(false);
        onClose();
        resetForm();
        refetch();
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues(initialValues);
  }, [initialValues]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="px-[42px] py-[46px]">
        <div className="flex max-w-[385px] flex-col gap-[8px]">
          <p className="text-[27.65px] font-[600] leading-[33px] text-neutral-900">
            Измените вашу эл. почту
          </p>
          <p className="text-[13.33px] leading-[16px] text-neutral-900">
            Вы можете обновить вашу эл. почту в любое время чтобы хранить ваш
            Shopper аккаунт защищенным.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-12 mt-9 flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <TextField
                placeholder={'Имя'}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                errorMessage={
                  formik.touched.first_name && formik.errors.first_name
                    ? formik.errors.first_name
                    : ''
                }
                value={formik.values.first_name}
                onChange={formik.handleChange}
                name="first_name"
              />
              <TextField
                placeholder={'Фамилия'}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                errorMessage={
                  formik.touched.last_name && formik.errors.last_name
                    ? formik.errors.last_name
                    : ''
                }
                value={formik.values.last_name}
                onChange={formik.handleChange}
                name="last_name"
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
