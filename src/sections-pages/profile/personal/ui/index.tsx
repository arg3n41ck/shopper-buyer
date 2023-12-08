import VisaIcon from '@/shared/assets/icons/svg/VisaIcon';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import Checkbox from '@/shared/ui/inputs/checkbox';
import TextField from '@/shared/ui/inputs/textField';
import { PreferenceSelector } from '@/shared/ui/selects';
import React, { useState } from 'react';
import { Lock, Plus } from 'react-feather';
import { ProfilePassword } from './password';
import { useProfileQuery } from '../..';
import { ProfileEmail } from './email';
import { ProfilePhoneNumber } from './phone-number';
import { ProfileFullName } from './full-name';

interface ActiveFields {
  name: boolean;
  email: boolean;
  phone_number: boolean;
  preferred: boolean;
  password: boolean;
  payment_method: boolean;
}

interface Preference {
  id: number;
  title: string;
  value: string;
  img: string;
}

const clothes: Preference[] = [
  { id: 1, title: 'Женская мода', value: 'women', img: '/party.png' },
  { id: 2, title: 'Мужская мода', value: 'men', img: '/party.png' },
  { id: 3, title: 'Детская мода', value: 'children', img: '/party.png' },
];

export const ProfilePersonalSection = () => {
  const [newPaymentMethod, setNewPaymentMethod] = useState(false);
  const [activeFields, setActiveFields] = useState<ActiveFields>({
    name: false,
    email: false,
    phone_number: false,
    preferred: false,
    password: false,
    payment_method: false,
  });

  useProfileQuery();

  const toggleField = (fieldName: keyof ActiveFields) => {
    setActiveFields((prevFields) => ({
      ...prevFields,
      [fieldName]: !prevFields[fieldName],
    }));
  };

  return (
    <div className="w-full flex-col justify-start items-start gap-5 inline-flex">
      <div className="text-neutral-900 text-2xl md:text-[28px] font-medium">
        Личные данные
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-3 flex">
        <ProfileFullName />

        <ProfileEmail />

        <ProfilePhoneNumber />

        <div className="w-full">
          <div
            className={`self-stretch p-5 ${
              !activeFields.preferred && 'border-b'
            } border-zinc-300 flex-col justify-start items-start gap-3 flex`}
          >
            <div className="self-stretch justify-start items-center gap-3 inline-flex">
              <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
                Предпочтения
              </div>

              {!activeFields.preferred && (
                <Button
                  onClick={() => toggleField('preferred')}
                  variant={BUTTON_STYLES.onlyText}
                  className="max-w-max !p-0"
                >
                  Изменить
                </Button>
              )}
            </div>
            <div className="text-stone-500 text-base font-normal">
              Женская мода, Мужская мода
            </div>
          </div>

          {activeFields.preferred && (
            <div className="w-full p-5 border-b border-zinc-300 flex-col justify-start items-start gap-3 inline-flex">
              <div className="flex flex-col gap-1">
                <p className="text-[#000] text-[20px] font-medium md:text-[16px] sm:text-[12px]">
                  Укажите ваши предпочтения
                </p>

                <p className="text-[#676767] text-[16px] font-normal sm:text-[12px]">
                  Мы используем эту информацию чтобы предоставлять более
                  персонализированные рекомендации
                </p>
              </div>

              <PreferenceSelector clothes={clothes} onChange={() => {}} />

              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <Button
                  onClick={() => toggleField('preferred')}
                  variant={BUTTON_STYLES.withoutBackground}
                >
                  Отмена
                </Button>

                <Button
                  onClick={() => toggleField('preferred')}
                  variant={BUTTON_STYLES.primaryCta}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </div>

        <ProfilePassword />

        <div className="w-full">
          {!newPaymentMethod && (
            <div
              className={`self-stretch p-5 ${
                !activeFields.payment_method && 'border-b'
              } border-zinc-300 flex-col justify-start items-start gap-3 flex`}
            >
              <div className="self-stretch justify-start items-center gap-3 inline-flex">
                <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
                  Метод оплаты
                </div>
                {!activeFields.payment_method && (
                  <Button
                    onClick={() => toggleField('payment_method')}
                    variant={BUTTON_STYLES.onlyText}
                    className="max-w-max !p-0"
                  >
                    Изменить
                  </Button>
                )}
              </div>
              <div className="justify-start items-start gap-3 inline-flex">
                <VisaIcon />
                <div className="justify-start items-start gap-2 flex">
                  <div className="text-neutral-900 text-base font-normal">
                    VISA
                  </div>
                  <div className="text-stone-500 text-base font-normal">
                    • • • • 4811
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFields.payment_method && (
            <div className="w-full p-5 border-b border-zinc-300 flex-col justify-start items-start gap-3 inline-flex">
              {!newPaymentMethod ? (
                <div className="flex flex-col gap-3">
                  <div className="flex w-full items-center gap-1">
                    <Checkbox
                      checked={false}
                      onChange={() => {}}
                      className="max-w-max"
                    />

                    <div className="justify-start items-start gap-3 inline-flex w-full">
                      <VisaIcon />
                      <div className="justify-start items-start gap-2 flex">
                        <div className="text-neutral-900 text-base font-normal">
                          VISA
                        </div>
                        <div className="text-stone-500 text-base font-normal">
                          • • • • 4811
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant={BUTTON_STYLES.onlyText}
                    className="!p-0"
                    onClick={() => setNewPaymentMethod(true)}
                  >
                    <div className="w-full justify-start items-center gap-3 inline-flex text-indigo-600">
                      <Plus size={20} />
                      <div className="text-base font-medium">
                        Добавить метод оплаты
                      </div>
                    </div>
                  </Button>
                </div>
              ) : (
                <div className="w-full border-b border-zinc-300 flex-col justify-start items-start inline-flex">
                  <div className="self-stretch flex-col justify-start items-start gap-5 flex">
                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                      <div className="grow shrink basis-0 text-neutral-900 text-lg font-medium">
                        Новый метод оплаты
                      </div>
                    </div>
                    <div className="self-stretch px-4 py-3 opacity-80 bg-blue-50 justify-start items-center gap-3 inline-flex text-stone-500">
                      <Lock size={18} />

                      <div className=" text-sm font-normal">
                        Данные карты защищены шифрованием
                      </div>
                    </div>

                    <TextField
                      value={''}
                      onChange={() => {}}
                      placeholder={`0000 0000 0000 0000`}
                      label="Номер карты"
                    />

                    <div className="flex items-end gap-5 w-full">
                      <TextField
                        value={''}
                        onChange={() => {}}
                        placeholder={`00/00`}
                        label="Дата"
                      />

                      <div className="text-[32px] text-[#676767]">/</div>

                      <TextField
                        value={''}
                        onChange={() => {}}
                        placeholder={`Имя владельца карты`}
                        label="Имя владельца карты"
                      />
                    </div>

                    <TextField
                      value={''}
                      onChange={() => {}}
                      placeholder={`CVC`}
                      label="CVC код"
                    />
                  </div>
                </div>
              )}

              <div className="self-stretch justify-start items-start gap-3 inline-flex">
                <Button
                  onClick={() => {
                    toggleField('payment_method');
                    setNewPaymentMethod(false);
                  }}
                  variant={BUTTON_STYLES.withoutBackground}
                >
                  Отмена
                </Button>

                <Button
                  onClick={() => {
                    toggleField('payment_method');
                    setNewPaymentMethod(false);
                  }}
                  variant={BUTTON_STYLES.primaryCta}
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
