import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const MobileMenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
`;

export const MobileMenuIconsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const MenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const MenuContent = styled(motion.div)`
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const MenuInnerContentContainer = styled.div`
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
`;

export const LanguageAndTypeText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 500;
`;
