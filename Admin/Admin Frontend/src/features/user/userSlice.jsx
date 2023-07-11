import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdmin, updateUser } from './userAPI';

const initialState = {
  adminInfo: {}
};

export const fetchAdminAsync = createAsyncThunk(
  'admin/fetchAdmin',
  async () => {
    const response = await fetchAdmin();
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'admin/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.adminInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.adminInfo = action.payload;
      })

  },
});

export default userSlice.reducer;
