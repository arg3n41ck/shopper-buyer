import React, { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  MenuOverlay,
  MenuContent,
  HeaderMenuContentText,
  HeaderMenuContent,
  Line,
  MenuContentItem,
  FooterMenuContent,
  FooterMenuContentTextsBlock,
  FooterMenuContentText,
  FooterMenuContentTextsContainer,
  FooterMenuContentBoldText,
  PayButton,
  MainMenuContentProductsContainer,
  ProductsInBagContainer,
} from './styles';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import { X } from 'react-feather';
import ProductItemInBag from './ProductItemInBag';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const HeaderShoppingBagMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const headerShoppingBugRef = useRef(null);

  useOutsideClick(headerShoppingBugRef, () => {
    onClose();
  });

  const productItems = Array.from({ length: 6 }, (_, index) => (
    <ProductItemInBag key={index} />
  ));

  return (
    <AnimatePresence>
      {isOpen && (
        <MenuOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <MenuContent
            ref={headerShoppingBugRef}
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
          >
            <MenuContentItem>
              <HeaderMenuContent>
                <X size={24} onClick={onClose} />

                <HeaderMenuContentText>Корзина</HeaderMenuContentText>
              </HeaderMenuContent>
            </MenuContentItem>

            <Line />

            <MenuContentItem>
              <MainMenuContentProductsContainer>
                <ProductsInBagContainer>{productItems}</ProductsInBagContainer>
              </MainMenuContentProductsContainer>
            </MenuContentItem>

            <FooterMenuContent>
              <Line />

              <MenuContentItem>
                <FooterMenuContentTextsContainer>
                  <FooterMenuContentTextsBlock>
                    <FooterMenuContentText>
                      Промежуточный итог
                    </FooterMenuContentText>

                    <FooterMenuContentText>56 984 сом</FooterMenuContentText>
                  </FooterMenuContentTextsBlock>

                  <FooterMenuContentTextsBlock>
                    <FooterMenuContentText>Доставка</FooterMenuContentText>

                    <FooterMenuContentText>1 200 сом</FooterMenuContentText>
                  </FooterMenuContentTextsBlock>

                  <FooterMenuContentTextsBlock>
                    <FooterMenuContentBoldText>Итог</FooterMenuContentBoldText>

                    <FooterMenuContentBoldText>
                      58 184 сом
                    </FooterMenuContentBoldText>
                  </FooterMenuContentTextsBlock>

                  <PayButton className={'mt-[12px]'}>
                    Перейти к оплате
                  </PayButton>
                </FooterMenuContentTextsContainer>
              </MenuContentItem>
            </FooterMenuContent>
          </MenuContent>
        </MenuOverlay>
      )}
    </AnimatePresence>
  );
};

export default HeaderShoppingBagMenu;
