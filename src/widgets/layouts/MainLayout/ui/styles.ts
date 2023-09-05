import { styled } from 'styled-components';

export const MainLayoutChildrenContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 0 48px;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const ItsTimeForShoppingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff6ff;
  gap: 5px;
  padding: 10px 0;
`;

export const ItsTimeForShoppingText = styled.p`
  color: #171717;
  font-size: 14px;
  font-weight: 400;
`;
