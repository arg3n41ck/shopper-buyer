import React, { ReactNode, useEffect, useState } from 'react';
import { MainHeader } from './Header';
import { MainFooter } from './Footer';

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
      <div
        className={`w-full flex justify-center items-center  bg-blue-100 gap-1 p-2`}
      >
        <p className="text-[#171717] text-[14px] font-normal">
          Время шоппинга!
        </p>
        <p className="text-[#171717] text-[14px] font-normal underline">
          Лучшее из новых коллекций
        </p>
      </div>

      <div>
        <MainHeader isStickyHeader={isStickyHeader} />
      </div>

      <div className="flex flex-col gap-[80px] md:px-5 px-[48px]">
        {children}
      </div>

      <MainFooter />
    </div>
  );
};

export default MainLayout;
