import React, { ReactNode, useEffect, useState } from 'react';
import { MainHeader } from './Header';
import { MainFooter } from './Footer';
import { motion } from 'framer-motion';
import cn from 'classnames';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isStickyHeader, setIsStickyHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 41) {
      setIsStickyHeader(true);
    } else {
      setIsStickyHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="main-container w-full fixed z-[15] top-[0]">
        <motion.div animate={isStickyHeader ? { height: 0, opacity: 0 } : {}}>
          <div className="flex w-full justify-center items-center  bg-blue-100 gap-1 p-2">
            <p className="text-[#171717] text-[14px] font-normal">
              Время шоппинга!
            </p>
            <p className="text-[#171717] text-[14px] font-normal underline">
              Лучшее из новых коллекций
            </p>
          </div>
        </motion.div>

        <div className="z-[20]">
          <MainHeader />
        </div>
      </div>

      <motion.div
        className={cn(
          'flex flex-col gap-[80px] transition-all md:px-5 px-[48px] mt-[160px] lg:mt-[200px] md:mt-[100px]',
          { ['!mt-[140px] md:!mt-[90px]']: isStickyHeader },
        )}
      >
        {children}
      </motion.div>

      <MainFooter />
    </div>
  );
};

export default MainLayout;
