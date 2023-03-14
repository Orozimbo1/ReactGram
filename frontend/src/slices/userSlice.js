import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../services/userService'

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

// Get user details
export const profile = createAsyncThunk(
  'users/profile',
  async (user, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await userService.profile(user, token)

    return data;

  }
) 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessages: (state) => {
      state.message = null
    },
  },
  extraReducers: (builders) => {
    builders.addCase(profile.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.user = action.payload;
    })
  }
})

export const { resetMessages } = userSlice.actions;
export default userSlice.reducer;