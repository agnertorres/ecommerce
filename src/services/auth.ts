import api from '../config/axios';

export const login = async (email, password) => {
  try {
     const response = await api.post('/auth/login', {
      email,
      password
     });
     return response.data;
  } catch(error) {
      console.error("Erro inesperado:", error?.message);
      throw new Error("Erro de conexão");
  }
};