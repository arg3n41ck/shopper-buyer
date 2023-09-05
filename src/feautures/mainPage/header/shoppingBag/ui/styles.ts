import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 999;
`;

export const MenuContent = styled(motion.div)`
  width: 100%;
  max-width: 480px;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
`;

export const MenuContentItem = styled.div`
  padding: 20px;
`;

export const HeaderMenuContent = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderMenuContentText = styled.p`
  width: 100%;
  color: #171717;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
`;

export const Line = styled.div`
  border: 1px solid #ececec;
`;

export const MainMenuContentProductsContainer = styled.div`
  height: calc(100vh - 300px);
  overflow-y: scroll;

  touch-action: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

export const FooterMenuContent = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

export const FooterMenuContentText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;

export const FooterMenuContentBoldText = styled.p`
  color: #171717;
  font-size: 20px;
  font-weight: 500;
`;

export const FooterMenuContentTextsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FooterMenuContentTextsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PayButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 55px;
  background-color: #171717;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const ProductInBagContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ProductInBagInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProductInBagNameText = styled.p`
  color: #171717;
  font-size: 20px;
  font-weight: 500;
`;

export const ProductInBagDescriptionText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
`;

export const ProductInBagColorText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;

export const ProductInBagPriceText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 500;

  span {
    text-decoration: line-through;
  }
`;

export const ProductInBagDiscountPriceText = styled.p`
  color: #b91c1c;
  font-size: 16px;
  font-weight: 500;
`;

export const ProductInBagTextsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ProductsInBagContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
