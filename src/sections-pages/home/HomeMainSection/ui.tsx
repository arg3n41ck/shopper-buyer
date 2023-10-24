import React from 'react';
import { CarouselProducts } from '@/widgets/product';
import { Carousel } from '@/shared/ui/carousels';
import { Looks } from '@/shared/ui/templates/looks';

const images = ['/213.webp', '/12.jpg'];

const products = [
  { name: 'Товар 1', description: 'Описание товара 1', image: '/sumka.png' },
  { name: 'Товар 2', description: 'Описание товара 2', image: '/sumka.png' },
  { name: 'Товар 3', description: 'Описание товара 3', image: '/sumka.png' },
  { name: 'Товар 4', description: 'Описание товара 4', image: '/sumka.png' },
  { name: 'Товар 5', description: 'Описание товара 5', image: '/sumka.png' },
  { name: 'Товар 6', description: 'Описание товара 6', image: '/sumka.png' },
  { name: 'Товар 7', description: 'Описание товара 7', image: '/sumka.png' },
  { name: 'Товар 8', description: 'Описание товара 8', image: '/sumka.png' },
  { name: 'Товар 9', description: 'Описание товара 9', image: '/sumka.png' },
  { name: 'Товар 10', description: 'Описание товара 10', image: '/sumka.png' },
];

export const HomeMainSection = () => {
  return (
    <>
      <Carousel
        images={images}
        title={'Новинки этого сезона'}
        description={
          'Лучшие модели, в которых будет комфортно жарким днем и прохладным вечером'
        }
        buttonText={'Посмотреть подборку'}
      />

      <CarouselProducts
        products={products}
        uniqueCarouselId={'special-for-user-products'}
        extraInfo={{
          title: 'Отобрано специально для вас',
          description: 'На основе того, что вы добавили в Избранное',
          buttonText: 'Смотреть подборку',
          onClick: () => console.log('okay special-for-user-products'),
        }}
      />

      <div>
        <Looks />

        <CarouselProducts
          products={products}
          uniqueCarouselId={'looks-products'}
          extraInfo={{
            buttonText: 'Смотреть подборку',
            onClick: () => console.log('okay summer-looks'),
          }}
        />
      </div>

      <CarouselProducts
        products={products}
        uniqueCarouselId={'popular-products'}
        extraInfo={{
          title: 'Популярное',
          buttonText: 'Смотреть подборку',
          onClick: () => console.log('okay popular-products'),
        }}
      />

      <CarouselProducts
        products={products}
        uniqueCarouselId={'watched-products'}
        extraInfo={{
          title: 'Вы смотрели',
        }}
      />
    </>
  );
};
