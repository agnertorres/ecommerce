import { create } from 'zustand';
import { PaymentMethod, PaymentMethodFormData } from '../types';
import { createPaymentMethod, deletePaymentMethod } from '../services/payment';
import { useUserStore } from './useUserStore';

import { getPaymentToken } from '../mock';

interface PaymentMethodState {
  paymentMethods: PaymentMethod[];
  loading: boolean;
  addPaymentMethod: (userId: string, paymentMethod: PaymentMethodFormData) => void;
  setPaymentMethods: (paymentMethods: PaymentMethod[]) => void;
  removePaymentMethod: (userId: string, paymentId: string) => void;
}

export const usePaymentStore = create<PaymentMethodState>((set, get) => ({
  loading: false,
  paymentMethods: [],
  setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
  addPaymentMethod: async (userId, paymentMethodFormData: PaymentMethodFormData) => {
    set({ loading: true});

    const { setUser, user } = useUserStore.getState();

    const paymentMethodToken = await getPaymentToken(userId, paymentMethodFormData);

    const paymentMethodDTO: Omit<PaymentMethod, 'id'> = {
      token: paymentMethodToken,
      lastFourDigits: paymentMethodFormData.creditCardNumber.slice(-4),
      expirationMonth: paymentMethodFormData.expirationMonth,
      expirationYear: paymentMethodFormData.expirationYear,
      brand: paymentMethodFormData.brand,
    };

    const newPaymentMethod = await createPaymentMethod(userId, paymentMethodDTO);

    const currentItems = get().paymentMethods;
    const newItems = [
      ...currentItems,
      newPaymentMethod
    ];

    const newUser = {
      ...user,
      paymentMethods: newItems
    }

    setUser(newUser);
    set({ paymentMethods: newItems, loading: false });
  },
  removePaymentMethod: async (userId: string, paymentId: string) => {
    set({ loading: true});

    const { setUser } = useUserStore.getState();

    const user = await deletePaymentMethod(userId, paymentId);

    setUser(user);
    set({ loading: false });
  },
}));