import { create } from 'zustand';
import { removeToken } from '../utils';
import { useUserStore } from './useUserStore';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  restoreToken: (token: string) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  startLoading: () => void;
  stopLoading: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isLoading: true,
  isSignout: false,
  restoreToken: async (token) => {
    set({ isLoading: true });
    const { fetchUserById } = useUserStore.getState();

    try {
      await fetchUserById(token);
      set({ token, isLoading: false});
    } catch(err: any) {
      console.log(err);
      set({ token: null, isLoading: false});
    }
  },
  signIn: (token) => set({ token, isLoading: false }),
  signOut: () => {
    removeToken();
    set({ token: null })
  },
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setToken: (token) => set({ token }),
}));