import React from 'react';
import { motion } from 'framer-motion';

interface IPaginationProgressBarProps {
  count: number;
  current: number;
  label?: string;
}

export const PaginationProgressBar = ({
  count,
  current,
  label = 'товаров',
}: IPaginationProgressBarProps) => {
  const position = React.useMemo(
    () => (current / count) * 100,
    [count, current],
  );

  return (
    <div className="grid">
      <p className="font-mazzard text-center text-[16px] font-[500] text-black">
        {current} / {count} {label}
      </p>

      <div className="max-w-[380px] mx-auto w-full h-[11px] inline-block border-b-[4px] border-[#ADB3BC] relative">
        <motion.div
          animate={{ width: `${position}%` }}
          className="left-0 bottom-[-4px] h-[4px] transition-all bg-black absolute"
        ></motion.div>
        <motion.div
          animate={{ left: `${position}%` }}
          className="bottom-[-4px] transition-all h-[8px] bg-black absolute w-[3px]"
        ></motion.div>
      </div>
    </div>
  );
};
