import React from 'react';
import { MainTopHeader } from './MainTopHeader';
import { MainHeaderWithCategories } from './MainHeaderWithCategories';
import { MobileMenu } from '@/feautures/header';

export const MainHeader = () => {
  return (
    <div className="w-full px-[28px] md:px-[20px] bg-[#fff] border-b border-[#ececec]">
      <div className="block md:hidden main-container">
        <MainTopHeader />
        <MainHeaderWithCategories />
      </div>

      <div className="hidden md:block">
        <MobileMenu />
      </div>
    </div>
  );
};
