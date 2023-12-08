import React, { useState } from 'react';
import { AddressForm } from '@/feautures/addresses';
import { AddressView } from '@/feautures/addresses';
import { Button } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { useAddresses, useAddressesQuery } from '@/entities/addresses';

export const ProfileAddressesSection = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const addresses = useAddresses((state) => state.addresses);
  useAddressesQuery();

  return (
    <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-neutral-900 text-[28px] font-medium">Адреса</div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        {!addresses?.length || openCreate ? (
          <div className="self-stretch justify-start items-center gap-3 flex flex-col">
            <AddressForm onClose={() => setOpenCreate(false)} />
          </div>
        ) : (
          <>
            {addresses.map((address) => (
              <AddressView key={address.address} address={address} />
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
