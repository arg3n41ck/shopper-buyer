import React, { ReactNode, useEffect, useState } from 'react';
import { MainHeader } from '../Header';
import { MainFooter } from '../Footer';
import {
  ItsTimeForShoppingContainer,
  ItsTimeForShoppingText,
  MainLayoutChildrenContainer,
} from './styles';

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
      <ItsTimeForShoppingContainer className={isStickyHeader ? 'sticky' : ''}>
        <ItsTimeForShoppingText>Время шоппинга!</ItsTimeForShoppingText>
        <ItsTimeForShoppingText className={'underline'}>
          Лучшее из новых коллекций
        </ItsTimeForShoppingText>
      </ItsTimeForShoppingContainer>

      <div>
        <MainHeader isStickyHeader={isStickyHeader} />
      </div>

      <MainLayoutChildrenContainer>{children}</MainLayoutChildrenContainer>

      <MainFooter />
    </div>
  );
};

export default MainLayout;
