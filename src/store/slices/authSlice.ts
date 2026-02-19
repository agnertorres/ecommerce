import { createSlice } from '@reduxjs/toolkit'

interface AuthSlice {
  token?: string | null,
  isLoading: boolean,
  isSignout: boolean,
}

const initialState: AuthSlice = {
  token: null,
  isLoading: true,
  isSignout: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: (state, action) => {
      state.token = action.payload?.token;
      state.isLoading = false;
    },
    signIn: (state, action) => {
      state.token = action.payload?.token;
      state.isSignout = false;
      state.isLoading = false;
    },
    signOut: state => {
      state.token = null
      state.isSignout = true
    },
    isLoading: state => {
      state.isLoading = true;
    },
  },
});

export const { signIn, signOut, restoreToken, isLoading } = authSlice.actions;
export default authSlice.reducer;
