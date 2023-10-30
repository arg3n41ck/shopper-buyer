import React, { useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import cn from 'classnames';

type SelectProps = {
  options: any[];
  value: string;
  inputLabel?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: any;
  onChange: (value: string) => void;
  width?: string;
  fields?: { label: string; value: string };
  classNames?: { wrapper?: string; select?: string; dropdown?: string };
};

const CustomSelect = ({
  options,
  value,
  onChange,
  inputLabel,
  placeholder,
  width,
  error,
  errorMessage,
  fields = { label: 'label', value: 'value' },
  classNames,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [focused, setFocus] = useState(false);
  const isActive = focused || value;

  const handleSelect = (optionValue: any) => {
    setIsOpen(false);
    onChange(optionValue[fields.value]);
  };

  useOutsideClick(selectRef, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={selectRef}
      style={{ width }}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className={cn('relative', classNames?.wrapper)}
    >
      {inputLabel && (
        <label className="leading-[16px] text-[13p.33px] text-neutral-900">
          {inputLabel}
        </label>
      )}

      <div
        className={cn(
          'flex w-full cursor-pointer justify-between items-center border-[1px] border-neutral-300 px-[9px] py-[11px]',
          classNames?.select,
          {
            ['border-neutral-900 text-neutral-900']: isActive,
            ['mt-2']: inputLabel,
            ['border-error500']: error,
          },
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option[fields.value] === value)?.[
          fields.label
        ] || placeholder}

        <div
          className={cn('transition-all duration-[0.1s] ease-in-out', {
            ['rotate-180']: isOpen,
          })}
        >
          <ChevronDown />
        </div>
      </div>

      {isOpen && (
        <>
          {!!options.length && (
            <ul
              className={cn(
                'absolute left-0 z-[1] m-0 max-h-[200px] w-full list-none overflow-y-auto border-[1px] border-neutral-300 bg-white p-0',
                classNames?.dropdown,
              )}
            >
              {options.map((option) => (
                <li
                  className="block h-auto cursor-pointer p-[8px] transition-all hover:bg-neutral-300"
                  key={option.id}
                  onClick={() => handleSelect(option)}
                >
                  {option[fields.label]}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {errorMessage && (
        <label className="text-[11.11px] text-error500">{errorMessage}</label>
      )}
    </div>
  );
};

export default CustomSelect;
