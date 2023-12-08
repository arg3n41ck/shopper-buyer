import { CustomerAddress } from '@/shared/api/gen';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { useState } from 'react';
import { AddressForm } from '../address-form';
import { useAddressesQuery } from '@/sections-pages/profile';

interface AddressView {
  address: CustomerAddress;
}

export function AddressView({ address }: AddressView) {
  const [editMode, setEditMode] = useState(false);
  const { refetch, deleteAddress } = useAddressesQuery();

  const handleAddressDeletion = async () => {
    if (address?.id) {
      deleteAddress.mutate(address.id);
      setEditMode(false);
      refetch();
    }
  };

  return (
    <div className="p-5 self-stretch border-b border-zinc-300 flex-col justify-start items-start gap-3 flex">
      <div className="self-stretch justify-start items-center gap-3 inline-flex">
        <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
          {address?.is_main ? 'Основной адрес доставки' : 'Адрес доставки'}
        </div>
        {!editMode ? (
          <Button
            variant={BUTTON_STYLES.onlyText}
            className="max-w-max !p-0"
            onClick={() => setEditMode(true)}
          >
            Изменить
          </Button>
        ) : (
          <Button
            variant={BUTTON_STYLES.onlyText}
            className="max-w-max !p-0"
            onClick={handleAddressDeletion}
          >
            <p className="text-right text-error700 text-base font-medium">
              Удалить адрес
            </p>
          </Button>
        )}
      </div>
      {editMode ? (
        <AddressForm address={address} onClose={() => setEditMode(false)} />
      ) : (
        <div className="text-stone-500 text-base font-normal">
          {address?.full_name}
          <br />
          {address?.address}
          <br />
          {address?.zip_code}
          <br />
          {address?.phone_number}
        </div>
      )}
    </div>
  );
}
