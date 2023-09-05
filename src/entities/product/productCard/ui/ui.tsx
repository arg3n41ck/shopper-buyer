import React, { FC } from 'react';
import {
  ProductCollectionTypeText,
  ProductCardContainer,
  ProductInfo,
  ProductNameText,
  ProductDescription,
  ProductPrice,
  HeartBlock,
  DiscountBlock,
} from './styles';
import Image from 'next/image';
import { Heart } from 'react-feather';

interface ProductCardProps {
  item: any;
}

export const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <ProductCardContainer>
      <HeartBlock>
        <Heart fill={true && '#B91C1C'} color={true && '#B91C1C'} />
      </HeartBlock>

      <DiscountBlock>-35%</DiscountBlock>

      <Image
        src={item.image}
        width={288}
        height={360}
        alt={`Slide ${item.name}`}
        priority
      />

      <ProductInfo>
        <ProductCollectionTypeText>{item.name}</ProductCollectionTypeText>

        <ProductNameText>{item.name}</ProductNameText>

        <ProductDescription>{item.description}</ProductDescription>

        <ProductPrice className={`mt-1`}>от 18000 сом</ProductPrice>
      </ProductInfo>
    </ProductCardContainer>
  );
};
