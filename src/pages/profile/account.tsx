import { ProfileTabs } from '@/feautures/profile';
import { ProfileAccountSection } from '@/sections-pages/profile';
import React from 'react';

const ProfileAccount = () => {
  return (
    <ProfileTabs>
      <ProfileAccountSection />
    </ProfileTabs>
  );
};

export default ProfileAccount;
