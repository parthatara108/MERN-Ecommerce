import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAdmin, checkAdminAuth, createAdmin, resetPassword, resetPasswordRequest, signOut } from './authAPI';

const initialState = {
  loggedInAdmin: null,
  status: 'idle',
  error: null,
  isAuth: null,
  emailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  'user/createAdmin',
  async (userData) => {
    const response = await createAdmin(userData);
    return response.data;
  }
);
export const loginAdminAsync = createAsyncThunk(
  'admin/checkAdmin',
  async (adminInfo, { rejectWithValue }) => {
    try {
      const response = await checkAdmin(adminInfo);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  'admin/checkAdminAuth',
  async () => {
    const response = await checkAdminAuth();
    return response.data;
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  'admin/resetPasswordRequest',
  async (email) => {
    const response = await resetPasswordRequest(email);
    return response.data;
  }
);
export const resetPasswordAsync = createAsyncThunk(
  'admin/resetPassword',
  async (newPassword) => {
    const response = await resetPassword(newPassword);
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  'admin/adminSignOut',
  () => {
    const response = signOut();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInAdmin = action.payload;
      })
      .addCase(loginAdminAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInAdmin = action.payload;
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInAdmin = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInAdmin = action.payload;
        state.isAuth = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.isAuth = false;

      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.emailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })

  },
});

export default authSlice.reducer;
