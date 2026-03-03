import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const { token } = useAuthStore();

    if (token && config.headers) {
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
    const { signOut } = useAuthStore();

    if (error.response && error.response.status === 401) {
      signOut();

      await AsyncStorage.removeItem('@MyApp:token');
    }
    return Promise.reject(error);
  }
);

export default api;