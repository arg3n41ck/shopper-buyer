import { CustomerAddress } from '@/shared/api/gen';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import Checkbox from '@/shared/ui/inputs/checkbox';
import TextField from '@/shared/ui/inputs/textField';
import { useFormik } from 'formik';
import { InputMask } from '@/shared/ui/inputs/input-mask/ui';
import * as yup from 'yup';
import { useAddressesQuery } from '@/sections-pages/profile';


const validationSchema = () =>
    yup.object({
      full_name: yup.string().required('Заполните поле'),
      zip_code: yup
          .string()
          .min(6, 'Почтовый индекс должен содержать как минимум 6 символов')
          .required('Заполните поле'),
      address: yup.string().required('Заполните поле'),
      phone_number: yup.string().required('Заполните поле'),
    });

interface AddressForm {
  address?: CustomerAddress;
  onClose?: () => void;
}

export function AddressForm({ address, onClose }: AddressForm) {
  const { refetch, isFetching, changeAddress } = useAddressesQuery();

  const initialValues = {
    full_name: address?.full_name || '',
    address: address?.address || '',
    zip_code: address?.zip_code || '',
    phone_number: address?.phone_number || '',
    is_main: address?.is_main || false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (address?.id) {
        await changeAddress.mutate({ id: address.id, ...values });
      } else {
        await changeAddress.mutate(values);
      }
      // await refetch();
      onClose && onClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="self-stretch flex-col justify-start items-start gap-5 flex">
        <div className="self-stretch flex-col justify-start items-start gap-[20px] flex">
          <TextField
            value={formik.values.full_name}
            name="full_name"
            onChange={formik.handleChange}
            placeholder={`Имя Фамилия`}
            label="Имя Фамилия"
            error={formik.touched.full_name && Boolean(formik.errors.full_name)}
            errorMessage={
              formik.touched.full_name && formik.errors.full_name
                ? formik.errors.full_name
                : ''
            }
          />

          <InputMask
            value={formik.values.phone_number}
            name="phone_number"
            onChange={formik.handleChange}
            placeholder={`Номер телефона`}
            label="Номер телефона"
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
            errorMessage={
              formik.touched.phone_number && formik.errors.phone_number
                ? formik.errors.phone_number
                : ''
            }
          />

          <TextField
            value={formik.values.address}
            onChange={formik.handleChange}
            name="address"
            placeholder={`Адрес доставки`}
            label="Адрес доставки"
            error={formik.touched.address && Boolean(formik.errors.address)}
            errorMessage={
              formik.touched.address && formik.errors.address
                ? formik.errors.address
                : ''
            }
          />

          <TextField
            value={formik.values.zip_code}
            name="zip_code"
            onChange={formik.handleChange}
            placeholder={`zip code`}
            label="Почтовый индекс"
            error={formik.touched.zip_code && Boolean(formik.errors.zip_code)}
            errorMessage={
              formik.touched.zip_code && formik.errors.zip_code
                ? formik.errors.zip_code
                : ''
            }
          />
        </div>
        <div className="pb-[12px]">
          <Checkbox
            checked={formik.values.is_main}
            onChange={({ target: { checked } }) =>
              formik.setFieldValue('is_main', checked)
            }
            label="Сделать основным адресом"
          />
        </div>
      </div>

      <div className="mt-[20px] items-start gap-3 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
        {onClose && (
          <Button
            onClick={() => onClose()}
            variant={BUTTON_STYLES.withoutBackground}
          >
            Отмена
          </Button>
        )}

        <Button
          type="submit"
          disabled={isFetching}
          onClick={() => formik.handleSubmit()}
          variant={BUTTON_STYLES.primaryCta}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
}
