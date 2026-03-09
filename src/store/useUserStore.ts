import { create } from 'zustand';
import { User, AddressFormData, PasswordFormData, UserFormData, PaymentMethod } from '../types';
import { usePaymentStore } from './usePaymentStore';
import { useAuthStore } from './useAuthStore';
import { authStorage } from '../utils/authStorage';

import {
  createUser,
  getUserById,
  createAddress,
  updateAddress,
  removeAddress,
  changePassword,
  updateProfileData
} from '../services/user';

interface UserState {
  user: User;
  loading: boolean;
  error: string;
  clearError: () => void;
  setUser: (user: User) => void;
  createUser: (userFormData: UserFormData) => void;
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
  error: '',
  clearError: () => set({ error: '' }),
  setUser: (user: User) => {
    const { setPaymentMethods } = usePaymentStore.getState();
    setPaymentMethods(user.paymentMethods as PaymentMethod[]);
    set({ user }) 
  },
  createUser: async (userFormData: UserFormData) => {
    set({ loading: true, error: '' });

    const { setToken } = useAuthStore.getState();

    try {
      const { user, token} = await createUser(userFormData);

      authStorage.saveCredentials(user.id, token);
      setToken(token);
      set({ user, loading: false })
    } catch(error: any) {
      set({ loading: false, error: error.message });
    }
  },
  fetchUserById: async (id: string) => {
    set({ loading: true});

    const user = await getUserById(id);

    const { setPaymentMethods } = usePaymentStore.getState();
    setPaymentMethods(user.paymentMethods as PaymentMethod[]);

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

    try {
      const updatedUser = await changePassword(userId, passwordData);
      set({ user: updatedUser, loading: false });
    } catch(error: any) {
      set({ loading: false, error: error.message });
    }
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