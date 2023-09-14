import React, { FC, ReactNode } from 'react';
import { CheckboxWrapper } from './styles';

interface CustomCheckboxProps {
  label?: string | ReactNode;
  checked?: boolean;
  onChange: () => void;
}

const Checkbox: FC<CustomCheckboxProps> = ({
  label,
  checked = false,
  onChange,
}) => {
  return (
    <CheckboxWrapper checked={checked}>
      <input hidden type="checkbox" checked={checked} onChange={onChange} />

      <span></span>

      {label && <label>{label}</label>}
    </CheckboxWrapper>
  );
};

export default Checkbox;
