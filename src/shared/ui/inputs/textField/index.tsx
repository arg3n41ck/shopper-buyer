import { ComponentPropsWithRef, ReactNode, useRef, useState } from 'react';
import cn from 'classnames';

interface TextFieldProps extends ComponentPropsWithRef<'input'> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  value: string;
  label?: string | ReactNode;
  error?: boolean;
  errorMessage?: any;
  helperText?: string;
  // Арго творение
  disableAutoFill?: boolean;
}

const TextField = ({
  startAdornment,
  endAdornment,
  value,
  label,
  onChange,
  error,
  errorMessage,
  helperText,
  className,
  disableAutoFill = true,
  ...others
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocus] = useState(false);
  const isActive = focused || value;

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <label
          className={cn(
            'text-[13.33px] px-[12px] font-[400] text-gray',
            isActive,
          )}
        >
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current && inputRef.current.focus()}
        className={cn(
          'relative flex cursor-text items-center gap-[8px] border border-neutral-300 px-[16px] py-[13px] text-black',
          {
            ['!border-[#B91C1C]']: error,
            ['!border-neutral-900']: isActive,
            ['mt-2']: !!label,
          },
        )}
      >
        {startAdornment && startAdornment}

        {disableAutoFill && <input hidden autoComplete="" />}
        <input
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={onChange}
          className={cn(
            'w-full border-none bg-transparent text-[16px] font-[600] leading-[19px] text-neutral-900 outline-none placeholder:text-[16px] placeholder:font-[400]',
            { ['text-[#B91C1C]']: error },
          )}
          {...others}
        />
        {endAdornment && (
          <div
            className={cn('text-neutral-400', {
              ['!text-neutral-900']: isActive,
            })}
          >
            {endAdornment}
          </div>
        )}
      </div>
      {errorMessage ? (
        <label className="text-[11.11px] font-[400] text-[#B91C1C]">
          {errorMessage}
        </label>
      ) : (
        <label className="text-[11.11px] font-[400] text-neutral-400">
          {helperText}
        </label>
      )}
    </div>
  );
};

export default TextField;
