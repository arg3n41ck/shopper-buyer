import { styled } from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
`;

export const CategoriesLaptopVersionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const CategoriesMobileVersionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const CategoryItem = styled.div<{ $isSaleCategory?: boolean }>`
  position: relative;
  cursor: pointer;
  padding: 12px 20px 12px 0;
  color: ${({ $isSaleCategory }) => ($isSaleCategory ? '#B91C1C' : '#000')};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 13px;
    width: calc(100% - 20px);
    height: 1px;
    background-color: ${({ $isSaleCategory }) =>
      $isSaleCategory ? '#B91C1C' : '#000'};

    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

export const SubcategoriesPopup = styled.div`
  max-width: 1440px;
  width: 100%;
  border-top: 1px solid #ececec;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;
  background-color: #fff;
  z-index: 5;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 36px 48px;
  box-sizing: border-box;
`;

export const SubcategoryItem = styled.div`
  margin-bottom: 10px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #000;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;
