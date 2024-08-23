import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userId: number | null;
  username: string;
  access_token: string;
  refresh_token: string;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  userId: 0,
  username: '',
  access_token: '',
  refresh_token: '',
  isAuthenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.isAuthenticated = action.payload.isAuthenticated
    },
    login: (state, action: PayloadAction<{ userId: number | null; username: string; access_token: string; refresh_token: string }>) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.userId = null
      state.username = ''
      state.access_token = ''
      state.refresh_token = ''
      state.isAuthenticated = false
    },
  },
})

export const { setAuthState, login, logout } = authSlice.actions
export default authSlice.reducer