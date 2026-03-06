import api from '../config/axios';

import { User, AddressFormData, PasswordFormData, UserFormData } from '../types';

export const changePassword = async (
  userId: string,
  passwordData: PasswordFormData,
): Promise<User> => {
  try {
    const response = await api.patch(`/users/${userId}/changePassword`, passwordData);
    return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};

export const createUser = async (user: UserFormData): Promise<User> => {
  try {
     const response = await api.post('/users', user);
     return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};

export const getUserById = async (userId: string): Promise<User> => {
  try {
     const response = await api.get(`/users/${userId}`);
     return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};

export const createAddress = async (userId: string, address: AddressFormData): Promise<User> => {
  try {
     const response = await api.post(`/users/${userId}/address`, address);
     return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
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
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};

export const removeAddress = async (userId: string, addressId: string): Promise<User> => {
  try {
    const response = await api.delete(`/users/${userId}/address/${addressId}`);
    return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};

export const updateProfileData = async (userId: string, userData: UserFormData): Promise<User> => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};
