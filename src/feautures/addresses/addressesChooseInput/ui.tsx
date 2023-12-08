import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { $apiCustomersApi } from '@/shared/api';
import cn from 'classnames';
import { Check, ChevronDown, Plus } from 'react-feather';
import { CustomerAddress } from '@/shared/api/gen';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import { Modal } from '@/shared/ui/modal-windows';
import { AddressForm } from '@/feautures/addresses';

export const AddressesInput = () => {
  const selectRef = useRef(null);
  const [activeAddress, setActiveAddress] = React.useState<
    CustomerAddress | undefined
  >();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['customersAddressesList'],
    queryFn: async () => {
      const { data } = await $apiCustomersApi.customersAddressesList();
      return data;
    },
  });

  useOutsideClick(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={selectRef} className="relative text-gray font-jost">
      <p className="text-[12px] px-[12px] mb-[4px]">Адрес доставки</p>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="border-neutral-300 border-[1px] cursor-pointer flex items-center justify-between py-[12px] pl-[16px] pr-[12px]"
      >
        <p>Адрес</p>

        <div
          className={cn('transition-all duration-[0.1s] ease-in-out', {
            ['rotate-180']: isOpen,
          })}
        >
          <ChevronDown />
        </div>
      </div>

      {isOpen && (
        <ul
          className={cn(
            'absolute mt-[-1px] left-0 z-[1000] m-0 max-h-[500px] w-full list-none overflow-y-auto border-[1px] border-neutral-300 bg-white p-0',
          )}
        >
          {data?.results.map((address) => (
            <li
              key={address.id}
              onClick={() => {
                setIsOpen(false);
                setActiveAddress(address);
              }}
              className={cn(
                'relative grid gap-[12px] transition-all hover:bg-neutral-100 p-[20px] cursor-pointer border-neutral-300 border-b-[1px]',
                {
                  ['!bg-[#F8F8F8]']: address.id == activeAddress?.id,
                },
              )}
            >
              {address.id == activeAddress?.id && (
                <Check className="absolute top-[20px] right-[20px]" />
              )}

              <p className="text-[18px] font-[500] text-[#171717]">
                {address.is_main ? 'Основной адрес доставки' : 'Адрес доставки'}
              </p>

              <p className="text-[16px] text-gray">
                {address.full_name} <br />
                {address.address} <br />
                {address.zip_code} <br />
                {address.phone_number}
              </p>
            </li>
          ))}

          <li
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className="p-[20px] cursor-pointer transition-all hover:bg-neutral-100 flex items-center gap-[12px] text-purple"
          >
            <Plus color="#4F46E5" />
            <p>Добавить адрес доставки</p>
          </li>
        </ul>
      )}

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-[40px]">
          <h4 className="mb-[20px] text-[24px] text-center text-black font-jost font-[500]">
            Новый адрес доставки
          </h4>
          <AddressForm
            onClose={async () => {
              setIsModalOpen(false);
              await refetch();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
