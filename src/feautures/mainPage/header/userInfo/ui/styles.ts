import { styled } from 'styled-components';

export const UserInfoContainer = styled.div`
  position: relative;
`;

export const LogInButton = styled.button`
  width: 295px;
  display: flex;
  padding: 12px 55px;
  justify-content: center;
  align-items: center;
  background-color: #171717;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const UserInfoBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const PopupUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: max-content;
`;

export const PopupUserInfoItem = styled.div`
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

export const PopupUserInfoItemText = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 400;
`;
