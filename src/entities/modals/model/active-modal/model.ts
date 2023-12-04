import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer';

export type TActiveModalType = 'login' | 'register' | '';

type TState = {
  modalActive: TActiveModalType;
};

type TAction = {
  setModalActive: (modalActive: TActiveModalType) => void;
};

export const useActiveModal = create<TState & TAction>()(
  devtools((set) => ({
    modalActive: '',

    setModalActive: (modalActive) =>
      set(
        produce((state) => {
          state.modalActive = modalActive;
        }),
      ),
  })),
);
