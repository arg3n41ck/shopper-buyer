import { $apiCustomersApi } from '@/shared/api';
import VisaIcon from '@/shared/assets/icons/svg/VisaIcon';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import Cookies from 'js-cookie';
import { useUser } from '@/entities/user';

export const ProfileAccountSection = () => {
  const router = useRouter();
  const token = Cookies.get('refresh_token');
  const isAuth = useUser((state) => state.isAuth);

  const navigate = (path: string) => router.push(`/profile/${path}`);

  const { data: addresses } = useQuery({
    queryKey: ['customersAddressesList', isAuth],
    queryFn: async () => {
      if (!token && !isAuth) return;
      const { data } = await $apiCustomersApi.customersAddressesList();
      return data;
    },
  });

  return (
    <div className="flex flex-col justify-start items-start gap-5 w-full">
      <div className="flex flex-col justify-start items-start gap-2">
        <div className="text-neutral-900 text-[28px] font-medium">
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
              Akylai Nurbekova
              <br />
              njwn5jукjz@privaterelay.appleid.com
              <br />
              +996 998 554 331
              <br />
              Женская одежда
              <br />• • • • • • • • • • • •{' '}
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
          {addresses?.results?.length ? (
            <div className="text-stone-500 text-base font-normal">
              <p className="m-0">Акылай Нурбекова</p>
              <br />
              <p className="m-0">Кыргызстан</p>
              <br />
              <p className="m-0">Бишкек</p>
              <br />
              <p className="m-0">ул. К. Акиева 23, кв. 123</p>
              <br />
              <p className="m-0">230098</p>
              <br />
              <p className="m-0">+996 703 454 109</p>
            </div>
          ) : (
            <div className="text-stone-500 text-base font-normal flex">
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
