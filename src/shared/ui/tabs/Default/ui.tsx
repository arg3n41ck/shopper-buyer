import { ReactNode, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'classnames';

interface IDefaultTabsProps {
  classNames?: {
    wrapper?: string;
    content?: string;
    tab?: string;
    tabs?: string;
  };
  tabs: {
    label: string;
    icon?: ReactNode;
    content: ReactNode;
    value?: string | number;
  }[];
  onChange?: (value: string | number) => void;
}
export const DefaultTabs = ({
  tabs,
  classNames,
  onChange,
}: IDefaultTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (index: number, value?: string | number) => {
    setSelectedTab(index);
    onChange && value && onChange(value);
  };

  return (
    <div className={classNames?.wrapper}>
      <ul
        className={cn(
          'relative font-jost grid grid-cols-[repeat(auto-fit,minmax(100px,150px))] md:!grid-cols-1',
          classNames?.tabs,
        )}
      >
        {tabs.map((item, i) => (
          <li
            key={item.label}
            role="presentation"
            className={cn(
              `
            relative cursor-pointer
            whitespace-pre-line transition-all px-[12px] py-[11px]
            text-[16px] uppercase text-left
            `,
              classNames?.tab,
              { ['font-[600]']: i === selectedTab },
            )}
            onClick={() => handleChange(i, item?.value)}
          >
            {item.icon} {item.label}
            {i === selectedTab ? (
              <motion.div
                className="absolute left-0 bottom-0 z-10 h-[1px] w-full bg-black"
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
        <motion.div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#C0C0C0] md:hidden" />
      </ul>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab ? tabs[selectedTab].label : 'empty'}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={classNames?.content}>
            {tabs.length ? tabs[selectedTab].content : 'Пусто...'}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
