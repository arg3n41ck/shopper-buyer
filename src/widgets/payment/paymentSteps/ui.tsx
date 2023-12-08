import React from 'react';
import { Accordion } from '@/shared/ui/accordions';
import { AddressStep } from './addressStep';

export const PaymentSteps = () => {
  return (
    <div className="grid gap-[20px]">
      <AddressStep />

      <Accordion
        classNames={{
          label: 'p-[20px]',
          content: '!p-[20px] border-[#DBDBDB] border-t-[1px]',
          accordion: 'border-[#DBDBDB] border-[1px] !px-0',
        }}
        title={
          <div className="flex items-center gap-[12px]">
            <p className="text-[16px] bg-black rounded-full text-white px-2 py-[1px]">
              2
            </p>
            <p className="text-lg uppercase font-[600]">Оплата</p>
          </div>
        }
      >
        <div className="grid gap-[20px]"></div>
      </Accordion>
    </div>
  );
};
