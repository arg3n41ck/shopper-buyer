import React from 'react';
import { useCart } from '@/entities/cart';
import { useCartQuery } from '@/feautures/cart';
import { useIsClient } from '@/shared/lib/hooks';
import ProductItemInBag from '@/feautures/header/shoppingBag/ProductItemInBag';
import { Button } from '@/shared/ui/buttons';
import { CreditCard, Lock, RefreshCw, Truck } from 'react-feather';
import InlineSVG from 'react-inlinesvg';
import VisaIcon from '../../../../public/images/icons/payments/Visa.svg';
import MastercardIcon from '../../../../public/images/icons/payments/Mastercard.svg';
import MaestroIcon from '../../../../public/images/icons/payments/Maestro.svg';
import PayPalIcon from '../../../../public/images/icons/payments/PayPal.svg';
import { LoaderIcon } from '@/shared/ui/loaders';

export const CartMainSection = () => {
  const cart = useCart((state) => state.cart);
  const { refetch, isFetching } = useCartQuery();

  React.useEffect(() => {
    refetch();
  }, []);

  const isClient = useIsClient();

  if (!isClient) return <></>;

  if (!cart?.items?.length)
    return (
      <h1 className="main-container mt-[30px] text-[20px] font-[600]">
        Нет товаров в корзине...
      </h1>
    );

  return (
    <div className="mt-[32px] md:mt-[20px] grid gap-[26px] md:gap-[20px]">
      <div className="main-container flex gap-[12px] text-[20px] font-jost items-center">
        <h1 className=" font-[500]">Корзина</h1>{' '}
        <p className="text-gray">{cart?.items?.length || 0} товара</p>
      </div>

      <div className="main-container md:max-w-full md:px-0 grid grid-cols-[1fr_auto] gap-x-[20px] items-start justify-between md:grid-cols-1">
        {isFetching ? (
          <LoaderIcon loading={isFetching} />
        ) : (
          <div className="max-w-[548px] p-[20px] border-[#DBDBDB] border-[1px] md:border-none grid gap-[40px] md:gap-[20px]">
            {cart?.items?.map((item) => (
              <ProductItemInBag
                key={`cart ${item?.product_variant?.id}`}
                item={item}
              />
            ))}
          </div>
        )}

        <div className="max-w-[548px] md:max-w-full">
          <div className="w-full border-t-[1px] border-[#DBDBDB] hidden md:block"></div>

          <div className="grid p-[20px] md:border-none border-[#DBDBDB] border-[1px]">
            <div className="grid gap-[8px]">
              <div className="flex flex-wrap items-center gap-[10px] justify-between text-black font-jost text-[16px]">
                <p>Промежуточный итог</p>
                <p>{cart.total} сом</p>
              </div>

              <div className="flex flex-wrap items-center gap-[10px] justify-between text-black font-jost text-[16px]">
                <p>Доставка</p>
                <p>{cart.total} сом</p>
              </div>

              <div className="flex flex-wrap items-center gap-[10px] justify-between text-black font-jost text-[20px] font-[600]">
                <p>Итого</p>
                <p>{cart.total} сом</p>
              </div>
            </div>
            <Button className="mt-[20px]" variant="PrimaryCTAButton">
              Перейти к оплате
            </Button>
          </div>
          <div className="grid lg:hidden gap-[20px] px-[20px] text-jost mt-[28px]">
            <div className="flex items-start gap-[20px]">
              <Truck size={24} />
              <div>
                <p className="text-neutral-900 text-[16px] font-[500]">
                  Бесплатная доставка до дома от заказа на 000 сом
                </p>
                <p className="text-gray text-[14px]">
                  Стандартная доставка до двери -- 400 сом
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[20px]">
              <RefreshCw size={24} />
              <p className="text-neutral-900 text-[16px] font-[500]">
                Бесплатный возврат в течение 30 дней
              </p>
            </div>
            <div className="flex items-start gap-[20px]">
              <Lock size={24} />
              <p className="text-neutral-900 text-[16px] font-[500]">
                Безопасная оплата
              </p>
            </div>
            <div className="flex items-start gap-[20px]">
              <CreditCard size={24} />
              <div className="grid gap-[8px]">
                <p className="text-neutral-900 text-[16px] font-[500]">
                  Принимаемые способы оплаты:
                </p>
                <div className="flex items-center gap-[8px]">
                  <InlineSVG src={VisaIcon.src} />
                  <InlineSVG src={MastercardIcon.src} />
                  <InlineSVG src={MaestroIcon.src} />
                  <InlineSVG src={PayPalIcon.src} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
