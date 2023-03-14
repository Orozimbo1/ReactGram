import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.message = null
    },
  }
})

export const { resetMessages } = userSlice.actions;
export default userSlice.reducer;