import { create } from 'zustand';
import { User, AddressFormData, PasswordFormData, UserFormData } from '../types';

import { getUserById, createAddress, updateAddress, removeAddress, changePassword, updateProfileData } from '../services/user';

interface UserState {
  user: User;
  loading: boolean;
  setUser: (user: User) => void;
  fetchUserById: (id: string) => Promise<void>;
  addAddress: (id: string, addressData: AddressFormData) => Promise<void>;
  editAddress: (id: string, addressId: string, addressData: AddressFormData) => Promise<void>;
  removeAddress: (id: string, addressId: string) => Promise<void>;
  changePassword: (id: string, passwordData: PasswordFormData) => Promise<void>;
  updateProfileData: (id: string, userData: UserFormData) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  user: {} as User,
  setUser: (user: User) => set({ user }),
  fetchUserById: async (id: string) => {
    set({ loading: true});

    const user = await getUserById(id);
    set({ user, loading: false });
  },
  addAddress: async (userId: string, addressData: AddressFormData) => {
    set({ loading: true});

    const updatedUser = await createAddress(userId, addressData);
    set({ user: updatedUser, loading: false });
  },
  editAddress: async (userId: string, addressId: string, data: AddressFormData) => {
    set({ loading: true});

    const updatedUser = await updateAddress(userId, addressId, data);
    set({ user: updatedUser, loading: false });
  },
  removeAddress: async (userId: string, addressId: string) => {
    set({ loading: true});

    const updatedUser = await removeAddress(userId, addressId);
    set({ user: updatedUser, loading: false });
  },
  changePassword: async (userId: string, passwordData: PasswordFormData) => {
    set({ loading: true});

    const updatedUser = await changePassword(userId, passwordData);
    set({ user: updatedUser, loading: false });
  },
  updateProfileData: async (userId: string, userData: UserFormData) => {
    set({ loading: true});

    const updatedUser = await updateProfileData(userId, userData);
    set({ user: updatedUser, loading: false });
  },
}));

export const useUserAddresses = () => useUserStore((state) => state.user?.addresses || []);

export const useDefaultAddress = () =>
  useUserStore((state) => state.user.addresses?.find(a => a.isDefault));

export const useAddressById = (id: string) =>
  useUserStore((state) => state.user.addresses?.find(a => a.id === id));