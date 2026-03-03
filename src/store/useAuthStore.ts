import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isSignout: boolean;
  restoreToken: (token: string | null) => void;
  signIn: (token: string) => void;
  signOut: () => void;
  startLoading: () => void;
  stopLoading: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isLoading: true,
  isSignout: false,
  restoreToken: (token) => set({ token, isLoading: false }),
  signIn: (token) => set({ token, isSignout: false, isLoading: false }),
  signOut: () => set({ token: null, isSignout: true }),
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
  setToken: (token) => set({ token }),
}));