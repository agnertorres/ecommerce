import { createSlice } from '@reduxjs/toolkit'

interface ProfileModal {
  visible: boolean;
}

const initialState: ProfileModal = {
  visible: false,
}

const productModalSlice = createSlice({
  name: 'profileModal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = action.payload
    },
  },
});

export const { showModal } = productModalSlice.actions;
export default productModalSlice.reducer;
