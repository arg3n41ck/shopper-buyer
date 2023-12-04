import React from 'react';
import { CarouselProducts } from '@/widgets/product';
import { Carousel } from '@/shared/ui/carousels';
import { Looks } from '@/shared/ui/templates/looks';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';

const images = ['/213.webp', '/12.jpg'];

export const HomeMainSection = () => {
  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsList(10);
      return data;
    },
    queryKey: ['productsCustomerProductsList'],
  });
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

      <div className="main-container">
        <CarouselProducts
          products={data?.results}
          uniqueCarouselId={'special-for-user-products'}
          extraInfo={{
            title: 'Отобрано специально для вас',
            description: 'На основе того, что вы добавили в Избранное',
            buttonText: 'Смотреть подборку',
            // onClick: () => console.log('okay special-for-user-products'),
          }}
        />

        <div>
          <Looks />

          <CarouselProducts
            products={data?.results}
            uniqueCarouselId={'looks-products'}
            extraInfo={{
              buttonText: 'Смотреть подборку',
              // onClick: () => console.log('okay summer-looks'),
            }}
          />
        </div>

        <CarouselProducts
          products={data?.results}
          uniqueCarouselId={'popular-products'}
          extraInfo={{
            title: 'Популярное',
            buttonText: 'Смотреть подборку',
            // onClick: () => console.log('okay popular-products'),
          }}
        />

        <CarouselProducts
          products={data?.results}
          uniqueCarouselId={'watched-products'}
          extraInfo={{
            title: 'Вы смотрели',
          }}
        />
      </div>
    </>
  );
};
