import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import { X } from 'react-feather';
import ProductItemInBag from './ProductItemInBag';
import { LoaderIcon } from '@/shared/ui/loaders';
import { useCart, useCartQuery } from '@/entities/cart';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderShoppingBagMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const headerShoppingBugRef = useRef(null);
  const cart = useCart((state) => state.cart);
  useOutsideClick(headerShoppingBugRef, () => {
    onClose();
  });
  const { isFetching, refetch } = useCartQuery();

  React.useEffect(() => {
    refetch();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 w-full h-full bg-opacity-50 bg-[#000] flex items-end justify-end z-[50]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <motion.div
            className="fixed top-0 right-0 w-full h-full max-w-[480px] bg-[#fff] transform translate-x-full transition-transform duration-[300] z-[50]"
            ref={headerShoppingBugRef}
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <X size={24} onClick={onClose} />

                <p className="w-full text-[#171717] text-[24px] font-semibold text-center">
                  Корзина
                </p>
              </div>
            </div>

            <div className="border border-[#ececec]" />

            <div className="p-5">
              <div className="h-[calc(100vh-300px)] overflow-y-scroll touch-none scrollbar-none">
                <LoaderIcon loading={isFetching} />

                <div className="flex flex-col gap-5">
                  {!isFetching &&
                    cart?.items?.map((item, index) => (
                      <ProductItemInBag
                        key={`cart ${item?.product_variant?.id} ${index}`}
                        item={item}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 w-full">
              <div className="border border-[#ececec]" />

              <div className="p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#171717] text-[16px] font-normal">
                      Промежуточный итог
                    </p>

                    <p className="text-[#171717] text-[16px] font-normal">
                      {cart?.total || 0} сом
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[#171717] text-[16px] font-normal">
                      Доставка
                    </p>

                    <p className="text-[#171717] text-[16px] font-normal">
                      1 200 сом
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[#171717] text-[20px] font-semibold">
                      Итог
                    </p>

                    <p className="text-[#171717] text-[20px] font-semibold">
                      {Number(cart?.total || 0) + 1200} сом
                    </p>
                  </div>

                  <button
                    className={
                      'w-full flex items-center justify-center py-[12px] px-[55px] bg-[#171717] text-[#fff] text-[16px] font-semibold cursor-pointer mt-[12px]'
                    }
                  >
                    Перейти к оплате
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderShoppingBagMenu;
