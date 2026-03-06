import { create } from 'zustand';
import { saveToken, removeToken } from '../utils';
import { useUserStore } from './useUserStore';

import { login } from '../services/auth';

interface AuthState {
  token: string | null;
  loading: boolean;
  restoreTokenLoading: boolean;
  error: string;
  clearError: () => void; 
  restoreToken: (token: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  startLoading: () => void;
  stopLoading: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  loading: false,
  restoreTokenLoading: true,
  error: '',
  clearError: () => set({ error: '' }),
  restoreToken: async (token) => {
    set({ restoreTokenLoading: true, error: '' });
    const { fetchUserById } = useUserStore.getState();

    try {
      await fetchUserById(token);
      set({ token, restoreTokenLoading: false });
    } catch(error: any) {
      set({ token: null, restoreTokenLoading: false, error });
    }
  },
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: '' });

    const { setUser } = useUserStore.getState();
    try {
      const user = await login(email, password);
      
      setUser(user);

      const token = user.id;
      saveToken(token);
      set({ token, loading: false });
    } catch(error: any){
      set({ loading: false, error: error.message });
    }
  },
  signOut: () => {
    removeToken();
    set({ token: null })
  },
  startLoading: () => set({ restoreTokenLoading: true }),
  stopLoading: () => set({ restoreTokenLoading: false }),
  setToken: (token) => {
    saveToken(token);
    set({ token }) 
  },
}));