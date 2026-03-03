import { create } from 'zustand';
import { Cartitem, Product } from '../types';

interface ShoppingCartState {
  products: Cartitem[];
  paymentMethod: string | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  clearProducts: () => void;
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (id: number) => void;
  addProductQuantity: (id: number) => void;
  decreaseProductQuantity: (id: number) => void;
  setPaymentMethod: (method: string) => void;
}

export const useShoppingCartStore = create<ShoppingCartState>((set, get) => ({
  products: [],
  paymentMethod: null,
  loading: false,
  refreshing: false,
  error: null,
  clearProducts: () => set({ products: [] }),
  addProduct: (product, quantity) => set((state) => {
    const existingItem = state.products.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < existingItem.stock) {
        return {
          products: state.products.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          )
        };
      }
      return state; // Sem alteração se atingir o estoque
    }

    return { products: [...state.products, { ...product, quantity }] };
  }),

  removeProduct: (id) => set((state) => ({
    products: state.products.filter(item => item.id !== id)
  })),

  addProductQuantity: (id) => set((state) => ({
    products: state.products.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  })),

  decreaseProductQuantity: (id) => set((state) => {
    const item = state.products.find(p => p.id === id);
    if (!item) return state;

    if (item.quantity > 1) {
      return {
        products: state.products.map(p =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      };
    }

    return { products: state.products.filter(p => p.id !== id) };
  }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));

export const useCartSummary = () => {
  const { products, paymentMethod } = useShoppingCartStore();

  const totalItems = products.reduce((total, item) => total + item.quantity, 0);
  const subtotal = products.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = products.reduce((total, item) => total + item.shippingPrice, 0);

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethod,
    totalItems,
    products
  };
};