import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileModalReducer from './slices/profileModalSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import shoppingCartReducer from './slices/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profileModal: profileModalReducer,
    user: userReducer,
    order: orderReducer,
    product: productReducer,
    shoppingCart: shoppingCartReducer,
  },
})

// Tipagem para hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
