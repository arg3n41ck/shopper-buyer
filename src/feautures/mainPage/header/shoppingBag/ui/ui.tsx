import React, { useState } from 'react';
import HeaderShoppingBagMenu from './HeaderShoppingBagMenu';
import { ShoppingBag } from 'react-feather';

export const HeaderShoppingBag = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <ShoppingBag size={24} onClick={handleMenuToggle} cursor={'pointer'} />
      <HeaderShoppingBagMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
