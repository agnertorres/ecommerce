import { UserData } from "../mock";
import api from '../config/axios';

import { User } from '../types';

interface EditFieldProps {
  id: number;
  field: string;
  value: string;
}

export function editField({ id, field, value }: EditFieldProps): Promise<{ data: String}>{
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'sucesso' });
    }, 1000);
  });
};

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

export const createUser = async (userData: User) => {
  try {
     const response = await api.post('/users', userData);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};

export const getUserById = async (id: string) => {
  try {
     const response = await api.get(`/users/${id}`);
     return response.data;
  } catch(error:any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};
