import { styled } from 'styled-components';

export const ProductCardContainer = styled.div`
  position: relative;
  display: grid;
  justify-content: center;
  grid-gap: 16px;
  /* cursor: pointer; */
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductCollectionTypeText = styled.p`
  color: #676767;
  font-size: 14px;
  font-weight: 400;
`;

export const ProductNameText = styled.p`
  color: #171717;
  font-size: 20px;
  font-weight: 500;
`;

export const ProductDescription = styled.p`
  color: #262626;
  font-size: 16px;
  font-weight: 400;
`;

export const ProductPrice = styled.p`
  color: #171717;
  font-size: 16px;
  font-weight: 500;
`;

export const HeartBlock = styled.div`
  position: absolute;
  right: 3px;
  top: 3px;
  cursor: pointer;
`;

export const DiscountBlock = styled.div`
  position: absolute;
  top: 3px;
  left: 0;
  background-color: #b91c1c;
  padding: 2px 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
`;
