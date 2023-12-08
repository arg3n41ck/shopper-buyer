import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Импорт motion и AnimatePresence
import { User } from 'react-feather';
import useOutsideClick from '@/shared/lib/hooks/useOutsideClick';
import { LoginModal, RegisterModal } from './modals';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import { Button, IconButton } from '@/shared/ui/buttons';
import Cookies from 'js-cookie';
import { TActiveModalType, useActiveModal } from '@/entities/modals';
import { useRouter } from 'next/router';
import { menuItems } from '.';
import { useUser } from '@/entities/user';

interface HeaderUserInfoProps {}

export const HeaderUserInfo: React.FC<HeaderUserInfoProps> = () => {
  const token = Cookies.get('refresh_token');
  const [active, setActive] = useState(false);
  const [modalActive, setModalActive] = useActiveModal((state) => [
    state.modalActive,
    state.setModalActive,
  ]);

  const userInfoRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const logout = useUser((state) => state.logout);

  const handleClickActive = () => setActive((prev) => !prev);
  const handleOpenModalActive = (type: TActiveModalType) => {
    setModalActive(type);
    setActive(false);
  };
  const handleCloseModalActive = () => setModalActive('');

  useOutsideClick(userInfoRef, () => {
    setActive(false);
  });

  const navigateToPath = (path: string) => router.push(path);

  return (
    <>
      <div className="relative" ref={userInfoRef}>
        <IconButton onClick={handleClickActive}>
          <User size={24} />
        </IconButton>

        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute mt-2 right-0 bg-[#fff] p-5 border border-solid border-[#676767] z-[11]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-[12px] w-[295px]">
                {menuItems
                  .filter((item) => (!token ? !item.isAuth : item))
                  .map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-[11px] cursor-pointer hover:bg-[#f5f5f5]"
                      onClick={() => navigateToPath(item.path)}
                    >
                      <p className="text-[16px] font-normal">{item.text}</p>
                    </div>
                  ))}

                {!token ? (
                  <Button
                    variant={BUTTON_STYLES.primaryCta}
                    onClick={() => handleOpenModalActive('login')}
                  >
                    Войти
                  </Button>
                ) : (
                  <div
                    className="flex items-center justify-between p-[11px] cursor-pointer hover:bg-[#f5f5f5] text-[#B91C1C]"
                    onClick={() => {
                      logout();
                      navigateToPath('/');
                    }}
                  >
                    <p className="text-[16px] font-normal">Выйти</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {(function () {
        switch (modalActive) {
          case 'login':
            return (
              <LoginModal
                open={modalActive === 'login'}
                onClose={handleCloseModalActive}
                onClickModal={handleOpenModalActive}
              />
            );
          case 'register':
            return (
              <RegisterModal
                open={modalActive === 'register'}
                onClose={handleCloseModalActive}
              />
            );
          default:
            break;
        }
      })()}
    </>
  );
};
