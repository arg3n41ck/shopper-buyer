import React, { ReactNode, useEffect, useState } from 'react';
import { MainHeader } from './Header';
import { MainFooter } from './Footer';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { useUser } from '@/entities/user';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { asPath } = useRouter();
  const setIsAuth = useUser((state) => state.setIsAuth);
  const [isStickyHeader, setIsStickyHeader] = useState(false);
  const token = Cookies.get('refresh_token');

  const handleScroll = () => {
    if (window.scrollY > 41) {
      setIsStickyHeader(true);
    } else {
      setIsStickyHeader(false);
    }
  };

  useEffect(() => {
    setIsAuth(!!token);
  }, [asPath]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full fixed z-[15] top-[0]">
        <motion.div
          className="overflow-y-hidden"
          animate={isStickyHeader ? { height: 0, opacity: 0 } : {}}
        >
          <div className="flex w-full justify-center items-center bg-blue-100 gap-1 p-2">
            <p className="text-[#171717] text-[14px] font-normal">
              Время шоппинга!
            </p>
            <p className="text-[#171717] text-[14px] font-normal underline">
              Лучшее из новых коллекций
            </p>
          </div>
        </motion.div>

        <div>
          <MainHeader />
        </div>
      </div>

      <motion.div
        className={cn(
          'flex flex-col gap-[80px] transition-all mt-[160px] 2lg:mt-[200px] md:mt-[100px]',
          { ['!mt-[140px] md:!mt-[90px]']: isStickyHeader },
        )}
      >
        {children}
      </motion.div>

      <div className="mt-auto">
        <MainFooter />
      </div>
    </div>
  );
};

export default MainLayout;
