import { create } from 'zustand';
import { Product, CategoryEnum } from '../types';

import { getProductsByCategory, getProductById } from '../services/product';

interface ProductStore {
  items: Product[];
  selectedProduct: Product;
  loadingSelectedProduct: boolean;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  resetProducts: () => void;
  cleanSelectedProduct: () => void;
  fetchProductsByCategory: (category: CategoryEnum) => Promise<void>;
  fetchProductById: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  items: [],
  selectedProduct: {} as Product,
  loadingSelectedProduct: false,
  loading: false,
  refreshing: false,
  error: null,
  resetProducts: () => set({ loading: true, items: [] }),
  cleanSelectedProduct: () => set({ selectedProduct: {} as Product, loadingSelectedProduct: true }),
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
  fetchProductById: async (id: string) => {
    set({
      loadingSelectedProduct: true,
      error: null,
    });
    
    try {
      const { data } = await getProductById(id);
      
      set({
        selectedProduct: data,
        loadingSelectedProduct: false,
      });
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao carregar produto',
        loadingSelectedProduct: false,
      });
    }
  },
}));