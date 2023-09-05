import { HeaderCategories, HeaderSearchPopup } from '@/feautures/mainPage';
import React from 'react';

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

export const MainHeaderWithCategories = () => {
  return (
    <div className="flex items-center justify-between">
      <HeaderCategories categories={categories} />
      <HeaderSearchPopup />
    </div>
  );
};
