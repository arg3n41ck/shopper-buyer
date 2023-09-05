import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const PopupOverlay = styled.div`
  max-width: 1440px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 768px) {
    align-items: normal;
  }
`;

export const PopupContent = styled(motion.div)`
  background-color: #fff;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const LogoIconBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 12px;
`;

export const HeaderSearchContainer = styled.div`
  max-width: 657px;
  width: 100%;
  margin: 36px auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  padding: 0 48px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const FakeSearchInputBlock = styled.div`
  width: 267px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1px solid #676767;
  cursor: pointer;
`;

export const FakeSearchInputText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
`;

export const HistorySearchText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 400;
`;

export const HistoryBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 11px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const HistoryTitle = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;
