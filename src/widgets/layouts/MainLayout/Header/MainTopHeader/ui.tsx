import React, { useState } from 'react';
import {
  ForSomeoneFilter,
  HeaderChangeLanguage,
  HeaderShoppingBag,
  HeaderUserInfo,
} from '@/feautures/mainPage';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import { Heart } from 'react-feather';

const filterOptions = [
  { value: 'for-her', label: 'Для Нее' },
  { value: 'for-him', label: 'Для Него' },
  { value: 'for-children', label: 'Для Детей' },
];

export const MainTopHeader = () => {
  const [activeOption, setActiveOption] = useState<string>(
    filterOptions[0].value,
  );

  const handleFilterChange = (filter: string) => setActiveOption(filter);

  return (
    <div className="w-full py-3 flex items-center justify-between">
      <div>
        <ForSomeoneFilter
          activeOption={activeOption}
          options={filterOptions}
          handleChange={handleFilterChange}
        />
      </div>

      <div>
        <LogoIcon />
      </div>

      <div className={'flex gap-[20px]'}>
        <HeaderChangeLanguage />
        <HeaderUserInfo />
        <Heart size={24} />
        <HeaderShoppingBag />
      </div>
    </div>
  );
};
