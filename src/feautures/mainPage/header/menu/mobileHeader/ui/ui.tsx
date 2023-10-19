import React, { FC } from 'react';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import { X } from 'react-feather';

interface MobileHeaderProps {
  onClose: () => void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ onClose }) => {
  return (
    <div className="w-full px-6 py-3 flex items-center border-b-1 border-[#ecdcec]">
      <div className="flex items-center justify-center flex-grow">
        <LogoIcon />
      </div>

      <X onClick={onClose} />
    </div>
  );
};
