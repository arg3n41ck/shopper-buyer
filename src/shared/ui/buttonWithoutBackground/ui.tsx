import React, { ReactNode } from 'react';
import { ButtonWithBackground } from './styles';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  $padding?: string;
  $background?: string;
  className?: string;
  $width?: string;
}

export const CustomButtonWithBackground: React.FC<ButtonProps> = ({
  children,
  onClick,
  $padding = '12px 55px',
  className,
  $width,
  $background,
}) => {
  return (
    <ButtonWithBackground
      onClick={onClick}
      $width={$width}
      $padding={$padding}
      className={className}
      $background={$background}
    >
      {children}
    </ButtonWithBackground>
  );
};
