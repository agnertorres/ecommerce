import { create } from 'zustand';
import { authStorage } from '../utils/authStorage';
import { useUserStore } from './useUserStore';

import { login } from '../services/auth';

interface AuthState {
  token: string | null;
  loading: boolean;
  restoreTokenLoading: boolean;
  error: string;
  clearError: () => void; 
  restoreToken: () => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  loading: false,
  restoreTokenLoading: true,
  error: '',
  clearError: () => set({ error: '' }),
  restoreToken: async () => {
    set({ restoreTokenLoading: true });
    const { fetchUserById } = useUserStore.getState(); 

    try {
      const credentials = await authStorage.getCredentials();

      if (credentials) {
        set({ token: credentials.token})
        await fetchUserById(credentials.userId);
        
        set({restoreTokenLoading: false });
      } else {
        set({ token: null, restoreTokenLoading: false });
      }
    } catch(error: any) {
      set({ token: null, restoreTokenLoading: false, error });
    }
  },
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: '' });

    const { setUser } = useUserStore.getState();
    try {
      const { user, token } = await login(email, password);

      setUser(user);
      authStorage.saveCredentials(user.id, token);
      set({ token, loading: false });
    } catch(error: any){
      set({ loading: false, error: error.message });
    }
  },
  signOut: () => {
    authStorage.deleteCredentials();
    set({ token: null })
  },
  setToken: (token) => set({ token }),
}));