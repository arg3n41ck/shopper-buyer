import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import {
  PrimaryCTAButton,
  PrimaryCTAIndigoButton,
  SecondaryCTAButton,
  WithoutBackgroundButton,
} from './styles';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';

type ButtonVariant = (typeof BUTTON_STYLES)[keyof typeof BUTTON_STYLES];
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'large';

interface CustomButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  onClick?: () => void;
  children: ReactNode;
  type?: ButtonType | undefined;
  size?: ButtonSize;
  className?: string;
}

const variantOfButton = (
  variant: ButtonVariant | undefined,
): FC<ButtonHTMLAttributes<HTMLButtonElement>> => {
  switch (variant) {
    case BUTTON_STYLES.primaryCta:
      return PrimaryCTAButton;
    case BUTTON_STYLES.primaryCtaIndigo:
      return PrimaryCTAIndigoButton;
    case BUTTON_STYLES.secondaryCtaIndigo:
      return SecondaryCTAButton;
    case BUTTON_STYLES.withoutBackground:
      return WithoutBackgroundButton;
    default:
      return PrimaryCTAButton;
  }
};

const sizeOfButton = (size?: ButtonSize) => {
  switch (size) {
    case 'small':
      return {
        padding: '4px 8px',
        fontSize: 16,
      };
    case 'large':
      return {
        padding: '10px 16px',
        fontSize: 18,
      };
    default:
      return {
        width: '100%',
        padding: '12px 0',
        fontSize: 18,
      };
  }
};

const Button: FC<CustomButtonProps> = ({
  disabled,
  variant,
  onClick,
  children,
  type,
  size,
  className,
}) => {
  const ButtonComponent = variantOfButton(variant);
  const style = sizeOfButton(size);

  return (
    <ButtonComponent
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={className}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
