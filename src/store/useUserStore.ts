import { create } from 'zustand';
import { User } from '../types';

import { getUserById } from '../services/user';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  fetchUserById: (id: string) => Promise<void>;
}

export const useUserAddresses = () => useUserStore((state) => state.user?.addresses || []);
export const useDefaultAddress = () => 
  useUserStore((state) => state.user?.addresses?.find(a => a.isDefault));

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  fetchUserById: async (id: string) => {
    const user = await getUserById(id);
    set({ user });
  }
}));