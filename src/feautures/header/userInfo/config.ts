import { PATH } from '@/shared/config';

interface MenuItem {
  text: string;
  key: string;
  path: string;
  isAuth: boolean;
}

export const menuItems: MenuItem[] = [
  { text: 'Профиль', key: 'profile', isAuth: true, path: PATH.profile },
  { text: 'Заказы', key: 'orders', isAuth: true, path: PATH.orders },
  { text: 'Возврат товара', key: 'return', isAuth: true, path: '/' },
  { text: 'Помощь и контакты', key: 'help', isAuth: false, path: '/' },
];
