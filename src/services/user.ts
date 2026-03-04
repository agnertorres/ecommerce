import api from '../config/axios';

import { User, AddressFormData } from '../types';

interface ChangePasswordProps {
  id: number;
  currentPassword: string;
  newPassword: string;
}

export function changePassword({ id, currentPassword, newPassword }: ChangePasswordProps): Promise<{ data: String}>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'sucesso' });
    }, 1000);
  });
};


//*******************//

export const createUser = async (userData: User): Promise<User> => {
  try {
     const response = await api.post('/users', userData);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
     const response = await api.get(`/users/${userId}`);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};

export const createAddress = async (userId: string, address: AddressFormData): Promise<User> => {
  try {
     const response = await api.post(`/users/${userId}/address`, address);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};

export const updateAddress = async (
  userId: string,
  addressId: string,
  address: AddressFormData
): Promise<User> => {
  try {
     const response = await api.patch(`/users/${userId}/address/${addressId}`, address);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};

export const removeAddress = async (userId: string, addressId: string): Promise<User> => {
  try {
    const response = await api.delete(`/users/${userId}/address/${addressId}`);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao remover endereço:", error?.message);
    throw new Error("Não foi possível excluir o endereço");
  }
};
