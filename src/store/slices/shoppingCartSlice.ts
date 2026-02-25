import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..';
import { Cartitem, Product } from '../../types';

interface ShoppingCartSlice {
  products: Cartitem[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const initialState: ShoppingCartSlice = {
  products: [],
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
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.products.find(item => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity < existingItem.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.products.push({ ...product, quantity: 1 });
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
  },
});

export const selectCartTotalItems = (state: RootState) => {
  return state.shoppingCart.products.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

export const selectCartSubtotal = (state: RootState) => {
  return state.shoppingCart.products.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const selectCartTotalPrice = (state: RootState) => {
  return state.shoppingCart.products.reduce((total, item) => {
    return total + (item.price * item.quantity) + item.shippingPrice;
  }, 0);
};

export const selectTotalShipping = (state: RootState) => {
  return state.shoppingCart.products.reduce((total, item) => {
    return total + item.shippingPrice;
  }, 0);
};

export const selectTotalProducts = (state: RootState) => state.shoppingCart.products;

export const {
  clearProducts,
  addProduct,
  removeProduct,
  decreaseProductQuantity,
  addProductQuantity,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;