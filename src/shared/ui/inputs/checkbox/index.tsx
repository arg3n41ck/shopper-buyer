import React, { ComponentPropsWithRef, FC, ReactNode } from 'react';
import styles from './styles.module.css';
import cn from 'classnames';

interface CustomCheckboxProps extends ComponentPropsWithRef<'input'> {
  label?: string | ReactNode;
  error?: boolean | undefined;
  errorMessage?: string;
  helperText?: string;
  rightLabel?: string;
}

const Checkbox: FC<CustomCheckboxProps> = ({
  label,
  rightLabel,
  checked = false,
  className,
  error,
  helperText,
  errorMessage,
  ...other
}) => {
  return (
    <>
      <label
        className={cn(
          'flex cursor-pointer w-full content-center text-[16px] font-[500] leading-[19px] text-black',
          className,
        )}
      >
        <input {...other} hidden type="checkbox" checked={checked} />
        <span
          className={cn(styles.Check, {
            ['bg-black after:!block']: checked,
            ['!border-error500']: error,
          })}
        ></span>
        {label && (
          <div className="flex w-full items-center justify-between">
            <p>{label}</p>
            {rightLabel && <p className="text-gray">{rightLabel}</p>}
          </div>
        )}
      </label>

      {errorMessage ? (
        <label className="text-[11.11px] font-[400] text-error500">
          {errorMessage}
        </label>
      ) : (
        <label className="text-[11.11px] font-[400] text-neutral-400">
          {helperText}
        </label>
      )}
    </>
  );
};

export default Checkbox;
