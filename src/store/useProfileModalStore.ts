import { create } from 'zustand';

interface ProfileModalState {
  visible: boolean;
  showModal: (visible: boolean) => void;
}

export const useProfileModalStore = create<ProfileModalState>((set) => ({
  visible: false,
  showModal: (visible: boolean) => set({ visible }),
}));