import React from 'react';

interface ForSomeoneFilterProps {
  activeOption: string;
  options: { value: string; label: string }[];
  handleChange: (value: string) => void;
}

export const ForSomeoneFilter: React.FC<ForSomeoneFilterProps> = ({
  options,
  activeOption,
  handleChange,
}) => {
  return (
    <div className="flex items-center gap-[20px]">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option.value)}
          className={`text-16 ${
            activeOption === option.value ? 'font-semibold' : 'font-normal'
          } uppercase`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
