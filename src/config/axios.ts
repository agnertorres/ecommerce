import axios from 'axios';
import { useStore } from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = useStore.auth.getState().token;

    const excludeTokenRoutes = ['/login', '/register'];

    const isExcluded = excludeTokenRoutes.some(route => config.url?.includes(route));

    if (token && !isExcluded) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const signOut = useStore.auth.getState().signOut;

    if (error.response && error.response.status === 401) {
      console.warn("Sessão expirada, deslogando...");
      
      signOut();
    }
    return Promise.reject(error);
  }
);

export default api;