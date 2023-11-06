import React, { ReactNode, useState } from 'react';
import { ChevronDown } from 'react-feather';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  classNames?: {
    accordion?: string;
    content?: string;
    label?: string;
  };
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultOpen = false,
  classNames,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={cn(
        'overflow-hidden px-[12px] md:px-[0]',
        classNames?.accordion,
      )}
    >
      <div
        className={cn('flex cursor-pointer items-center', classNames?.label)}
        onClick={handleAccordionClick}
      >
        <h3 className="m-0 flex-1 text-[18px] font-[600px] leading-[22px] text-neutral-900">
          {title}
        </h3>
        <div
          className={cn('ml-[16px] transition-all ease-in-out', {
            ['rotate-180']: isOpen,
          })}
        >
          <ChevronDown />
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={cn('pt-[10px]', classNames?.content)}>
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
