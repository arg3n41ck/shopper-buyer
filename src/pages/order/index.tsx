import React from 'react';
import { MainLayout } from '@/widgets/layouts';
import { Accordion } from '@/shared/ui/accordions';
import Checkbox from '@/shared/ui/inputs/checkbox';
import TextField from '@/shared/ui/inputs/textField';
import { AddressesInput } from '@/feautures/addresses';

const Order = () => {
  return (
    <MainLayout hidden={{ topBar: true, categories: true, botBar: true }}>
      <div className="main-container">
        <div className="font-jost my-[24px] grid grid-cols-[minmax(300px,620px)_minmax(300px,508px)] justify-between md:grid-cols-1 gap-[20px]">
          <div className="">
            <Accordion
              classNames={{
                label: 'p-[20px]',
                content: '!p-[20px] border-[#DBDBDB] border-t-[1px]',
                accordion: 'border-[#DBDBDB] border-[1px] px-0',
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
              <div>
                <div className="grid gap-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[16px] w-full font-[500]">
                      Заказ другому человеку
                    </p>
                    <Checkbox className="w-min" />
                  </div>

                  <TextField label="Имя Фамилия" placeholder="ФИО" value="" />
                  <TextField
                    label="Номер телефона"
                    placeholder="Введите номер телефона"
                    value=""
                  />
                  <div className="flex items-center justify-between text-[16px]">
                    <div className="flex items-center gap-[12px] whitespace-nowrap">
                      <Checkbox className="w-min !mx-0" />
                      <p className="font-[600]">До двери курьером</p>
                      <p className="text-gray">1-3 дня</p>
                    </div>
                    <p>300 сом</p>
                  </div>

                  <div className="flex items-center justify-between text-[16px]">
                    <div className="flex items-center gap-[12px] whitespace-nowrap">
                      <Checkbox className="w-min !mx-0" />
                      <p className="font-[600]">Самовывоз</p>
                    </div>
                    <p>Бесплатно</p>
                  </div>
                </div>
                <AddressesInput />
              </div>
            </Accordion>
          </div>
          <div className=""></div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Order;
