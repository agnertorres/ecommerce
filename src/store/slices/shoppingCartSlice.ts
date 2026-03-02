import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { RootState } from '..';
import { Cartitem, Product } from '../../types';

interface ShoppingCartSlice {
  products: Cartitem[];
  paymentMethod: string | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const initialState: ShoppingCartSlice = {
  products: [],
  paymentMethod: null,
  loading: false,
  refreshing: false,
  error: null,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
    addProduct: (state, action: PayloadAction<{ product: Product, quantity: number }>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.products.find(item => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += quantity;
        }
      } else {
        state.products.push({ ...product, quantity });
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.filter(item => item.id !== id);
    },
    addProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.products.findIndex(item => item.id === id);

      state.products[index].quantity += 1;
    },
    decreaseProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.products.findIndex(item => item.id === id);

      if (index !== -1) {
        const item = state.products[index];
        
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.products.splice(index, 1);
        }
      }
    },
    selectPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const selectTotalProducts = (state: RootState) => state.shoppingCart.products;

const selectCartItems = (state: RootState) => state.shoppingCart.products;

const getPaymentMethod = (state: RootState) => state.shoppingCart.paymentMethod;

export const selectCartTotalItems = createSelector(
  [selectCartItems],
  (products) => products.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (products) => products.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const selectTotalShipping = createSelector(
  [selectCartItems],
  (products) => products.reduce((total, item) => total + item.shippingPrice, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartSubtotal, selectTotalShipping],
  (subtotal, shipping) => subtotal + shipping
);

export const selectCartSummary = createSelector(
  [selectCartSubtotal, selectTotalShipping, getPaymentMethod, selectCartTotalItems],
  (subtotal, totalShipping, paymentMethod, totalItems) => {
    return {
      subtotal,
      shipping: totalShipping,
      total: subtotal + totalShipping,
      paymentMethod,
      totalItems,
    };
  }
);

export const {
  clearProducts,
  addProduct,
  removeProduct,
  decreaseProductQuantity,
  addProductQuantity,
  selectPaymentMethod,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;