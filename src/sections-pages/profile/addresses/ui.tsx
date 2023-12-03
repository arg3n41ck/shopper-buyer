import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import Checkbox from '@/shared/ui/inputs/checkbox';
import TextField from '@/shared/ui/inputs/textField';
import React, { useState } from 'react';

export const ProfileAddressesSection = () => {
  const [newPaymentMethod, setNewPaymentMethod] = useState(false);

  return (
    <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-neutral-900 text-[28px] font-medium">Адреса</div>
      <div className=" self-stretch flex-col justify-start items-start gap-3 flex">
        <div className=" p-5 self-stretch border-b border-zinc-300 flex-col justify-start items-start gap-3 flex">
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
              Адрес доставки
            </div>

            {!newPaymentMethod ? (
              <Button
                variant={BUTTON_STYLES.onlyText}
                className="max-w-max !p-0"
                onClick={() => setNewPaymentMethod(true)}
              >
                Изменить
              </Button>
            ) : (
              <Button
                variant={BUTTON_STYLES.onlyText}
                className="max-w-max !p-0"
                onClick={() => setNewPaymentMethod(false)}
              >
                <p className="text-right text-error700 text-base font-medium">
                  Удалить адрес
                </p>
              </Button>
            )}
          </div>

          {!newPaymentMethod ? (
            <div className="text-stone-500 text-base font-normal">
              Акылай Нурбекова
              <br />
              Кыргызстан
              <br />
              Бишкек
              <br />
              ул. К. Акиева 23, кв. 123
              <br />
              230098
              <br />
              +996 703 454 109
            </div>
          ) : (
            <>
              <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch flex-col justify-start items-start gap-3 flex">
                  <TextField
                    value={''}
                    onChange={() => {}}
                    placeholder={`Имя Фамилия`}
                    label="Имя Фамилия"
                  />

                  <TextField
                    value={''}
                    onChange={() => {}}
                    placeholder={`Номер телефона`}
                    label="Номер телефона"
                  />

                  <TextField
                    value={''}
                    onChange={() => {}}
                    placeholder={`Адрес доставки`}
                    label="Адрес доставки"
                  />
                </div>

                <Checkbox
                  checked={true}
                  onChange={() => {}}
                  label="Сделать основным адресом"
                />
              </div>

              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <Button
                  onClick={() => setNewPaymentMethod(false)}
                  variant={BUTTON_STYLES.withoutBackground}
                >
                  Отмена
                </Button>

                <Button
                  onClick={() => setNewPaymentMethod(false)}
                  variant={BUTTON_STYLES.primaryCta}
                >
                  Сохранить
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
