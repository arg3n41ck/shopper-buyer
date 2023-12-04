import React, { ComponentPropsWithRef, ReactNode } from 'react';
import cn from 'classnames';

interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  labelIcon?: ReactNode;
  chip?: string | number;
}

export const IconButton = ({
  children,
  chip,
  disabled,
  className,
  labelIcon,
  ...other
}: IconButtonProps) => {
  const baseStyle =
      'flex items-center justify-center w-10 h-10 rounded-full focus:outline-none transition-colors',
    primaryStyle = 'bg-transparent hover:bg-slate-200 active:bg-slate-300',
    disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      {...other}
      type="button"
      className={cn(
        baseStyle,
        primaryStyle,
        disabledStyle,
        className,
        'relative',
      )}
      disabled={disabled}
    >
      {!!chip && (
        <p className="absolute top-0 right-0 bg-[#4F46E5] rounded-full text-white text-[12px] px-[4px]">
          {chip}
        </p>
      )}
      <div className={'absolute right-0 top-0'}>{labelIcon}</div>
      {children}
    </button>
  );
};
