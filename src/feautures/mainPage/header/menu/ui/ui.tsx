import React, { useState } from 'react';
import {
  ButtonsContainer,
  LanguageAndTypeText,
  MenuContent,
  MenuInnerContentContainer,
  MenuOverlay,
  MobileMenuContainer,
  MobileMenuIconsBlock,
} from './styles';
import { Heart, Menu, Search } from 'react-feather';
import LogoIcon from '@/assets/icons/svg/LogoIcon';
import {
  ForSomeoneFilter,
  HeaderCategories,
  HeaderChangeLanguage,
  HeaderSearchPopup,
  HeaderShoppingBag,
} from '../..';
import { AnimatePresence } from 'framer-motion';
import { MobileHeader } from '../mobileHeader';
import { CustomButtonWithBackground } from '@/shared/ui/buttonWithoutBackground/ui';
import { LoginModal, RegisterModal } from '../../userInfo/modals';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(
    filterOptions[0].value
  );
  const [modalActive, setModalActive] = useState('');

  const handleOpenModalActive = (type: string) => setModalActive(type);
  const handleFilterChange = (filter: string) => setActiveFilter(filter);
  const handleCloseModalActive = () => setModalActive('');

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <MobileMenuContainer>
        <MobileMenuIconsBlock>
          <Menu onClick={handleOpenMenu} />
          <HeaderSearchPopup />
        </MobileMenuIconsBlock>

        <LogoIcon />

        <MobileMenuIconsBlock>
          <Heart />
          <HeaderShoppingBag />
        </MobileMenuIconsBlock>
      </MobileMenuContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <MenuContent>
              <MobileHeader onClose={handleCloseMenu} />

              <MenuInnerContentContainer>
                <ForSomeoneFilter
                  options={filterOptions}
                  activeOption={activeFilter}
                  handleChange={handleFilterChange}
                />

                <HeaderCategories categories={categories} />

                <ButtonsContainer>
                  <CustomButtonWithBackground
                    $width="100%"
                    $padding="12px 0"
                    $background="#171717"
                    onClick={() => handleOpenModalActive('login')}
                  >
                    Войти
                  </CustomButtonWithBackground>

                  <CustomButtonWithBackground
                    $width="100%"
                    $padding="12px 0"
                    onClick={() => handleOpenModalActive('register')}
                  >
                    Зарегистрироваться
                  </CustomButtonWithBackground>
                </ButtonsContainer>

                <LanguageAndTypeText>Язык и регион</LanguageAndTypeText>

                <HeaderChangeLanguage />
              </MenuInnerContentContainer>
            </MenuContent>
          </MenuOverlay>
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
