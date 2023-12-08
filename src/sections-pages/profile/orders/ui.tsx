import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export const ProfileOrdersSection = () => {
  const router = useRouter();

  const navigateToOrderDetail = () =>
    router.push('/profile/orders/detail/slugggg');

  return (
    <div className="flex flex-col justify-start items-start gap-5 w-full mx-auto">
      <div className="text-neutral-900 text-2xl md:text-[28px] font-medium">
        Заказы
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-5 w-full">
        <div className="flex flex-row bg-white border border-zinc-300 p-5 gap-5 max-w-[532px] w-full">
          <Image
            src={'/sumka.png'}
            width={240}
            height={240}
            alt="sumka"
            className="w-[240px] h-[240px] object-contain"
          />

          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              #2403507712
            </div>
            <div className="text-stone-500 text-base font-normal">
              Дата заказа: 03.08.2023
            </div>
            <div className="text-neutral-900 text-base font-medium uppercase">
              Доставлено
            </div>
            <div className="text-stone-500 text-base font-normal">
              03.06.2023
            </div>
            <div className="text-neutral-900 text-xl font-medium mt-[66px]">
              58 184 сом
            </div>
            <Button
              variant={BUTTON_STYLES.withoutBackground}
              onClick={navigateToOrderDetail}
            >
              Детали заказа
            </Button>
          </div>
        </div>

        <div className="flex flex-row bg-white border border-zinc-300 p-5 gap-5 max-w-[532px] w-full">
          <Image
            src={'/sumka.png'}
            width={240}
            height={240}
            alt="sumka"
            className="w-[240px] h-[240px] object-contain"
          />

          <div className="flex flex-col justify-start items-start gap-4 w-full">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              #2403507712
            </div>
            <div className="text-stone-500 text-base font-normal">
              Дата заказа: 03.08.2023
            </div>
            <div className="text-neutral-900 text-base font-medium uppercase">
              Доставлено
            </div>
            <div className="text-stone-500 text-base font-normal">
              03.06.2023
            </div>
            <div className="text-neutral-900 text-xl font-medium mt-[66px]">
              58 184 сом
            </div>
            <Button
              variant={BUTTON_STYLES.withoutBackground}
              onClick={navigateToOrderDetail}
            >
              Детали заказа
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
