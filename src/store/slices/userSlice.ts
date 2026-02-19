import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../types';

interface UserSlice {
  data: User | null;
}

const initialState: UserSlice = {
  data: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
        state.data = action.payload;
    } 
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
