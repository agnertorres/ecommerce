import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';

import { CategoryEnum, Product } from '../../types';

import { getProductsByCategory as getProducts } from '../../services/product';

export const getProductsByCategory = createAsyncThunk<Product[], CategoryEnum,{ state: RootState }>(
  'product/getProductsByCategory',
  async (category, { getState, rejectWithValue }) => {

    const { data } = await getProducts(category);
    return data;
  }
);

interface ProductSlice {
  items: Product[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
}

const initialState: ProductSlice = {
  items: [],
  loading: false,
  refreshing: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.loading = true;
      state.items = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.items.length === 0
          ? state.loading = true
          : state.refreshing = true;

        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.refreshing = false;
        state.items = action.payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.error = action.payload as string || 'Erro ao carregar produtos';
      });
  },
});
export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;