import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';

import { Order } from '../../types';

import { getOrders } from '../../services/order';

export const getUserOrders = createAsyncThunk<Order[],void,{ state: RootState }>(
  'orders/getUserOrders',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue('Token não encontrado');
    }

    const { data } = await getOrders(token);
    return data;
  }
);

interface OrderSlice {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderSlice = {
  items: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Erro ao carregar pedidos';
      });
  },
});

export default orderSlice.reducer;