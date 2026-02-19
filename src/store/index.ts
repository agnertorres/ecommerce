import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileModalReducer from './slices/profileModalSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profileModal: profileModalReducer,
    user: userReducer,
    order: orderReducer,
  },
})

// Tipagem para hooks
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
