import React, { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Импорт motion и AnimatePresence
import { User } from 'react-feather';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import {
  LogInButton,
  PopupUserInfoContainer,
  PopupUserInfoItem,
  PopupUserInfoItemText,
  UserInfoBlock,
  UserInfoContainer,
} from './styles';
import { PopupContent } from '@/shared/styles/styles';
import { LoginModal, RegisterModal } from '../modals';

interface MenuItem {
  text: string;
  key: string;
}

const menuItems: MenuItem[] = [
  { text: 'Профиль', key: 'profile' },
  { text: 'Заказы', key: 'orders' },
  { text: 'Возврат товара', key: 'return' },
  { text: 'Помощь и контакты', key: 'help' },
];

interface HeaderUserInfoProps {}

export const HeaderUserInfo: React.FC<HeaderUserInfoProps> = () => {
  const [active, setActive] = useState(false);
  const [modalActive, setModalActive] = useState('');
  const userInfoRef = useRef<HTMLDivElement | null>(null);

  const handleClickActive = () => setActive((prev) => !prev);
  const handleOpenModalActive = (type: string) => {
    setModalActive(type);
    setActive(false);
  };
  const handleCloseModalActive = () => setModalActive('');

  useOutsideClick(userInfoRef, () => {
    setActive(false);
  });

  return (
    <>
      <UserInfoContainer ref={userInfoRef}>
        <UserInfoBlock onClick={handleClickActive}>
          <User size={24} />
        </UserInfoBlock>

        <AnimatePresence>
          {active && (
            <PopupContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PopupUserInfoContainer>
                <LogInButton onClick={() => handleOpenModalActive('login')}>
                  Войти
                </LogInButton>

                {menuItems.map((item) => (
                  <PopupUserInfoItem key={item.key}>
                    <PopupUserInfoItemText>{item.text}</PopupUserInfoItemText>
                  </PopupUserInfoItem>
                ))}
              </PopupUserInfoContainer>
            </PopupContent>
          )}
        </AnimatePresence>
      </UserInfoContainer>

      {modalActive === 'login' && (
        <LoginModal
          open={modalActive === 'login'}
          onClose={handleCloseModalActive}
          onClickModal={handleOpenModalActive}
        />
      )}

      {modalActive === 'register' && (
        <RegisterModal
          open={modalActive === 'register'}
          onClose={handleCloseModalActive}
        />
      )}
    </>
  );
};
