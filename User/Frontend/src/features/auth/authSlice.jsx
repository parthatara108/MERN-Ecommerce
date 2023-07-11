import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, checkUser, createUser, resetPassword, resetPasswordRequest, signOut } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
  checkUser: null,
  emailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    }
    catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await checkAuth();
    return response.data;
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (email) => {
    const response = await resetPasswordRequest(email);
    return response.data;
  }
);
export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (newPassword) => {
    const response = await resetPassword(newPassword);
    return response.data;
  }
);
export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  () => {
    const response = signOut();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'users',
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
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.checkUser = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.checkUser = false;
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

// export const { } = cartSlice.actions;

export default cartSlice.reducer;
