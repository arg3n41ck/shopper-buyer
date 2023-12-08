import React, { ComponentPropsWithRef } from 'react';

interface ISwitchProps extends ComponentPropsWithRef<'input'> {}
export const Switch = (props: ISwitchProps) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input {...props} type="checkbox" value="" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};
