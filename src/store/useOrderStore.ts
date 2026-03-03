import { create } from 'zustand';
import { Order } from '../types';
import { getOrders } from '../services/order';

interface OrderState {
  items: Order[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  getUserOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  loading: false,
  refreshing: false,
  error: null,
  getUserOrders: async () => {
    const token = 'mock';

    if (!token) {
      set({ error: 'Token não encontrado' });
      return;
    }

    const { items } = get();
    set({
      loading: items.length === 0,
      refreshing: items.length > 0,
      error: null,
    });

    try {
      const { data } = await getOrders(token);

      set({
        items: data,
        loading: false,
        refreshing: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao carregar pedidos',
        loading: false,
        refreshing: false,
      });
    }
  },
}));