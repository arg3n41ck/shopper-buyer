import React from 'react';
import { MainTopHeader } from './MainTopHeader';
import { MainHeaderWithCategories } from './MainHeaderWithCategories';
import { MobileMenu } from '@/feautures/header';

interface IMainHeaderProps {
  hidden?: { topBar?: boolean; categories?: boolean; botBar?: boolean };
}
export const MainHeader = ({ hidden }: IMainHeaderProps) => {
  return (
    <div className="w-full md:px-[20px] bg-[#fff] border-b border-[#ececec]">
      <div className="block md:hidden main-container">
        <MainTopHeader hidden={hidden} />
        {!hidden?.botBar && <MainHeaderWithCategories />}
      </div>

      <div className="hidden md:block">
        <MobileMenu />
      </div>
    </div>
  );
};
