import VisaIcon from '@/shared/assets/icons/svg/VisaIcon';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { useRouter } from 'next/router';
import React from 'react';
import { useAddressesQuery } from '@/entities/addresses';
import { useUserQuery } from '@/entities/user';

export const ProfileAccountSection = () => {
  const router = useRouter();

  const { data: profile } = useUserQuery();
  const { mainAddress } = useAddressesQuery();

  const navigate = (path: string) => router.push(`/profile/${path}`);

  return (
    <div className="flex flex-col justify-start items-start gap-5 w-full">
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="text-neutral-900 text-2xl md:text-[28px] font-medium">
          Ваш личный кабинет
        </div>
        <div className="text-neutral-500 text-base font-normal">
          Добро пожаловать в ваш личный кабинет Shopper. <br />
          Вы можете управлять своими заказами, возвратами и информацией об
          учетной записи прямо здесь.
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-3 w-full">
        <div className="p-5 border-b border-zinc-300 flex flex-col justify-start items-start gap-3 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="text-neutral-900 text-lg font-medium">
              Личные данные
            </div>
            <Button
              onClick={() => navigate('personal')}
              variant={BUTTON_STYLES.onlyText}
              className="max-w-max !p-0"
            >
              Детали
            </Button>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div className="text-stone-500 text-base font-normal">
              <p className="m-0">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="m-0">{profile?.email}</p>
              <p className="m-0">{profile?.phone_number}</p>
              <p className="m-0">• • • • • • • • • • • •</p>
            </div>
            <div className="flex items-start gap-3">
              <VisaIcon />
              <div className="flex items-start gap-2">
                <div className="text-stone-500 text-base font-normal">VISA</div>
                <div className="text-stone-500 text-base font-normal">
                  • • • • 4811
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 border-b border-zinc-300 flex flex-col justify-start items-start gap-3 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="text-neutral-900 text-lg font-medium">
              Основной адрес доставки
            </div>

            <Button
              onClick={() => navigate('addresses')}
              variant={BUTTON_STYLES.onlyText}
              className="max-w-max !p-0"
            >
              Детали
            </Button>
          </div>
          {mainAddress ? (
            <div className="text-stone-500 text-base font-normal">
              <p className="m-0">{mainAddress.full_name}</p>
              <p className="m-0">{mainAddress.address}</p>
              <p className="m-0">{mainAddress.zip_code}</p>
              <p className="m-0">{mainAddress.phone_number}</p>
            </div>
          ) : (
            <div className="w-full text-stone-500 text-base font-normal flex">
              <Button
                variant={BUTTON_STYLES.withoutBackground}
                onClick={() => navigate('addresses')}
              >
                Добавить адрес
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
