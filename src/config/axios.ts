import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useStore } from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// api.interceptors.request.use(
//   async (config) => {
//     const { token } = useStore.auth();

//     console.log(token);

//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { signOut } = useStore.auth();

//     if (error.response && error.response.status === 401) {
//       signOut();

//       await AsyncStorage.removeItem('@MyApp:token');
//     }
//     return Promise.reject(error);
//   }
// );

export default api;