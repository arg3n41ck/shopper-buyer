import { ProfileTabs } from '@/feautures/profile';
import { ProfileOrdersSection } from '@/sections-pages/profile';
import React from 'react';

const ProfileOrders = () => {
  return (
    <ProfileTabs>
      <ProfileOrdersSection />
    </ProfileTabs>
  );
};

export default ProfileOrders;
