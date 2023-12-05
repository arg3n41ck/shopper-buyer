/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactInputMask from 'react-input-mask';
import TextField from '../textField';
import { InputHTMLAttributes } from 'react';

interface TInputMask extends InputHTMLAttributes<any> {
  mask?: string;
  value: string;
}
export const InputMask = ({
  mask = '+\\9\\96 (999) 999 999',
  value,
  ...otherProps
}: TInputMask & any) => {
  return (
    <>
      <ReactInputMask value={value} mask={mask} {...otherProps}>
        {
          ((inputProps: any) => (
            <TextField {...inputProps} disableAutoFill={false} />
          )) as any
        }
      </ReactInputMask>
    </>
  );
};
