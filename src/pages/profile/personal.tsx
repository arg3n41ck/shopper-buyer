import { ProfileTabs } from '@/feautures/profile';
import { ProfilePersonalSection } from '@/sections-pages/profile';
import React from 'react';

const ProfilePersonal = () => {
  return (
    <ProfileTabs>
      <ProfilePersonalSection />
    </ProfileTabs>
  );
};
export default ProfilePersonal;
