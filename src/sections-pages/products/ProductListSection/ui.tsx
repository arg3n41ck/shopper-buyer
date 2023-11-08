import React from 'react';
import { FilterSidebar, ProductList } from '@/widgets/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ElasticProductsList200Response } from '@/shared/api/gen';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';
import { Chip } from '@/shared/ui/buttons';
import CustomSelect from '@/shared/ui/selects/default';
import Arrow from '../../../../public/images/icons/arrows/double-arrow.svg';
import InlineSVG from 'react-inlinesvg';

export const ProductListSection = () => {
  const { data } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['elasticProductsList'],
    queryFn: async () => null as unknown as ElasticProductsList200Response,
    getNextPageParam: () => null,
  });

  return (
    <div className="main-container">
      <FilterSidebar>
        <div className="mt-[24px] mb-[20px]">
          <h1 className="font-mazzard leading-tight text-[28px] font-[500]">
            Топы
          </h1>
          <div className="my-[4px] flex items-center gap-y-[8px] justify-between lg:flex-col lg:items-start">
            <p>{data?.pages?.[0]?.count || 0} товаров</p>
            <div className="flex items-center">
              <InlineSVG src={Arrow.src} />

              <CustomSelect
                options={[{ label: 'По убыванию', value: 1 }]}
                value={'1'}
                onChange={() => null}
                placeholder={'Сортировка'}
                classNames={{ select: 'border-none min-w-[200px]' }}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-[20px]">
            <div className="grid gap-[8px]">
              <h2 className="font-mazzard leading-tight font-[500] text-[20px]">
                Бренды
              </h2>
              <div className="flex flex-wrap gap-[12px]">
                <Chip>
                  Acne Studios <CloseIcon />
                </Chip>
              </div>
            </div>

            <div className="grid gap-[8px]">
              <h2 className="font-mazzard font-[500] leading-tight text-[20px]">
                Размеры
              </h2>
              <div className="flex flex-wrap gap-[12px]">
                <Chip>
                  S <CloseIcon />
                </Chip>
                <Chip>
                  M <CloseIcon />
                </Chip>
              </div>
            </div>

            <div className="grid gap-[8px]">
              <h2 className="font-mazzard font-[500] leading-tight text-[20px]">
                Цвета
              </h2>
              <div className="flex flex-wrap gap-[12px]">
                <Chip>
                  Розовый <CloseIcon />
                </Chip>
              </div>
            </div>
          </div>
        </div>
        <ProductList />
      </FilterSidebar>
    </div>
  );
};
