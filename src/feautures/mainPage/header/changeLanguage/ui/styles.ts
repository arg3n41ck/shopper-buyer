import { styled } from 'styled-components';

export const ChangeLanguageContainer = styled.div`
  position: relative;
`;

export const ChangeLanguageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const ChangeLanguageInfoText = styled.p`
  color: #676767;
  font-size: 16px;
  font-weight: 500;
`;

export const PopupLanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PopupLanguageItem = styled.div`
  display: flex;
  padding: 11px 12px;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const PopupLanguageItemText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;
