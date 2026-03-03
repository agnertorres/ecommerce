import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@MyApp:token', token);
  } catch (e) {
    console.error("Erro ao salvar o token", e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('@MyApp:token');
  } catch (e) {
    return null;
  }
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('@MyApp:token');
};

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};