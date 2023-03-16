import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  loading: false,
  success: false,
  message: null
}

// Publish an user photo
export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.publishPhoto(photo, token)

    // Check if errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;

  }
)

// Get user photos 
export const getUserPhotos = createAsyncThunk(
  'photo/userphotos',
  async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token

    const data = await photoService.getUserPhotos(id, token)

    return data
  }
)

// Delete a photo
export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {

    const token = await thunkAPI.getState().auth.user.token

    const data = await photoService.deletePhoto(id, token)

    // Check if errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Update a photo
export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photo, thunkAPI) => {

    const token = await thunkAPI.getState().auth.user.token

    const data = await photoService.updatePhoto({title: photo.title}, photo._id, token)

    // Check if errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(publishPhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(publishPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.photo = action.payload;
      state.photos.unshift(state.photo)
      state.message = 'Foto publicada com sucesso.'
    })
    .addCase(publishPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    })
    .addCase(getUserPhotos.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(getUserPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.photos = action.payload;
    })
    .addCase(deletePhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(deletePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.photos = state.photos.filter((photo) => {
        return photo._id !== action.payload.id
      })
      state.message = action.payload.message
    })
    .addCase(deletePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    })
    .addCase(updatePhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(updatePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.photos.map((photo) => {
        if(photo._id === action.payload.photo._id) {
          return photo.title = action.payload.photo.title
        }
        return photo
      })
      state.message = action.payload.message
    })
    .addCase(updatePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    })
  }
})

export const { resetMessage } = photoSlice.actions
export default photoSlice.reducer