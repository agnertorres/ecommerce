import api from '../config/axios';

export const login = async (email: string, password: string) => {
  try {
     const response = await api.post('/auth/login', {
      email,
      password
     });
     return response.data;
  } catch(error: any) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};