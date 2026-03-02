import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../types';

interface UserSlice {
  name: string | null;
	cpf: string | null;
	nickname: string | null;
	address: string | null;
	email: string | null;
	phone: string | null;
	password: string | null;
}

const initialState: UserSlice = {
  name: null,
	cpf: null,
	nickname: null,
	address: null,
	email: null,
	phone:  null,
	password: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      const { name, cpf, nickname, address, email, phone, password } = action.payload;
      
      state.name = name;
      state.cpf = cpf;
      state.nickname = nickname;
      state.address = address;
      state.email = email;
      state.phone = phone;
      state.password = password;
    }
  }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
