import VisaIcon from '@/shared/assets/icons/svg/VisaIcon';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button } from '@/shared/ui/buttons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { ArrowLeft } from 'react-feather';

export const ProfileOrderDetailSection = () => {
  const router = useRouter();

  const naviagteToOrdersPage = () => router.push('/profile/orders');

  return (
    <>
      <div
        onClick={naviagteToOrdersPage}
        className="w-[131px] justify-start items-center gap-2 inline-flex text-stone-500 cursor-pointer mb-6"
      >
        <ArrowLeft size={20} />
        <div className=" text-xl font-medium">Все заказы</div>
      </div>

      <div className="border border-zinc-300 flex flex-col ">
        <div className="bg-white p-5 flex flex-col gap-3 border-b border-zinc-300">
          <div className="flex items-center justify-between">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              Номер заказа #2403507712
            </div>
            <div className="flex items-center gap-2 bg-green-200 px-2 py-0.5">
              <div className="w-1.5 h-1.5 bg-lime-600 rounded-full" />
              <div className="text-lime-600 text-xs font-medium">Доставлен</div>
            </div>
          </div>
          <div className="text-stone-500 text-base font-normal">
            Дата заказа: 03.08.2023
          </div>
        </div>

        <div className="bg-white border-b border-zinc-300 p-5 flex gap-7 items-start">
          <Image
            src="/sumka.png"
            width={80}
            height={80}
            alt="sumka"
            className="w-[80px] h-[80px] object-contain"
          />
          <div className="flex flex-row flex-wrap gap-2 items-start">
            <div>
              <div className="text-neutral-900 text-xl font-medium">
                Stella McCartney
              </div>
              <div className="text-stone-500 text-base font-normal">
                брюки с разрезами
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 text-base font-normal">
                  Размер:
                </span>
                <span className="text-neutral-900 text-base font-normal">
                  XS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-500 text-base font-normal">
                  Цвет:
                </span>
                <span className="text-neutral-900 text-base font-normal">
                  Черный
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-stone-500 text-base font-normal">
                  Кол-во:
                </span>
                <span className="text-neutral-900 text-base font-normal">
                  1
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-900 text-sm font-medium line-through">
                  18 650 сом
                </span>
                <span className="text-error700 text-base font-medium">
                  18 650 сом
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-5 bg-white border-b border-zinc-300 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="text-neutral-900 text-base font-normal">
                Промежуточный итог
              </div>
              <div className="text-right text-neutral-900 text-base font-normal">
                56 984 сом
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-neutral-900 text-base font-normal">
                Доставка
              </div>
              <div className="text-right text-neutral-900 text-base font-normal">
                1 200 сом
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-neutral-900 text-xl font-medium">Итого</div>
              <div className="text-right text-neutral-900 text-xl font-medium">
                58 184 сом
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white flex justify-between gap-5 flex-wrap">
          <div className="flex flex-col gap-2 max-w-full">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              Адрес доставки
            </div>
            <div className="text-neutral-900 text-base font-normal capitalize">
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
          </div>
          <div className="flex flex-col gap-2 max-w-full">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              Способ доставки
            </div>
            <div className="flex items-center gap-3">
              <div className="text-neutral-900 text-base font-medium">
                До двери курьером
              </div>
              <div className="text-stone-500 text-base font-normal">
                1-3 дня
              </div>
              <div className="text-right text-neutral-900 text-base font-normal">
                300 сом
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 max-w-full">
            <div className="text-neutral-900 text-lg font-medium uppercase">
              Оплата
            </div>
            <div className="flex items-start gap-3">
              <VisaIcon />
              <div className="text-neutral-900 text-base font-normal capitalize">
                VISA • • • • 4811
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white flex flex-col items-center gap-3">
          <Button variant={BUTTON_STYLES.primaryCta} className="max-w-[200px]">
            Оформить возврат
          </Button>
          <div className="w-full max-w-lg text-center text-neutral-900 text-base font-normal">
            Оформить возврат можно в течение 2-х недель после получения заказа
          </div>
          <div className="flex items-center gap-1">
            <div className="text-indigo-600 text-base font-medium">
              Часто задаваемые вопросы
            </div>
            <div className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};
