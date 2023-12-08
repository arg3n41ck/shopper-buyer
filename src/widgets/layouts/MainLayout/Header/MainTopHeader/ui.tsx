import React, { useState } from 'react';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import { Heart } from 'react-feather';
import {
  ForSomeoneFilter,
  HeaderChangeLanguage,
  HeaderShoppingBag,
  HeaderUserInfo,
} from '@/feautures/header';
import Link from 'next/link';
import { IconButton } from '@/shared/ui/buttons';
import { useUser } from '@/entities/user';
import { useRouter } from 'next/router';
import { useActiveModal } from '@/entities/modals';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';

const filterOptions = [
  { value: 'for-her', label: 'Для Нее' },
  { value: 'for-him', label: 'Для Него' },
  { value: 'for-children', label: 'Для Детей' },
];

interface IMainTopHeaderProps {
  hidden?: { topBar?: boolean; categories?: boolean; botBar?: boolean };
}

export const MainTopHeader = ({ hidden }: IMainTopHeaderProps) => {
  const isAuth = useUser((state) => state.isAuth);
  const setModalActive = useActiveModal((state) => state.setModalActive);
  const { push, asPath } = useRouter();
  const [activeOption, setActiveOption] = useState<string>(
    filterOptions[0].value,
  );

  const handleFilterChange = (filter: string) => setActiveOption(filter);

  const handleFavouriteClick = async () => {
    if (isAuth) await push('/cart/favourites');
    else setModalActive('login');
  };

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
    queryKey: ['productsCustomerFavouritesList', asPath],
    enabled: isAuth,
  });

  return (
    <div className="w-full py-3 grid grid-cols-3 items-center justify-between">
      <div>
        {!hidden?.categories && (
          <ForSomeoneFilter
            activeOption={activeOption}
            options={filterOptions}
            handleChange={handleFilterChange}
          />
        )}
      </div>

      <Link className="justify-self-center" href="/">
        <LogoIcon />
      </Link>

      <div className={'flex gap-[4px]  justify-self-end items-center'}>
        <HeaderChangeLanguage />
        <HeaderUserInfo />

        <IconButton chip={data?.count} onClick={handleFavouriteClick}>
          <Heart size={24} />
        </IconButton>
        <HeaderShoppingBag />
      </div>
    </div>
  );
};
