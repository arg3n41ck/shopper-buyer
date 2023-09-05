import React from 'react';
import {
  ProductInBagColorText,
  ProductInBagContainer,
  ProductInBagDescriptionText,
  ProductInBagDiscountPriceText,
  ProductInBagInfoContainer,
  ProductInBagNameText,
  ProductInBagPriceText,
  ProductInBagTextsBlock,
} from './styles';
import { Trash2 } from 'react-feather';
import { ImageFromNext } from '@/shared/styles/styles';

const ProductItemInBag = () => {
  return (
    <ProductInBagContainer>
      <ImageFromNext
        src={'/sumka.png'}
        width={120}
        height={120}
        alt="lacoste"
      />

      <ProductInBagInfoContainer>
        <ProductInBagNameText>Stella McCartney</ProductInBagNameText>

        <ProductInBagDescriptionText>
          брюки с разрезами
        </ProductInBagDescriptionText>

        <ProductInBagTextsBlock>
          <ProductInBagDescriptionText>Цвет:</ProductInBagDescriptionText>
          <ProductInBagColorText>Черный</ProductInBagColorText>
        </ProductInBagTextsBlock>

        <ProductInBagTextsBlock>
          <ProductInBagDescriptionText>Кол-во:</ProductInBagDescriptionText>
        </ProductInBagTextsBlock>

        <ProductInBagTextsBlock>
          <ProductInBagPriceText>
            от <span>18 650 сом</span>
          </ProductInBagPriceText>

          <ProductInBagDiscountPriceText>
            18 650 сом
          </ProductInBagDiscountPriceText>
        </ProductInBagTextsBlock>
      </ProductInBagInfoContainer>

      <Trash2 size={24} />
    </ProductInBagContainer>
  );
};

export default ProductItemInBag;
