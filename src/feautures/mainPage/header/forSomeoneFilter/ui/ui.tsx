import React from 'react';
import { ForSomeoneFilterButton, ForSomeoneFilterContainer } from './styles';

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
    <ForSomeoneFilterContainer>
      {options.map((option) => (
        <ForSomeoneFilterButton
          key={option.value}
          onClick={() => handleChange(option.value)}
          $active={activeOption === option.value}
        >
          {option.label}
        </ForSomeoneFilterButton>
      ))}
    </ForSomeoneFilterContainer>
  );
};
