import { styled } from 'styled-components';

export const MainHeaderContainer = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 48px;
  z-index: 50;
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid #ececec;

  &.sticky {
    position: fixed;
    top: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const MainHeaderInnerContainer = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
