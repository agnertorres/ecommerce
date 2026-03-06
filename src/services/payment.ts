import api from '../config/axios';

import { PaymentMethod, User } from '../types';

export const createPaymentMethod = async (
  userId: string,
  paymentMethod: Omit<PaymentMethod, 'id' >
): Promise<PaymentMethod> => {
  try {
     const response = await api.post(`/users/${userId}/paymentMethod`, paymentMethod);
     return response.data;
  } catch(error:any) {
      throw new Error('Erro de conexão');
  }
};

export const deletePaymentMethod = async (
  userId: string,
  paymentId: string,
): Promise<User> => {
  try {
     const response = await api.delete(`/users/${userId}/paymentMethod/${paymentId}`);
     return response.data;
  } catch(error:any) {
      throw new Error('Erro de conexão');
  }
};