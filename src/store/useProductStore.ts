import { create } from 'zustand';
import { Product, CategoryEnum } from '../types';

import { getProductsByCategory } from '../services/product';

interface ProductStore {
  items: Product[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  resetProducts: () => void;
  fetchProductsByCategory: (category: CategoryEnum) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  items: [],
  loading: false,
  refreshing: false,
  error: null,
  resetProducts: () => set({ loading: true, items: [] }),
  fetchProductsByCategory: async (category: CategoryEnum) => {
    const { items } = get();

    set({
      loading: items.length === 0,
      refreshing: items.length > 0,
      error: null,
    });
    
    try {
      const { data } = await getProductsByCategory(category);
      
      set({
        items: data,
        loading: false,
        refreshing: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao carregar produtos',
        loading: false,
        refreshing: false,
      });
    }
  },
}));