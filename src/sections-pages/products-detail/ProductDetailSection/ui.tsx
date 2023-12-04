import React from 'react';
import { CarouselUnderline } from '@/shared/ui/carousels';
import { DefaultBreadcrumb } from '@/shared/ui/breadcrumbs';
import {
  ProductVariantChoose,
  useRecentlyViewedProducts,
  ProductReviews,
} from '@/widgets/product';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import Image from 'next/image';
import { ProductInfo, useProductVariant } from '@/entities/product';
import Link from 'next/link';
import { DefaultTabs } from '@/shared/ui/tabs';
import { Accordion } from '@/shared/ui/accordions';

export const ProductDetailSection = () => {
  const { query } = useRouter();
  const { data } = useQuery({
    queryKey: ['productsCustomerProductsRead', query],
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerProductsRead(
        query?.slug as string,
      );
      return data;
    },
  });

  const variant = useProductVariant((state) => state.currentVariant);
  const addProduct = useRecentlyViewedProducts((state) => state.addProduct);

  React.useEffect(() => {
    data && addProduct(data);
  }, [data]);

  return (
    <div>
      <div className="mt-[20px] hidden lg:block">
        <CarouselUnderline
          classNames={{
            swiperSlide: 'flex justify-center h-[501px] object-contain',
          }}
          items={(variant || data?.variants?.[0])?.images?.map((item) => ({
            key: item.id as unknown as string,
            slide: (
              <div className="flex justify-center items-center min-h-[375px]">
                <Image
                  src={item?.image || ''}
                  alt={data?.title || ''}
                  width={382}
                  height={382}
                  className="max-w-[382px] max-h-[382px] h-full object-contain w-full"
                />
              </div>
            ),
          }))}
        />
      </div>

      <div className="main-container">
        <div className="mt-[24px] md:mt-[28px]">
          <DefaultBreadcrumb
            className="lg:hidden"
            items={[{ label: 'Главная', link: '/' }, { label: data?.title }]}
          />
          <div className="grid grid-cols-[7.7fr_5.5fr] mt-[24px] gap-[20px] lg:grid-cols-1">
            {/*images*/}
            <div className="grid grid-cols-2 gap-[12px] items-start content-start lg:hidden max-h-[150vh] overflow-y-auto">
              {(variant || data?.variants?.[0])?.images?.map((item, index) => (
                <div
                  key={`${item.image} ${index}`}
                  className="max-w-[382px] max-h-[382px] h-full w-full flex items-center justify-center bg-neutral-100 rounded-sm"
                >
                  <Image
                    src={item.image || ''}
                    alt={data?.title || ''}
                    width={382}
                    height={382}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-[24px] md:gap-[16px] items-start content-start">
              <ProductVariantChoose />

              {/*shop*/}
              <Link
                href="#"
                className="p-[12px] bg-neutral-100 grid gap-[12px] font-jost"
              >
                <div className="flex items-center justify-between gap-[20px]">
                  <Image
                    src={data?.shop?.logo || ''}
                    alt={data?.shop?.title || ''}
                    width={100}
                    height={50}
                    className="max-w-[100px] max-h-[50px] object-contain"
                  />

                  <p className="text-right text-[16px] font-[500]">В магазин</p>
                </div>
                <p className="text-[16px]">{data?.shop?.title}</p>
              </Link>

              {/*reviews and description*/}
              <DefaultTabs
                classNames={{ content: 'mt-[12px]', wrapper: 'md:hidden' }}
                tabs={[
                  {
                    label: 'Описание',
                    content: <ProductInfo />,
                  },
                  {
                    label: `Отзывы (${data?.reviews?.length})`,
                    content: (
                      <ProductReviews
                        productSlug={data?.id as unknown as string}
                      />
                    ),
                  },
                ]}
              />
              <div className="hidden md:block mt-[12px]">
                <Accordion
                  classNames={{
                    label:
                      'px-[12px] py-[11px] border-secondWhite border-b-[1px]',
                    content: 'px-[12px] py-[11px]',
                  }}
                  title="Описание"
                >
                  <ProductInfo />
                </Accordion>
                <Accordion
                  classNames={{
                    label:
                      'px-[12px] py-[11px] border-secondWhite border-b-[1px]',
                    content: 'px-[12px] py-[11px]',
                  }}
                  title={`Отзывы (${data?.reviews?.length})`}
                >
                  <ProductReviews productSlug={data?.id as unknown as string} />
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
