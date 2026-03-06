import api from '../config/axios';

export const login = async (email: string, password: string) => {
  try {
     const response = await api.post('/auth/login', {
      email,
      password
     });
     return response.data;
  } catch(error: any) {
      throw new Error(error.response.data.message || 'Ocorreu um erro inesperado');
  }
};