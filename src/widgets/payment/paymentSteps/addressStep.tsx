import React from 'react';
import { Switch } from '@/shared/ui/inputs';
import TextField from '@/shared/ui/inputs/textField';
import Checkbox from '@/shared/ui/inputs/checkbox';
import { AddressesInput } from '@/feautures/addresses';
import { Button } from '@/shared/ui/buttons';
import { Accordion } from '@/shared/ui/accordions';

export const AddressStep = () => {
  const [switchValue, setSwitchValue] = React.useState(false);

  return (
    <Accordion
      classNames={{
        label: 'p-[20px]',
        content: '!p-[20px] border-[#DBDBDB] border-t-[1px]',
        accordion: 'border-[#DBDBDB] border-[1px] !px-0 !overflow-visible',
      }}
      title={
        <div className="flex items-center gap-[12px]">
          <p className="text-[16px] bg-black rounded-full text-white px-2 py-[1px]">
            1
          </p>
          <p className="text-lg uppercase font-[600]">Адрес доставки</p>
        </div>
      }
    >
      <div className="grid gap-[20px]">
        <div className="grid gap-[12px]">
          <label className="flex items-center justify-between">
            <p className="text-[16px] w-full font-[500]">
              Заказ другому человеку
            </p>
            <Switch
              checked={switchValue}
              onChange={({ target }) => setSwitchValue(target.checked)}
            />
          </label>

          <TextField label="Имя Фамилия" placeholder="ФИО" value="" />
          <TextField
            label="Номер телефона"
            placeholder="Введите номер телефона"
            value=""
          />
          <div className="flex items-center justify-between text-[16px]">
            <label className="flex items-center gap-[12px] whitespace-nowrap">
              <Checkbox className="w-min !mx-0" />
              <p className="font-[600]">До двери курьером</p>
              <p className="text-gray">1-3 дня</p>
            </label>
            <p>300 сом</p>
          </div>

          <div className="flex items-center justify-between text-[16px]">
            <label className="flex items-center gap-[12px] whitespace-nowrap">
              <Checkbox className="w-min !mx-0" />
              <p className="font-[600]">Самовывоз</p>
            </label>
            <p>Бесплатно</p>
          </div>
        </div>

        <AddressesInput />
        <Button variant="PrimaryCTAButton">Продолжить</Button>
      </div>
    </Accordion>
  );
};
