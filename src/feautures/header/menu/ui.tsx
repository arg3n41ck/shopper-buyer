import React, { useState } from 'react';
import { Heart, Menu } from 'react-feather';
import LogoIcon from '@/shared/assets/icons/svg/LogoIcon';
import {
  ForSomeoneFilter,
  HeaderCategories,
  HeaderChangeLanguage,
  HeaderSearchPopup,
  HeaderShoppingBag,
} from '../index';
import { AnimatePresence, motion } from 'framer-motion';
import { MobileHeader } from './mobile';
import { LoginModal, RegisterModal } from '../userInfo/modals';
import { Button, IconButton } from '@/shared/ui/buttons';
import { BUTTON_STYLES } from '@/shared/lib/consts/styles';
import Link from 'next/link';
import { TActiveModalType, useActiveModal } from '@/entities/modals';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { $apiProductsApi } from '@/shared/api';
import { useUser } from '@/entities/user';
import { useRouter } from 'next/router';

interface FilterOption {
  value: string;
  label: string;
}

const filterOptions: FilterOption[] = [
  { value: 'for-her', label: 'Для Нее' },
  { value: 'for-him', label: 'Для Него' },
  { value: 'for-children', label: 'Для Детей' },
];

const categories = [
  {
    name: 'Дизайнеры',
    subcategories: [
      'Louis Vuitton',
      'Gucci',
      'Prada',
      'Versace',
      'Chanel',
      'Dior',
      'Burberry',
      'Balenciaga',
      'Valentino',
      'Yves Saint Laurent',
      'Hermès',
      'Fendi',
      'Givenchy',
    ],
  },
  {
    name: 'Новинки',
    subcategories: [
      'Свитшоты',
      'Платья',
      'Куртки',
      'Брюки',
      'Футболки',
      'Юбки',
      'Рубашки',
      'Джинсы',
      'Жакеты',
      'Пальто',
      'Топы',
      'Спортивная одежда',
      'Пиджаки',
    ],
  },
  {
    name: 'Бренды',
    subcategories: [
      'Nike',
      'Adidas',
      'Puma',
      'Reebok',
      'New Balance',
      'Under Armour',
      'Converse',
      'Vans',
      'Asics',
      'Jordan',
      'Fila',
      'Skechers',
      'Timberland',
    ],
  },
  {
    name: 'Одежда',
    subcategories: [
      'Пальто',
      'Блузки',
      'Футболки',
      'Джинсы',
      'Костюмы',
      'Свитера',
      'Платья',
      'Шорты',
      'Юбки',
      'Брюки',
      'Топы',
      'Спортивные костюмы',
      'Жакеты',
    ],
  },
  {
    name: 'Обувь',
    subcategories: [
      'Кроссовки',
      'Туфли',
      'Сапоги',
      'Сандалии',
      'Ботильоны',
      'Лоферы',
      'Мокасины',
      'Слипоны',
      'Эспадрильи',
      'Угги',
      'Балетки',
      'Оксфорды',
      'Дерби',
    ],
  },
  {
    name: 'Аксессуары',
    subcategories: [
      'Сумки',
      'Шапки',
      'Очки',
      'Ремни',
      'Часы',
      'Бижутерия',
      'Зонты',
      'Платки',
      'Перчатки',
      'Портфели',
      'Зажимы для волос',
      'Подвески',
      'Брелоки',
    ],
  },
  {
    name: 'Косметика',
    subcategories: [
      'Помады',
      'Тушь для ресниц',
      'Тональные средства',
      'Лаки для ногтей',
      'Пудра',
      'Тени для век',
      'Румяна',
      'Карандаши для губ',
      'Кисти и аппликаторы',
      'Блеск для губ',
      'Маски для лица',
      'Парфюмерия',
      'Косметика для бровей',
    ],
  },
  {
    name: 'Распродажа',
    subcategories: [
      'Платья',
      'Брюки',
      'Куртки',
      'Обувь',
      'Футболки',
      'Юбки',
      'Рубашки',
      'Джинсы',
      'Жакеты',
      'Пальто',
      'Топы',
      'Шорты',
      'Свитера',
    ],
  },
];

export const MobileMenu = () => {
  const token = Cookies.get('refresh_token');
  const isAuth = useUser((state) => state.isAuth);
  const [modalActive, setModalActive] = useActiveModal((state) => [
    state.modalActive,
    state.setModalActive,
  ]);
  const { push, asPath } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(
    filterOptions[0].value,
  );

  const handleFavouriteClick = async () => {
    if (isAuth) await push('/cart/favourites');
    else setModalActive('login');
  };

  const { data } = useQuery({
    queryFn: async () => {
      const { data } = await $apiProductsApi.productsCustomerFavouritesList();
      return data;
    },
    queryKey: ['productsCustomerFavouritesList', asPath],
    enabled: isAuth,
  });

  const handleOpenModalActive = (type: TActiveModalType) =>
    setModalActive(type);
  const handleFilterChange = (filter: string) => setActiveFilter(filter);
  const handleCloseModalActive = () => setModalActive('');
  const handleOpenMenu = () => setIsMenuOpen(true);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <>
      <div className="grid grid-cols-[68px_1fr_68px] items-center justify-items-center py-[12px]">
        <div className="flex items-center gap-[4px]">
          <IconButton onClick={handleOpenMenu}>
            <Menu />
          </IconButton>

          <IconButton>
            <HeaderSearchPopup />
          </IconButton>
        </div>

        <Link href="/">
          <LogoIcon />
        </Link>

        <div className="flex items-center gap-[4px]">
          <IconButton chip={data?.count} onClick={handleFavouriteClick}>
            <Heart size={24} />
          </IconButton>
          <HeaderShoppingBag />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-[#000] flex items-center z-[11]"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="bg-[#fff] w-full h-full overflow-y-scroll">
              <MobileHeader onClose={handleCloseMenu} />

              <div className="py-5 px-6 grid grid-cols-1 gap-5">
                <ForSomeoneFilter
                  options={filterOptions}
                  activeOption={activeFilter}
                  handleChange={handleFilterChange}
                />

                <HeaderCategories categories={categories} />

                {!token && (
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant={BUTTON_STYLES.primaryCta}
                      onClick={() => handleOpenModalActive('login')}
                    >
                      Войти
                    </Button>

                    <Button
                      variant={BUTTON_STYLES.withoutBackground}
                      onClick={() => handleOpenModalActive('register')}
                    >
                      Зарегистрироваться
                    </Button>
                  </div>
                )}

                <p className="text-[#171717] text-[16px] font-500">
                  Язык и регион
                </p>

                <HeaderChangeLanguage />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
