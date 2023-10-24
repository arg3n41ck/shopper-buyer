import React from 'react';
import { MainLayout } from '@/widgets/layouts';
import { HomeMainSection } from '@/sections-pages/home/HomeMainSection/ui';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <HomeMainSection />
    </MainLayout>
  );
};

export default Home;
