import React from 'react';
import { Minus, Plus, Trash2 } from 'react-feather';
import Image from 'next/image';
import { CartItem } from '@/shared/api/gen';
import { useCart } from '@/entities/cart';
import { useDebounce } from 'react-use';
import { useUser } from '@/entities/user';
import { $apiOrdersApi } from '@/shared/api';

interface IProductItemInBagProps {
  item: CartItem;
  handleDelete?: (id: number) => void;
}

const ProductItemInBag = ({ item }: IProductItemInBagProps) => {
  const isAuth = useUser((state) => state.isAuth);
  const [deleteItem, setQty] = useCart((state) => [
    state.deleteProduct,
    state.updateQuantityItem,
  ]);
  const [render, setRender] = React.useState(false);

  useDebounce(
    async () => {
      //that would not throw a request just when an element appears
      if (!render) return setRender(true);
      if (!isAuth) return;
      await $apiOrdersApi.ordersCustomerCartItemsPartialUpdate(
        item?.id as number,
        { quantity: item?.quantity || 1 },
      );
    },
    500,
    [item?.quantity],
  );

  const handleQtyChange = (action: 'increment' | 'decrement') => {
    switch (action) {
      case 'increment':
        return setQty(item.id as number, Number(item.quantity) + 1);

      case 'decrement':
        return setQty(item.id as number, Number(item.quantity) - 1);
    }
  };

  return (
    <div className="w-full grid grid-cols-[120px_2fr_auto] md:grid-cols-[60px_2fr_auto] md:gap-[12px] gap-[28px] items-start">
      <Image
        src={item?.product_variant?.images?.[0]?.image || ''}
        width={120}
        height={120}
        alt="lacoste"
        className="object-contain self-start"
      />

      <div className="flex flex-col gap-1">
        <p className="text-[#171717] text-[20px] font-semibold">
          {item?.product_variant?.title}
        </p>

        <p className="text-[#676767] text-[16px] font-normal">
          брюки с разрезами
        </p>

        <div className="flex items-center gap-1">
          <p className="text-[#676767] text-[16px] font-normal">Цвет:</p>
          <p className="text-black text-[16px] font-normal">Черный</p>
        </div>

        <div className="flex items-center gap-1">
          <p className="text-[#676767] text-[16px] font-normal">Размер:</p>
          <p className="text-black text-[16px] font-normal">{item?.size}</p>
        </div>

        <div className="flex items-center gap-1">
          <div className="text-[#676767] text-[16px] font-normal gap-[8px] flex items-center">
            <p>Кол-во:</p>{' '}
            <Plus
              size={20}
              color="white"
              className="bg-black cursor-pointer rounded-full p-[2px]"
              onClick={() => handleQtyChange('increment')}
            />
            <p className="text-black">{item?.quantity}</p>
            <Minus
              size={20}
              color="white"
              className="bg-black cursor-pointer rounded-full p-[2px]"
              onClick={() => handleQtyChange('decrement')}
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {!!item?.product_variant?.price_min && (
            <p className="text-[#171717] text-[16px] font-semibold">
              от{' '}
              <span className="line-through">
                {item?.product_variant?.price_min} сом
              </span>
            </p>
          )}

          <p className="text-[#b91c1c] text-[16px] font-semibold">
            {item.total} сом
          </p>
        </div>
      </div>

      <Trash2 size={24} cursor="pointer" onClick={() => deleteItem(item?.id)} />
    </div>
  );
};

export default ProductItemInBag;
