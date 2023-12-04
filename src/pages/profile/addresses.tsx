import { ProfileTabs } from '@/feautures/profile';
import { ProfileAddressesSection } from '@/sections-pages/profile';
import React from 'react';

const ProfileAddresses = () => {
  return (
    <ProfileTabs>
      <ProfileAddressesSection />
    </ProfileTabs>
  );
};

export default ProfileAddresses;
