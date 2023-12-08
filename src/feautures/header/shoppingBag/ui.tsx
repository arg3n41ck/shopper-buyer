import React, { useState } from 'react';
import HeaderShoppingBagMenu from './HeaderShoppingBagMenu';
import { ShoppingBag } from 'react-feather';
import { IconButton } from '@/shared/ui/buttons/iconButton';
import { useCart, useCartQuery } from '@/entities/cart';
import { useIsClient } from '@/shared/lib/hooks';

export const HeaderShoppingBag = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useCart((state) => state.cart);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useCartQuery();

  const isClient = useIsClient();

  return (
    <>
      {isClient && (
        <IconButton chip={cart?.items?.length}>
          <ShoppingBag
            size={24}
            clip={12}
            onClick={handleMenuToggle}
            cursor={'pointer'}
          />
        </IconButton>
      )}

      <HeaderShoppingBagMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
