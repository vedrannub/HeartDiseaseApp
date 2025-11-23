/**
 * Authentication Redux Slice
 * Manages authentication state and user information
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthService } from '../../services/api/authService';
import { RegisterUserDto, LoginUserDto, UserProfileDto } from '../../types/dtos';

interface AuthState {
  user: UserProfileDto | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: AuthService.getToken(),
  loading: false,
  error: null,
  isAuthenticated: AuthService.isAuthenticated(),
};

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData: RegisterUserDto, { rejectWithValue }) => {
    try {
      const user = await AuthService.register(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginUserDto, { rejectWithValue }) => {
    try {
      const token = await AuthService.login(credentials);
      return token;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  AuthService.logout();
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserProfileDto>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
