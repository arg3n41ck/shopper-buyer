import React from 'react';
import { MainTopHeader } from './MainTopHeader';
import { MainHeaderWithCategories } from './MainHeaderWithCategories';
import { MobileMenu } from '@/feautures/header';

export const MainHeader = () => {
  return (
    <div
      className={`max-w-[1440px] w-full px-[48px] md:px-[20px] bg-[#fff] border-b border-[#ececec]`}
    >
      <div className="block md:hidden">
        <MainTopHeader />
        <MainHeaderWithCategories />
      </div>

      <div className="hidden md:block">
        <MobileMenu />
      </div>
    </div>
  );
};
