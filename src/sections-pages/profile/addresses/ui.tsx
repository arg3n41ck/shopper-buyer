import React, { useState } from 'react';
import { Button } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { useAddressesQuery } from '@/entities/addresses';
import { AddressForm, AddressView } from '@/feautures/addresses';

export const ProfileAddressesSection = () => {
  const [openCreate, setOpenCreate] = useState(false);

  const { data: addresses } = useAddressesQuery();

  return (
    <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-neutral-900 text-2xl md:text-[28px] font-medium">
        Адреса
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        {!addresses?.length || openCreate ? (
          <div className="self-stretch">
            <AddressForm onClose={() => setOpenCreate(false)} />
          </div>
        ) : (
          <>
            {addresses.map((address) => (
              <AddressView key={address.id} address={address} />
            ))}
          </>
        )}
      </div>
      {!openCreate && (
        <Button
          variant={BUTTON_STYLES.primaryCtaIndigo}
          onClick={() => setOpenCreate(true)}
        >
          Создать новый адрес
        </Button>
      )}
    </div>
  );
};
