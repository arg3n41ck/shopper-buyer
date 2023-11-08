import React, { ComponentPropsWithRef } from 'react';
import cn from 'classnames';

export const Chip = ({
  children,
  className,
  ...other
}: ComponentPropsWithRef<'div'>) => {
  return (
    <div
      {...other}
      className={cn(
        'border-black border-[1px] flex items-center gap-[8px] px-[8px] py-[4px] cursor-pointer hover:bg-neutral-100 transition-all active:bg-neutral-300',
        className,
      )}
    >
      {children}
    </div>
  );
};
