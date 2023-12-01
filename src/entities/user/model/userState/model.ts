import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';
import Cookies from 'js-cookie';

type TState = {
  isAuth: boolean;
};

type TAction = {
  setIsAuth: (isAuth: boolean) => void;
  logout: () => void;
};

export const useUser = create<TState & TAction>()(
  devtools((set) => ({
    isAuth: false,
    setIsAuth: (isAuth) =>
      set(
        produce((state) => {
          state.isAuth = isAuth;
        }),
      ),
    logout: () =>
      set(
        produce((state) => {
          state.isAuth = false;
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        }),
      ),
  })),
);
