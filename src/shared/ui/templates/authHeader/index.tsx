import React, { FC } from 'react';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';

const Header: FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-3">
      <LogoIcon />
    </div>
  );
};

export default Header;
