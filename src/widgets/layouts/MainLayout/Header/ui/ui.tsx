import React, { FC } from 'react';
import { MainHeaderContainer } from './styles';
import { MainTopHeader } from '../MainTopHeader';
import { MainHeaderWithCategories } from '../MainHeaderWithCategories';
import { MobileMenu } from '@/feautures/mainPage';
import { LaptopVersion, MobileVersion } from '@/shared/styles/styles';

interface MainHeaderProps {
  isStickyHeader?: boolean;
}

export const MainHeader: FC<MainHeaderProps> = ({ isStickyHeader }) => {
  return (
    <MainHeaderContainer className={isStickyHeader ? 'sticky' : ''}>
      <LaptopVersion>
        <MainTopHeader />
        <MainHeaderWithCategories />
      </LaptopVersion>

      <MobileVersion>
        <MobileMenu />
      </MobileVersion>
    </MainHeaderContainer>
  );
};
