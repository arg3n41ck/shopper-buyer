import React, { FC } from 'react';
import { LogoIconWrapper, MobileHeaderContainer } from './styles';
import LogoIcon from '@/assets/icons/svg/LogoIcon';
import { X } from 'react-feather';

interface MobileHeaderProps {
  onClose: () => void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({ onClose }) => {
  return (
    <MobileHeaderContainer>
      <LogoIconWrapper>
        <LogoIcon />
      </LogoIconWrapper>

      <X onClick={onClose} />
    </MobileHeaderContainer>
  );
};
